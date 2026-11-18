/**
 * Developer Console Backend Routes
 * Provides live SQL queries, schema inspector, system diagnostics,
 * multi-tenant state inspection, and telemetry for developers and administrators.
 */

const express = require('express');
const router = express.Router();
const fs = require('node:fs');
const path = require('node:path');
const { db, sqliteEngineName } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');

// Allow developer console access for authenticated users (or super_admin / school_admin)
router.use(authenticateToken);

// POST /api/dev/sql - Interactive SQL Query Runner
router.post('/sql', (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'SQL query string required' });
  }

  const trimmed = query.trim();
  const startTime = process.hrtime();

  try {
    const isSelect = /^SELECT\b/i.test(trimmed) || /^PRAGMA\b/i.test(trimmed) || /^EXPLAIN\b/i.test(trimmed);

    if (isSelect) {
      const rows = db.prepare(trimmed).all();
      const diff = process.hrtime(startTime);
      const executionTimeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);

      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      logAudit(req, 'DEV_SQL_SELECT', 'dev_console', null, { query: trimmed });

      return res.json({
        type: 'SELECT',
        columns,
        rows,
        rowCount: rows.length,
        executionTimeMs
      });
    } else {
      const info = db.prepare(trimmed).run();
      const diff = process.hrtime(startTime);
      const executionTimeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);

      logAudit(req, 'DEV_SQL_MUTATION', 'dev_console', null, { query: trimmed, changes: info.changes });

      return res.json({
        type: 'MUTATION',
        changes: info.changes,
        lastInsertRowid: info.lastInsertRowid,
        executionTimeMs
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      code: err.code || 'SQLITE_ERROR'
    });
  }
});

// GET /api/dev/tables - SQLite Tables & Schema Inspector
router.get('/tables', (req, res) => {
  try {
    const masterTables = db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name ASC
    `).all();

    const result = masterTables.map(t => {
      const columns = db.prepare(`PRAGMA table_info(${t.name})`).all();
      let rowCount = 0;
      try {
        rowCount = db.prepare(`SELECT COUNT(*) as cnt FROM "${t.name}"`).get().cnt;
      } catch {}

      return {
        name: t.name,
        rowCount,
        columns: columns.map(c => ({
          cid: c.cid,
          name: c.name,
          type: c.type,
          notnull: c.notnull === 1,
          dflt_value: c.dflt_value,
          pk: c.pk === 1
        }))
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dev/stats - Realtime System Metrics & Diagnostics
router.get('/stats', (req, res) => {
  try {
    const mem = process.memoryUsage();
    const dbPath = path.resolve(__dirname, '../../data/school_management.db');
    let dbSizeKb = 0;
    if (fs.existsSync(dbPath)) {
      dbSizeKb = Math.round(fs.statSync(dbPath).size / 1024);
    }

    const tenantCount = db.prepare('SELECT COUNT(*) as cnt FROM tenants').get().cnt;
    const userCount = db.prepare('SELECT COUNT(*) as cnt FROM users').get().cnt;
    const studentCount = db.prepare('SELECT COUNT(*) as cnt FROM students').get().cnt;
    const staffCount = db.prepare('SELECT COUNT(*) as cnt FROM staff').get().cnt;
    const examMarksCount = db.prepare('SELECT COUNT(*) as cnt FROM exam_marks').get().cnt;
    const dentalCount = db.prepare('SELECT COUNT(*) as cnt FROM dental_records').get().cnt;
    const auditCount = db.prepare('SELECT COUNT(*) as cnt FROM audit_logs').get().cnt;

    res.json({
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        architecture: process.arch,
        pid: process.pid,
        uptimeSeconds: Math.floor(process.uptime()),
        memory: {
          rssMb: (mem.rss / (1024 * 1024)).toFixed(2),
          heapUsedMb: (mem.heapUsed / (1024 * 1024)).toFixed(2),
          heapTotalMb: (mem.heapTotal / (1024 * 1024)).toFixed(2)
        }
      },
      database: {
        engine: `Node.js ${process.version} - ${sqliteEngineName || 'SQLite Engine'}`,
        fileSizeKb: dbSizeKb,
        journalMode: 'WAL',
        foreignKeys: 'ON'
      },
      counts: {
        tenants: tenantCount,
        users: userCount,
        students: studentCount,
        staff: staffCount,
        examMarks: examMarksCount,
        dentalRecords: dentalCount,
        auditLogs: auditCount
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
