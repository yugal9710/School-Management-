/**
 * Server Entrypoint - Hamro Vidhyalaya / Shikshya Sagar SMS
 * Multi-Tenant School Management Platform for Nepal
 */

const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');
require('dotenv').config();

// Initialize DB schema & seed
require('./db/database');

const authRoutes = require('./routes/auth');
const tenantRoutes = require('./routes/tenants');
const studentRoutes = require('./routes/students');
const staffRoutes = require('./routes/staff');
const academicsRoutes = require('./routes/academics');
const attendanceRoutes = require('./routes/attendance');
const examRoutes = require('./routes/exams');
const financeRoutes = require('./routes/finance');
const communicationRoutes = require('./routes/communication');
const libraryTransportRoutes = require('./routes/libraryTransport');
const reportRoutes = require('./routes/reports');
const dentalRoutes = require('./routes/dental');
const devRoutes = require('./routes/dev');
const adminRoutes = require('./routes/admin');
const nepaliCalendar = require('./utils/nepaliCalendar');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Nepal Calendar Utility API
app.get('/api/nepali-calendar/today', (req, res) => {
  res.json(nepaliCalendar.getTodayBs());
});

app.get('/api/nepali-calendar/convert', (req, res) => {
  const { ad, bs } = req.query;
  if (ad) {
    return res.json(nepaliCalendar.adToBs(ad));
  }
  if (bs) {
    const parts = bs.split('-');
    if (parts.length === 3) {
      return res.json(nepaliCalendar.bsToAd(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)));
    }
  }
  res.status(400).json({ error: 'Provide ad (YYYY-MM-DD) or bs (YYYY-MM-DD)' });
});

// Mount modular API routes
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/academics', academicsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/library', libraryTransportRoutes);
app.use('/api/transport', libraryTransportRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dental', dentalRoutes);
app.use('/api/dev', devRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Nepal Multi-Tenant School Management System',
    nepaliTime: nepaliCalendar.getTodayBs(),
    version: '1.0.0'
  });
});

// Serve frontend client dist if exists (using middleware to be 100% compatible with Express 5)
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(clientDist, 'index.html'));
    }
    next();
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Process safety handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const server = app.listen(PORT, () => {
  console.log(`Nepal School Management System Server listening on port ${PORT}`);
  console.log(`Current Date: ${nepaliCalendar.getTodayBs().displayStringNe} (${nepaliCalendar.getTodayBs().formattedBs} BS)`);
});

server.on('error', (err) => {
  console.error('Server listen error:', err);
});
