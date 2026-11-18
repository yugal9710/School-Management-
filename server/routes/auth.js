/**
 * Authentication & Session Routes
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../db/database');
const { signToken, authenticateToken, logAudit } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required (प्रयोगकर्ता नाम र पासवर्ड आवश्यक छ)' });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password (गलत प्रयोगकर्ता नाम वा पासवर्ड)' });
  }

  if (!user.is_active) {
    return res.status(403).json({ error: 'Account has been deactivated (खाता निष्क्रिय गरिएको छ)' });
  }

  const isValid = bcrypt.compareSync(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid username or password (गलत प्रयोगकर्ता नाम वा पासवर्ड)' });
  }

  let tenant = null;
  if (user.tenant_id) {
    tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(user.tenant_id);
    if (tenant && !tenant.is_active && user.role !== 'super_admin') {
      return res.status(403).json({
        error: 'This school subscription has been suspended. Please contact the platform administrator.'
      });
    }
  }

  const token = signToken(user);

  // Parse assigned schools for palika_officer
  let assignedSchoolsList = [];
  if (user.role === 'palika_officer' && user.assigned_schools) {
    const ids = JSON.parse(user.assigned_schools);
    if (ids.length > 0) {
      const placeholders = ids.map(() => '?').join(',');
      assignedSchoolsList = db.prepare(`SELECT id, name, nepali_name, category, municipality, ward FROM tenants WHERE id IN (${placeholders})`).all(...ids);
    }
  }

  logAudit({ user, tenantId: user.tenant_id, headers: req.headers, socket: req.socket }, 'LOGIN', 'user', user.id, {
    role: user.role,
    tenant: tenant ? tenant.name : 'System Platform'
  });

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      nepali_name: user.nepali_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      tenant_id: user.tenant_id
    },
    tenant: tenant ? {
      id: tenant.id,
      name: tenant.name,
      nepali_name: tenant.nepali_name,
      category: tenant.category,
      education_type: tenant.education_type,
      affiliation_code: tenant.affiliation_code,
      province: tenant.province,
      district: tenant.district,
      municipality: tenant.municipality,
      ward: tenant.ward,
      tole: tenant.tole,
      phone: tenant.phone,
      email: tenant.email,
      principal_name: tenant.principal_name,
      date_format_pref: tenant.date_format_pref,
      default_language: tenant.default_language,
      currency: tenant.currency,
      modules_enabled: tenant.modules_enabled ? JSON.parse(tenant.modules_enabled) : []
    } : null,
    assignedSchools: assignedSchoolsList
  });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  const user = db.prepare('SELECT id, username, full_name, nepali_name, email, phone, role, tenant_id, assigned_schools FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  let tenant = null;
  const activeTenantId = req.tenantId || user.tenant_id;
  if (activeTenantId) {
    tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(activeTenantId);
    if (tenant && tenant.modules_enabled) {
      tenant.modules_enabled = JSON.parse(tenant.modules_enabled);
    }
  }

  let assignedSchools = [];
  if (user.role === 'palika_officer' && user.assigned_schools) {
    const ids = JSON.parse(user.assigned_schools);
    if (ids.length > 0) {
      const placeholders = ids.map(() => '?').join(',');
      assignedSchools = db.prepare(`SELECT id, name, nepali_name, category, municipality, ward FROM tenants WHERE id IN (${placeholders})`).all(...ids);
    }
  }

  res.json({
    user,
    tenant,
    assignedSchools
  });
});

module.exports = router;
