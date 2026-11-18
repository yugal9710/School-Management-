/**
 * Multi-Tenant Authentication & Authorization Middleware
 * Enforces strict school-level data boundary and role-based permissions
 */

const jwt = require('jsonwebtoken');
const { db } = require('../db/database');

const JWT_SECRET = process.env.JWT_SECRET || 'nepal_school_mgmt_secret_key_2081';

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      nepali_name: user.nepali_name,
      role: user.role,
      tenant_id: user.tenant_id,
      assigned_schools: user.assigned_schools ? JSON.parse(user.assigned_schools) : []
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Verifies JWT token and resolves tenant context
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token required (प्रमाणीकरण टोकन आवश्यक)' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token (अवैध वा म्याद सकिएको टोकन)' });
    }

    req.user = decodedUser;

    // Determine active tenant for this request with safe optional property access
    const requestedTenantId = req.headers['x-tenant-id'] || (req.query && req.query.tenant_id) || (req.body && req.body.tenant_id);

    if (decodedUser.role === 'super_admin') {
      // Platform super_admin can inspect any tenant or system-wide
      req.tenantId = requestedTenantId || decodedUser.tenant_id;
    } else if (decodedUser.role === 'palika_officer') {
      // Municipality education officer can only inspect authorized assigned schools
      const assigned = decodedUser.assigned_schools || [];
      if (requestedTenantId) {
        if (!assigned.includes(requestedTenantId)) {
          return res.status(403).json({
            error: 'Access denied: You do not have oversight permission for this school (अनुमति छैन: यस विद्यालयको विवरण हेर्ने अधिकार छैन)'
          });
        }
        req.tenantId = requestedTenantId;
      } else {
        req.tenantId = assigned[0] || decodedUser.tenant_id;
      }
    } else {
      // Regular school staff / student / parent is strictly confined to their own tenant
      if (requestedTenantId && requestedTenantId !== decodedUser.tenant_id) {
        return res.status(403).json({
          error: 'Multi-Tenant Security Violation: Cannot access records of another school (सुरक्षा उल्लंघन: अर्को विद्यालयको तथ्याङ्क हेर्न मिल्दैन)'
        });
      }
      req.tenantId = decodedUser.tenant_id;
    }

    next();
  });
}

/**
 * Role-Based Access Control guard
 */
function requireRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (!allowedRoles.includes(req.user.role) && req.user.role !== 'super_admin') {
      return res.status(403).json({
        error: `Access denied for role: ${req.user.role} (पहुँच अस्वीकृत: आवश्यक भूमिका छैन)`
      });
    }
    next();
  };
}

/**
 * Audit Logger helper
 */
function logAudit(req, action, entityType, entityId, details = {}) {
  try {
    const logId = 'aud-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const userId = req.user ? req.user.id : 'anonymous';
    const username = req.user ? req.user.username : 'anonymous';
    const tenantId = req.tenantId || (req.user ? req.user.tenant_id : null);
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    db.prepare(`
      INSERT INTO audit_logs (id, tenant_id, user_id, username, action, entity_type, entity_id, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(logId, tenantId, userId, username, action, entityType, String(entityId || ''), JSON.stringify(details), ip);
  } catch (err) {
    console.error('Audit log error:', err.message);
  }
}

module.exports = {
  JWT_SECRET,
  signToken,
  authenticateToken,
  requireRoles,
  logAudit
};
