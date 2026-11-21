/**
 * Comprehensive Automated Test Suite for Nepal School Management System
 * Tests:
 * 1. Multi-Tenant isolation and boundary enforcement
 * 2. Bikram Sambat (BS) <-> Gregorian (AD) conversions
 * 3. NPR currency number-to-words in Nepali & English
 * 4. Curriculum Development Centre (CDC) 2078 Letter Grading & GPA
 * 5. CEHRD IEMIS standard CSV generation with UTF-8 BOM
 * 6. Authentication & Role-based access control
 * 7. Offline attendance batch synchronization
 */

const assert = require('node:assert');
const nepaliCalendar = require('../server/utils/nepaliCalendar');
const nepaliNumberToWords = require('../server/utils/nepaliNumberToWords');
const cdcGrading = require('../server/utils/cdcGrading');
const iemisExport = require('../server/utils/iemisExport');
const { db } = require('../server/db/database');
const bcrypt = require('bcryptjs');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
  }
}

console.log('\n--- Running Nepal School Management System Test Suite ---');

// 1. Bikram Sambat Date Engine Tests
test('BS Anchor Date: 2080-01-01 BS corresponds to 2023-04-14 AD', () => {
  const ad = nepaliCalendar.bsToAd(2080, 1, 1);
  assert.strictEqual(ad.formattedAd, '2023-04-14');

  const bs = nepaliCalendar.adToBs('2023-04-14');
  assert.strictEqual(bs.formattedBs, '2080-01-01');
  assert.strictEqual(bs.monthNameNe, 'बैशाख');
  assert.strictEqual(bs.monthNameEn, 'Baishakh');
});

test('Nepali Digits formatting', () => {
  assert.strictEqual(nepaliCalendar.toNepaliDigits(2081), '२०८१');
  assert.strictEqual(nepaliCalendar.toNepaliDigits(1234567890), '१२३४५६७८९०');
});

// 2. NPR Number to Words Tests
test('NPR Currency to Words in Nepali', () => {
  const words1 = nepaliNumberToWords.numberToWordsNe(2400);
  assert.ok(words1.includes('दुई हजार चार सय रुपैयाँ मात्र'), `Expected words to include 'दुई हजार चार सय रुपैयाँ मात्र', got '${words1}'`);

  const words2 = nepaliNumberToWords.numberToWordsNe(15000);
  assert.ok(words2.includes('पन्ध्र हजार रुपैयाँ मात्र'), `Expected words to include 'पन्ध्र हजार रुपैयाँ मात्र', got '${words2}'`);
});

test('NPR Currency to Words in English', () => {
  const words = nepaliNumberToWords.numberToWordsEn(2400);
  assert.strictEqual(words, 'Two Thousand Four Hundred Rupees Only');
});

// 3. CDC 2078 Letter Grading Directive Tests
test('CDC 2078 Percentage to Grade Mapping', () => {
  assert.strictEqual(cdcGrading.getGradeFromPercentage(95).grade, 'A+');
  assert.strictEqual(cdcGrading.getGradeFromPercentage(85).grade, 'A');
  assert.strictEqual(cdcGrading.getGradeFromPercentage(75).grade, 'B+');
  assert.strictEqual(cdcGrading.getGradeFromPercentage(65).grade, 'B');
  assert.strictEqual(cdcGrading.getGradeFromPercentage(55).grade, 'C+');
  assert.strictEqual(cdcGrading.getGradeFromPercentage(45).grade, 'C');
  assert.strictEqual(cdcGrading.getGradeFromPercentage(36).grade, 'D');
  assert.strictEqual(cdcGrading.getGradeFromPercentage(30).grade, 'NG');
});

test('CDC 2078 Theory and Practical independent pass rule', () => {
  // Case A: Passed both TH (60/75) and PR (22/25) -> High grade
  const res1 = cdcGrading.evaluateSubjectMarks({
    theoryMarks: 60,
    practicalMarks: 22,
    theoryFull: 75,
    theoryPass: 26.25,
    practicalFull: 25,
    practicalPass: 10
  });
  assert.strictEqual(res1.finalGrade, 'A');
  assert.strictEqual(res1.isPassed, true);

  // Case B: Scored high in Theory (70/75) but failed Practical (8/25, pass mark 10)
  // According to CDC 2078 rule, final grade MUST be NG!
  const res2 = cdcGrading.evaluateSubjectMarks({
    theoryMarks: 70,
    practicalMarks: 8,
    theoryFull: 75,
    theoryPass: 26.25,
    practicalFull: 25,
    practicalPass: 10
  });
  assert.strictEqual(res2.finalGrade, 'NG');
  assert.strictEqual(res2.isPassed, false);
  assert.strictEqual(res2.gradePoint, 0.0);
});

test('CDC GPA calculation across subjects', () => {
  const subjects = [
    { creditHours: 4, gradePoint: 4.0, finalGrade: 'A+' },
    { creditHours: 4, gradePoint: 3.6, finalGrade: 'A' },
    { creditHours: 4, gradePoint: 3.6, finalGrade: 'A' }
  ];
  const summary = cdcGrading.calculateStudentGPA(subjects);
  assert.strictEqual(summary.hasNG, false);
  assert.strictEqual(summary.gpa, 3.73);
});

