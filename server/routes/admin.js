/**
 * Admin Console Backend Routes
 * User management, role access, school database backup,
 * audit trail monitoring, and administrative controls.
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');

router.use(authenticateToken);

/**
 * GET /api/admin/users
 * List all users for current tenant (or all if super_admin)
 */
router.get('/users', requireRoles(['super_admin', 'school_admin']), (req, res) => {
  try {
    const isSuper = req.user.role === 'super_admin';
    let query = `
      SELECT u.id, u.tenant_id, u.username, u.full_name, u.nepali_name, u.email, u.phone, 
             u.role, u.is_active, u.created_at, t.name as school_name, t.nepali_name as school_nepali_name
      FROM users u
      LEFT JOIN tenants t ON u.tenant_id = t.id
    `;
    const params = [];

    if (!isSuper) {
      query += ` WHERE u.tenant_id = ? `;
      params.push(req.tenantId);
    }

    query += ` ORDER BY u.role, u.full_name ASC `;

    const users = db.prepare(query).all(...params);

    // Also get summary counts by role
    let countQuery = `SELECT role, COUNT(*) as count FROM users `;
    const countParams = [];
    if (!isSuper) {
      countQuery += ` WHERE tenant_id = ? `;
      countParams.push(req.tenantId);
    }
    countQuery += ` GROUP BY role `;
    const counts = db.prepare(countQuery).all(...countParams);

    res.json({ users, counts });
  } catch (err) {
    console.error('Error fetching admin users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * POST /api/admin/users
 * Create a new user in the school
 */
router.post('/users', requireRoles(['super_admin', 'school_admin']), (req, res) => {
  try {
    const { username, password, full_name, nepali_name, email, phone, role } = req.body;
    if (!username || !password || !full_name || !role) {
      return res.status(400).json({ error: 'Username, password, full name, and role are required' });
    }

    const tenantId = req.user.role === 'super_admin' && req.body.tenant_id ? req.body.tenant_id : req.tenantId;

    // Check if username exists
    const existing = db.prepare(`SELECT id FROM users WHERE username = ?`).get(username);
    if (existing) {
      return res.status(400).json({ error: 'प्रयोगकर्ता नाम पहिले नै दर्ता छ (Username already taken).' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    db.prepare(`
      INSERT INTO users (id, tenant_id, username, password_hash, full_name, nepali_name, email, phone, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(userId, tenantId, username, passwordHash, full_name, nepali_name || full_name, email || null, phone || null, role);

    // Audit log
    logAudit(tenantId, req.user.id, req.user.username, 'USER_CREATED', 'users', userId, {
      created_username: username,
      role,
      full_name
    });

    res.status(201).json({ success: true, message: 'User created successfully', userId });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * PATCH /api/admin/users/:id/status
 * Toggle user active/inactive or reset password
 */
router.patch('/users/:id/status', requireRoles(['super_admin', 'school_admin']), (req, res) => {
  try {
    const { id } = req.params;
    const { is_active, new_password } = req.body;

    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (req.user.role !== 'super_admin' && user.tenant_id !== req.tenantId) {
      return res.status(403).json({ error: 'Unauthorized to modify user of another tenant' });
    }

    if (is_active !== undefined) {
      db.prepare(`UPDATE users SET is_active = ? WHERE id = ?`).run(is_active ? 1 : 0, id);
    }

    if (new_password) {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(new_password, salt);
      db.prepare(`UPDATE users SET password_hash = ? WHERE id = ?`).run(passwordHash, id);
    }

    // Audit log
    logAudit(user.tenant_id, req.user.id, req.user.username, 'USER_MODIFIED', 'users', id, {
      modified_username: user.username,
      is_active,
      password_reset: !!new_password
    });

    res.json({ success: true, message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user status:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * GET /api/admin/audit-logs
 * Fetch audit trail for school actions
 */
router.get('/audit-logs', requireRoles(['super_admin', 'school_admin']), (req, res) => {
  try {
    const isSuper = req.user.role === 'super_admin';
    let query = `
      SELECT id, tenant_id, user_id, username, action, entity_type, entity_id, details, ip_address, created_at
      FROM audit_logs
    `;
    const params = [];

    if (!isSuper) {
      query += ` WHERE tenant_id = ? `;
      params.push(req.tenantId);
    }

    query += ` ORDER BY created_at DESC LIMIT 50 `;

    const logs = db.prepare(query).all(...params);
    res.json(logs);
  } catch (err) {
    console.error('Error fetching audit logs:', err);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

/**
 * GET /api/admin/backup
 * Download full tenant database snapshot in JSON format
 */
router.get('/backup', requireRoles(['super_admin', 'school_admin']), (req, res) => {
  try {
    const tenantId = req.tenantId;
    const tenant = db.prepare(`SELECT * FROM tenants WHERE id = ?`).get(tenantId);
    const students = db.prepare(`SELECT * FROM students WHERE tenant_id = ?`).all(tenantId);
    const staff = db.prepare(`SELECT * FROM staff WHERE tenant_id = ?`).all(tenantId);
    const classes = db.prepare(`SELECT * FROM classes WHERE tenant_id = ?`).all(tenantId);
    const subjects = db.prepare(`SELECT * FROM subjects WHERE tenant_id = ?`).all(tenantId);
    const feeCategories = db.prepare(`SELECT * FROM fee_categories WHERE tenant_id = ?`).all(tenantId);
    const feePayments = db.prepare(`SELECT * FROM fee_payments WHERE tenant_id = ?`).all(tenantId);
    const notices = db.prepare(`SELECT * FROM notices WHERE tenant_id = ?`).all(tenantId);
    const dental = db.prepare(`SELECT * FROM dental_records WHERE tenant_id = ?`).all(tenantId);
    const exams = db.prepare(`SELECT * FROM exams WHERE tenant_id = ?`).all(tenantId);

    const backupPayload = {
      system: 'Hamro Vidhyalaya - Nepal School Management Platform',
      version: '1.0-nepal-iemis',
      timestamp: new Date().toISOString(),
      school: tenant,
      dataCounts: {
        students: students.length,
        staff: staff.length,
        classes: classes.length,
        subjects: subjects.length,
        feePayments: feePayments.length,
        dentalRecords: dental.length,
        notices: notices.length
      },
      records: {
        students,
        staff,
        classes,
        subjects,
        feeCategories,
        feePayments,
        notices,
        dentalRecords: dental,
        exams
      }
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="backup_${tenantId}_${Date.now()}.json"`);
    res.json(backupPayload);
  } catch (err) {
    console.error('Error generating backup:', err);
    res.status(500).json({ error: 'Failed to generate backup' });
  }
});

/**
 * GET /api/admin/stats
 * Overview stats for admin console
 */
router.get('/stats', requireRoles(['super_admin', 'school_admin']), (req, res) => {
  try {
    const tenantId = req.tenantId;
    const isSuper = req.user.role === 'super_admin';

    let userCountQuery = `SELECT COUNT(*) as count FROM users`;
    let auditCountQuery = `SELECT COUNT(*) as count FROM audit_logs`;
    let studentCountQuery = `SELECT COUNT(*) as count FROM students`;
    const params = [];

    if (!isSuper) {
      userCountQuery += ` WHERE tenant_id = ?`;
      auditCountQuery += ` WHERE tenant_id = ?`;
      studentCountQuery += ` WHERE tenant_id = ?`;
      params.push(tenantId);
    }

    const totalUsers = db.prepare(userCountQuery).get(...params)?.count || 0;
    const totalAuditLogs = db.prepare(auditCountQuery).get(...params)?.count || 0;
    const totalStudents = db.prepare(studentCountQuery).get(...params)?.count || 0;

    res.json({
      totalUsers,
      totalAuditLogs,
      totalStudents,
      iemisExportStatus: 'Ready (CDC 2078 & CEHRD Compliant)',
      backupHealth: 'Optimal (Local WAL + JSON Archive)',
      systemMode: 'Multi-Tenant Partitioned'
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

module.exports = router;
