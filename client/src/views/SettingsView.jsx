import React, { useState, useEffect } from 'react';
import { Settings, Save, ShieldCheck, Globe, Calendar, School, Check } from 'lucide-react';
import { translations } from '../utils/translations';
import {
  NEPAL_PROVINCES,
  getDistrictsByProvince,
  getLocalLevelsByDistrict,
  getWardsByLocalLevel
} from '../utils/nepalAdministrativeData';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function SettingsView({ token, lang = 'ne', tenant, onUpdateTenant }) {
  const t = translations[lang] || translations.ne;
  const [form, setForm] = useState({
    name: '',
    nepali_name: '',
    category: 'community',
    education_type: 'secondary',
    affiliation_code: '',
    province: 'Bagmati',
    district: 'Lalitpur',
    municipality: 'Lalitpur',
    ward: '5',
    tole: '',
    phone: '',
    email: '',
    established_year_bs: 2028,
    principal_name: '',
    date_format_pref: 'BS',
    default_language: 'ne'
  });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (tenant) {
      setForm({
        name: tenant.name || '',
        nepali_name: tenant.nepali_name || '',
        category: tenant.category || 'community',
        education_type: tenant.education_type || 'secondary',
        affiliation_code: tenant.affiliation_code || '',
        province: tenant.province || 'Bagmati',
        district: tenant.district || 'Lalitpur',
        municipality: tenant.municipality || 'Lalitpur',
        ward: tenant.ward ? String(tenant.ward) : '5',
        tole: tenant.tole || '',
        phone: tenant.phone || '',
        email: tenant.email || '',
        established_year_bs: tenant.established_year_bs || 2028,
        principal_name: tenant.principal_name || '',
        date_format_pref: tenant.date_format_pref || 'BS',
        default_language: tenant.default_language || 'ne'
      });
    }
  }, [tenant]);

  const handleProvinceChange = (newProv) => {
    const districts = getDistrictsByProvince(newProv);
    const firstDist = districts[0]?.id || '';
    const lls = getLocalLevelsByDistrict(newProv, firstDist);
    const firstLL = lls[0]?.name || '';
    const wards = getWardsByLocalLevel(newProv, firstDist, firstLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setForm(prev => ({
      ...prev,
      province: newProv,
      district: firstDist,
      municipality: firstLL,
      ward: firstWard
    }));
  };

  const handleDistrictChange = (newDist) => {
    const lls = getLocalLevelsByDistrict(form.province, newDist);
    const firstLL = lls[0]?.name || '';
    const wards = getWardsByLocalLevel(form.province, newDist, firstLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setForm(prev => ({
      ...prev,
      district: newDist,
      municipality: firstLL,
      ward: firstWard
    }));
  };

  const handleMunicipalityChange = (newLL) => {
    const wards = getWardsByLocalLevel(form.province, form.district, newLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setForm(prev => ({
      ...prev,
      municipality: newLL,
      ward: firstWard
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenant) return;
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch(`/api/tenants/${tenant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSavedSuccess(true);
        if (onUpdateTenant) onUpdateTenant(data.tenant);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      alert('Network error saving settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'विद्यालय तथा प्रणाली सेटिङ (School Configuration)' : 'School Setup & Rules Configuration'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'क्यालेन्डर ढाँचा (वि.सं./ई.सं.), भाषा, ठेगाना र आधिकारिक विवरण' : 'Configure calendar display, language, address & official profiles'}
          </p>
        </div>

        {savedSuccess && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#047857', fontWeight: 600, fontSize: '0.85rem' }}>
            <Check size={16} />
            <span>सेटिङ सुरक्षित गरियो!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '850px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* General Identification */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
              १. आधिकारिक विद्यालय पहिचान (School Profile)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यालयको नाम (नेपालीमा) *</label>
                <input type="text" className="form-input" value={form.nepali_name} onChange={(e) => setForm({ ...form, nepali_name: e.target.value })} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>School Name (English) *</label>
                <input type="text" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>EMIS संकेत नं. *</label>
                <input type="text" className="form-input" value={form.affiliation_code} onChange={(e) => setForm({ ...form, affiliation_code: e.target.value })} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यालय प्रकार</label>
                <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="community">सामुदायिक (Community)</option>
                  <option value="institutional">संस्थागत (Institutional)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>प्रधानाध्यापकको नाम</label>
                <input type="text" className="form-input" value={form.principal_name} onChange={(e) => setForm({ ...form, principal_name: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Localization & Date Rules */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
              २. क्यालेन्डर तथा भाषा प्राथमिकता (Calendar & Date Display Rules)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  मिति प्रदर्शन प्राथमिकता (Date Display Preference) *
                </label>
                <select className="form-select" value={form.date_format_pref} onChange={(e) => setForm({ ...form, date_format_pref: e.target.value })}>
                  <option value="BS">वि.सं. मात्र (Bikram Sambat BS Only - सिफारिस गरिएको)</option>
                  <option value="BOTH">दुवै (BS मुख्य र AD कोष्ठकमा)</option>
                  <option value="AD">ई.सं. मात्र (Gregorian AD Only)</option>
                </select>
                <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>
                  हाजिरी, लब्धांक पत्र र रसिदहरूमा यस प्राथमिकता अनुसार मिति छापिनेछ।
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  पूर्वनिर्धारित भाषा (Default System Language)
                </label>
                <select className="form-select" value={form.default_language} onChange={(e) => setForm({ ...form, default_language: e.target.value })}>
                  <option value="ne">नेपाली (Nepali Unicode)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Federal Address */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
              ३. संघीय ठेगाना तथा सम्पर्क (Federal Location & Contact Details)
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  प्रदेश (Province) *
                </label>
                <select
                  className="form-select"
                  value={form.province}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  required
                >
                  {NEPAL_PROVINCES.map(p => (
                    <option key={p.id} value={p.id}>{p.display}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  जिल्ला (District) *
                </label>
                <select
                  className="form-select"
                  value={form.district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  required
                >
                  {getDistrictsByProvince(form.province).map(d => (
                    <option key={d.id} value={d.id}>{d.display}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  स्थानीय तह / पालिका (Municipality) *
                </label>
                <select
                  className="form-select"
                  value={form.municipality}
                  onChange={(e) => handleMunicipalityChange(e.target.value)}
                  required
                >
                  {getLocalLevelsByDistrict(form.province, form.district).map(ll => (
                    <option key={ll.name} value={ll.name}>{ll.display}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  वडा नं. (Ward) *
                </label>
                <select
                  className="form-select"
                  value={form.ward}
                  onChange={(e) => setForm({ ...form, ward: e.target.value })}
                  required
                >
                  {getWardsByLocalLevel(form.province, form.district, form.municipality).map(w => (
                    <option key={w} value={String(w)}>
                      {lang === 'ne' ? `वडा नं. ${toNepaliDigits(w)}` : `Ward No. ${w}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  टोल / गाउँ (Tole/Village)
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="उदा: महालक्ष्मीस्थान"
                  value={form.tole}
                  onChange={(e) => setForm({ ...form, tole: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यालय फोन नम्बर *</label>
                <input type="text" className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यालय आधिकारिक इमेल</label>
                <input type="email" className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontWeight: 700 }}>
              <Save size={16} />
              {saving ? 'सुरक्षित हुँदैछ...' : 'सेटिङ सुरक्षित गर्नुहोस् (Save Settings)'}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
