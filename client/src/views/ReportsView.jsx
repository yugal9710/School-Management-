import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  ShieldCheck,
  PieChart,
  BarChart3,
  Calendar,
  Users,
  CheckCircle,
  Clock
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function ReportsView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [demographics, setDemographics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [demoRes, auditRes] = await Promise.all([
        fetch('/api/reports/demographics', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/reports/audit-logs', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (demoRes.ok) setDemographics(await demoRes.json());
      if (auditRes.ok) setAuditLogs(await auditRes.json());
    } catch (err) {
      console.warn('Reports error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadIemisCsv = () => {
    const link = document.createElement('a');
    link.href = '/api/reports/iemis/students.csv';
    link.setAttribute('download', `IEMIS_${tenant?.affiliation_code || 'School'}_Students.csv`);
    // Add token header via direct fetch or standard trigger
    fetch('/api/reports/iemis/students.csv', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CEHRD_IEMIS_${tenant?.affiliation_code || '270010001'}_Students.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'शैक्षिक प्रतिवेदन तथा नेपाल सरकार IEMIS निर्यात' : 'Reports & Government Education Data'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'CEHRD IEMIS पोर्टल ढाँचा, समावेशी जनसांख्यिकीय विश्लेषण र अडिट लग' : 'Official CEHRD IEMIS CSV export, demographics & system audit logs'}
          </p>
        </div>

        <button onClick={handleDownloadIemisCsv} className="btn btn-primary" style={{ backgroundColor: '#059669' }}>
          <Download size={16} />
          {lang === 'ne' ? 'CEHRD IEMIS CSV निर्यात' : 'Export Official IEMIS CSV'}
        </button>
      </div>

      {/* Official IEMIS Banner Card */}
      <div className="card" style={{
        marginBottom: '1.5rem',
        backgroundColor: '#f0fdf4',
        border: '1.5px solid #86efac',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#166534', fontSize: '1.05rem' }}>
            <FileSpreadsheet size={20} color="#166534" />
            <span>नेपाल सरकार, शिक्षा तथा मानव स्रोत विकास केन्द्र (CEHRD) IEMIS एकीकरण</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#15803d', margin: '0.35rem 0 0 0' }}>
            यस प्रणालीको विद्यार्थी विवरण आधिकारिक सरकारी IEMIS (emis.cehrd.gov.np) एक्सेल/CSV अपलोड निर्देशिका बमोजिम युनिकोड नेपाली नाम (UTF-8 BOM), जात/जाति कोड (१ देखि ७), र अपाङ्गता प्रकार सहित पूर्ण अनुकूल छ।
          </p>
        </div>

        <button onClick={handleDownloadIemisCsv} className="btn btn-success" style={{ whiteSpace: 'nowrap' }}>
          <Download size={15} />
          IEMIS CSV डाउनलोड
        </button>
      </div>

      {/* Demographic Breakdown KPI Cards */}
      {demographics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
          
          {/* Gender Parity */}
          <div className="card">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
              लैङ्गिक अनुपात (Gender Distribution)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              {demographics.genderStats.map(g => (
                <div key={g.gender} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{g.gender === 'male' ? 'छात्र (Boys)' : g.gender === 'female' ? 'छात्रा (Girls)' : 'अन्य (Other)'}:</span>
                  <span className="badge badge-blue">{toNepaliDigits(g.count)} जना</span>
                </div>
              ))}
            </div>
          </div>

          {/* Caste / Ethnicity Categories */}
          <div className="card">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
              जात/जाति समूह (IEMIS Ethnicity)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
              {demographics.casteStats.map(c => (
                <div key={c.caste_ethnicity} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{c.caste_ethnicity}:</span>
                  <span className="badge badge-gray">{toNepaliDigits(c.count)} जना</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disability / Learning Needs */}
          <div className="card">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
              अपाङ्गता तथा विशेष सिकाइ आवश्यकता
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              {demographics.disabilityStats.map(d => (
                <div key={d.disability_status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{d.disability_status === 'none' ? 'सामान्य (None)' : d.disability_status}:</span>
                  <span className={`badge ${d.disability_status === 'none' ? 'badge-green' : 'badge-amber'}`}>
                    {toNepaliDigits(d.count)} जना
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* System Audit Logs Trail */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', color: '#1e293b', marginBottom: '0.75rem' }}>
          <ShieldCheck size={18} color="#2563eb" />
          <span>{lang === 'ne' ? 'प्रणाली अडिट लग (System Compliance Audit Trail)' : 'System Audit Trail'}</span>
        </div>

        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>मिति तथा समय (Timestamp)</th>
                <th>प्रयोगकर्ता (User)</th>
                <th>कार्य (Action)</th>
                <th>इकाई प्रकार (Entity)</th>
                <th>इकाई कोड (ID)</th>
                <th>विस्तृत विवरण (Details)</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {log.created_at}
                  </td>
                  <td style={{ fontWeight: 600, color: '#1e3a8a' }}>
                    {log.username}
                  </td>
                  <td>
                    <span className="badge badge-blue">
                      {log.action}
                    </span>
                  </td>
                  <td>{log.entity_type}</td>
                  <td style={{ fontSize: '0.75rem', color: '#64748b' }}>{log.entity_id}</td>
                  <td style={{ fontSize: '0.75rem', color: '#334155', maxWidth: '300px' }}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
