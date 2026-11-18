/**
 * Staff Management Routes (Module 3)
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');

// GET /api/staff - List staff members for current tenant
router.get('/', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const { department, status, search } = req.query;

  let query = 'SELECT * FROM staff WHERE tenant_id = ?';
  const params = [tenantId];

  if (department) {
    query += ' AND department = ?';
    params.push(department);
  }
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  } else {
    query += " AND status = 'active'";
  }

  if (search) {
    query += ' AND (full_name LIKE ? OR nepali_name LIKE ? OR designation LIKE ? OR employee_id LIKE ?)';
    const sTerm = `%${search}%`;
    params.push(sTerm, sTerm, sTerm, sTerm);
  }

  query += ' ORDER BY designation ASC, full_name ASC';

  const staffList = db.prepare(query).all(...params);

  // Attach teaching subject counts / workload
  const result = staffList.map(s => {
    const workload = db.prepare('SELECT COUNT(*) as periodCount FROM timetables WHERE tenant_id = ? AND teacher_id = ?').get(tenantId, s.user_id || s.id).periodCount;
    return { ...s, weeklyPeriods: workload };
  });

  res.json(result);
});

// POST /api/staff - Add new staff member & optional user login
router.post('/', authenticateToken, requireRoles('school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const {
    employee_id, full_name, nepali_name, gender, designation, department,
    qualification, citizenship_no, pan_no, joined_date_bs, employment_type,
    phone, email, province, district, municipality, ward, tole,
    create_user_account, username, password, role
  } = req.body;

  if (!full_name || !designation || !joined_date_bs) {
    return res.status(400).json({ error: 'Full name, designation, and join date are required' });
  }

  const staffId = 'stf-' + Date.now();
  let userId = null;

  try {
    if (create_user_account && username && password) {
      userId = 'usr-' + Date.now();
      const passHash = bcrypt.hashSync(password, 10);
      db.prepare(`
        INSERT INTO users (id, tenant_id, username, password_hash, full_name, nepali_name, email, phone, role, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      `).run(userId, tenantId, username, passHash, full_name, nepali_name, email || null, phone || null, role || 'teacher');
    }

    const empId = employee_id || `EMP-${Date.now().toString().slice(-4)}`;

    db.prepare(`
      INSERT INTO staff (
        id, tenant_id, user_id, employee_id, full_name, nepali_name, gender,
        designation, department, qualification, citizenship_no, pan_no, joined_date_bs,
        employment_type, phone, email, province, district, municipality, ward, tole, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `).run(
      staffId, tenantId, userId, empId, full_name, nepali_name || full_name, gender || 'male',
      designation, department || 'General', qualification || '', citizenship_no || '', pan_no || '',
      joined_date_bs, employment_type || 'permanent', phone || '', email || '',
      province || '', district || '', municipality || '', ward || '', tole || ''
    );

    logAudit(req, 'ADD_STAFF', 'staff', staffId, { name: full_name, designation, empId });

    res.status(201).json({ message: 'Staff member added successfully', id: staffId, employeeId: empId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
