/**
 * Academics & Curriculum Routes (Module 4)
 * Manages Classes, Sections, Subjects (Theory/Practical CDC), Timetables
 */

const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');

// GET /api/academics/academic-years
router.get('/academic-years', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const years = db.prepare('SELECT * FROM academic_years WHERE tenant_id = ? ORDER BY year_bs DESC').all(tenantId);
  const terms = db.prepare('SELECT * FROM terms WHERE tenant_id = ? ORDER BY term_order ASC').all(tenantId);

  res.json({ years, terms });
});

// GET /api/academics/classes - List all grades with sections & subjects count
router.get('/classes', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const classes = db.prepare('SELECT * FROM classes WHERE tenant_id = ? ORDER BY display_order ASC').all(tenantId);

  const result = classes.map(c => {
    const sections = db.prepare('SELECT * FROM sections WHERE tenant_id = ? AND class_id = ? ORDER BY name ASC').all(tenantId, c.id);
    const subjectsCount = db.prepare('SELECT COUNT(*) as cnt FROM subjects WHERE tenant_id = ? AND class_id = ?').get(tenantId, c.id).cnt;
    const studentCount = db.prepare("SELECT COUNT(*) as cnt FROM students WHERE tenant_id = ? AND current_class_id = ? AND status = 'enrolled'").get(tenantId, c.id).cnt;
    return {
      ...c,
      sections,
      subjectsCount,
      studentCount
    };
  });

  res.json(result);
});

// POST /api/academics/classes - Create new class / grade
router.post('/classes', authenticateToken, requireRoles('school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { name, nepali_name, grade_level, stream, display_order } = req.body;

  if (!name || !nepali_name) {
    return res.status(400).json({ error: 'Class name and Nepali name required' });
  }

  const classId = 'cls-' + Date.now();
  db.prepare(`
    INSERT INTO classes (id, tenant_id, name, nepali_name, grade_level, stream, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(classId, tenantId, name, nepali_name, grade_level || 1, stream || 'General', display_order || 1);

  // Auto-create Section A
  const secId = 'sec-' + Date.now();
  db.prepare(`
    INSERT INTO sections (id, tenant_id, class_id, name, room_number, capacity)
    VALUES (?, ?, ?, 'Section A', 'Room 101', 40)
  `).run(secId, tenantId, classId);

  logAudit(req, 'CREATE_CLASS', 'class', classId, { name, nepali_name });
  res.status(201).json({ message: 'Class created', id: classId });
});

// GET /api/academics/subjects - List subjects (optionally by class_id)
router.get('/subjects', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const { class_id } = req.query;

  let query = `
    SELECT sub.*, c.name as class_name, c.nepali_name as class_nepali_name
    FROM subjects sub
    JOIN classes c ON sub.class_id = c.id
    WHERE sub.tenant_id = ?
  `;
  const params = [tenantId];

  if (class_id) {
    query += ' AND sub.class_id = ?';
    params.push(class_id);
  }

  query += ' ORDER BY c.display_order ASC, sub.code ASC';
  const subjects = db.prepare(query).all(...params);
  res.json(subjects);
});

// POST /api/academics/subjects - Create subject with CDC theory/practical splits
router.post('/subjects', authenticateToken, requireRoles('school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const {
    class_id, code, name, nepali_name, credit_hours,
    theory_full_marks, theory_pass_marks, practical_full_marks, practical_pass_marks,
    is_optional, subject_type
  } = req.body;

  if (!class_id || !code || !name || !nepali_name) {
    return res.status(400).json({ error: 'Subject code, name, and class are required' });
  }

  const thF = Number(theory_full_marks) || 75;
  const thP = Number(theory_pass_marks) || (thF * 0.35);
  const prF = Number(practical_full_marks) || 25;
  const prP = Number(practical_pass_marks) || (prF * 0.40);
  const totalF = thF + prF;
  const totalP = thP + prP;

  const subjectId = 'sub-' + Date.now();
  db.prepare(`
    INSERT INTO subjects (
      id, tenant_id, class_id, code, name, nepali_name, credit_hours,
      full_marks, pass_marks, theory_full_marks, theory_pass_marks,
      practical_full_marks, practical_pass_marks, is_optional, subject_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    subjectId, tenantId, class_id, code, name, nepali_name, Number(credit_hours) || 4.0,
    totalF, totalP, thF, thP, prF, prP, is_optional ? 1 : 0, subject_type || 'compulsory'
  );

  logAudit(req, 'CREATE_SUBJECT', 'subject', subjectId, { code, name });
  res.status(201).json({ message: 'Subject created', id: subjectId });
});

// GET /api/academics/timetable - Get weekly timetable
router.get('/timetable', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const { class_id, section_id } = req.query;

  if (!class_id || !section_id) {
    return res.status(400).json({ error: 'Class ID and Section ID required' });
  }

  const slots = db.prepare(`
    SELECT t.*, s.name as subject_name, s.nepali_name as subject_nepali, stf.full_name as teacher_name
    FROM timetables t
    LEFT JOIN subjects s ON t.subject_id = s.id
    LEFT JOIN staff stf ON t.teacher_id = stf.id OR t.teacher_id = stf.user_id
    WHERE t.tenant_id = ? AND t.class_id = ? AND t.section_id = ?
    ORDER BY 
      CASE t.day_of_week
        WHEN 'Sunday' THEN 1
        WHEN 'Monday' THEN 2
        WHEN 'Tuesday' THEN 3
        WHEN 'Wednesday' THEN 4
        WHEN 'Thursday' THEN 5
        WHEN 'Friday' THEN 6
      END,
      t.period_number ASC
  `).all(tenantId, class_id, section_id);

  res.json(slots);
});

// POST /api/academics/timetable - Update or add slot
router.post('/timetable', authenticateToken, requireRoles('school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { class_id, section_id, subject_id, teacher_id, day_of_week, period_number, start_time, end_time } = req.body;

  const slotId = 'tt-' + Date.now();
  // Delete existing slot at that period
  db.prepare(`
    DELETE FROM timetables 
    WHERE tenant_id = ? AND class_id = ? AND section_id = ? AND day_of_week = ? AND period_number = ?
  `).run(tenantId, class_id, section_id, day_of_week, period_number);

  db.prepare(`
    INSERT INTO timetables (id, tenant_id, class_id, section_id, subject_id, teacher_id, day_of_week, period_number, start_time, end_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(slotId, tenantId, class_id, section_id, subject_id, teacher_id || null, day_of_week, period_number, start_time, end_time);

  res.json({ message: 'Timetable updated' });
});

module.exports = router;
