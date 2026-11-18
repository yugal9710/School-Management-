import React, { useState, useEffect } from 'react';
import { Bell, Plus, Calendar, AlertCircle, X, Send } from 'lucide-react';
import { translations } from '../utils/translations';

export default function NoticesView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    title: 'Final Examination Preparation Routine',
    title_nepali: 'वार्षिक परीक्षा तयारी तथा कार्यतालिका सम्बन्धी सूचना',
    content: 'The final examination schedule has been finalized. All subject teachers are requested to submit draft question papers by 2081-11-10.',
    content_nepali: 'वार्षिक परीक्षाको कार्यतालिका अन्तिम रूपमा तय गरिएको छ। सबै विषय शिक्षकहरूले २०८१/११/१० भित्र मस्यौदा प्रश्नपत्रहरू परीक्षा शाखामा बुझाउनुहुन अनुरोध छ।',
    priority: 'normal',
    target_roles: ['all']
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch('/api/communication/notices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotices(await res.json());
      }
    } catch (err) {
      console.warn('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/communication/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert(lang === 'ne' ? 'सूचना सफलतापूर्वक प्रकाशित गरियो!' : 'Notice published successfully!');
        setShowAddModal(false);
        fetchNotices();
      }
    } catch (err) {
      alert('Error publishing notice');
    }
  };

  const canPublish = ['school_admin', 'super_admin', 'teacher'].includes(user?.role);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'विद्यालय सूचना तथा सञ्चार पाटी (Notice Board)' : 'Notices & Announcements'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'नेपाली तथा अंग्रेजी भाषामा विद्यालय परिपत्र तथा जानकारी' : 'Bilingual notices, circulars and family communication'}
          </p>
        </div>

        {canPublish && (
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <Plus size={16} />
            {lang === 'ne' ? 'नयाँ सूचना जारी गर्नुहोस्' : 'Publish Notice'}
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notices.map(n => (
          <div
            key={n.id}
            className="card"
            style={{
              borderLeft: `4px solid ${n.priority === 'urgent' ? '#dc2626' : '#2563eb'}`,
              backgroundColor: n.priority === 'urgent' ? '#fffaf0' : '#ffffff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={18} color={n.priority === 'urgent' ? '#dc2626' : '#2563eb'} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                  {lang === 'ne' ? n.title_nepali : n.title}
                </h3>
              </div>
              <span className={`badge ${n.priority === 'urgent' ? 'badge-red' : 'badge-blue'}`}>
                {n.priority === 'urgent' ? 'अत्यावश्यक (Urgent)' : 'सामान्य'}
              </span>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.5rem' }}>
              {lang === 'ne' ? n.title : n.title_nepali}
            </div>

            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
              {lang === 'ne' ? n.content_nepali : n.content}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={13} />
                <span>प्रकाशन मिति: {n.published_date_bs} वि.सं.</span>
              </div>
              <div>जारीकर्ता: <strong>{n.created_by}</strong></div>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Notice Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>नयाँ सूचना जारी गर्नुहोस्</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateNotice}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>सूचनाको शीर्षक (नेपाली देवनागरीमा) *</label>
                  <input type="text" className="form-input" value={form.title_nepali} onChange={(e) => setForm({ ...form, title_nepali: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Notice Title (English) *</label>
                  <input type="text" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>सूचना विवरण नेपालीमा *</label>
                  <textarea rows="3" className="form-textarea" value={form.content_nepali} onChange={(e) => setForm({ ...form, content_nepali: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Content in English *</label>
                  <textarea rows="3" className="form-textarea" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>प्राथमिकता (Priority)</label>
                  <select className="form-select" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                    <option value="normal">सामान्य (Normal)</option>
                    <option value="urgent">अत्यावश्यक (Urgent)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">रद्द गर्नुहोस्</button>
                <button type="submit" className="btn btn-primary">सूचना जारी गर्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
