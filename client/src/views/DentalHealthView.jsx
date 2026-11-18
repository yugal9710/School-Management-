import React, { useState, useEffect } from 'react';
import {
  HeartPulse,
  Plus,
  Search,
  Filter,
  Send,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
  X,
  Phone,
  FileText
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';
import NepaliDatePicker from '../components/NepaliDatePicker';

export default function DentalHealthView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);

  // New Dental Checkup Form
  const [form, setForm] = useState({
    student_id: '',
    checkup_date_bs: '2081-05-20',
    camp_name: 'वार्षिक विद्यालय दन्त स्वास्थ्य शिविर २०८१',
    dentist_name: 'डा. अनुपमा श्रेष्ठ (Dr. Anupama Shrestha, BDS)',
    dentist_nmc_no: 'NMC-DEN-4521',
    caries_count: 0,
    cavity_teeth: '',
    missing_count: 0,
    filled_count: 0,
    plaque_status: 'mild',
    gum_condition: 'healthy',
    oral_hygiene: 'good',
    recommendation: 'दिनको दुई पटक फ्लोराइडयुक्त मञ्जनले ब्रस गर्ने सल्लाह।'
  });

  useEffect(() => {
    fetchDentalData();
    fetchStudentsAndClasses();
  }, [selectedClass, searchTerm]);

  const fetchDentalData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedClass) params.append('class_id', selectedClass);
      if (searchTerm) params.append('search', searchTerm);

      const [recRes, statRes] = await Promise.all([
        fetch(`/api/dental?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/dental/stats', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (recRes.ok) setRecords(await recRes.json());
      if (statRes.ok) setStats(await statRes.json());
    } catch (err) {
      console.warn('Dental data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsAndClasses = async () => {
    try {
      const [stuRes, clsRes] = await Promise.all([
        fetch('/api/students', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/academics/classes', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (stuRes.ok) {
        const sList = await stuRes.json();
        setStudents(sList);
        if (sList.length > 0 && !form.student_id) {
          setForm(prev => ({ ...prev, student_id: sList[0].id }));
        }
      }
      if (clsRes.ok) setClasses(await clsRes.json());
    } catch (err) {
      console.warn('Error fetching students/classes:', err);
    }
  };

  const handleCreateCheckup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/dental', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert(lang === 'ne' ? 'दन्त परीक्षण विवरण सफलतापूर्वक सुरक्षित गरियो!' : 'Dental record saved successfully!');
        setShowAddModal(false);
        fetchDentalData();
      }
    } catch (err) {
      alert('Failed to save dental record');
    }
  };

  const handleNotifyParent = async (recordId) => {
    try {
      const res = await fetch(`/api/dental/notify/${recordId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setNotificationToast(data);
        fetchDentalData();
      } else {
        alert(data.error || 'Failed to send notification');
      }
    } catch (err) {
      alert('Notification error');
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HeartPulse size={22} color="#ec4899" />
            <span>{lang === 'ne' ? 'विद्यार्थी दन्त तथा मुख स्वास्थ्य क्लिनिक (Dental Health)' : 'Student Dental Health & Clinic'}</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'वार्षिक दन्त परीक्षण शिविर, क्याभिटी जाँच, मुख स्वास्थ्य स्तर र अभिभावक परामर्श' : 'Annual dental screening camps, caries monitoring & parental dental advice'}
          </p>
        </div>

        {['school_admin', 'teacher', 'super_admin'].includes(user?.role) && (
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{ backgroundColor: '#ec4899' }}>
            <Plus size={16} />
            {lang === 'ne' ? 'नयाँ दन्त परीक्षण दर्ता' : 'Record Dental Exam'}
          </button>
        )}
      </div>

      {/* KPI Cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ borderLeft: '4px solid #ec4899' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>परीक्षण गरिएका विद्यार्थी</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#be185d', margin: '0.2rem 0' }}>
              {toNepaliDigits(stats.totalScreened)} जना
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>विद्यालय दन्त शिविर</div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>क्याभिटी दर (Caries Rate)</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#b91c1c', margin: '0.2rem 0' }}>
              {toNepaliDigits(stats.cariesPrevalencePct)}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>
              {toNepaliDigits(stats.studentsWithCaries)} जनामा किराले खाएको
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>तुरुन्त उपचार आवश्यक</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d97706', margin: '0.2rem 0' }}>
              {toNepaliDigits(stats.needTreatment)} जना
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>दाँत भर्ने / स्केलिङ</div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>उत्कृष्ट मुख स्वास्थ्य</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#047857', margin: '0.2rem 0' }}>
              {toNepaliDigits(stats.hygieneDistribution.good + stats.hygieneDistribution.excellent)} जना
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10b981' }}>नियमित हेरचाह</div>
          </div>
        </div>
      )}

      {/* Notification Success Toast */}
      {notificationToast && (
        <div style={{
          backgroundColor: '#fdf2f8',
          border: '1px solid #fbcfe8',
          borderRadius: '0.5rem',
          padding: '0.85rem',
          marginBottom: '1rem',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, color: '#be185d' }}>
              ✓ {notificationToast.message} (सम्पर्क: {notificationToast.recipient})
            </div>
            <button onClick={() => setNotificationToast(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <X size={16} />
            </button>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#831843', marginTop: '0.4rem' }}>
            {notificationToast.messageNe}
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1.5 }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={lang === 'ne' ? 'विद्यार्थीको नामबाट खोज्नुहोस्...' : 'Search student dental records...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2rem' }}
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="form-select"
            style={{ flex: 1 }}
          >
            <option value="">{lang === 'ne' ? 'सबै कक्षाहरू (All Grades)' : 'All Grades'}</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.nepali_name} ({c.name})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dental Records Table */}
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '45px', textAlign: 'center' }}>रोल</th>
              <th>विद्यार्थीको नाम (Student)</th>
              <th>कक्षा / खण्ड</th>
              <th>परीक्षण मिति</th>
              <th style={{ textAlign: 'center' }}>क्याभिटी (Caries)</th>
              <th>समस्या भएको दाँत (Location)</th>
              <th style={{ textAlign: 'center' }}>मुख स्वास्थ्य स्तर</th>
              <th>दन्त चिकित्सकको सल्लाह (Advice)</th>
              <th style={{ textAlign: 'center' }}>अभिभावक परामर्श</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  दन्त परीक्षण अभिलेख लोड हुँदैछ...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  कुनै दन्त परीक्षण अभिलेख फेला परेन।
                </td>
              </tr>
            ) : (
              records.map(r => (
                <tr key={r.id}>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>
                    {toNepaliDigits(r.roll_number || '-')}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{r.full_name_nepali}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.first_name} {r.last_name} ({r.admission_number})</div>
                  </td>
                  <td>{r.class_nepali_name} - {r.section_name}</td>
                  <td style={{ fontSize: '0.8rem', color: '#475569' }}>वि.सं. {r.checkup_date_bs}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      color: r.caries_count > 0 ? '#dc2626' : '#059669'
                    }}>
                      {toNepaliDigits(r.caries_count)}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#334155' }}>
                    {r.cavity_teeth || <span style={{ color: '#94a3b8' }}>-</span>}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${
                      r.oral_hygiene === 'excellent' ? 'badge-green' :
                      r.oral_hygiene === 'good' ? 'badge-blue' :
                      r.oral_hygiene === 'fair' ? 'badge-amber' : 'badge-red'
                    }`}>
                      {r.oral_hygiene === 'excellent' ? 'उत्कृष्ट' :
                       r.oral_hygiene === 'good' ? 'राम्रो' :
                       r.oral_hygiene === 'fair' ? 'मध्यम' : 'कमजोर'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: '#475569', maxWidth: '280px' }}>
                    {r.recommendation}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {r.caries_count > 0 ? (
                      <button
                        onClick={() => handleNotifyParent(r.id)}
                        className={`btn btn-sm ${r.parent_notified ? 'btn-outline' : 'btn-primary'}`}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.2rem 0.5rem',
                          backgroundColor: r.parent_notified ? '#ffffff' : '#be185d',
                          borderColor: '#f472b6',
                          color: r.parent_notified ? '#be185d' : '#ffffff'
                        }}
                      >
                        <Send size={11} />
                        {r.parent_notified ? 'पुनः SMS पठाउनुहोस्' : 'अभिभावकलाई SMS'}
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#059669' }}>स्वस्थ ✓</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Checkup Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '620px' }}>
            <div className="modal-header" style={{ backgroundColor: '#be185d', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HeartPulse size={20} />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                  विद्यार्थी दन्त परीक्षण दर्ता फारम (Dental Exam Entry)
                </h3>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateCheckup}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '70vh', overflowY: 'auto' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यार्थी छनौट गर्नुहोस् *</label>
                  <select
                    className="form-select"
                    value={form.student_id}
                    onChange={(e) => setForm({ ...form, student_id: e.target.value })}
                    required
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.full_name_nepali} ({s.admission_number}) - {s.class_nepali_name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <NepaliDatePicker
                      label="परीक्षण मिति वि.सं. (Checkup Date)"
                      value={form.checkup_date_bs}
                      onChange={(d) => setForm({ ...form, checkup_date_bs: d })}
                      lang={lang}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>परीक्षक दन्त चिकित्सक (Dentist) *</label>
                    <input type="text" className="form-input" value={form.dentist_name} onChange={(e) => setForm({ ...form, dentist_name: e.target.value })} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>किराले खाएको दाँत (Caries)</label>
                    <input type="number" min="0" className="form-input" value={form.caries_count} onChange={(e) => setForm({ ...form, caries_count: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>भरिएको दाँत (Filled)</label>
                    <input type="number" min="0" className="form-input" value={form.filled_count} onChange={(e) => setForm({ ...form, filled_count: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>समग्र मुख स्वास्थ्य (Hygiene)</label>
                    <select className="form-select" value={form.oral_hygiene} onChange={(e) => setForm({ ...form, oral_hygiene: e.target.value })}>
                      <option value="excellent">उत्कृष्ट (Excellent)</option>
                      <option value="good">राम्रो (Good)</option>
                      <option value="fair">मध्यम (Fair)</option>
                      <option value="poor">कमजोर (Poor)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>समस्या भएको दाँतको विवरण (Tooth Number/Location)</label>
                  <input type="text" className="form-input" placeholder="उदा: तल्लो देब्रे बंगारा #36" value={form.cavity_teeth} onChange={(e) => setForm({ ...form, cavity_teeth: e.target.value })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>दन्त चिकित्सकको परामर्श तथा उपचार सिफारिस *</label>
                  <textarea rows="2" className="form-textarea" value={form.recommendation} onChange={(e) => setForm({ ...form, recommendation: e.target.value })} required />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">रद्द गर्नुहोस्</button>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#be185d' }}>दर्ता गर्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
