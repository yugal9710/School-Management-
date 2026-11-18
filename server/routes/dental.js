/**
 * School Dental & Oral Health Clinic Routes
 * Supports student dental screening, oral hygiene classification,
 * annual school dental camps, and parent treatment notifications.
 */

const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');
const { getTodayBs, bsToAd } = require('../utils/nepaliCalendar');

// GET /api/dental - List dental checkup records
router.get('/', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const { class_id, hygiene, search } = req.query;

  let query = `
    SELECT d.*, 
           s.first_name, s.last_name, s.full_name_nepali, s.admission_number, s.roll_number,
           s.gender, s.guardian_name, s.guardian_phone,
           c.name as class_name, c.nepali_name as class_nepali_name, sec.name as section_name
    FROM dental_records d
    JOIN students s ON d.student_id = s.id
    JOIN classes c ON s.current_class_id = c.id
    JOIN sections sec ON s.current_section_id = sec.id
    WHERE d.tenant_id = ?
  `;
  const params = [tenantId];

  if (class_id) {
    query += ' AND s.current_class_id = ?';
    params.push(class_id);
  }

  if (hygiene) {
    query += ' AND d.oral_hygiene = ?';
    params.push(hygiene);
  }

  if (search) {
    query += ` AND (s.first_name LIKE ? OR s.last_name LIKE ? OR s.full_name_nepali LIKE ? OR s.admission_number LIKE ?)`;
    const sTerm = `%${search}%`;
    params.push(sTerm, sTerm, sTerm, sTerm);
  }

  query += ' ORDER BY d.checkup_date_bs DESC, s.roll_number ASC';

  const records = db.prepare(query).all(...params);
  res.json(records);
});

// GET /api/dental/stats - School Dental Health Overview
router.get('/stats', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;

  const totalScreened = db.prepare('SELECT COUNT(*) as cnt FROM dental_records WHERE tenant_id = ?').get(tenantId).cnt;
  const studentsWithCaries = db.prepare('SELECT COUNT(*) as cnt FROM dental_records WHERE tenant_id = ? AND caries_count > 0').get(tenantId).cnt;
  const needTreatment = db.prepare("SELECT COUNT(*) as cnt FROM dental_records WHERE tenant_id = ? AND (caries_count > 0 OR gum_condition != 'healthy')").get(tenantId).cnt;
  const excellentHygiene = db.prepare("SELECT COUNT(*) as cnt FROM dental_records WHERE tenant_id = ? AND oral_hygiene = 'excellent'").get(tenantId).cnt;
  const goodHygiene = db.prepare("SELECT COUNT(*) as cnt FROM dental_records WHERE tenant_id = ? AND oral_hygiene = 'good'").get(tenantId).cnt;
  const fairPoorHygiene = db.prepare("SELECT COUNT(*) as cnt FROM dental_records WHERE tenant_id = ? AND oral_hygiene IN ('fair', 'poor')").get(tenantId).cnt;

  res.json({
    totalScreened,
    studentsWithCaries,
    cariesPrevalencePct: totalScreened > 0 ? Math.round((studentsWithCaries / totalScreened) * 100) : 0,
    needTreatment,
    hygieneDistribution: {
      excellent: excellentHygiene,
      good: goodHygiene,
      fairOrPoor: fairPoorHygiene
    }
  });
});

// POST /api/dental - Record a student dental checkup
router.post('/', authenticateToken, requireRoles('teacher', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const {
    student_id, checkup_date_bs, camp_name, dentist_name, dentist_nmc_no,
    caries_count, cavity_teeth, missing_count, filled_count,
    plaque_status, gum_condition, oral_hygiene, recommendation
  } = req.body;

  if (!student_id || !dentist_name) {
    return res.status(400).json({ error: 'Student ID and Dentist name required' });
  }

  const dBs = checkup_date_bs || getTodayBs().formattedBs;
  const parts = dBs.split('-');
  const dAd = bsToAd(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)).formattedAd;
  const recordId = 'dnt-' + Date.now();

  db.prepare(`
    INSERT INTO dental_records (
      id, tenant_id, student_id, checkup_date_bs, checkup_date_ad,
      camp_name, dentist_name, dentist_nmc_no, caries_count, cavity_teeth,
      missing_count, filled_count, plaque_status, gum_condition,
      oral_hygiene, recommendation, parent_notified
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `).run(
    recordId, tenantId, student_id, dBs, dAd,
    camp_name || 'वार्षिक विद्यालय दन्त स्वास्थ्य शिविर',
    dentist_name, dentist_nmc_no || '',
    Number(caries_count) || 0, cavity_teeth || '',
    Number(missing_count) || 0, Number(filled_count) || 0,
    plaque_status || 'mild', gum_condition || 'healthy',
    oral_hygiene || 'good', recommendation || ''
  );

  logAudit(req, 'RECORD_DENTAL_EXAM', 'dental_record', recordId, { student_id, caries_count, oral_hygiene });

  res.status(201).json({ message: 'Dental examination record saved successfully', id: recordId });
});

// POST /api/dental/notify/:id - Notify guardian about dental treatment need
router.post('/notify/:id', authenticateToken, requireRoles('school_admin', 'teacher', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const recordId = req.params.id;

  const record = db.prepare(`
    SELECT d.*, s.first_name, s.last_name, s.full_name_nepali, s.guardian_name, s.guardian_phone,
           t.name as school_name, t.nepali_name as school_nepali_name
    FROM dental_records d
    JOIN students s ON d.student_id = s.id
    JOIN tenants t ON d.tenant_id = t.id
    WHERE d.id = ? AND d.tenant_id = ?
  `).get(recordId, tenantId);

  if (!record) return res.status(404).json({ error: 'Dental record not found' });

  db.prepare('UPDATE dental_records SET parent_notified = 1 WHERE id = ?').run(recordId);

  const msgNe = `आदरणीय ${record.guardian_name || 'अभिभावक'}, ${record.school_nepali_name} द्वारा सञ्चालित दन्त स्वास्थ्य शिविरमा तपाईंको छोरा/छोरी ${record.full_name_nepali} को दाँत परीक्षण गर्दा ${record.caries_count > 0 ? `${record.caries_count} वटा दाँतमा क्याभिटी (किराले खाएको)` : 'दन्त समस्या'} देखिएको छ। डाक्टरको सल्लाह: "${record.recommendation}"। कृपया नजिकको दन्त क्लिनिकमा उपचार गराउनुहोला।`;
  const msgEn = `Dear Guardian, during the School Dental Camp, your ward ${record.first_name} was examined. Dentist advice: "${record.recommendation}". Please consult a dental clinic for necessary treatment.`;

  logAudit(req, 'DENTAL_PARENT_NOTIFICATION', 'dental_record', recordId, { guardian: record.guardian_name });

  res.json({
    message: 'Dental advice notice sent to parent',
    recipient: record.guardian_phone,
    messageNe: msgNe,
    messageEn: msgEn
  });
});

module.exports = router;
