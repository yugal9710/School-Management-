/**
 * Fees & Finance Routes (Module 7)
 * NPR currency handling, receipts with in-words conversions, payment recording
 */

const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');
const { numberToWordsEn, numberToWordsNe, formatNprCurrency } = require('../utils/nepaliNumberToWords');
const { getTodayBs, bsToAd } = require('../utils/nepaliCalendar');

// GET /api/finance/categories - Fee categories & structure
router.get('/categories', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const categories = db.prepare('SELECT * FROM fee_categories WHERE tenant_id = ? ORDER BY default_amount DESC').all(tenantId);
  res.json(categories);
});

// POST /api/finance/categories - Create fee category
router.post('/categories', authenticateToken, requireRoles('accountant', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { name, nepali_name, code, default_amount, frequency } = req.body;

  if (!name || !code || default_amount === undefined) {
    return res.status(400).json({ error: 'Name, code, and default amount are required' });
  }

  const catId = 'fee-' + Date.now();
  db.prepare(`
    INSERT INTO fee_categories (id, tenant_id, name, nepali_name, code, default_amount, frequency)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(catId, tenantId, name, nepali_name || name, code, Number(default_amount), frequency || 'monthly');

  logAudit(req, 'CREATE_FEE_CATEGORY', 'fee_category', catId, { name, default_amount });
  res.status(201).json({ message: 'Fee category created', id: catId });
});

// GET /api/finance/dues - List dues with student info
router.get('/dues', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const { student_id, class_id, status } = req.query;

  let query = `
    SELECT 
      d.*, fc.name as fee_name, fc.nepali_name as fee_nepali_name, fc.code as fee_code,
      s.first_name, s.last_name, s.full_name_nepali, s.admission_number, s.roll_number,
      c.name as class_name, c.nepali_name as class_nepali_name, sec.name as section_name
    FROM student_fee_dues d
    JOIN fee_categories fc ON d.fee_category_id = fc.id
    JOIN students s ON d.student_id = s.id
    JOIN classes c ON s.current_class_id = c.id
    JOIN sections sec ON s.current_section_id = sec.id
    WHERE d.tenant_id = ?
  `;
  const params = [tenantId];

  if (student_id) {
    query += ' AND d.student_id = ?';
    params.push(student_id);
  }
  if (class_id) {
    query += ' AND s.current_class_id = ?';
    params.push(class_id);
  }
  if (status) {
    query += ' AND d.status = ?';
    params.push(status);
  }

  query += ' ORDER BY d.created_at DESC';
  const dues = db.prepare(query).all(...params);
  res.json(dues);
});

// POST /api/finance/payments - Record fee payment & generate receipt
router.post('/payments', authenticateToken, requireRoles('accountant', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { student_id, items, payment_mode, remarks, payment_date_bs } = req.body;

  if (!student_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Student ID and payment items required' });
  }

  const student = db.prepare('SELECT * FROM students WHERE id = ? AND tenant_id = ?').get(student_id, tenantId);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const currentAy = db.prepare('SELECT id, year_bs FROM academic_years WHERE tenant_id = ? AND is_current = 1').get(tenantId);
  const ayId = currentAy ? currentAy.id : 'ay-default';
  const yearBs = currentAy ? currentAy.year_bs : 2081;

  // Generate Receipt Number e.g. REC-2081-0042
  const countToday = db.prepare('SELECT COUNT(*) as cnt FROM fee_payments WHERE tenant_id = ?').get(tenantId).cnt + 1;
  const receiptNumber = `REC-${yearBs}-${String(countToday).padStart(4, '0')}`;

  const payDateBs = payment_date_bs || getTodayBs().formattedBs;
  const parts = payDateBs.split('-');
  const payDateAd = bsToAd(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)).formattedAd;

  let totalAmount = 0;
  for (const item of items) {
    totalAmount += (Number(item.amount_paid) || 0);
  }

  if (totalAmount <= 0) {
    return res.status(400).json({ error: 'Total payment amount must be greater than zero' });
  }

  const paymentId = 'pay-' + Date.now();
  db.prepare(`
    INSERT INTO fee_payments (
      id, tenant_id, receipt_number, student_id, academic_year_id,
      payment_date_bs, payment_date_ad, total_amount, payment_mode, received_by, remarks
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    paymentId, tenantId, receiptNumber, student_id, ayId,
    payDateBs, payDateAd, totalAmount, payment_mode || 'cash',
    req.user.username, remarks || ''
  );

  // Insert payment line items & update dues
  const insertItem = db.prepare(`
    INSERT INTO fee_payment_items (id, payment_id, fee_due_id, fee_category_name, amount_paid, discount_applied)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const item of items) {
    const fpiId = 'fpi-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    const amt = Number(item.amount_paid) || 0;
    const disc = Number(item.discount_applied) || 0;
    insertItem.run(fpiId, paymentId, item.fee_due_id || null, item.fee_category_name || 'School Fee', amt, disc);

    // If linked to a due, update its paid_amount and status
    if (item.fee_due_id) {
      const due = db.prepare('SELECT * FROM student_fee_dues WHERE id = ?').get(item.fee_due_id);
      if (due) {
        const newPaid = due.paid_amount + amt;
        const netPayable = due.amount - due.discount_amount - disc;
        const newStatus = newPaid >= netPayable ? 'paid' : 'partial';
        db.prepare('UPDATE student_fee_dues SET paid_amount = ?, discount_amount = discount_amount + ?, status = ? WHERE id = ?').run(newPaid, disc, newStatus, due.id);
      }
    }
  }

  logAudit(req, 'RECORD_FEE_PAYMENT', 'fee_payment', paymentId, {
    receiptNumber,
    studentName: `${student.first_name} ${student.last_name}`,
    totalAmount,
    paymentMode: payment_mode
  });

  res.status(201).json({
    message: 'Payment recorded successfully (रकम सफलतापूर्वक दाखिला भयो)',
    paymentId,
    receiptNumber,
    totalAmount
  });
});

// GET /api/finance/receipts/:id - Printable NPR Receipt / रसिद
router.get('/receipts/:id', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const paymentId = req.params.id;

  const payment = db.prepare(`
    SELECT p.*, s.admission_number, s.roll_number, s.first_name, s.last_name, s.full_name_nepali,
           c.name as class_name, c.nepali_name as class_nepali_name, sec.name as section_name,
           s.guardian_name, s.guardian_phone
    FROM fee_payments p
    JOIN students s ON p.student_id = s.id
    JOIN classes c ON s.current_class_id = c.id
    JOIN sections sec ON s.current_section_id = sec.id
    WHERE p.id = ? AND p.tenant_id = ?
  `).get(paymentId, tenantId);

  if (!payment) return res.status(404).json({ error: 'Receipt not found' });

  const tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(tenantId);
  const items = db.prepare('SELECT * FROM fee_payment_items WHERE payment_id = ?').all(paymentId);

  // In-words conversion
  const wordsEn = numberToWordsEn(payment.total_amount);
  const wordsNe = numberToWordsNe(payment.total_amount);

  res.json({
    school: {
      name: tenant.name,
      nepaliName: tenant.nepali_name,
      affiliationCode: tenant.affiliation_code || '270010001',
      address: `${tenant.municipality}, ${tenant.ward}, ${tenant.district}, ${tenant.province}`,
      phone: tenant.phone,
      panNo: tenant.pan_no || 'PAN: 601234567'
    },
    receipt: {
      id: payment.id,
      receiptNumber: payment.receipt_number,
      paymentDateBs: payment.payment_date_bs,
      paymentDateAd: payment.payment_date_ad,
      paymentMode: payment.payment_mode,
      totalAmount: payment.total_amount,
      formattedNpr: formatNprCurrency(payment.total_amount, 'ne'),
      amountInWordsEn: wordsEn,
      amountInWordsNe: wordsNe,
      receivedBy: payment.received_by,
      remarks: payment.remarks
    },
    student: {
      admissionNo: payment.admission_number,
      rollNo: payment.roll_number,
      name: `${payment.first_name} ${payment.last_name}`,
      nepaliName: payment.full_name_nepali,
      className: payment.class_name,
      classNepaliName: payment.class_nepali_name,
      sectionName: payment.section_name,
      guardianName: payment.guardian_name,
      guardianPhone: payment.guardian_phone
    },
    items
  });
});

// GET /api/finance/summary - Financial totals & overview
router.get('/summary', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;

  const totalCollected = db.prepare('SELECT SUM(total_amount) as total FROM fee_payments WHERE tenant_id = ? AND cancelled = 0').get(tenantId).total || 0;
  const totalBilled = db.prepare('SELECT SUM(amount) as total FROM student_fee_dues WHERE tenant_id = ?').get(tenantId).total || 0;
  const totalDiscounts = db.prepare('SELECT SUM(discount_amount) as total FROM student_fee_dues WHERE tenant_id = ?').get(tenantId).total || 0;
  const totalPaid = db.prepare('SELECT SUM(paid_amount) as total FROM student_fee_dues WHERE tenant_id = ?').get(tenantId).total || 0;
  const outstanding = Math.max(0, totalBilled - totalDiscounts - totalPaid);

  const recentPayments = db.prepare(`
    SELECT p.*, s.first_name, s.last_name, s.full_name_nepali, s.admission_number
    FROM fee_payments p
    JOIN students s ON p.student_id = s.id
    WHERE p.tenant_id = ?
    ORDER BY p.created_at DESC
    LIMIT 10
  `).all(tenantId);

  res.json({
    totalCollected,
    totalBilled,
    totalDiscounts,
    outstandingBalance: outstanding,
    recentPayments
  });
});

module.exports = router;
