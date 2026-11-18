/**
 * SQLite Database Connection and Schema initialization
 * Universal SQLite Support: Node native node:sqlite or better-sqlite3
 * Multi-tenant architecture with row-level tenant_id isolation
 */

let Database;
let sqliteEngineName = 'node:sqlite';

try {
  const sqlite = require('node:sqlite');
  if (sqlite && sqlite.DatabaseSync) {
    Database = sqlite.DatabaseSync;
    sqliteEngineName = 'node:sqlite (DatabaseSync)';
  } else {
    throw new Error('DatabaseSync not found on node:sqlite');
  }
} catch (err) {
  try {
    Database = require('better-sqlite3');
    sqliteEngineName = 'better-sqlite3';
  } catch (err2) {
    console.error('Fatal: Could not load node:sqlite or better-sqlite3:', err, err2);
    throw err;
  }
}

const path = require('node:path');
const fs = require('node:fs');
const bcrypt = require('bcryptjs');

const dbDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'school_management.db');
const db = new Database(dbPath);

console.log(`[Database] Initialized SQLite database engine: ${sqliteEngineName}`);

// Enable WAL mode and foreign keys for high performance and integrity
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

function initSchema() {
  db.exec(`
    -- Tenants (Schools)
    CREATE TABLE IF NOT EXISTS tenants (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      nepali_name TEXT NOT NULL,
      category TEXT NOT NULL CHECK(category IN ('community', 'institutional')),
      education_type TEXT NOT NULL CHECK(education_type IN ('basic', 'secondary', 'integrated', 'technical', 'religious')),
      affiliation_code TEXT, -- Government EMIS Code (e.g. 270010001)
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      municipality TEXT NOT NULL,
      ward TEXT NOT NULL,
      tole TEXT,
      phone TEXT,
      email TEXT,
      established_year_bs INTEGER,
      principal_name TEXT,
      date_format_pref TEXT DEFAULT 'BS' CHECK(date_format_pref IN ('BS', 'AD', 'BOTH')),
      default_language TEXT DEFAULT 'ne' CHECK(default_language IN ('ne', 'en')),
      currency TEXT DEFAULT 'NPR',
      logo_url TEXT,
      is_active INTEGER DEFAULT 1,
      modules_enabled TEXT, -- JSON array of enabled module keys
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Users
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      tenant_id TEXT, -- Nullable for platform super_admin, or assigned tenant
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      nepali_name TEXT,
      email TEXT,
      phone TEXT,
      role TEXT NOT NULL CHECK(role IN ('super_admin', 'school_admin', 'teacher', 'student', 'parent', 'accountant', 'librarian', 'transport_manager', 'palika_officer')),
      assigned_schools TEXT, -- JSON array of tenant_ids for palika_officer oversight
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Academic Years
    CREATE TABLE IF NOT EXISTS academic_years (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      name TEXT NOT NULL,
      year_bs INTEGER NOT NULL,
      year_ad INTEGER NOT NULL,
      start_date_bs TEXT NOT NULL,
      end_date_bs TEXT NOT NULL,
      is_current INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Academic Terms / Exam Periods
    CREATE TABLE IF NOT EXISTS terms (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      academic_year_id TEXT NOT NULL,
      name TEXT NOT NULL,
      nepali_name TEXT NOT NULL,
      term_order INTEGER NOT NULL,
      weightage_percent REAL DEFAULT 25.0,
      start_date_bs TEXT,
      end_date_bs TEXT,
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
    );

    -- Classes (Grades)
    CREATE TABLE IF NOT EXISTS classes (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      name TEXT NOT NULL, -- e.g. Grade 10
      nepali_name TEXT NOT NULL, -- e.g. कक्षा १०
      grade_level INTEGER NOT NULL, -- 0 for ECD, 1-12
      stream TEXT DEFAULT 'General', -- General, Science, Management, Education, Technical
      display_order INTEGER NOT NULL,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Sections
    CREATE TABLE IF NOT EXISTS sections (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      class_id TEXT NOT NULL,
      name TEXT NOT NULL, -- Section A, Section B
      room_number TEXT,
      class_teacher_id TEXT,
      capacity INTEGER DEFAULT 40,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
    );

    -- Subjects
    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      class_id TEXT NOT NULL,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      nepali_name TEXT NOT NULL,
      credit_hours REAL DEFAULT 4.0,
      full_marks REAL DEFAULT 100.0,
      pass_marks REAL DEFAULT 35.0,
      theory_full_marks REAL DEFAULT 75.0,
      theory_pass_marks REAL DEFAULT 26.25,
      practical_full_marks REAL DEFAULT 25.0,
      practical_pass_marks REAL DEFAULT 10.0,
      is_optional INTEGER DEFAULT 0,
      subject_type TEXT DEFAULT 'compulsory' CHECK(subject_type IN ('compulsory', 'optional', 'technical', 'local')),
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
    );

    -- Students
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      user_id TEXT,
      admission_number TEXT NOT NULL,
      roll_number INTEGER,
      current_class_id TEXT NOT NULL,
      current_section_id TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      full_name_nepali TEXT NOT NULL,
      gender TEXT NOT NULL CHECK(gender IN ('male', 'female', 'other')),
      dob_bs TEXT NOT NULL, -- YYYY-MM-DD in BS
      dob_ad TEXT,
      blood_group TEXT,
      caste_ethnicity TEXT NOT NULL CHECK(caste_ethnicity IN ('Dalit', 'Janajati', 'Madhesi', 'Muslim', 'Brahmin_Chhetri', 'Tharu', 'Other')),
      religion TEXT DEFAULT 'Hindu',
      mother_tongue TEXT DEFAULT 'Nepali',
      disability_status TEXT DEFAULT 'none' CHECK(disability_status IN ('none', 'physical', 'visual', 'hearing', 'intellectual', 'multiple')),
      inclusion_support_notes TEXT, -- Sensitive support details
      previous_school TEXT,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      municipality TEXT NOT NULL,
      ward TEXT NOT NULL,
      tole TEXT,
      father_name TEXT,
      father_phone TEXT,
      mother_name TEXT,
      mother_phone TEXT,
      guardian_name TEXT,
      guardian_phone TEXT,
      emergency_contact TEXT,
      photo_url TEXT,
      status TEXT DEFAULT 'enrolled' CHECK(status IN ('enrolled', 'transferred', 'graduated', 'dropped_out')),
      enrollment_date_bs TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (current_class_id) REFERENCES classes(id) ON DELETE RESTRICT,
      FOREIGN KEY (current_section_id) REFERENCES sections(id) ON DELETE RESTRICT
    );

    -- Staff / Teachers
    CREATE TABLE IF NOT EXISTS staff (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      user_id TEXT,
      employee_id TEXT NOT NULL,
      full_name TEXT NOT NULL,
      nepali_name TEXT,
      gender TEXT CHECK(gender IN ('male', 'female', 'other')),
      designation TEXT NOT NULL, -- Principal, Senior Teacher, Secondary Teacher, Accountant, etc.
      department TEXT,
      qualification TEXT,
      citizenship_no TEXT,
      pan_no TEXT,
      joined_date_bs TEXT NOT NULL,
      employment_type TEXT DEFAULT 'permanent' CHECK(employment_type IN ('permanent', 'temporary', 'relief_quota', 'contract')),
      phone TEXT,
      email TEXT,
      province TEXT,
      district TEXT,
      municipality TEXT,
      ward TEXT,
      tole TEXT,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'on_leave', 'resigned', 'retired')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Timetable / Schedule
    CREATE TABLE IF NOT EXISTS timetables (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      class_id TEXT NOT NULL,
      section_id TEXT NOT NULL,
      subject_id TEXT NOT NULL,
      teacher_id TEXT,
      day_of_week TEXT NOT NULL CHECK(day_of_week IN ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')),
      period_number INTEGER NOT NULL,
      start_time TEXT NOT NULL, -- e.g. 10:00 AM
      end_time TEXT NOT NULL,   -- e.g. 10:45 AM
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
      FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );

    -- Attendance
    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      date_bs TEXT NOT NULL,
      date_ad TEXT NOT NULL,
      student_id TEXT NOT NULL,
      class_id TEXT NOT NULL,
      section_id TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('present', 'absent', 'late', 'excused')),
      remark TEXT,
      recorded_by TEXT,
      guardian_notified INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      UNIQUE(tenant_id, date_bs, student_id)
    );

    -- Examinations
    CREATE TABLE IF NOT EXISTS exams (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      academic_year_id TEXT NOT NULL,
      term_id TEXT NOT NULL,
      name TEXT NOT NULL,
      nepali_name TEXT NOT NULL,
      start_date_bs TEXT NOT NULL,
      end_date_bs TEXT NOT NULL,
      review_status TEXT DEFAULT 'draft' CHECK(review_status IN ('draft', 'under_review', 'approved', 'published')),
      is_published INTEGER DEFAULT 0,
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
      FOREIGN KEY (term_id) REFERENCES terms(id) ON DELETE CASCADE
    );

    -- Exam Marks (Theory & Practical Component Breakdown)
    CREATE TABLE IF NOT EXISTS exam_marks (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      exam_id TEXT NOT NULL,
      student_id TEXT NOT NULL,
      subject_id TEXT NOT NULL,
      theory_marks REAL,
      practical_marks REAL,
      total_marks REAL,
      percentage REAL,
      grade TEXT,
      grade_point REAL,
      is_absent INTEGER DEFAULT 0,
      remarks TEXT,
      entered_by TEXT,
      reviewed_by TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
      UNIQUE(tenant_id, exam_id, student_id, subject_id)
    );

    -- Fee Categories
    CREATE TABLE IF NOT EXISTS fee_categories (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      name TEXT NOT NULL,
      nepali_name TEXT NOT NULL,
      code TEXT NOT NULL,
      default_amount REAL NOT NULL,
      frequency TEXT DEFAULT 'monthly' CHECK(frequency IN ('one_time', 'monthly', 'term', 'annual')),
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Student Fee Dues
    CREATE TABLE IF NOT EXISTS student_fee_dues (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      student_id TEXT NOT NULL,
      fee_category_id TEXT NOT NULL,
      academic_year_id TEXT NOT NULL,
      month_bs TEXT, -- e.g. Baishakh, Jestha or term
      amount REAL NOT NULL,
      discount_amount REAL DEFAULT 0.0,
      paid_amount REAL DEFAULT 0.0,
      due_date_bs TEXT,
      status TEXT DEFAULT 'unpaid' CHECK(status IN ('unpaid', 'partial', 'paid')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      FOREIGN KEY (fee_category_id) REFERENCES fee_categories(id) ON DELETE RESTRICT
    );

    -- Fee Payments & NPR Receipts
    CREATE TABLE IF NOT EXISTS fee_payments (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      receipt_number TEXT NOT NULL,
      student_id TEXT NOT NULL,
      academic_year_id TEXT NOT NULL,
      payment_date_bs TEXT NOT NULL,
      payment_date_ad TEXT NOT NULL,
      total_amount REAL NOT NULL,
      payment_mode TEXT DEFAULT 'cash' CHECK(payment_mode IN ('cash', 'fonepay_qr', 'bank_transfer', 'cheque', 'esewa_khalti')),
      received_by TEXT,
      remarks TEXT,
      cancelled INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    -- Payment Line Items
    CREATE TABLE IF NOT EXISTS fee_payment_items (
      id TEXT PRIMARY KEY,
      payment_id TEXT NOT NULL,
      fee_due_id TEXT,
      fee_category_name TEXT NOT NULL,
      amount_paid REAL NOT NULL,
      discount_applied REAL DEFAULT 0.0,
      FOREIGN KEY (payment_id) REFERENCES fee_payments(id) ON DELETE CASCADE
    );

    -- Notices & Announcements
    CREATE TABLE IF NOT EXISTS notices (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      title TEXT NOT NULL,
      title_nepali TEXT NOT NULL,
      content TEXT NOT NULL,
      content_nepali TEXT NOT NULL,
      target_roles TEXT DEFAULT '["all"]', -- JSON array
      priority TEXT DEFAULT 'normal' CHECK(priority IN ('normal', 'urgent', 'event')),
      published_date_bs TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Library Books
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      title TEXT NOT NULL,
      title_nepali TEXT,
      author TEXT NOT NULL,
      isbn_acc_no TEXT NOT NULL,
      publisher TEXT,
      category TEXT,
      total_copies INTEGER DEFAULT 1,
      available_copies INTEGER DEFAULT 1,
      rack_location TEXT,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Book Loans
    CREATE TABLE IF NOT EXISTS book_loans (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      book_id TEXT NOT NULL,
      borrower_type TEXT CHECK(borrower_type IN ('student', 'staff')),
      borrower_id TEXT NOT NULL,
      borrower_name TEXT,
      issue_date_bs TEXT NOT NULL,
      due_date_bs TEXT NOT NULL,
      return_date_bs TEXT,
      fine_amount REAL DEFAULT 0.0,
      status TEXT DEFAULT 'issued' CHECK(status IN ('issued', 'returned', 'overdue')),
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    );

    -- Transport Routes
    CREATE TABLE IF NOT EXISTS transport_routes (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      route_name TEXT NOT NULL,
      route_name_nepali TEXT,
      vehicle_number TEXT NOT NULL, -- e.g. Ba 2 Ka 1234
      driver_name TEXT NOT NULL,
      driver_phone TEXT NOT NULL,
      monthly_fare REAL DEFAULT 1500.0,
      capacity INTEGER DEFAULT 35,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Transport Route Assignments
    CREATE TABLE IF NOT EXISTS transport_assignments (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      student_id TEXT NOT NULL,
      route_id TEXT NOT NULL,
      pickup_point TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      FOREIGN KEY (route_id) REFERENCES transport_routes(id) ON DELETE CASCADE
    );

    -- Audit Logs (for Platform & School Admin compliance)
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      tenant_id TEXT,
      user_id TEXT,
      username TEXT,
      action TEXT NOT NULL, -- e.g. STUDENT_ENROLLED, MARKS_APPROVED, PAYMENT_RECORDED
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details TEXT, -- JSON summary
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Offline Attendance Sync Queue Log
    CREATE TABLE IF NOT EXISTS offline_sync_logs (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      synced_by TEXT,
      record_count INTEGER NOT NULL,
      date_bs TEXT NOT NULL,
      device_info TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
    );

    -- Student Dental & Oral Health Records (School Clinic / Annual Dental Camp)
    CREATE TABLE IF NOT EXISTS dental_records (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      student_id TEXT NOT NULL,
      checkup_date_bs TEXT NOT NULL,
      checkup_date_ad TEXT,
      camp_name TEXT DEFAULT 'वार्षिक विद्यालय दन्त स्वास्थ्य परीक्षण शिविर',
      dentist_name TEXT NOT NULL,
      dentist_nmc_no TEXT,
      caries_count INTEGER DEFAULT 0,
      cavity_teeth TEXT,
      missing_count INTEGER DEFAULT 0,
      filled_count INTEGER DEFAULT 0,
      plaque_status TEXT DEFAULT 'mild' CHECK(plaque_status IN ('none', 'mild', 'moderate', 'severe')),
      gum_condition TEXT DEFAULT 'healthy' CHECK(gum_condition IN ('healthy', 'bleeding', 'gingivitis')),
      oral_hygiene TEXT DEFAULT 'good' CHECK(oral_hygiene IN ('excellent', 'good', 'fair', 'poor')),
      recommendation TEXT,
      parent_notified INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );
  `);
}

