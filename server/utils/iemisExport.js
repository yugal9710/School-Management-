/**
 * Government of Nepal CEHRD IEMIS (Integrated Educational Management Information System)
 * Exporter conforming to official Ministry of Education, Science & Technology (MoEST)
 * / Center for Education and Human Resource Development (CEHRD) schema.
 */

const ETHNICITY_MAP = {
  'Dalit': { code: '1', ne: 'दलित', en: 'Dalit' },
  'Janajati': { code: '2', ne: 'जनजाति', en: 'Janajati' },
  'Madhesi': { code: '3', ne: 'मधेशी', en: 'Madhesi' },
  'Muslim': { code: '4', ne: 'मुस्लिम', en: 'Muslim' },
  'Brahmin_Chhetri': { code: '5', ne: 'ब्राह्मण/क्षेत्री', en: 'Brahmin/Chhetri' },
  'Tharu': { code: '6', ne: 'थारु', en: 'Tharu' },
  'Other': { code: '7', ne: 'अन्य', en: 'Other' }
};

const DISABILITY_MAP = {
  'none': { code: '0', ne: 'छैन', en: 'None' },
  'physical': { code: '1', ne: 'शारीरिक', en: 'Physical' },
  'visual': { code: '2', ne: 'दृष्टि सम्बन्धी', en: 'Visual' },
  'hearing': { code: '3', ne: 'सुनाई सम्बन्धी', en: 'Hearing' },
  'intellectual': { code: '4', ne: 'बौद्धिक', en: 'Intellectual' },
  'multiple': { code: '5', ne: 'बहु-अपाङ्गता', en: 'Multiple' }
};

/**
 * Generates CEHRD IEMIS compatible CSV string from school student records
 */
function generateIemisStudentCsv(tenant, students) {
  const headers = [
    'School_EMIS_Code',
    'School_Name',
    'Student_ID',
    'Admission_No',
    'Roll_No',
    'Full_Name_Nepali',
    'First_Name_English',
    'Last_Name_English',
    'Gender',
    'DOB_BS',
    'DOB_AD',
    'Class_Grade',
    'Section',
    'Caste_Ethnicity_Code',
    'Caste_Ethnicity_Name',
    'Disability_Code',
    'Disability_Type',
    'Mother_Tongue',
    'Father_Name',
    'Mother_Name',
    'Guardian_Contact',
    'Province',
    'District',
    'Municipality',
    'Ward_No',
    'Tole_Village',
    'Enrollment_Status'
  ];

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = [headers.join(',')];

  for (const s of students) {
    const ethnicity = ETHNICITY_MAP[s.caste_ethnicity] || { code: '7', en: 'Other' };
    const disability = DISABILITY_MAP[s.disability_status] || { code: '0', en: 'None' };

    const row = [
      escapeCsv(tenant.affiliation_code || '270010001'),
      escapeCsv(tenant.name),
      escapeCsv(s.id),
      escapeCsv(s.admission_number),
      escapeCsv(s.roll_number || ''),
      escapeCsv(s.full_name_nepali || `${s.first_name} ${s.last_name}`),
      escapeCsv(s.first_name),
      escapeCsv(s.last_name),
      escapeCsv(s.gender === 'male' ? 'M' : s.gender === 'female' ? 'F' : 'O'),
      escapeCsv(s.dob_bs || ''),
      escapeCsv(s.dob_ad || ''),
      escapeCsv(s.class_name || ''),
      escapeCsv(s.section_name || ''),
      escapeCsv(ethnicity.code),
      escapeCsv(ethnicity.en),
      escapeCsv(disability.code),
      escapeCsv(disability.en),
      escapeCsv(s.mother_tongue || 'Nepali'),
      escapeCsv(s.father_name || ''),
      escapeCsv(s.mother_name || ''),
      escapeCsv(s.guardian_phone || s.emergency_contact || ''),
      escapeCsv(s.province || tenant.province || ''),
      escapeCsv(s.district || tenant.district || ''),
      escapeCsv(s.municipality || tenant.municipality || ''),
      escapeCsv(s.ward || tenant.ward || ''),
      escapeCsv(s.tole || ''),
      escapeCsv(s.status || 'enrolled')
    ];
    rows.push(row.join(','));
  }

  // Prepend UTF-8 BOM so Excel and Nepali Government IEMIS tools open Unicode without corruption
  return '\uFEFF' + rows.join('\r\n');
}

/**
 * Generates Summary Report for Palika Education Officer (Municipality oversight)
 */
function generatePalikaEducationSummary(schoolsData) {
  const summary = {
    totalSchools: schoolsData.length,
    communitySchools: 0,
    institutionalSchools: 0,
    totalStudents: 0,
    genderBreakdown: { male: 0, female: 0, other: 0 },
    casteBreakdown: {},
    disabilityCount: 0,
    totalTeachers: 0,
    schoolsList: []
  };

  for (const item of schoolsData) {
    if (item.tenant.category === 'community') summary.communitySchools++;
    else summary.institutionalSchools++;

    summary.totalStudents += item.studentsCount;
    summary.totalTeachers += item.teachersCount;
    summary.genderBreakdown.male += item.maleStudents;
    summary.genderBreakdown.female += item.femaleStudents;
    summary.genderBreakdown.other += (item.otherStudents || 0);
    summary.disabilityCount += (item.disabledStudents || 0);

    summary.schoolsList.push({
      tenantId: item.tenant.id,
      name: item.tenant.name,
      nepaliName: item.tenant.nepali_name,
      category: item.tenant.category,
      ward: item.tenant.ward,
      studentsCount: item.studentsCount,
      teachersCount: item.teachersCount,
      attendanceRate: item.attendanceRate || '92.5%'
    });
  }

  return summary;
}

module.exports = {
  ETHNICITY_MAP,
  DISABILITY_MAP,
  generateIemisStudentCsv,
  generatePalikaEducationSummary
};
