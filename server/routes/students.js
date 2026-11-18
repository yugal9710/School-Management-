/**
 * Student Information & Admissions Routes (Module 2)
 * Manages student admission, profiles, federal address, inclusion/medical notes
 */

const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');
const { adToBs, bsToAd } = require('../utils/nepaliCalendar');

// GET /api/students - List students with multi-tenant isolation
router.get('/', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const { class_id, section_id, gender, caste, search, status } = req.query;

  let query = `
    SELECT 
      s.id, s.admission_number, s.roll_number, s.current_class_id, s.current_section_id,
      s.first_name, s.last_name, s.full_name_nepali, s.gender, s.dob_bs, s.dob_ad,
      s.blood_group, s.caste_ethnicity, s.religion, s.mother_tongue, s.disability_status,
      s.province, s.district, s.municipality, s.ward, s.tole,
      s.father_name, s.mother_name, s.guardian_name, s.guardian_phone,
      s.status, s.enrollment_date_bs,
      c.name as class_name, c.nepali_name as class_nepali_name,
      sec.name as section_name
    FROM students s
    LEFT JOIN classes c ON s.current_class_id = c.id
    LEFT JOIN sections sec ON s.current_section_id = sec.id
    WHERE s.tenant_id = ?
  `;
  const params = [tenantId];

  if (class_id) {
    query += ' AND s.current_class_id = ?';
    params.push(class_id);
  }
  if (section_id) {
    query += ' AND s.current_section_id = ?';
    params.push(section_id);
  }
  if (gender) {
    query += ' AND s.gender = ?';
    params.push(gender);
  }
  if (caste) {
    query += ' AND s.caste_ethnicity = ?';
    params.push(caste);
  }
  if (status) {
    query += ' AND s.status = ?';
    params.push(status);
  } else {
    query += " AND s.status = 'enrolled'";
  }

  if (search) {
    query += ` AND (
      s.first_name LIKE ? OR 
      s.last_name LIKE ? OR 
      s.full_name_nepali LIKE ? OR 
      s.admission_number LIKE ? OR
      s.guardian_phone LIKE ?
    )`;
    const sTerm = `%${search}%`;
    params.push(sTerm, sTerm, sTerm, sTerm, sTerm);
  }

  query += ' ORDER BY c.display_order ASC, s.roll_number ASC, s.first_name ASC';

  const students = db.prepare(query).all(...params);
  res.json(students);
});

// GET /api/students/:id - Get detailed student profile
router.get('/:id', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const student = db.prepare(`
    SELECT 
      s.*,
      c.name as class_name, c.nepali_name as class_nepali_name,
      sec.name as section_name
    FROM students s
    LEFT JOIN classes c ON s.current_class_id = c.id
    LEFT JOIN sections sec ON s.current_section_id = sec.id
    WHERE s.id = ? AND s.tenant_id = ?
  `).get(req.params.id, tenantId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found in this school' });
  }

  // Sensitive information access control:
  // Only school_admin, teacher, or super_admin can view detailed inclusion/medical notes
  const canViewSensitiveNotes = ['school_admin', 'teacher', 'super_admin'].includes(req.user.role);
  if (!canViewSensitiveNotes) {
    student.inclusion_support_notes = student.inclusion_support_notes ? '[Restricted/संरक्षित]' : null;
  }

  // Attendance summary
  const totalDays = db.prepare('SELECT COUNT(*) as cnt FROM attendance WHERE tenant_id = ? AND student_id = ?').get(tenantId, student.id).cnt;
  const presentDays = db.prepare("SELECT COUNT(*) as cnt FROM attendance WHERE tenant_id = ? AND student_id = ? AND status = 'present'").get(tenantId, student.id).cnt;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

  // Fee summary
  const totalDues = db.prepare('SELECT SUM(amount - discount_amount) as total FROM student_fee_dues WHERE tenant_id = ? AND student_id = ?').get(tenantId, student.id).total || 0;
  const totalPaid = db.prepare('SELECT SUM(paid_amount) as total FROM student_fee_dues WHERE tenant_id = ? AND student_id = ?').get(tenantId, student.id).total || 0;
  const outstandingBalance = totalDues - totalPaid;

  res.json({
    ...student,
    attendanceRate,
    totalAttendanceDays: totalDays,
    presentDays,
    totalFeeDues: totalDues,
    totalFeePaid: totalPaid,
    outstandingBalance: Math.max(0, outstandingBalance)
  });
});

