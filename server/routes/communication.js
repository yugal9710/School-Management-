/**
 * Communication & Notices Routes (Module 8)
 * Bilingual notices (Nepali / English), targeted roles, announcements
 */

const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');
const { getTodayBs } = require('../utils/nepaliCalendar');

// GET /api/communication/notices - List notices accessible to current user
router.get('/notices', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const userRole = req.user.role;

  const notices = db.prepare(`
    SELECT * FROM notices 
    WHERE tenant_id = ? AND is_active = 1
    ORDER BY created_at DESC
  `).all(tenantId);

  // Filter based on target roles
  const filtered = notices.filter(n => {
    try {
      const targets = JSON.parse(n.target_roles || '["all"]');
      return targets.includes('all') || targets.includes(userRole) || userRole === 'school_admin' || userRole === 'super_admin';
    } catch {
      return true;
    }
  });

  res.json(filtered);
});

// POST /api/communication/notices - Create bilingual notice
router.post('/notices', authenticateToken, requireRoles('school_admin', 'super_admin', 'teacher'), (req, res) => {
  const tenantId = req.tenantId;
  const { title, title_nepali, content, content_nepali, target_roles, priority, published_date_bs } = req.body;

  if (!title || !title_nepali || !content || !content_nepali) {
    return res.status(400).json({ error: 'Bilingual notice title and content are required' });
  }

  const noticeId = 'not-' + Date.now();
  const pubDate = published_date_bs || getTodayBs().formattedBs;

  db.prepare(`
    INSERT INTO notices (
      id, tenant_id, title, title_nepali, content, content_nepali,
      target_roles, priority, published_date_bs, is_active, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  `).run(
    noticeId, tenantId, title, title_nepali, content, content_nepali,
    JSON.stringify(target_roles || ['all']), priority || 'normal', pubDate, req.user.username
  );

  logAudit(req, 'PUBLISH_NOTICE', 'notice', noticeId, { title, priority });
  res.status(201).json({ message: 'Notice published successfully', id: noticeId });
});

module.exports = router;
