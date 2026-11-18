import React, { useState, useEffect } from 'react';
import { Users, Plus, Phone, Mail, Award, Briefcase, X } from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';
import NepaliDatePicker from '../components/NepaliDatePicker';

export default function StaffView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    full_name: 'Suman Acharya',
    nepali_name: 'सुमन आचार्य',
    designation: 'माध्यमिक गणित शिक्षक (Secondary Math Teacher)',
    department: 'गणित विभाग (Mathematics)',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    citizenship_no: '27-01-70-98765',
    pan_no: '609876543',
    joined_date_bs: '2077-01-15',
    phone: '9851239876',
    email: 'suman.math@shreeshanti.edu.np',
    employment_type: 'permanent'
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch('/api/staff', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setStaff(await res.json());
      }
    } catch (err) {
      console.warn('Error fetching staff:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert(lang === 'ne' ? 'कर्मचारी अभिलेख सफलतापूर्वक थपियो!' : 'Staff profile created successfully!');
        setShowAddModal(false);
        fetchStaff();
      }
    } catch (err) {
      alert('Error creating staff profile');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'शिक्षक तथा कर्मचारी व्यवस्थापन' : 'Staff & Faculty Management'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'शिक्षक दरबन्दी, योग्यता, स्थायी/अस्थायी सेवा प्रकार तथा कार्यबोझ' : 'Manage faculty credentials, qualifications, PAN, citizenship & workload'}
          </p>
        </div>

        {['school_admin', 'super_admin'].includes(user?.role) && (
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <Plus size={16} />
            {lang === 'ne' ? 'नयाँ शिक्षक/कर्मचारी थप्नुहोस्' : 'Add Staff Member'}
          </button>
        )}
      </div>

      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>कर्मचारी नं. (ID)</th>
              <th>नाम तथा पद (Name & Designation)</th>
              <th>विभाग (Dept)</th>
              <th>योग्यता (Qualification)</th>
              <th>सेवा प्रकार (Type)</th>
              <th>नागरिकता / PAN</th>
              <th>सम्पर्क विवरण</th>
              <th style={{ textAlign: 'center' }}>साप्ताहिक पिरियड</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(stf => (
              <tr key={stf.id}>
                <td style={{ fontWeight: 700, color: '#1e40af' }}>{stf.employee_id}</td>
                <td>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>
                    {stf.nepali_name || stf.full_name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#2563eb' }}>
                    {stf.designation}
                  </div>
                </td>
                <td>{stf.department || 'General'}</td>
                <td style={{ fontSize: '0.8rem' }}>{stf.qualification || '-'}</td>
                <td>
                  <span className="badge badge-green">
                    {stf.employment_type === 'permanent' ? 'स्थायी (Permanent)' : stf.employment_type}
                  </span>
                </td>
                <td style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  <div>ना: {stf.citizenship_no || '-'}</div>
                  <div>PAN: {stf.pan_no || '-'}</div>
                </td>
                <td>
                  <div style={{ fontSize: '0.75rem' }}><Phone size={10} style={{ display: 'inline', marginRight: '3px' }} />{stf.phone}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}><Mail size={10} style={{ display: 'inline', marginRight: '3px' }} />{stf.email}</div>
                </td>
                <td style={{ textAlign: 'center', fontWeight: 700, color: '#1e3a8a' }}>
                  {toNepaliDigits(stf.weeklyPeriods || 18)} Periods
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>नयाँ शिक्षक/कर्मचारी फारम</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddStaff}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>पूरा नाम (नेपालीमा) *</label>
                    <input type="text" className="form-input" value={form.nepali_name} onChange={(e) => setForm({ ...form, nepali_name: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Full Name (English) *</label>
                    <input type="text" className="form-input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>पद (Designation) *</label>
                    <input type="text" className="form-input" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विभाग (Department)</label>
                    <input type="text" className="form-input" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <NepaliDatePicker
                      label="नियुक्ति मिति वि.सं. (Joined Date BS)"
                      value={form.joined_date_bs}
                      onChange={(d) => setForm({ ...form, joined_date_bs: d })}
                      lang={lang}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>सेवा प्रकार (Employment)</label>
                    <select className="form-select" value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })}>
                      <option value="permanent">स्थायी (Permanent)</option>
                      <option value="temporary">अस्थायी (Temporary)</option>
                      <option value="relief_quota">राहत कोटा (Relief Quota)</option>
                      <option value="contract">करार (Contract)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>मोबाइल फोन *</label>
                    <input type="text" className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>इमेल (Email)</label>
                    <input type="email" className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">रद्द गर्नुहोस्</button>
                <button type="submit" className="btn btn-primary">दर्ता गर्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
