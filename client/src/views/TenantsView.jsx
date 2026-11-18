import React, { useState, useEffect } from 'react';
import { Building2, Plus, Power, ShieldAlert, CheckCircle, ExternalLink, X } from 'lucide-react';
import { translations, NEPAL_PROVINCES, NEPAL_DISTRICTS } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function TenantsView({ token, lang = 'ne', user }) {
  const t = translations[lang] || translations.ne;
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    code: 'BBS-27003',
    name: 'Bhanu Bhakta Secondary School',
    nepali_name: 'श्री भानुभक्त माध्यमिक विद्यालय',
    category: 'community',
    education_type: 'secondary',
    affiliation_code: '270030012',
    province: 'बागमती प्रदेश (Bagmati)',
    district: 'काठमाडौँ (Kathmandu)',
    municipality: 'काठमाडौँ महानगरपालिका',
    ward: '२८',
    tole: 'रानीपोखरी',
    phone: '01-4221100',
    email: 'info@bhanubhakta.edu.np',
    principal_name: 'हरि प्रसाद रेग्मी',
    date_format_pref: 'BS',
    default_language: 'ne',
    admin_username: 'admin.bhanu',
    admin_password: 'admin123'
  });

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await fetch('/api/tenants', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setTenants(await res.json());
      }
    } catch (err) {
      console.warn('Error fetching tenants:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (tenantId, currentStatus) => {
    try {
      const res = await fetch(`/api/tenants/${tenantId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      if (res.ok) {
        fetchTenants();
      }
    } catch (err) {
      alert('Status change error');
    }
  };

  const handleCreateTenant = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to onboard school');
      } else {
        alert(lang === 'ne' ? 'नयाँ विद्यालय सफलतापूर्वक दर्ता भयो!' : 'School tenant onboarded successfully!');
        setShowAddModal(false);
        fetchTenants();
      }
    } catch (err) {
      alert('Network error during onboarding');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'केन्द्रीय विद्यालय व्यवस्थापन (Multi-Tenant Management)' : 'Multi-Tenant Schools Management'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'केन्द्रीय प्रणालीमा दर्ता भएका स्वतन्त्र विद्यालयहरू, अनुमति र डेटा पृथकीकरण' : 'Independent school tenants, strict data isolation & platform oversight'}
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={16} />
          {lang === 'ne' ? 'नयाँ विद्यालय थप्नुहोस् (Onboard School)' : 'Onboard New School'}
        </button>
      </div>

      {/* Tenants Table */}
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>विद्यालय कोड</th>
              <th>विद्यालयको नाम (School Name)</th>
              <th>प्रकार (Category)</th>
              <th>तह (Level)</th>
              <th>स्थानीय तह / ठेगाना</th>
              <th style={{ textAlign: 'center' }}>विद्यार्थी</th>
              <th style={{ textAlign: 'center' }}>शिक्षक</th>
              <th style={{ textAlign: 'center' }}>क्यालेन्डर</th>
              <th style={{ textAlign: 'center' }}>स्थिति</th>
              <th style={{ textAlign: 'center' }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tnt => (
              <tr key={tnt.id}>
                <td style={{ fontWeight: 700, color: '#1e40af' }}>{tnt.code}</td>
                <td>
                  <div style={{ fontWeight: 700 }}>{tnt.nepali_name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{tnt.name} (EMIS: {tnt.affiliation_code})</div>
                </td>
                <td>
                  <span className={`badge ${tnt.category === 'community' ? 'badge-blue' : 'badge-purple'}`}>
                    {tnt.category === 'community' ? 'सामुदायिक' : 'संस्थागत'}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem' }}>{tnt.education_type}</td>
                <td style={{ fontSize: '0.8rem' }}>{tnt.municipality}, वडा {tnt.ward}</td>
                <td style={{ textAlign: 'center', fontWeight: 600 }}>{toNepaliDigits(tnt.studentCount || 0)}</td>
                <td style={{ textAlign: 'center', fontWeight: 600 }}>{toNepaliDigits(tnt.staffCount || 0)}</td>
                <td style={{ textAlign: 'center' }}><span className="badge badge-gray">{tnt.date_format_pref}</span></td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`badge ${tnt.is_active ? 'badge-green' : 'badge-red'}`}>
                    {tnt.is_active ? 'सक्रिय (Active)' : 'निलम्बित (Suspended)'}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => handleToggleStatus(tnt.id, tnt.is_active)}
                    className="btn btn-outline btn-sm"
                    style={{
                      fontSize: '0.75rem',
                      color: tnt.is_active ? '#dc2626' : '#059669',
                      borderColor: tnt.is_active ? '#fecaca' : '#a7f3d0'
                    }}
                  >
                    <Power size={12} />
                    {tnt.is_active ? 'निलम्बन' : 'सक्रिय'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Onboard School Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>नयाँ विद्यालय दर्ता (Onboard Tenant School)</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateTenant}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यालय कोड (Unique Code) *</label>
                    <input type="text" className="form-input" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>सरकारी EMIS संकेत नं. *</label>
                    <input type="text" className="form-input" value={form.affiliation_code} onChange={(e) => setForm({ ...form, affiliation_code: e.target.value })} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यालयको नाम नेपालीमा *</label>
                    <input type="text" className="form-input" value={form.nepali_name} onChange={(e) => setForm({ ...form, nepali_name: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>School Name in English *</label>
                    <input type="text" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यालय प्रकार *</label>
                    <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      <option value="community">सामुदायिक (Community)</option>
                      <option value="institutional">संस्थागत (Institutional)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>शैक्षिक तह (Level)</label>
                    <select className="form-select" value={form.education_type} onChange={(e) => setForm({ ...form, education_type: e.target.value })}>
                      <option value="basic">आधारभूत (१-८)</option>
                      <option value="secondary">माध्यमिक (९-१२)</option>
                      <option value="integrated">एकीकृत (१-१२)</option>
                      <option value="technical">प्राविधिक धार</option>
                      <option value="religious">धार्मिक (गुरुकुल/मदरसा)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>क्यालेन्डर प्राथमिकता</label>
                    <select className="form-select" value={form.date_format_pref} onChange={(e) => setForm({ ...form, date_format_pref: e.target.value })}>
                      <option value="BS">वि.सं. (BS Only)</option>
                      <option value="BOTH">दुवै (BS + AD)</option>
                      <option value="AD">ई.सं. (AD Only)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>जिल्ला (District)</label>
                    <input type="text" className="form-input" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>स्थानीय तह (Municipality)</label>
                    <input type="text" className="form-input" value={form.municipality} onChange={(e) => setForm({ ...form, municipality: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>वडा नं. (Ward)</label>
                    <input type="text" className="form-input" value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} required />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.6rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e3a8a', marginBottom: '0.4rem' }}>
                    प्रारम्भिक विद्यालय प्रशासक खाता (Initial School Admin Login)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Username *</label>
                      <input type="text" className="form-input" value={form.admin_username} onChange={(e) => setForm({ ...form, admin_username: e.target.value })} required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Password *</label>
                      <input type="password" className="form-input" value={form.admin_password} onChange={(e) => setForm({ ...form, admin_password: e.target.value })} required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">रद्द गर्नुहोस्</button>
                <button type="submit" className="btn btn-primary">दर्ता सम्पन्न गर्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
