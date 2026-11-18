import React, { useState, useEffect } from 'react';
import { Landmark, School, Users, GraduationCap, CalendarCheck, ShieldCheck } from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function PalikaOverviewView({ token, lang = 'ne', user }) {
  const t = translations[lang] || translations.ne;
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPalikaSummary();
  }, []);

  const fetchPalikaSummary = async () => {
    try {
      const res = await fetch('/api/reports/palika-summary', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setSummary(await res.json());
      }
    } catch (err) {
      console.warn('Palika summary error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'पालिका शिक्षा शाखा अनुगमन ड्यासबोर्ड (Municipal Oversight)' : 'Municipal Education Oversight'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'स्वीकृत विद्यालयहरूको तुलनात्मक तथ्याङ्क, विद्यार्थी उपस्थिति तथा दरबन्दी अनुगमन' : 'Comparative education data, enrollment & staffing across assigned municipal schools'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#eff6ff', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #bfdbfe', fontSize: '0.8rem', color: '#1e40af', fontWeight: 600 }}>
          <Landmark size={16} />
          <span>ललितपुर महानगरपालिका शिक्षा शाखा (Authorized Oversight)</span>
        </div>
      </div>

      {summary && (
        <>
          {/* Key Municipal Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>कुल विद्यालय संख्या</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e3a8a', margin: '0.2rem 0' }}>
                {toNepaliDigits(summary.totalSchools)} विद्यालय
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                सामुदायिक: {toNepaliDigits(summary.communitySchools)} | संस्थागत: {toNepaliDigits(summary.institutionalSchools)}
              </div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #059669' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>कुल विद्यार्थी संख्या</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#047857', margin: '0.2rem 0' }}>
                {toNepaliDigits(summary.totalStudents)} जना
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669' }}>
                छात्र: {toNepaliDigits(summary.genderBreakdown.male)} | छात्रा: {toNepaliDigits(summary.genderBreakdown.female)}
              </div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #d97706' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>शिक्षक तथा कर्मचारी</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d97706', margin: '0.2rem 0' }}>
                {toNepaliDigits(summary.totalTeachers)} जना
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                स्वीकृत दरबन्दी
              </div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #7c3aed' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>अपाङ्गता भएका बालबालिका</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#6b21a8', margin: '0.2rem 0' }}>
                {toNepaliDigits(summary.disabilityCount)} जना
              </div>
              <div style={{ fontSize: '0.75rem', color: '#7c3aed' }}>
                विशेष सिकाइ सहायता प्राप्त
              </div>
            </div>
          </div>

          {/* Comparative Schools Table */}
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
              {lang === 'ne' ? 'नगरपालिका/गाउँपालिका भित्रका विद्यालयहरूको प्रगति विवरण' : 'Assigned Schools Performance Summary'}
            </h3>

            <div className="custom-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>विद्यालयको नाम (School Name)</th>
                    <th>प्रकार (Category)</th>
                    <th>वडा नं. (Ward)</th>
                    <th style={{ textAlign: 'center' }}>कुल विद्यार्थी</th>
                    <th style={{ textAlign: 'center' }}>शिक्षक संख्या</th>
                    <th style={{ textAlign: 'center' }}>औसत उपस्थिति दर</th>
                    <th style={{ textAlign: 'center' }}>IEMIS स्थिति</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.schoolsList.map(s => (
                    <tr key={s.tenantId}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{s.nepaliName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.name}</div>
                      </td>
                      <td>
                        <span className={`badge ${s.category === 'community' ? 'badge-blue' : 'badge-purple'}`}>
                          {s.category === 'community' ? 'सामुदायिक' : 'संस्थागत'}
                        </span>
                      </td>
                      <td>वडा नं. {s.ward}</td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>{toNepaliDigits(s.studentsCount)}</td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>{toNepaliDigits(s.teachersCount)}</td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: '#047857' }}>{s.attendanceRate}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="badge badge-green">अध्यावधिक (Synced)</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