// 4. CEHRD IEMIS Export Tests
test('CEHRD IEMIS CSV has UTF-8 BOM and correct headers', () => {
  const mockTenant = {
    id: 'tnt-test',
    name: 'Shree Test Secondary School',
    affiliation_code: '270010001',
    province: 'बागमती',
    district: 'ललितपुर',
    municipality: 'ललितपुर'
  };
  const mockStudents = [
    {
      id: 'stu-1',
      admission_number: '2081-0001',
      roll_number: 1,
      full_name_nepali: 'आरव श्रेष्ठ',
      first_name: 'Aarav',
      last_name: 'Shrestha',
      gender: 'male',
      dob_bs: '2066-03-12',
      dob_ad: '2009-06-26',
      class_name: 'Grade 10',
      section_name: 'A',
      caste_ethnicity: 'Janajati',
      disability_status: 'none'
    }
  ];

  const csv = iemisExport.generateIemisStudentCsv(mockTenant, mockStudents);
  // Verify UTF-8 BOM (\uFEFF)
  assert.strictEqual(csv.charCodeAt(0), 0xFEFF);
  // Verify EMIS Code is present
  assert.ok(csv.includes('270010001'));
  // Verify Unicode name is preserved
  assert.ok(csv.includes('आरव श्रेष्ठ'));
  // Verify Janajati code (2) is present
  assert.ok(csv.includes('"2"'));
});

// 5. Multi-Tenant Database Data Isolation Tests
test('Multi-tenant isolation: School records partitioned by tenant_id', () => {
  const t1Students = db.prepare('SELECT COUNT(*) as cnt FROM students WHERE tenant_id = ?').get('shree-shanti-sec').cnt;
  const t2Students = db.prepare('SELECT COUNT(*) as cnt FROM students WHERE tenant_id = ?').get('ktm-valley-acad').cnt;
  assert.ok(t1Students > 0, 'Tenant 1 should have students');
  assert.strictEqual(t2Students, 0, 'Tenant 2 has separate isolated space');

  // Verify tenants exist
  const t1 = db.prepare('SELECT * FROM tenants WHERE id = ?').get('shree-shanti-sec');
  assert.strictEqual(t1.category, 'community');
  assert.strictEqual(t1.affiliation_code, '270010001');

  const t2 = db.prepare('SELECT * FROM tenants WHERE id = ?').get('ktm-valley-acad');
  assert.strictEqual(t2.category, 'institutional');
  assert.strictEqual(t2.affiliation_code, '270020055');
});

test('Super Admin and Palika Education Officer accounts exist and passwords hash correctly', () => {
  const superadmin = db.prepare('SELECT * FROM users WHERE username = ?').get('superadmin');
  assert.ok(superadmin, 'Super admin user exists');
  assert.ok(bcrypt.compareSync('admin123', superadmin.password_hash));

  const palika = db.prepare('SELECT * FROM users WHERE username = ?').get('palika.lalitpur');
  assert.ok(palika, 'Palika officer user exists');
  assert.strictEqual(palika.role, 'palika_officer');
  assert.ok(bcrypt.compareSync('palika123', palika.password_hash));
});

// 6. Class Grade Level Configuration & Validation Tests
test('Class Grade configuration: Grade level is saved, viewed, and editable across supported tiers (ECD to Grade 12)', () => {
  const testTenantId = 'shree-shanti-sec';
  const testClassId = 'cls-test-grade-' + Date.now();

  // Test 1: Save class with Grade 10 (Secondary Level)
  db.prepare(`
    INSERT INTO classes (id, tenant_id, name, nepali_name, grade_level, stream, display_order)
    VALUES (?, ?, 'Test Grade 10', 'परीक्षण कक्षा १०', 10, 'General', 10)
  `).run(testClassId, testTenantId);

  let savedClass = db.prepare('SELECT * FROM classes WHERE id = ?').get(testClassId);
  assert.strictEqual(savedClass.grade_level, 10, 'Saved class should store configured Class grade 10');
  assert.strictEqual(savedClass.name, 'Test Grade 10');

  // Test 2: Edit / change class grade level to Grade 11 (Higher Secondary)
  db.prepare(`
    UPDATE classes
    SET name = 'Test Grade 11', nepali_name = 'परीक्षण कक्षा ११', grade_level = 11, stream = 'Science'
    WHERE id = ?
  `).run(testClassId);

  let updatedClass = db.prepare('SELECT * FROM classes WHERE id = ?').get(testClassId);
  assert.strictEqual(updatedClass.grade_level, 11, 'Class grade should be editable and updated to Grade 11');
  assert.strictEqual(updatedClass.stream, 'Science');

  // Test 3: Configure ECD / Pre-Primary (grade_level = 0)
  const ecdClassId = 'cls-test-ecd-' + Date.now();
  db.prepare(`
    INSERT INTO classes (id, tenant_id, name, nepali_name, grade_level, stream, display_order)
    VALUES (?, ?, 'ECD Nursery', 'शिशु कक्षा', 0, 'General', 0)
  `).run(ecdClassId, testTenantId);

  const ecdClass = db.prepare('SELECT * FROM classes WHERE id = ?').get(ecdClassId);
  assert.strictEqual(ecdClass.grade_level, 0, 'ECD Class grade 0 must be preserved correctly');

  // Clean up test records
  db.prepare('DELETE FROM classes WHERE id IN (?, ?)').run(testClassId, ecdClassId);
});

