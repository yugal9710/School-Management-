/**
 * Nepal Curriculum Development Centre (CDC) Letter Grading System
 * Conforms to "Letter Grading Directive 2078 (लेटर ग्रेडिङ निर्देशिका, २०७८)"
 * Used for Basic (Grades 1-8), Secondary (Grades 9-10 SEE, 11-12) examinations.
 */

const CDC_GRADE_INTERVALS = [
  { minPercent: 90, grade: 'A+', gpa: 4.0, descEn: 'Outstanding', descNe: 'विशिष्ट' },
  { minPercent: 80, grade: 'A',  gpa: 3.6, descEn: 'Excellent',   descNe: 'उत्कृष्ट' },
  { minPercent: 70, grade: 'B+', gpa: 3.2, descEn: 'Very Good',   descNe: 'धेरै राम्रो' },
  { minPercent: 60, grade: 'B',  gpa: 2.8, descEn: 'Good',        descNe: 'राम्रो' },
  { minPercent: 50, grade: 'C+', gpa: 2.4, descEn: 'Satisfactory', descNe: 'सन्तोषजनक' },
  { minPercent: 40, grade: 'C',  gpa: 2.0, descEn: 'Acceptable',   descNe: 'ग्राह्य' },
  { minPercent: 35, grade: 'D',  gpa: 1.6, descEn: 'Basic',        descNe: 'आधारभूत' },
  { minPercent: 0,  grade: 'NG', gpa: 0.0, descEn: 'Non-Graded',   descNe: 'अवर्गीकृत' },
];

/**
 * Calculates grade and GPA for percentage score
 */
function getGradeFromPercentage(percentage) {
  if (percentage === null || percentage === undefined || isNaN(percentage)) {
    return CDC_GRADE_INTERVALS[CDC_GRADE_INTERVALS.length - 1]; // NG
  }
  const pct = Math.round(Number(percentage) * 100) / 100;
  for (const item of CDC_GRADE_INTERVALS) {
    if (pct >= item.minPercent) {
      return item;
    }
  }
  return CDC_GRADE_INTERVALS[CDC_GRADE_INTERVALS.length - 1];
}

/**
 * Evaluate single subject marks against CDC 2078 rules:
 * - Theory: min 35% pass mark
 * - Practical / Internal: min 40% pass mark
 * - Both must pass, otherwise result is NG.
 */
function evaluateSubjectMarks({
  theoryMarks,
  practicalMarks,
  theoryFull = 75,
  theoryPass = 26.25,
  practicalFull = 25,
  practicalPass = 10,
  isAbsent = false
}) {
  if (isAbsent) {
    return {
      theoryGrade: 'ABS',
      practicalGrade: practicalFull > 0 ? 'ABS' : '-',
      totalMarks: 0,
      percentage: 0,
      finalGrade: 'ABS',
      gradePoint: 0.0,
      isPassed: false,
      status: 'Absent'
    };
  }

  const thMarks = Number(theoryMarks) || 0;
  const prMarks = Number(practicalMarks) || 0;
  const totalMarks = thMarks + prMarks;
  const fullMarks = (Number(theoryFull) || 0) + (Number(practicalFull) || 0);

  const thPercent = theoryFull > 0 ? (thMarks / theoryFull) * 100 : 100;
  const prPercent = practicalFull > 0 ? (prMarks / practicalFull) * 100 : 100;
  const overallPercent = fullMarks > 0 ? (totalMarks / fullMarks) * 100 : 0;

  const thGradeObj = theoryFull > 0 ? getGradeFromPercentage(thPercent) : { grade: '-', gpa: 0 };
  const prGradeObj = practicalFull > 0 ? getGradeFromPercentage(prPercent) : { grade: '-', gpa: 0 };

  // Rule 2078: Must score >= 35% in theory AND >= 40% in practical
  const thPassed = theoryFull === 0 || thMarks >= (theoryPass || (theoryFull * 0.35));
  const prPassed = practicalFull === 0 || prMarks >= (practicalPass || (practicalFull * 0.40));

  let finalGradeObj = getGradeFromPercentage(overallPercent);

  // If failed either component, final grade becomes NG
  let isPassed = true;
  if (!thPassed || !prPassed || finalGradeObj.grade === 'NG') {
    finalGradeObj = {
      grade: 'NG',
      gpa: 0.0,
      descEn: 'Non-Graded',
      descNe: 'अवर्गीकृत'
    };
    isPassed = false;
  }

  return {
    theoryMarks: thMarks,
    practicalMarks: prMarks,
    totalMarks,
    percentage: Math.round(overallPercent * 100) / 100,
    theoryGrade: thGradeObj.grade,
    practicalGrade: prGradeObj.grade,
    finalGrade: finalGradeObj.grade,
    gradePoint: finalGradeObj.gpa,
    isPassed,
    thPassed,
    prPassed,
    descriptionEn: finalGradeObj.descEn,
    descriptionNe: finalGradeObj.descNe
  };
}

/**
 * Calculates overall GPA and result status for a student across all subjects
 */
function calculateStudentGPA(subjectEvaluations) {
  if (!subjectEvaluations || subjectEvaluations.length === 0) {
    return { gpa: 0.0, finalGrade: 'NG', remarks: 'No marks entered', hasFailed: true };
  }

  let totalCreditHours = 0;
  let totalGradePointProduct = 0;
  let hasNG = false;
  let failedSubjectsCount = 0;

  for (const item of subjectEvaluations) {
    const credits = Number(item.creditHours) || 4; // Default 4 credit hours if unspecified
    totalCreditHours += credits;
    totalGradePointProduct += (item.gradePoint * credits);

    if (item.finalGrade === 'NG' || item.finalGrade === 'ABS') {
      hasNG = true;
      failedSubjectsCount++;
    }
  }

  const rawGpa = totalCreditHours > 0 ? totalGradePointProduct / totalCreditHours : 0;
  const gpa = Math.round(rawGpa * 100) / 100;
  const gradeObj = getGradeFromPercentage((gpa / 4.0) * 100);

  return {
    gpa,
    finalGrade: hasNG ? 'NG' : gradeObj.grade,
    gradePoint: hasNG ? 0.0 : gpa,
    totalCreditHours,
    hasNG,
    failedSubjectsCount,
    resultStatus: hasNG ? 'Non-Graded (पुनर्परीक्षा आवश्यक)' : 'Passed (उत्तीर्ण)',
    remarksEn: hasNG ? `Non-Graded in ${failedSubjectsCount} subject(s). Eligible for grade increment exam.` : 'Promoted to next grade.',
    remarksNe: hasNG ? `${failedSubjectsCount} विषयमा अवर्गीकृत (NG)। ग्रेड वृद्धि परीक्षामा सहभागी हुन योग्य।` : 'माथिल्लो कक्षामा उत्तीर्ण/कक्षोन्नति।'
  };
}

module.exports = {
  CDC_GRADE_INTERVALS,
  getGradeFromPercentage,
  evaluateSubjectMarks,
  calculateStudentGPA
};