// Pre-seed sample authentic data
function seedInitialData() {
  const count = db.prepare('SELECT COUNT(*) as cnt FROM tenants').get().cnt;
  if (count > 0) return; // Already seeded

  console.log('Seeding initial Nepal School Management System data...');

  const defaultPasswordHash = bcrypt.hashSync('admin123', 10);
  const teacherPasswordHash = bcrypt.hashSync('teacher123', 10);
  const studentPasswordHash = bcrypt.hashSync('student123', 10);
  const parentPasswordHash = bcrypt.hashSync('parent123', 10);
  const accPasswordHash = bcrypt.hashSync('acc123', 10);
  const libPasswordHash = bcrypt.hashSync('lib123', 10);
  const transPasswordHash = bcrypt.hashSync('trans123', 10);
  const palikaPasswordHash = bcrypt.hashSync('palika123', 10);

  // 1. Platform Super Admin (System Administrator)
  db.prepare(`
    INSERT INTO users (id, tenant_id, username, password_hash, full_name, nepali_name, email, phone, role, is_active)
    VALUES (?, NULL, ?, ?, ?, ?, ?, ?, 'super_admin', 1)
  `).run(
    'usr-superadmin',
    'superadmin',
    defaultPasswordHash,
    'Ministry & Platform Administrator',
    'केन्द्रीय प्रणाली प्रशासक',
    'superadmin@shikshya.gov.np',
    '9801000001'
  );

  // 2. Tenant 1: Shree Shanti Secondary School (Community School in Lalitpur)
  const tenant1Id = 'shree-shanti-sec';
  db.prepare(`
    INSERT INTO tenants (
      id, code, name, nepali_name, category, education_type, affiliation_code,
      province, district, municipality, ward, tole, phone, email, established_year_bs,
      principal_name, date_format_pref, default_language, currency, modules_enabled
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    tenant1Id,
    'SSSS-27001',
    'Shree Shanti Secondary School',
    'श्री शान्ति माध्यमिक विद्यालय',
    'community',
    'secondary',
    '270010001',
    'बागमती प्रदेश (Bagmati)',
    'ललितपुर (Lalitpur)',
    'ललितपुर महानगरपालिका (Lalitpur Metropolitan)',
    '५ (Ward 5)',
    'महालक्ष्मीस्थान (Mahalaxmisthan)',
    '01-5521234',
    'info@shreeshanti.edu.np',
    2028,
    'रमेश प्रसाद शर्मा (Ramesh Prasad Sharma)',
    'BS',
    'ne',
    'NPR',
    JSON.stringify(['admissions', 'academics', 'attendance', 'exams', 'fees', 'notices', 'library', 'transport', 'reports', 'iemis'])
  );

  // 3. Tenant 2: Kathmandu Valley Academy (Institutional School in Kathmandu)
  const tenant2Id = 'ktm-valley-acad';
  db.prepare(`
    INSERT INTO tenants (
      id, code, name, nepali_name, category, education_type, affiliation_code,
      province, district, municipality, ward, tole, phone, email, established_year_bs,
      principal_name, date_format_pref, default_language, currency, modules_enabled
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    tenant2Id,
    'KVA-27002',
    'Kathmandu Valley Academy',
    'काठमाडौँ भ्याली एकेडेमी',
    'institutional',
    'integrated',
    '270020055',
    'बागमती प्रदेश (Bagmati)',
    'काठमाडौँ (Kathmandu)',
    'काठमाडौँ महानगरपालिका (Kathmandu Metropolitan)',
    '३ (Ward 3)',
    'महाराजगञ्ज (Maharajgunj)',
    '01-4412345',
    'contact@ktmvalley.edu.np',
    2055,
    'डा. सुसन श्रेष्ठ (Dr. Susan Shrestha)',
    'BOTH',
    'en',
    'NPR',
    JSON.stringify(['admissions', 'academics', 'attendance', 'exams', 'fees', 'notices', 'library', 'transport', 'reports', 'iemis'])
  );

  // Palika Education Officer (Municipality oversight for Lalitpur schools)
  db.prepare(`
    INSERT INTO users (id, tenant_id, username, password_hash, full_name, nepali_name, email, phone, role, assigned_schools, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'palika_officer', ?, 1)
  `).run(
    'usr-palika-officer',
    tenant1Id,
    'palika.lalitpur',
    palikaPasswordHash,
    'Dipendra Adhikari (Education Officer)',
    'दिपेन्द्र अधिकारी (शिक्षा अधिकृत)',
    'education@lalitpurmun.gov.np',
    '9851023456',
    JSON.stringify([tenant1Id])
  );

  // Users for Shree Shanti (Tenant 1)
  const usersT1 = [
    { id: 'usr-admin-shanti', username: 'admin.shanti', pass: defaultPasswordHash, name: 'Ramesh Prasad Sharma', nName: 'रमेश प्रसाद शर्मा', role: 'school_admin' },
    { id: 'usr-teacher-ram', username: 'teacher.ram', pass: teacherPasswordHash, name: 'Ram Bahadur Thapa', nName: 'राम बहादुर थापा', role: 'teacher' },
    { id: 'usr-accountant-sita', username: 'accountant.sita', pass: accPasswordHash, name: 'Sita Kumari Poudel', nName: 'सीता कुमारी पौडेल', role: 'accountant' },
    { id: 'usr-librarian-krishna', username: 'librarian.krishna', pass: libPasswordHash, name: 'Krishna Prasad Bhattarai', nName: 'कृष्ण प्रसाद भट्टराई', role: 'librarian' },
    { id: 'usr-transport-hari', username: 'transport.hari', pass: transPasswordHash, name: 'Hari Narayan Shrestha', nName: 'हरि नारायण श्रेष्ठ', role: 'transport_manager' },
    { id: 'usr-student-aarav', username: 'student.aarav', pass: studentPasswordHash, name: 'Aarav Shrestha', nName: 'आरव श्रेष्ठ', role: 'student' },
    { id: 'usr-parent-shrestha', username: 'parent.shrestha', pass: parentPasswordHash, name: 'Bishnu Shrestha', nName: 'विष्णु श्रेष्ठ', role: 'parent' }
  ];

  for (const u of usersT1) {
    db.prepare(`
      INSERT INTO users (id, tenant_id, username, password_hash, full_name, nepali_name, email, phone, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, '9841000000', ?, 1)
    `).run(u.id, tenant1Id, u.username, u.pass, u.name, u.nName, `${u.username}@shreeshanti.edu.np`, u.role);
  }

  // School Admin for Tenant 2
  db.prepare(`
    INSERT INTO users (id, tenant_id, username, password_hash, full_name, nepali_name, email, phone, role, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, '9841112233', 'school_admin', 1)
  `).run('usr-admin-valley', tenant2Id, 'admin.valley', defaultPasswordHash, 'Dr. Susan Shrestha', 'डा. सुसन श्रेष्ठ', 'admin@ktmvalley.edu.np');

  // Academic Years for Tenant 1
  const ayId1 = 'ay-2081-shanti';
  db.prepare(`
    INSERT INTO academic_years (id, tenant_id, name, year_bs, year_ad, start_date_bs, end_date_bs, is_current)
    VALUES (?, ?, '२०८१/२०८२ (2081/2082 BS)', 2081, 2024, '2081-01-01', '2081-12-30', 1)
  `).run(ayId1, tenant1Id);

  // Terms for Tenant 1
  const term1Id = 'term-1-shanti';
  const term2Id = 'term-2-shanti';
  const term3Id = 'term-final-shanti';
  db.prepare(`INSERT INTO terms VALUES (?, ?, ?, 'First Terminal Exam', 'प्रथम त्रैमासिक परीक्षा', 1, 20.0, '2081-03-15', '2081-03-25', 0)`).run(term1Id, tenant1Id, ayId1);
  db.prepare(`INSERT INTO terms VALUES (?, ?, ?, 'Second Terminal Exam', 'दोस्रो त्रैमासिक परीक्षा', 2, 20.0, '2081-06-20', '2081-06-30', 1)`).run(term2Id, tenant1Id, ayId1);
  db.prepare(`INSERT INTO terms VALUES (?, ?, ?, 'Annual Examination', 'वार्षिक परीक्षा', 3, 60.0, '2081-11-20', '2081-12-05', 0)`).run(term3Id, tenant1Id, ayId1);

  // Classes for Tenant 1 (Grades 1 to 10)
  const classGrades = [
    { id: 'cls-10-shanti', name: 'Grade 10', nepali: 'कक्षा १०', level: 10, order: 10 },
    { id: 'cls-9-shanti', name: 'Grade 9', nepali: 'कक्षा ९', level: 9, order: 9 },
    { id: 'cls-8-shanti', name: 'Grade 8', nepali: 'कक्षा ८', level: 8, order: 8 },
    { id: 'cls-7-shanti', name: 'Grade 7', nepali: 'कक्षा ७', level: 7, order: 7 },
    { id: 'cls-6-shanti', name: 'Grade 6', nepali: 'कक्षा ६', level: 6, order: 6 },
    { id: 'cls-5-shanti', name: 'Grade 5', nepali: 'कक्षा ५', level: 5, order: 5 }
  ];

  for (const c of classGrades) {
    db.prepare(`INSERT INTO classes (id, tenant_id, name, nepali_name, grade_level, display_order) VALUES (?, ?, ?, ?, ?, ?)`).run(
      c.id, tenant1Id, c.name, c.nepali, c.level, c.order
    );
  }

  // Sections for Grade 10
  const sec10A = 'sec-10a-shanti';
  const sec10B = 'sec-10b-shanti';
  db.prepare(`INSERT INTO sections (id, tenant_id, class_id, name, room_number, class_teacher_id, capacity) VALUES (?, ?, 'cls-10-shanti', 'Section A (सगरमाथा)', 'R-201', 'usr-teacher-ram', 40)`).run(sec10A, tenant1Id);
  db.prepare(`INSERT INTO sections (id, tenant_id, class_id, name, room_number, class_teacher_id, capacity) VALUES (?, ?, 'cls-10-shanti', 'Section B (कञ्चनजङ्घा)', 'R-202', NULL, 40)`).run(sec10B, tenant1Id);

  // Subjects for Grade 10 conforming strictly to Nepal CDC Curriculum
  const subjectsGrade10 = [
    { id: 'sub-nep-10', code: 'NEP.101', name: 'Nepali', nName: 'नेपाली', cr: 4.0, full: 100, pass: 35, thF: 75, thP: 26.25, prF: 25, prP: 10, type: 'compulsory' },
    { id: 'sub-eng-10', code: 'ENG.102', name: 'English', nName: 'अंग्रेजी', cr: 4.0, full: 100, pass: 35, thF: 75, thP: 26.25, prF: 25, prP: 10, type: 'compulsory' },
    { id: 'sub-mat-10', code: 'MTH.103', name: 'Compulsory Mathematics', nName: 'अनिवार्य गणित', cr: 4.0, full: 100, pass: 35, thF: 75, thP: 26.25, prF: 25, prP: 10, type: 'compulsory' },
    { id: 'sub-sci-10', code: 'SCI.104', name: 'Science and Technology', nName: 'विज्ञान तथा प्रविधि', cr: 4.0, full: 100, pass: 35, thF: 75, thP: 26.25, prF: 25, prP: 10, type: 'compulsory' },
    { id: 'sub-soc-10', code: 'SOC.105', name: 'Social Studies & Human Value', nName: 'सामाजिक अध्ययन तथा मानव मूल्य', cr: 4.0, full: 100, pass: 35, thF: 75, thP: 26.25, prF: 25, prP: 10, type: 'compulsory' },
    { id: 'sub-opt-10', code: 'OPT.106', name: 'Optional Mathematics', nName: 'ऐच्छिक गणित', cr: 4.0, full: 100, pass: 35, thF: 75, thP: 26.25, prF: 25, prP: 10, type: 'optional' },
    { id: 'sub-com-10', code: 'COM.107', name: 'Computer Science', nName: 'कम्प्युटर विज्ञान', cr: 4.0, full: 100, pass: 35, thF: 50, thP: 17.50, prF: 50, prP: 20, type: 'technical' }
  ];

  for (const s of subjectsGrade10) {
    db.prepare(`
      INSERT INTO subjects (id, tenant_id, class_id, code, name, nepali_name, credit_hours, full_marks, pass_marks, theory_full_marks, theory_pass_marks, practical_full_marks, practical_pass_marks, is_optional, subject_type)
      VALUES (?, ?, 'cls-10-shanti', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(s.id, tenant1Id, s.code, s.name, s.nName, s.cr, s.full, s.pass, s.thF, s.thP, s.prF, s.prP, s.type === 'optional' ? 1 : 0, s.type);
  }

  // Staff profile for Teacher Ram
  db.prepare(`
    INSERT INTO staff (
      id, tenant_id, user_id, employee_id, full_name, nepali_name, gender, designation,
      department, qualification, citizenship_no, pan_no, joined_date_bs, employment_type,
      phone, email, province, district, municipality, ward, tole, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
  `).run(
    'stf-ram-thapa',
    tenant1Id,
    'usr-teacher-ram',
    'EMP-0102',
    'Ram Bahadur Thapa',
    'राम बहादुर थापा',
    'male',
    'माध्यमिक शिक्षक (Secondary Science Teacher)',
    'विज्ञान विभाग (Science Dept)',
    'M.Sc. Physics (T.U.), B.Ed.',
    '27-01-72-12345',
    '601234567',
    '2075-04-01',
    'permanent',
    '9841234567',
    'ram.thapa@shreeshanti.edu.np',
    'बागमती प्रदेश',
    'ललितपुर',
    'ललितपुर महानगरपालिका',
    '५',
    'लगनखेल'
  );

  // Students for Grade 10 Section A
  const studentsSample = [
    {
      id: 'stu-aarav-shrestha',
      admNo: '2080-0101',
      roll: 1,
      first: 'Aarav',
      last: 'Shrestha',
      nepaliName: 'आरव श्रेष्ठ',
      gender: 'male',
      dobBs: '2066-03-12',
      dobAd: '2009-06-26',
      blood: 'O+',
      caste: 'Janajati',
      religion: 'Hindu',
      tongue: 'Newari',
      disability: 'none',
      notes: null,
      father: 'Bishnu Shrestha',
      mother: 'Radha Shrestha',
      guardian: 'Bishnu Shrestha',
      phone: '9841987654',
      ward: '५',
      tole: 'महालक्ष्मीस्थान'
    },
    {
      id: 'stu-anjali-tamang',
      admNo: '2080-0102',
      roll: 2,
      first: 'Anjali',
      last: 'Tamang',
      nepaliName: 'अञ्जली तामाङ',
      gender: 'female',
      dobBs: '2066-07-24',
      dobAd: '2009-11-09',
      blood: 'B+',
      caste: 'Janajati',
      religion: 'Buddhist',
      tongue: 'Tamang',
      disability: 'none',
      notes: null,
      father: 'Dorje Tamang',
      mother: 'Maya Tamang',
      guardian: 'Dorje Tamang',
      phone: '9849112233',
      ward: '६',
      tole: 'टिकाथली'
    },
    {
      id: 'stu-bikash-bk',
      admNo: '2080-0103',
      roll: 3,
      first: 'Bikash',
      last: 'B.K.',
      nepaliName: 'बिकेश विश्वकर्मा',
      gender: 'male',
      dobBs: '2066-01-15',
      dobAd: '2009-04-27',
      blood: 'A+',
      caste: 'Dalit',
      religion: 'Hindu',
      tongue: 'Nepali',
      disability: 'physical',
      notes: 'Requires ground floor classroom and ramp access for wheelchair mobility.',
      father: 'Prem Bahadur B.K.',
      mother: 'Saraswati B.K.',
      guardian: 'Prem Bahadur B.K.',
      phone: '9860123456',
      ward: '५',
      tole: 'इमाडोल'
    },
    {
      id: 'stu-priyanka-sah',
      admNo: '2080-0104',
      roll: 4,
      first: 'Priyanka',
      last: 'Sah',
      nepaliName: 'प्रियंका साह',
      gender: 'female',
      dobBs: '2066-09-08',
      dobAd: '2009-12-23',
      blood: 'AB+',
      caste: 'Madhesi',
      religion: 'Hindu',
      tongue: 'Maithili',
      disability: 'none',
      notes: null,
      father: 'Ram Chandra Sah',
      mother: 'Geeta Devi Sah',
      guardian: 'Ram Chandra Sah',
      phone: '9803124567',
      ward: '४',
      tole: 'जावलाखेल'
    },
    {
      id: 'stu-rohit-adhikari',
      admNo: '2080-0105',
      roll: 5,
      first: 'Rohit',
      last: 'Adhikari',
      nepaliName: 'रोहित अधिकारी',
      gender: 'male',
      dobBs: '2065-11-20',
      dobAd: '2009-03-04',
      blood: 'O-',
      caste: 'Brahmin_Chhetri',
      religion: 'Hindu',
      tongue: 'Nepali',
      disability: 'visual',
      notes: 'Low vision: Accommodate with large font print papers and front row seating.',
      father: 'Madhav Adhikari',
      mother: 'Sharda Adhikari',
      guardian: 'Madhav Adhikari',
      phone: '9841556677',
      ward: '५',
      tole: 'कुमारीपाटी'
    }
  ];

  for (const s of studentsSample) {
    db.prepare(`
      INSERT INTO students (
        id, tenant_id, admission_number, roll_number, current_class_id, current_section_id,
        first_name, last_name, full_name_nepali, gender, dob_bs, dob_ad, blood_group,
        caste_ethnicity, religion, mother_tongue, disability_status, inclusion_support_notes,
        province, district, municipality, ward, tole, father_name, mother_name,
        guardian_name, guardian_phone, emergency_contact, status, enrollment_date_bs
      ) VALUES (?, ?, ?, ?, 'cls-10-shanti', 'sec-10a-shanti', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'बागमती प्रदेश', 'ललितपुर', 'ललितपुर महानगरपालिका', ?, ?, ?, ?, ?, ?, ?, 'enrolled', '2080-01-10')
    `).run(
      s.id, tenant1Id, s.admNo, s.roll, s.first, s.last, s.nepaliName, s.gender, s.dobBs, s.dobAd,
      s.blood, s.caste, s.religion, s.tongue, s.disability, s.notes, s.ward, s.tole,
      s.father, s.mother, s.guardian, s.phone, s.phone
    );
  }

  // Sample Exam: First Term Exam 2081
  const exam1Id = 'exam-first-term-2081';
  db.prepare(`
    INSERT INTO exams (id, tenant_id, academic_year_id, term_id, name, nepali_name, start_date_bs, end_date_bs, review_status, is_published)
    VALUES (?, ?, ?, ?, 'First Terminal Examination 2081', 'प्रथम त्रैमासिक परीक्षा २०८१', '2081-03-15', '2081-03-25', 'published', 1)
  `).run(exam1Id, tenant1Id, ayId1, term1Id);

  // Insert Marks for Aarav Shrestha in First Term (Theory + Practical)
  const aaravMarks = [
    { subId: 'sub-nep-10', th: 62, pr: 22, tot: 84, pct: 84, gr: 'A', gpa: 3.6 },
    { subId: 'sub-eng-10', th: 68, pr: 24, tot: 92, pct: 92, gr: 'A+', gpa: 4.0 },
    { subId: 'sub-mat-10', th: 71, pr: 23, tot: 94, pct: 94, gr: 'A+', gpa: 4.0 },
    { subId: 'sub-sci-10', th: 64, pr: 24, tot: 88, pct: 88, gr: 'A', gpa: 3.6 },
    { subId: 'sub-soc-10', th: 58, pr: 21, tot: 79, pct: 79, gr: 'B+', gpa: 3.2 },
    { subId: 'sub-opt-10', th: 67, pr: 22, tot: 89, pct: 89, gr: 'A', gpa: 3.6 },
    { subId: 'sub-com-10', th: 42, pr: 48, tot: 90, pct: 90, gr: 'A+', gpa: 4.0 }
  ];

  for (const m of aaravMarks) {
    db.prepare(`
      INSERT INTO exam_marks (id, tenant_id, exam_id, student_id, subject_id, theory_marks, practical_marks, total_marks, percentage, grade, grade_point, is_absent, remarks, entered_by, reviewed_by)
      VALUES (?, ?, ?, 'stu-aarav-shrestha', ?, ?, ?, ?, ?, ?, ?, 0, 'Excellent performance', 'usr-teacher-ram', 'usr-admin-shanti')
    `).run(`mark-${exam1Id}-aarav-${m.subId}`, tenant1Id, exam1Id, m.subId, m.th, m.pr, m.tot, m.pct, m.gr, m.gpa);
  }

  // Fee categories for Shree Shanti
  const feeCats = [
    { id: 'fee-adm', code: 'ADM', name: 'Admission & Registration Fee', nName: 'भर्ना तथा दर्ता शुल्क', amt: 2500, freq: 'one_time' },
    { id: 'fee-tui', code: 'TUI', name: 'Monthly Tuition Fee', nName: 'मासिक पढाइ शुल्क', amt: 1200, freq: 'monthly' },
    { id: 'fee-exam', code: 'EXM', name: 'Terminal Examination Fee', nName: 'त्रैमासिक परीक्षा शुल्क', amt: 800, freq: 'term' },
    { id: 'fee-comp', code: 'CMP', name: 'Computer Lab Fee', nName: 'कम्प्युटर ल्याब शुल्क', amt: 500, freq: 'monthly' }
  ];

  for (const fc of feeCats) {
    db.prepare(`INSERT INTO fee_categories VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
      fc.id, tenant1Id, fc.name, fc.nName, fc.code, fc.amt, fc.freq
    );
  }

  // Fee Dues for Aarav Shrestha
  db.prepare(`
    INSERT INTO student_fee_dues (id, tenant_id, student_id, fee_category_id, academic_year_id, month_bs, amount, discount_amount, paid_amount, due_date_bs, status)
    VALUES ('due-aarav-tui-1', ?, 'stu-aarav-shrestha', 'fee-tui', ?, 'Baishakh (बैशाख)', 1200, 0, 1200, '2081-01-30', 'paid')
  `).run(tenant1Id, ayId1);

  db.prepare(`
    INSERT INTO student_fee_dues (id, tenant_id, student_id, fee_category_id, academic_year_id, month_bs, amount, discount_amount, paid_amount, due_date_bs, status)
    VALUES ('due-aarav-tui-2', ?, 'stu-aarav-shrestha', 'fee-tui', ?, 'Jestha (जेठ)', 1200, 0, 1200, '2081-02-30', 'paid')
  `).run(tenant1Id, ayId1);

  db.prepare(`
    INSERT INTO student_fee_dues (id, tenant_id, student_id, fee_category_id, academic_year_id, month_bs, amount, discount_amount, paid_amount, due_date_bs, status)
    VALUES ('due-aarav-tui-3', ?, 'stu-aarav-shrestha', 'fee-tui', ?, 'Ashadh (असार)', 1200, 0, 0, '2081-03-30', 'unpaid')
  `).run(tenant1Id, ayId1);

  // Fee Payment Receipt for Aarav
  const payment1Id = 'rcpt-2081-001';
  db.prepare(`
    INSERT INTO fee_payments (id, tenant_id, receipt_number, student_id, academic_year_id, payment_date_bs, payment_date_ad, total_amount, payment_mode, received_by, remarks)
    VALUES (?, ?, 'REC-2081-0001', 'stu-aarav-shrestha', ?, '2081-02-15', '2024-05-28', 2400.0, 'cash', 'usr-accountant-sita', 'Tuition fee for Baishakh and Jestha')
  `).run(payment1Id, tenant1Id, ayId1);

  db.prepare(`
    INSERT INTO fee_payment_items (id, payment_id, fee_due_id, fee_category_name, amount_paid, discount_applied)
    VALUES ('fpi-1', ?, 'due-aarav-tui-1', 'मासिक पढाइ शुल्क (बैशाख)', 1200, 0)
  `).run(payment1Id);

  db.prepare(`
    INSERT INTO fee_payment_items (id, payment_id, fee_due_id, fee_category_name, amount_paid, discount_applied)
    VALUES ('fpi-2', ?, 'due-aarav-tui-2', 'मासिक पढाइ शुल्क (जेठ)', 1200, 0)
  `).run(payment1Id);

  // Sample Notices in Nepali and English
  db.prepare(`
    INSERT INTO notices (id, tenant_id, title, title_nepali, content, content_nepali, target_roles, priority, published_date_bs, created_by)
    VALUES (
      'not-1', ?,
      'Second Terminal Examination Routine Published',
      'दोस्रो त्रैमासिक परीक्षाको कार्यतालिका सम्बन्धी सूचना',
      'The second terminal examination of the academic session 2081 will commence from 2081-06-20. All students are requested to clear any outstanding fees and collect their admit cards by 2081-06-15.',
      'शैक्षिक सत्र २०८१ को दोस्रो त्रैमासिक परीक्षा यही २०८१/०६/२० गतेदेखि सञ्चालन हुने भएकाले सम्पूर्ण विद्यार्थीहरूले २०८१/०६/१५ भित्र बक्यौता शुल्क बुझाई प्रवेशपत्र लिनुहुन सूचित गरिन्छ।',
      '["student","parent","teacher"]',
      'urgent',
      '2081-06-05',
      'usr-admin-shanti'
    )
  `).run(tenant1Id);

  db.prepare(`
    INSERT INTO notices (id, tenant_id, title, title_nepali, content, content_nepali, target_roles, priority, published_date_bs, created_by)
    VALUES (
      'not-2', ?,
      'Dashain and Tihar Vacation Notice',
      'बडा दशैँ तथा शुभ दीपावली बिदा सम्बन्धी सूचना',
      'The school will remain closed from 2081-06-24 to 2081-07-20 on the auspicious occasion of Bijaya Dashami and Deepawali festivals. Classes will resume regularly on Sunday, 2081-07-21.',
      'हिन्दुहरूको महान् चाड बडा दशैँ तथा शुभ दीपावलीको पावन अवसरमा मिति २०८१/०६/२४ देखि २०८१/०७/२० सम्म विद्यालयमा बिदा रहने व्यहोरा जानकारी गराइन्छ। नियमित कक्षा २०८१/०७/२१ गते आइतबारदेखि सञ्चालन हुनेछ।',
      '["all"]',
      'normal',
      '2081-06-18',
      'usr-admin-shanti'
    )
  `).run(tenant1Id);

  // Sample Library Books
  db.prepare(`
    INSERT INTO books (id, tenant_id, title, title_nepali, author, isbn_acc_no, publisher, category, total_copies, available_copies, rack_location)
    VALUES ('bk-1', ?, 'Muna Madan', 'मुना मदन', 'Laxmi Prasad Devkota (लक्ष्मीप्रसाद देवकोटा)', 'ACC-NEP-001', 'Sajha Prakashan', 'Nepali Literature', 10, 8, 'Shelf A-1')
  `).run(tenant1Id);

  db.prepare(`
    INSERT INTO books (id, tenant_id, title, title_nepali, author, isbn_acc_no, publisher, category, total_copies, available_copies, rack_location)
    VALUES ('bk-2', ?, 'Sirish Ko Phool', 'शिरिषको फूल', 'Parijat (पारिजात)', 'ACC-NEP-002', 'Sajha Prakashan', 'Nepali Novel', 6, 5, 'Shelf A-2')
  `).run(tenant1Id);

  db.prepare(`
    INSERT INTO books (id, tenant_id, title, title_nepali, author, isbn_acc_no, publisher, category, total_copies, available_copies, rack_location)
    VALUES ('bk-3', ?, 'Science and Technology Grade 10', 'विज्ञान तथा प्रविधि कक्षा १०', 'Curriculum Development Centre (CDC)', 'CDC-SCI-10', 'Government of Nepal CDC', 'Curriculum Textbook', 50, 42, 'Shelf C-3')
  `).run(tenant1Id);

  // Sample Transport Route
  db.prepare(`
    INSERT INTO transport_routes (id, tenant_id, route_name, route_name_nepali, vehicle_number, driver_name, driver_phone, monthly_fare, capacity)
    VALUES ('rt-1', ?, 'Route 1: Satdobato - Mahalaxmisthan - Lagankhel', 'रुट १: सातदोबाटो - महालक्ष्मीस्थान - लगनखेल', 'बा २ ख ४५६७ (Ba 2 Kha 4567)', 'राम कुमार गुरुङ (Ram Kumar Gurung)', '9841887766', 1500.0, 32)
  `).run(tenant1Id);

  // Sample Audit Log entry
  db.prepare(`
    INSERT INTO audit_logs (id, tenant_id, user_id, username, action, entity_type, entity_id, details)
    VALUES ('aud-init-1', ?, 'usr-admin-shanti', 'admin.shanti', 'INITIAL_SYSTEM_SETUP', 'school_setup', ?, '{"note":"Initial setup completed for Shree Shanti Secondary School"}')
  `).run(tenant1Id, tenant1Id);

  // Pre-seed Dental & Oral Health records
  seedDentalData();

  console.log('Seeding completed successfully!');
}

function seedDentalData() {
  try {
    const count = db.prepare('SELECT COUNT(*) as cnt FROM dental_records').get().cnt;
    if (count > 0) return;

    const sampleDental = [
      {
        id: 'dnt-2081-001',
        tenantId: 'shree-shanti-sec',
        studentId: 'stu-aarav-shrestha',
        dateBs: '2081-05-18',
        dateAd: '2024-09-03',
        camp: 'वार्षिक विद्यालय दन्त स्वास्थ्य शिविर २०८१',
        dentist: 'डा. अनुपमा श्रेष्ठ (Dr. Anupama Shrestha, BDS)',
        nmc: 'NMC-DEN-4521',
        caries: 1,
        teeth: 'तल्लो देब्रे बंगारा (Lower Left Molar #36)',
        missing: 0,
        filled: 0,
        plaque: 'mild',
        gum: 'healthy',
        hygiene: 'good',
        rec: 'तल्लो देब्रे बंगारामा किराले खाएकोले कम्पोजिट फिलिङ (दाँत भर्ने) गर्नुपर्ने। दिनको दुई पटक ब्रस गर्ने सल्लाह।',
        notified: 1
      },
      {
        id: 'dnt-2081-002',
        tenantId: 'shree-shanti-sec',
        studentId: 'stu-anjali-tamang',
        dateBs: '2081-05-18',
        dateAd: '2024-09-03',
        camp: 'वार्षिक विद्यालय दन्त स्वास्थ्य शिविर २०८१',
        dentist: 'डा. अनुपमा श्रेष्ठ (Dr. Anupama Shrestha, BDS)',
        nmc: 'NMC-DEN-4521',
        caries: 0,
        teeth: 'कुनै छैन (None)',
        missing: 0,
        filled: 0,
        plaque: 'none',
        gum: 'healthy',
        hygiene: 'excellent',
        rec: 'दाँत तथा गिजा पूर्ण रूपमा स्वस्थ। ६ महिनापछि नियमित परीक्षण गराउनुहोला।',
        notified: 0
      },
      {
        id: 'dnt-2081-003',
        tenantId: 'shree-shanti-sec',
        studentId: 'stu-bikash-bk',
        dateBs: '2081-05-18',
        dateAd: '2024-09-03',
        camp: 'वार्षिक विद्यालय दन्त स्वास्थ्य शिविर २०८१',
        dentist: 'डा. रोजन मानन्धर (Dr. Rojan Manandhar, MDS)',
        nmc: 'NMC-DEN-3180',
        caries: 2,
        teeth: 'माथिल्लो दाहिने बंगारा (#16) र तल्लो दाहिने (#46)',
        missing: 0,
        filled: 0,
        plaque: 'moderate',
        gum: 'bleeding',
        hygiene: 'fair',
        rec: 'दुईवटा बंगारामा क्याभिटी छ। स्केलिङ (दाँत सफा) तथा दुवै दाँत भर्न तुरुन्त दन्त क्लिनिकमा जान सिफारिस गरिएको छ। अभिभावकलाई सूचना पठाइएको।',
        notified: 1
      },
      {
        id: 'dnt-2081-004',
        tenantId: 'shree-shanti-sec',
        studentId: 'stu-priyanka-sah',
        dateBs: '2081-05-19',
        dateAd: '2024-09-04',
        camp: 'वार्षिक विद्यालय दन्त स्वास्थ्य शिविर २०८१',
        dentist: 'डा. रोजन मानन्धर (Dr. Rojan Manandhar, MDS)',
        nmc: 'NMC-DEN-3180',
        caries: 0,
        teeth: 'पहिले भरिएको (#26)',
        missing: 0,
        filled: 1,
        plaque: 'mild',
        gum: 'healthy',
        hygiene: 'good',
        rec: 'पहिले भरिएको दाँत सुरक्षित छ। फ्लोराइडयुक्त मञ्जन प्रयोग गर्न सल्लाह दिइयो।',
        notified: 0
      },
      {
        id: 'dnt-2081-005',
        tenantId: 'shree-shanti-sec',
        studentId: 'stu-rohit-adhikari',
        dateBs: '2081-05-19',
        dateAd: '2024-09-04',
        camp: 'वार्षिक विद्यालय दन्त स्वास्थ्य शिविर २०८१',
        dentist: 'डा. अनुपमा श्रेष्ठ (Dr. Anupama Shrestha, BDS)',
        nmc: 'NMC-DEN-4521',
        caries: 1,
        teeth: 'माथिल्लो देब्रे बंगारा (#26)',
        missing: 0,
        filled: 0,
        plaque: 'mild',
        gum: 'healthy',
        hygiene: 'good',
        rec: 'सुरुवाती किरा खाएको देखिन्छ। फ्लोराइड भर्ने वा सिल्यान्ट लगाउन सल्लाह।',
        notified: 1
      }
    ];

    const insert = db.prepare(`
      INSERT INTO dental_records (
        id, tenant_id, student_id, checkup_date_bs, checkup_date_ad,
        camp_name, dentist_name, dentist_nmc_no, caries_count, cavity_teeth,
        missing_count, filled_count, plaque_status, gum_condition,
        oral_hygiene, recommendation, parent_notified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const d of sampleDental) {
      insert.run(
        d.id, d.tenantId, d.studentId, d.dateBs, d.dateAd,
        d.camp, d.dentist, d.nmc, d.caries, d.teeth,
        d.missing, d.filled, d.plaque, d.gum,
        d.hygiene, d.rec, d.notified
      );
    }
    console.log('Seeded sample dental health records.');
  } catch (err) {
    console.error('Error seeding dental records:', err.message);
  }
}

initSchema();
seedInitialData();
seedDentalData();

module.exports = {
  db,
  sqliteEngineName
};
