/**
 * Library & Transport Routes (Module 9)
 */

const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { authenticateToken, requireRoles, logAudit } = require('../middleware/auth');
const { getTodayBs } = require('../utils/nepaliCalendar');

// ---------------- LIBRARY ----------------
// GET /api/library/books
router.get('/books', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const { search, category } = req.query;

  let query = 'SELECT * FROM books WHERE tenant_id = ?';
  const params = [tenantId];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (search) {
    query += ' AND (title LIKE ? OR title_nepali LIKE ? OR author LIKE ? OR isbn_acc_no LIKE ?)';
    const sTerm = `%${search}%`;
    params.push(sTerm, sTerm, sTerm, sTerm);
  }

  query += ' ORDER BY title ASC';
  const books = db.prepare(query).all(...params);
  res.json(books);
});

// POST /api/library/books - Add book
router.post('/books', authenticateToken, requireRoles('librarian', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { title, title_nepali, author, isbn_acc_no, publisher, category, total_copies, rack_location } = req.body;

  if (!title || !author || !isbn_acc_no) {
    return res.status(400).json({ error: 'Title, author, and accession number required' });
  }

  const bookId = 'bk-' + Date.now();
  const copies = Number(total_copies) || 1;

  db.prepare(`
    INSERT INTO books (id, tenant_id, title, title_nepali, author, isbn_acc_no, publisher, category, total_copies, available_copies, rack_location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(bookId, tenantId, title, title_nepali || title, author, isbn_acc_no, publisher || '', category || 'General', copies, copies, rack_location || '');

  logAudit(req, 'ADD_BOOK', 'book', bookId, { title, isbn_acc_no });
  res.status(201).json({ message: 'Book added to catalog', id: bookId });
});

// GET /api/library/loans - Active and past loans
router.get('/loans', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const loans = db.prepare(`
    SELECT l.*, b.title as book_title, b.isbn_acc_no
    FROM book_loans l
    JOIN books b ON l.book_id = b.id
    WHERE l.tenant_id = ?
    ORDER BY l.issue_date_bs DESC
  `).all(tenantId);
  res.json(loans);
});

// POST /api/library/issue - Issue book to student/staff
router.post('/issue', authenticateToken, requireRoles('librarian', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { book_id, borrower_type, borrower_id, borrower_name, due_date_bs } = req.body;

  const book = db.prepare('SELECT * FROM books WHERE id = ? AND tenant_id = ?').get(book_id, tenantId);
  if (!book || book.available_copies <= 0) {
    return res.status(400).json({ error: 'Book is currently not available for issue' });
  }

  const loanId = 'loan-' + Date.now();
  const issueDateBs = getTodayBs().formattedBs;

  db.prepare(`
    INSERT INTO book_loans (id, tenant_id, book_id, borrower_type, borrower_id, borrower_name, issue_date_bs, due_date_bs, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'issued')
  `).run(loanId, tenantId, book_id, borrower_type || 'student', borrower_id, borrower_name || 'Borrower', issueDateBs, due_date_bs || '2081-07-15');

  db.prepare('UPDATE books SET available_copies = available_copies - 1 WHERE id = ?').run(book_id);

  logAudit(req, 'ISSUE_BOOK', 'book_loan', loanId, { bookTitle: book.title, borrower: borrower_name });
  res.status(201).json({ message: 'Book issued successfully', loanId });
});

// POST /api/library/return - Return book
router.post('/return', authenticateToken, requireRoles('librarian', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { loan_id, fine_amount } = req.body;

  const loan = db.prepare('SELECT * FROM book_loans WHERE id = ? AND tenant_id = ?').get(loan_id, tenantId);
  if (!loan) return res.status(404).json({ error: 'Loan record not found' });

  const returnDateBs = getTodayBs().formattedBs;
  db.prepare(`
    UPDATE book_loans SET
      return_date_bs = ?,
      fine_amount = ?,
      status = 'returned'
    WHERE id = ?
  `).run(returnDateBs, Number(fine_amount) || 0, loan_id);

  db.prepare('UPDATE books SET available_copies = available_copies + 1 WHERE id = ?').run(loan.book_id);

  res.json({ message: 'Book returned successfully' });
});

// ---------------- TRANSPORT ----------------
// GET /api/transport/routes
router.get('/routes', authenticateToken, (req, res) => {
  const tenantId = req.tenantId;
  const routes = db.prepare(`
    SELECT r.*, COUNT(a.id) as assignedStudentsCount
    FROM transport_routes r
    LEFT JOIN transport_assignments a ON r.id = a.route_id
    WHERE r.tenant_id = ?
    GROUP BY r.id
  `).all(tenantId);
  res.json(routes);
});

// POST /api/transport/routes - Add transport route
router.post('/routes', authenticateToken, requireRoles('transport_manager', 'school_admin', 'super_admin'), (req, res) => {
  const tenantId = req.tenantId;
  const { route_name, route_name_nepali, vehicle_number, driver_name, driver_phone, monthly_fare, capacity } = req.body;

  if (!route_name || !vehicle_number || !driver_name) {
    return res.status(400).json({ error: 'Route name, vehicle number, and driver name are required' });
  }

  const routeId = 'rt-' + Date.now();
  db.prepare(`
    INSERT INTO transport_routes (id, tenant_id, route_name, route_name_nepali, vehicle_number, driver_name, driver_phone, monthly_fare, capacity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(routeId, tenantId, route_name, route_name_nepali || route_name, vehicle_number, driver_name, driver_phone || '', Number(monthly_fare) || 1500, Number(capacity) || 30);

  logAudit(req, 'CREATE_TRANSPORT_ROUTE', 'transport_route', routeId, { route_name, vehicle_number });
  res.status(201).json({ message: 'Transport route created', id: routeId });
});

module.exports = router;
