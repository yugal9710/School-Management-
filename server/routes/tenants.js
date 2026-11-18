/**
 * Multi-Tenant Management Routes
 * Platform Super Admin can manage all tenants;
 * School Admin can update their own school settings.
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');

// GET /api/tenants - List all tenants (super_admin or palika_officer)
router.get('/', authenticateToken, (req, res) => {
  if (req.user.role === 'super_admin') {
    const tenants = db.prepare('SELECT * FROM tenants ORDER BY created_at DESC').all();
    const result = tenants.map(t => {
      const studentCount = db.prepare('SELECT COUNT(*) as cnt FROM students WHERE tenant_id = ?').get(t.id).cnt;
      const staffCount = db.prepare('SELECT COUNT(*) as cnt FROM staff WHERE tenant_id = ?').get(t.id).cnt;
      return {
        ...t,
        modules_enabled: t.modules_enabled ? JSON.parse(t.modules_enabled) : [],
        studentCount,
        staffCount
      };
    });
    return res.json(result);
  }

  if (req.user.role === 'palika_officer') {
    const assigned = req.user.assigned_schools || [];
    if (assigned.length === 0) return res.json([]);
    const placeholders = assigned.map(() => '?').join(',');
    const tenants = db.prepare(`SELECT * FROM tenants WHERE id IN (${placeholders}) ORDER BY name ASC`).all(...assigned);
    const result = tenants.map(t => {
      const studentCount = db.prepare('SELECT COUNT(*) as cnt FROM students WHERE tenant_id = ?').get(t.id).cnt;
      const staffCount = db.prepare('SELECT COUNT(*) as cnt FROM staff WHERE tenant_id = ?').get(t.id).cnt;
      return {
        ...t,
        modules_enabled: t.modules_enabled ? JSON.parse(t.modules_enabled) : [],
        studentCount,
        staffCount
      };
    });
    return res.json(result);
  }

  // School admin can only view their own tenant
  const tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(req.user.tenant_id);
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
  tenant.modules_enabled = tenant.modules_enabled ? JSON.parse(tenant.modules_enabled) : [];
  res.json([tenant]);
});

// GET /api/tenants/:id - Get specific tenant profile
router.get('/:id', authenticateToken, (req, res) => {
  const tenantId = req.params.id;

  // Security check: regular school admin cannot view another tenant
  if (req.user.role !== 'super_admin') {
    if (req.user.role === 'palika_officer') {
      const assigned = req.user.assigned_schools || [];
      if (!assigned.includes(tenantId)) {
        return res.status(403).json({ error: 'Access denied to this school tenant' });
      }
    } else if (req.user.tenant_id !== tenantId) {
      return res.status(403).json({ error: 'Access denied: Cannot access another school profile' });
    }
  }

  const tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(tenantId);
  if (!tenant) return res.status(404).json({ error: 'School not found' });

  tenant.modules_enabled = tenant.modules_enabled ? JSON.parse(tenant.modules_enabled) : [];
  const studentCount = db.prepare('SELECT COUNT(*) as cnt FROM students WHERE tenant_id = ?').get(tenantId).cnt;
  const staffCount = db.prepare('SELECT COUNT(*) as cnt FROM staff WHERE tenant_id = ?').get(tenantId).cnt;
  const currentAy = db.prepare('SELECT * FROM academic_years WHERE tenant_id = ? AND is_current = 1').get(tenantId);

  res.json({
    ...tenant,
    studentCount,
    staffCount,
    currentAcademicYear: currentAy
  });
});

// POST /api/tenants - Create new tenant school (Platform Super Admin only)
router.post('/', authenticateToken, requireRoles('super_admin'), (req, res) => {
  const {
    code, name, nepali_name, category, education_type, affiliation_code,
    province, district, municipality, ward, tole, phone, email,
    established_year_bs, principal_name, date_format_pref, default_language,
    admin_username, admin_password
  } = req.body;

  if (!name || !nepali_name || !code || !province || !district || !municipality || !ward) {
    return res.status(400).json({ error: 'Missing required school information' });
  }

  const tenantId = 'tnt-' + code.toLowerCase().replace(/[^a-z0-9]/g, '-');

  try {
    const existing = db.prepare('SELECT id FROM tenants WHERE id = ? OR code = ?').get(tenantId, code);
    if (existing) {
      return res.status(400).json({ error: 'School with this ID or Code already exists' });
    }

    const defaultModules = ['admissions', 'academics', 'attendance', 'exams', 'fees', 'notices', 'library', 'transport', 'reports', 'iemis'];

    db.prepare(`
      INSERT INTO tenants (
        id, code, name, nepali_name, category, education_type, affiliation_code,
        province, district, municipality, ward, tole, phone, email, established_year_bs,
        principal_name, date_format_pref, default_language, modules_enabled
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      tenantId, code, name, nepali_name, category || 'community', education_type || 'secondary',
      affiliation_code || '', province, district, municipality, ward, tole || '',
      phone || '', email || '', established_year_bs || 2080, principal_name || '',
      date_format_pref || 'BS', default_language || 'ne', JSON.stringify(defaultModules)
    );

    // Create Initial School Admin user
    const adminUser = admin_username || `admin.${tenantId.substring(4, 12)}`;
    const adminPass = admin_password || 'admin123';
    const passHash = bcrypt.hashSync(adminPass, 10);
    const adminUserId = 'usr-' + tenantId + '-admin';

    db.prepare(`
      INSERT INTO users (id, tenant_id, username, password_hash, full_name, nepali_name, email, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'school_admin', 1)
    `).run(adminUserId, tenantId, adminUser, passHash, principal_name || `${name} Admin`, nepali_name, email || '');

    // Create default Academic Year 2081/2082 BS
    const ayId = `ay-2081-${tenantId}`;
    db.prepare(`
      INSERT INTO academic_years (id, tenant_id, name, year_bs, year_ad, start_date_bs, end_date_bs, is_current)
      VALUES (?, ?, '२०८१/२०८२ (2081/2082 BS)', 2081, 2024, '2081-01-01', '2081-12-30', 1)
    `).run(ayId, tenantId);

    // Create default Terms
    db.prepare(`INSERT INTO terms VALUES (?, ?, ?, 'First Terminal Exam', 'प्रथम त्रैमासिक परीक्षा', 1, 25.0, '2081-03-15', '2081-03-25', 0)`).run(`term1-${tenantId}`, tenantId, ayId);
    db.prepare(`INSERT INTO terms VALUES (?, ?, ?, 'Second Terminal Exam', 'दोस्रो त्रैमासिक परीक्षा', 2, 25.0, '2081-06-20', '2081-06-30', 1)`).run(`term2-${tenantId}`, tenantId, ayId);
    db.prepare(`INSERT INTO terms VALUES (?, ?, ?, 'Annual Examination', 'वार्षिक परीक्षा', 3, 50.0, '2081-11-20', '2081-12-05', 0)`).run(`term3-${tenantId}`, tenantId, ayId);

    logAudit(req, 'CREATE_TENANT', 'tenant', tenantId, { code, name, category });

    res.status(201).json({
      message: 'School tenant successfully registered',
      tenantId,
      adminUser,
      adminPassword: adminPass
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/tenants/:id - Update tenant profile & configuration
router.put('/:id', authenticateToken, requireRoles('super_admin', 'school_admin'), (req, res) => {
  const tenantId = req.params.id;

  // Enforce tenant isolation: school_admin cannot update another school
  if (req.user.role === 'school_admin' && req.user.tenant_id !== tenantId) {
    return res.status(403).json({ error: 'Permission denied: Cannot edit another school profile' });
  }

  const {
    name, nepali_name, category, education_type, affiliation_code,
    province, district, municipality, ward, tole, phone, email,
    established_year_bs, principal_name, date_format_pref, default_language,
    modules_enabled
  } = req.body;

  try {
    db.prepare(`
      UPDATE tenants SET
        name = COALESCE(?, name),
        nepali_name = COALESCE(?, nepali_name),
        category = COALESCE(?, category),
        education_type = COALESCE(?, education_type),
        affiliation_code = COALESCE(?, affiliation_code),
        province = COALESCE(?, province),
        district = COALESCE(?, district),
        municipality = COALESCE(?, municipality),
        ward = COALESCE(?, ward),
        tole = COALESCE(?, tole),
        phone = COALESCE(?, phone),
        email = COALESCE(?, email),
        established_year_bs = COALESCE(?, established_year_bs),
        principal_name = COALESCE(?, principal_name),
        date_format_pref = COALESCE(?, date_format_pref),
        default_language = COALESCE(?, default_language),
        modules_enabled = COALESCE(?, modules_enabled)
      WHERE id = ?
    `).run(
      name, nepali_name, category, education_type, affiliation_code,
      province, district, municipality, ward, tole, phone, email,
      established_year_bs, principal_name, date_format_pref, default_language,
      modules_enabled ? JSON.stringify(modules_enabled) : null,
      tenantId
    );

    logAudit(req, 'UPDATE_TENANT', 'tenant', tenantId, { updatedBy: req.user.username });

    const updated = db.prepare('SELECT * FROM tenants WHERE id = ?').get(tenantId);
    if (updated.modules_enabled) updated.modules_enabled = JSON.parse(updated.modules_enabled);

    res.json({ message: 'School settings updated successfully', tenant: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/tenants/:id/status - Suspend or Activate Tenant (Super Admin only)
router.patch('/:id/status', authenticateToken, requireRoles('super_admin'), (req, res) => {
  const tenantId = req.params.id;
  const { is_active } = req.body;

  db.prepare('UPDATE tenants SET is_active = ? WHERE id = ?').run(is_active ? 1 : 0, tenantId);
  logAudit(req, is_active ? 'ACTIVATE_TENANT' : 'SUSPEND_TENANT', 'tenant', tenantId, { is_active });

  res.json({ message: `School status updated to ${is_active ? 'Active' : 'Suspended'}` });
});

module.exports = router;
