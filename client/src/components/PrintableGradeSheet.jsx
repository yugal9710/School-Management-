import React from 'react';
import { Printer, X, Award, CheckCircle, AlertTriangle } from 'lucide-react';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function PrintableGradeSheet({ data, onClose, lang = 'ne' }) {
  if (!data) return null;
  const { school, exam, student, subjects, summary, gradingScale, issueDateBs } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '850px', maxHeight: '95vh' }}>
        {/* Top Action Bar (hidden when printing) */}
        <div className="modal-header no-print" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Award size={22} color="#facc15" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {lang === 'ne' ? 'नेपाल पाठ्यक्रम विकास केन्द्र (CDC) लब्धांक पत्र' : 'Nepal CDC Standard Grade Sheet'}
              </h3>
              <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: 0 }}>
                {student.nepaliName} ({student.name}) - {student.classNepaliName}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handlePrint} className="btn btn-primary" style={{ backgroundColor: '#2563eb' }}>
              <Printer size={16} />
              {lang === 'ne' ? 'प्रिन्ट गर्नुहोस्' : 'Print Grade Sheet'}
            </button>
            <button onClick={onClose} className="btn btn-outline" style={{ backgroundColor: '#ffffff', color: '#1e293b' }}>
              <X size={16} />
              {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="modal-body printable-document" style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
          <div style={{ border: '3px double #1e3a8a', padding: '1.5rem', borderRadius: '4px', position: 'relative' }}>
            
            {/* School Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #1e3a8a', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.5px' }}>
                GOVERNMENT OF NEPAL / नेपाल सरकार
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e3a8a', margin: '0.2rem 0' }}>
                {school.nepaliName}
              </h1>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#334155', margin: 0 }}>
                {school.name}
              </h2>
              <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.2rem' }}>
                {school.address} | फोन: {school.phone || '01-XXXXXXX'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                EMIS संकेत नं.: <strong style={{ color: '#1e3a8a' }}>{school.affiliationCode}</strong> | स्थापना: वि.सं. {school.establishedYearBs}
              </div>

              {/* Title Badge */}
              <div style={{
                display: 'inline-block',
                marginTop: '0.75rem',
                padding: '0.35rem 1.75rem',
                border: '1.5px solid #1e3a8a',
                borderRadius: '9999px',
                backgroundColor: '#eff6ff',
                color: '#1e3a8a',
                fontWeight: 700,
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                PROGRESS REPORT / लब्धांक पत्र
              </div>
              <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.35rem', fontWeight: 600 }}>
                {exam.termNepaliName} ({exam.name}) - {exam.academicYear}
              </div>
            </div>

            {/* Student Particulars Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.5rem', fontSize: '0.85rem', marginBottom: '1.25rem', padding: '0.6rem 0.8rem', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
              <div><strong>विद्यार्थीको नाम (Name):</strong> {student.nepaliName} / {student.name}</div>
              <div><strong>भर्ना नं. (Admission No):</strong> {student.admissionNo}</div>
              <div><strong>कक्षा / खण्ड (Grade & Section):</strong> {student.classNepaliName} ({student.className}), {student.sectionName}</div>
              <div><strong>रोल नं. (Roll No):</strong> {toNepaliDigits(student.rollNo)} ({student.rollNo})</div>
              <div><strong>जन्म मिति (Date of Birth):</strong> वि.सं. {student.dobBs} ({student.dobAd || '-'} AD)</div>
              <div><strong>अभिभावक (Guardian):</strong> {student.fatherName || student.motherName || '-'}</div>
              <div><strong>उपस्थिति (Attendance):</strong> {student.attendance.presentDays} / {student.attendance.totalDays} दिन ({student.attendance.percentage}%)</div>
              <div><strong>नतिजा मिति (Issue Date):</strong> {issueDateBs} BS</div>
            </div>

            {/* Subject Marks & Grades Table conforming to CDC 2078 */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', marginBottom: '1.25rem', border: '1px solid #94a3b8' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a8a', color: '#ffffff', textAlign: 'center' }}>
                  <th style={{ padding: '6px 8px', border: '1px solid #94a3b8' }} rowSpan="2">क्र.सं. (S.N.)</th>
                  <th style={{ padding: '6px 8px', border: '1px solid #94a3b8', textAlign: 'left' }} rowSpan="2">विषयहरू (Subjects)</th>
                  <th style={{ padding: '6px 8px', border: '1px solid #94a3b8' }} rowSpan="2">क्रेडिट घण्टा (CH)</th>
                  <th style={{ padding: '6px 8px', border: '1px solid #94a3b8' }} colSpan="2">प्राप्त ग्रेड (Obtained Grade)</th>
                  <th style={{ padding: '6px 8px', border: '1px solid #94a3b8' }} rowSpan="2">अन्तिम ग्रेड (Final Grade)</th>
                  <th style={{ padding: '6px 8px', border: '1px solid #94a3b8' }} rowSpan="2">ग्रेड पोइन्ट (GP)</th>
                  <th style={{ padding: '6px 8px', border: '1px solid #94a3b8' }} rowSpan="2">कैफियत (Remarks)</th>
                </tr>
                <tr style={{ backgroundColor: '#2563eb', color: '#ffffff', textAlign: 'center' }}>
                  <th style={{ padding: '4px 6px', border: '1px solid #94a3b8', fontSize: '0.75rem' }}>TH (सैद्धान्तिक)</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #94a3b8', fontSize: '0.75rem' }}>PR/IN (प्रयोगात्मक)</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub, idx) => (
                  <tr key={sub.code} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc', textAlign: 'center' }}>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1' }}>{toNepaliDigits(idx + 1)}</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{sub.nepaliName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub.name} ({sub.code})</div>
                    </td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1' }}>{sub.creditHours}</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 600 }}>{sub.theoryGrade}</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 600 }}>{sub.practicalGrade}</td>
                    <td style={{
                      padding: '6px 8px',
                      border: '1px solid #cbd5e1',
                      fontWeight: 700,
                      color: sub.finalGrade === 'NG' ? '#dc2626' : '#1e3a8a',
                      fontSize: '0.9rem'
                    }}>
                      {sub.finalGrade}
                    </td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 600 }}>{sub.gradePoint.toFixed(2)}</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontSize: '0.75rem', color: '#475569' }}>
                      {lang === 'ne' ? sub.descriptionNe : sub.descriptionEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* GPA Summary Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.25rem',
              backgroundColor: summary.hasNG ? '#fef2f2' : '#ecfdf5',
              border: `1.5px solid ${summary.hasNG ? '#f87171' : '#10b981'}`,
              borderRadius: '6px',
              marginBottom: '1.25rem'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase' }}>
                  GRADE POINT AVERAGE (GPA)
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: summary.hasNG ? '#b91c1c' : '#047857' }}>
                  {summary.gpa.toFixed(2)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: summary.hasNG ? '#b91c1c' : '#047857' }}>
                  {lang === 'ne' ? summary.resultStatus : (summary.hasNG ? 'Non-Graded (NG)' : 'Passed')}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                  {lang === 'ne' ? summary.remarksNe : summary.remarksEn}
                </div>
              </div>
            </div>

            {/* CDC Grading System Legend */}
            <div style={{ fontSize: '0.7rem', color: '#475569', borderTop: '1px dashed #cbd5e1', paddingTop: '0.6rem', marginBottom: '2.5rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>
                पाठ्यक्रम विकास केन्द्रको लेटर ग्रेडिङ निर्देशिका, २०७८ अनुसार ग्रेडिङ विवरण:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem' }}>
                <span>A+ (९०-१००%: 4.0 GP)</span>
                <span>A (८०-९०%: 3.6 GP)</span>
                <span>B+ (७०-८०%: 3.2 GP)</span>
                <span>B (६०-७०%: 2.8 GP)</span>
                <span>C+ (५०-६०%: 2.4 GP)</span>
                <span>C (४०-५०%: 2.0 GP)</span>
                <span>D (३५-४०%: 1.6 GP)</span>
                <span style={{ color: '#b91c1c', fontWeight: 600 }}>NG (३५ भन्दा कम: 0.0 GP)</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid #cbd5e1' }}>
              <div style={{ textAlign: 'center', width: '150px' }}>
                <div style={{ borderBottom: '1px dotted #475569', marginBottom: '0.35rem', height: '30px' }}></div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>कक्षा शिक्षक (Class Teacher)</div>
              </div>

              <div style={{ textAlign: 'center', width: '150px' }}>
                <div style={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '50%',
                  border: '1.5px dashed #94a3b8',
                  margin: '0 auto 0.35rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  color: '#94a3b8'
                }}>
                  विद्यालय छाप (SEAL)
                </div>
              </div>

              <div style={{ textAlign: 'center', width: '150px' }}>
                <div style={{ borderBottom: '1px dotted #475569', marginBottom: '0.35rem', height: '30px' }}></div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>प्रधानाध्यापक (Headteacher)</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
