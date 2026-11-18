/**
 * Attendance Management Routes (Module 5)
 * Daily student attendance, offline sync queue, guardian absence notification
 */

const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');
const { getTodayBs, bsToAd } = require('../utils/nepaliCalendar');

// GET /api/attendance - Get class attendance sheet for a specific date
router.get('/', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const { class_id, section_id, date_bs } = req.query;

  if (!class_id || !section_id) {
    return res.status(400).json({ error: 'Class ID and Section ID required' });
  }

  const queryDateBs = date_bs || getTodayBs().formattedBs;

  // Get all enrolled students in class/section
  const students = db.prepare(`
    SELECT id, admission_number, roll_number, first_name, last_name, full_name_nepali, gender, guardian_phone
    FROM students
    WHERE tenant_id = ? AND current_class_id = ? AND current_section_id = ? AND status = 'enrolled'
    ORDER BY roll_number ASC, first_name ASC
  `).all(tenantId, class_id, section_id);

  // Get attendance records for this date
  const records = db.prepare(`
    SELECT student_id, status, remark, recorded_by, guardian_notified
    FROM attendance
    WHERE tenant_id = ? AND date_bs = ? AND class_id = ? AND section_id = ?
  `).all(tenantId, queryDateBs, class_id, section_id);

  const recordMap = {};
  for (const r of records) {
    recordMap[r.student_id] = r;
  }

  const result = students.map(s => {
    const existing = recordMap[s.id];
    return {
      student_id: s.id,
      admission_number: s.admission_number,
      roll_number: s.roll_number,
      first_name: s.first_name,
      last_name: s.last_name,
      full_name_nepali: s.full_name_nepali,
      gender: s.gender,
      guardian_phone: s.guardian_phone,
      status: existing ? existing.status : 'present', // Default to present
      remark: existing ? existing.remark : '',
      guardian_notified: existing ? existing.guardian_notified : 0,
      is_recorded: !!existing
    };
  });

  res.json({
    date_bs: queryDateBs,
    class_id,
    section_id,
    totalStudents: students.length,
    students: result
  });
});

// POST /api/attendance - Save batch attendance for a class
router.post('/', authenticateToken, requireRoles('teacher', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { class_id, section_id, date_bs, records } = req.body;

  if (!class_id || !section_id || !date_bs || !Array.isArray(records)) {
    return res.status(400).json({ error: 'Invalid attendance submission payload' });
  }

  // Derive AD date
  const parts = date_bs.split('-');
  const adDate = bsToAd(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)).formattedAd;
  const recordedBy = req.user.username;

  const insertOrUpdate = db.prepare(`
    INSERT INTO attendance (
      id, tenant_id, date_bs, date_ad, student_id, class_id, section_id,
      status, remark, recorded_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(tenant_id, date_bs, student_id) DO UPDATE SET
      status = excluded.status,
      remark = excluded.remark,
      recorded_by = excluded.recorded_by
  `);

  let presentCount = 0;
  let absentCount = 0;

  for (const r of records) {
    const recId = `att-${date_bs}-${r.student_id}`;
    insertOrUpdate.run(
      recId, tenantId, date_bs, adDate, r.student_id, class_id, section_id,
      r.status || 'present', r.remark || '', recordedBy
    );
    if (r.status === 'absent') absentCount++;
    else if (r.status === 'present') presentCount++;
  }

  logAudit(req, 'RECORD_ATTENDANCE', 'attendance', `${class_id}-${date_bs}`, {
    date_bs,
    totalRecords: records.length,
    presentCount,
    absentCount
  });

  res.json({
    message: 'Attendance saved successfully (हाजिरी सफलतापूर्वक सुरक्षित गरियो)',
    savedCount: records.length,
    presentCount,
    absentCount
  });
});

// POST /api/attendance/offline-sync - Synchronize queue recorded offline
router.post('/offline-sync', authenticateToken, requireRoles('teacher', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { sync_batch_id, records, device_info, date_bs } = req.body;

  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ error: 'No offline records provided for sync' });
  }

  const recordedBy = req.user.username;
  const insertOrUpdate = db.prepare(`
    INSERT INTO attendance (
      id, tenant_id, date_bs, date_ad, student_id, class_id, section_id,
      status, remark, recorded_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(tenant_id, date_bs, student_id) DO UPDATE SET
      status = excluded.status,
      remark = excluded.remark,
      recorded_by = excluded.recorded_by
  `);

  let synced = 0;
  for (const r of records) {
    const dBs = r.date_bs || date_bs;
    const parts = dBs.split('-');
    const adDate = bsToAd(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)).formattedAd;
    const recId = `att-${dBs}-${r.student_id}`;

    insertOrUpdate.run(
      recId, tenantId, dBs, adDate, r.student_id, r.class_id, r.section_id,
      r.status, r.remark || 'Synced from offline', recordedBy
    );
    synced++;
  }

  // Record sync log
  const syncLogId = 'sync-' + Date.now();
  db.prepare(`
    INSERT INTO offline_sync_logs (id, tenant_id, synced_by, record_count, date_bs, device_info)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(syncLogId, tenantId, recordedBy, synced, date_bs || 'Batch', device_info || 'Mobile App / Offline Browser');

  logAudit(req, 'OFFLINE_ATTENDANCE_SYNC', 'offline_sync', syncLogId, { syncedCount: synced, batchId: sync_batch_id });

  res.json({
    message: 'Offline attendance batch synchronized successfully (अफलाइन हाजिरी सफलतापूर्वक सिङ्क भयो)',
    syncedCount: synced,
    syncId: syncLogId
  });
});

// POST /api/attendance/notify-guardians - Trigger/simulate SMS alerts for absent students
router.post('/notify-guardians', authenticateToken, requireRoles('teacher', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { date_bs, class_id, section_id } = req.body;

  const tenant = db.prepare('SELECT name, nepali_name FROM tenants WHERE id = ?').get(tenantId);

  // Find absent students for this date
  const absentees = db.prepare(`
    SELECT a.id as att_id, s.first_name, s.last_name, s.full_name_nepali, s.guardian_name, s.guardian_phone
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE a.tenant_id = ? AND a.date_bs = ? AND a.class_id = ? AND a.section_id = ? AND a.status = 'absent'
  `).all(tenantId, date_bs, class_id, section_id);

  const notifications = [];

  for (const student of absentees) {
    const msgNe = `आदरणीय अभिभावक, ${tenant.nepali_name} मा अध्ययनरत तपाईंको छोरा/छोरी ${student.full_name_nepali} आज मिति ${date_bs} मा विद्यालयमा अनुपस्थित रहनुभएको व्यहोरा जानकारी गराइन्छ।`;
    const msgEn = `Dear Guardian, your ward ${student.first_name} ${student.last_name} was marked absent today (${date_bs}) at ${tenant.name}. Please contact school if this is unexpected.`;

    db.prepare('UPDATE attendance SET guardian_notified = 1 WHERE id = ?').run(student.att_id);

    notifications.push({
      student_id: student.att_id,
      guardian_name: student.guardian_name,
      guardian_phone: student.guardian_phone || '98XXXXXXXX',
      message_nepali: msgNe,
      message_english: msgEn,
      status: 'SENT'
    });
  }

  logAudit(req, 'NOTIFY_ABSENT_GUARDIANS', 'attendance_notification', date_bs, {
    recipientCount: notifications.length
  });

  res.json({
    message: `Absence notifications generated for ${notifications.length} students`,
    count: notifications.length,
    notifications
  });
});

module.exports = router;