// POST /api/students - Enroll / Admit new student
router.post('/', authenticateToken, requireRoles('school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const {
    admission_number, roll_number, current_class_id, current_section_id,
    first_name, last_name, full_name_nepali, gender, dob_bs, dob_ad,
    blood_group, caste_ethnicity, religion, mother_tongue, disability_status,
    inclusion_support_notes, previous_school, province, district, municipality,
    ward, tole, father_name, father_phone, mother_name, mother_phone,
    guardian_name, guardian_phone, emergency_contact, enrollment_date_bs
  } = req.body;

  if (!first_name || !last_name || !current_class_id || !current_section_id || !dob_bs || !caste_ethnicity) {
    return res.status(400).json({ error: 'Please provide all mandatory admission fields (सबै अनिवार्य विवरण भर्नुहोस्)' });
  }

  // Auto-generate admission number if not provided
  let admNo = admission_number;
  if (!admNo) {
    const yearPrefix = dob_bs.split('-')[0] || '2081';
    const lastCount = db.prepare('SELECT COUNT(*) as cnt FROM students WHERE tenant_id = ?').get(tenantId).cnt + 1;
    admNo = `${yearPrefix}-${String(lastCount).padStart(4, '0')}`;
  }

  const studentId = 'stu-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

  try {
    db.prepare(`
      INSERT INTO students (
        id, tenant_id, admission_number, roll_number, current_class_id, current_section_id,
        first_name, last_name, full_name_nepali, gender, dob_bs, dob_ad,
        blood_group, caste_ethnicity, religion, mother_tongue, disability_status,
        inclusion_support_notes, previous_school, province, district, municipality,
        ward, tole, father_name, father_phone, mother_name, mother_phone,
        guardian_name, guardian_phone, emergency_contact, status, enrollment_date_bs
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'enrolled', ?)
    `).run(
      studentId, tenantId, admNo, roll_number || null, current_class_id, current_section_id,
      first_name, last_name, full_name_nepali || `${first_name} ${last_name}`, gender || 'male',
      dob_bs, dob_ad || null, blood_group || null, caste_ethnicity || 'Other',
      religion || 'Hindu', mother_tongue || 'Nepali', disability_status || 'none',
      inclusion_support_notes || null, previous_school || null,
      province || 'बागमती प्रदेश', district || 'ललितपुर', municipality || 'ललितपुर महानगरपालिका',
      ward || '५', tole || '', father_name || null, father_phone || null,
      mother_name || null, mother_phone || null, guardian_name || father_name || first_name,
      guardian_phone || father_phone || null, emergency_contact || guardian_phone || null,
      enrollment_date_bs || '2081-01-10'
    );

    logAudit(req, 'ENROLL_STUDENT', 'student', studentId, {
      admissionNumber: admNo,
      name: `${first_name} ${last_name}`,
      classId: current_class_id
    });

    res.status(201).json({
      message: 'Student admitted and enrolled successfully',
      id: studentId,
      admissionNumber: admNo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/students/:id - Update student record
router.put('/:id', authenticateToken, requireRoles('school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const studentId = req.params.id;

  const {
    roll_number, current_class_id, current_section_id,
    first_name, last_name, full_name_nepali, gender, dob_bs, dob_ad,
    blood_group, caste_ethnicity, religion, mother_tongue, disability_status,
    inclusion_support_notes, previous_school, province, district, municipality,
    ward, tole, father_name, father_phone, mother_name, mother_phone,
    guardian_name, guardian_phone, emergency_contact, status
  } = req.body;

  try {
    db.prepare(`
      UPDATE students SET
        roll_number = COALESCE(?, roll_number),
        current_class_id = COALESCE(?, current_class_id),
        current_section_id = COALESCE(?, current_section_id),
        first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        full_name_nepali = COALESCE(?, full_name_nepali),
        gender = COALESCE(?, gender),
        dob_bs = COALESCE(?, dob_bs),
        dob_ad = COALESCE(?, dob_ad),
        blood_group = COALESCE(?, blood_group),
        caste_ethnicity = COALESCE(?, caste_ethnicity),
        religion = COALESCE(?, religion),
        mother_tongue = COALESCE(?, mother_tongue),
        disability_status = COALESCE(?, disability_status),
        inclusion_support_notes = COALESCE(?, inclusion_support_notes),
        previous_school = COALESCE(?, previous_school),
        province = COALESCE(?, province),
        district = COALESCE(?, district),
        municipality = COALESCE(?, municipality),
        ward = COALESCE(?, ward),
        tole = COALESCE(?, tole),
        father_name = COALESCE(?, father_name),
        father_phone = COALESCE(?, father_phone),
        mother_name = COALESCE(?, mother_name),
        mother_phone = COALESCE(?, mother_phone),
        guardian_name = COALESCE(?, guardian_name),
        guardian_phone = COALESCE(?, guardian_phone),
        emergency_contact = COALESCE(?, emergency_contact),
        status = COALESCE(?, status)
      WHERE id = ? AND tenant_id = ?
    `).run(
      roll_number, current_class_id, current_section_id,
      first_name, last_name, full_name_nepali, gender, dob_bs, dob_ad,
      blood_group, caste_ethnicity, religion, mother_tongue, disability_status,
      inclusion_support_notes, previous_school, province, district, municipality,
      ward, tole, father_name, father_phone, mother_name, mother_phone,
      guardian_name, guardian_phone, emergency_contact, status,
      studentId, tenantId
    );

    logAudit(req, 'UPDATE_STUDENT', 'student', studentId, { updatedFields: Object.keys(req.body) });

    res.json({ message: 'Student information updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