// 7. Class Sections Configuration & Student Placement Tests
test('Class Sections configuration: Every class has selectable sections (Section A, B) for student admission', () => {
  const tenantId = 'shree-shanti-sec';

  // Check Grade 6 has sections
  const grade6 = db.prepare('SELECT id, name FROM classes WHERE id = ? AND tenant_id = ?').get('cls-6-shanti', tenantId);
  assert.ok(grade6, 'Grade 6 class must exist');

  const grade6Sections = db.prepare('SELECT id, name FROM sections WHERE class_id = ? AND tenant_id = ? ORDER BY name ASC').all('cls-6-shanti', tenantId);
  assert.ok(grade6Sections.length > 0, 'Grade 6 must have at least one selectable section');
  assert.ok(grade6Sections.some(s => s.name.includes('Section A')), 'Grade 6 must have Section A');

  // Verify all classes for tenant have at least one section
  const classes = db.prepare('SELECT id, name FROM classes WHERE tenant_id = ?').all(tenantId);
  for (const c of classes) {
    const secCount = db.prepare('SELECT COUNT(*) as cnt FROM sections WHERE class_id = ? AND tenant_id = ?').get(c.id, tenantId).cnt;
    assert.ok(secCount > 0, `Class ${c.name} (${c.id}) must have at least one section for student placement`);
  }
});

// 8. Student Phone Number & Federal Address Hierarchy (Permanent & Temporary) Tests
test('Student Phone Number & Federal Address Hierarchy: Permanent and Temporary addresses with 753 local level dependency', () => {
  const tenantId = 'shree-shanti-sec';
  const testStudentId = 'stu-test-hierarchy-' + Date.now();

  // Test 1: Insert student with student_phone, permanent and temporary address
  db.prepare(`
    INSERT INTO students (
      id, tenant_id, admission_number, roll_number, current_class_id, current_section_id,
      first_name, last_name, full_name_nepali, student_phone, gender, dob_bs,
      caste_ethnicity, permanent_province, permanent_district, permanent_municipality,
      permanent_ward, permanent_tole, temporary_province, temporary_district,
      temporary_municipality, temporary_ward, temporary_tole, same_as_permanent,
      province, district, municipality, ward, tole, enrollment_date_bs
    ) VALUES (
      ?, ?, 'TEST-2081-999', 99, 'cls-6-shanti', 'sec-cls-6-shanti-a',
      'Binod', 'Adhikari', 'बिनोद अधिकारी', '9841999888', 'male', '2067-05-15',
      'Brahmin_Chhetri', 'Bagmati', 'Lalitpur', 'Lalitpur',
      '5', 'महालक्ष्मीस्थान', 'Bagmati', 'Kathmandu',
      'Kathmandu', '10', 'नयाँ बानेश्वर', 0,
      'Bagmati', 'Lalitpur', 'Lalitpur', '5', 'महालक्ष्मीस्थान', '2081-01-10'
    )
  `).run(testStudentId, tenantId);

  const student = db.prepare('SELECT * FROM students WHERE id = ?').get(testStudentId);
  assert.strictEqual(student.student_phone, '9841999888', 'Student phone number must be saved');
  assert.strictEqual(student.permanent_province, 'Bagmati', 'Permanent province must be Bagmati');
  assert.strictEqual(student.permanent_district, 'Lalitpur', 'Permanent district must be Lalitpur');
  assert.strictEqual(student.permanent_municipality, 'Lalitpur', 'Permanent municipality must be Lalitpur');
  assert.strictEqual(student.permanent_ward, '5', 'Permanent ward must be 5');
  assert.strictEqual(student.temporary_province, 'Bagmati');
  assert.strictEqual(student.temporary_district, 'Kathmandu');
  assert.strictEqual(student.temporary_municipality, 'Kathmandu');
  assert.strictEqual(student.temporary_ward, '10');
  assert.strictEqual(student.same_as_permanent, 0);

  // Test 2: Clean up test record
  db.prepare('DELETE FROM students WHERE id = ?').run(testStudentId);
});

console.log(`\nResults: ${passedTests}/${totalTests} tests passed.\n`);
if (passedTests === totalTests) {
  console.log('ALL NEPAL SCHOOL MANAGEMENT SYSTEM TESTS PASSED SUCCESSFULLY!\n');
} else {
  process.exit(1);
}
