import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Check,
  X,
  Clock,
  Send,
  Wifi,
  WifiOff,
  RefreshCw,
  Save,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';
import NepaliDatePicker from '../components/NepaliDatePicker';
import { saveToOfflineQueue } from '../utils/offlineQueue';

export default function AttendanceView({
  token,
  lang = 'ne',
  tenant,
  isOffline,
  onToggleOffline,
  pendingSyncCount,
  onSyncOffline
}) {
  const t = translations[lang] || translations.ne;
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [attendanceDateBs, setAttendanceDateBs] = useState('2081-06-25');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notificationResult, setNotificationResult] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSection) {
      fetchAttendanceSheet();
    }
  }, [selectedClass, selectedSection, attendanceDateBs]);

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/academics/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
        if (data.length > 0) {
          setSelectedClass(data[0].id);
          if (data[0].sections && data[0].sections.length > 0) {
            setSelectedSection(data[0].sections[0].id);
          }
        }
      }
    } catch (err) {
      console.warn('Error fetching classes:', err);
    }
  };

  const fetchAttendanceSheet = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/attendance?class_id=${selectedClass}&section_id=${selectedSection}&date_bs=${attendanceDateBs}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
      }
    } catch (err) {
      console.warn('Error fetching attendance sheet:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setStudents(prev =>
      prev.map(s => (s.student_id === studentId ? { ...s, status } : s))
    );
  };

  const handleRemarkChange = (studentId, remark) => {
    setStudents(prev =>
      prev.map(s => (s.student_id === studentId ? { ...s, remark } : s))
    );
  };

  const handleMarkAll = (status) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  const handleSaveAttendance = async () => {
    if (students.length === 0) return;
    setSaving(true);

    const payload = {
      class_id: selectedClass,
      section_id: selectedSection,
      date_bs: attendanceDateBs,
      records: students.map(s => ({
        student_id: s.student_id,
        status: s.status,
        remark: s.remark
      }))
    };

    // If Offline Mode is active or network is down, enqueue locally
    if (isOffline) {
      saveToOfflineQueue(payload);
      alert(lang === 'ne' ? 'हाजिरी स्थानीय यन्त्रमा सुरक्षित गरियो (अफलाइन मोड)। इन्टरनेट आएपछि सिङ्क गर्नुहोस्।' : 'Attendance saved to local queue (Offline Mode). Sync when internet is restored.');
      setSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to save attendance');
      } else {
        alert(data.message || 'हाजिरी सुरक्षित गरियो!');
        fetchAttendanceSheet();
      }
    } catch (err) {
      // Auto-fallback to offline queue on network failure
      saveToOfflineQueue(payload);
      alert(lang === 'ne' ? 'इन्टरनेट नचलेकाले अफलाइन लाममा सुरक्षित गरियो।' : 'Network error: Saved to offline queue.');
    } finally {
      setSaving(false);
    }
  };

  const handleNotifyGuardians = async () => {
    try {
      const res = await fetch('/api/attendance/notify-guardians', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          class_id: selectedClass,
          section_id: selectedSection,
          date_bs: attendanceDateBs
        })
      });
      if (res.ok) {
        const data = await res.json();
        setNotificationResult(data);
      }
    } catch (err) {
      alert('Failed to send notifications');
    }
  };

  const currentClassObj = classes.find(c => c.id === selectedClass);
  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const excusedCount = students.filter(s => s.status === 'excused').length;

  return (
    <div>
      {/* Header & Offline Alert */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'दैनिक विद्यार्थी हाजिरी व्यवस्थापन' : 'Daily Student Attendance'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'कक्षागत उपस्थिति, अफलाइन सिङ्क तथा अभिभावक अनुपस्थिति सन्देश' : 'Record attendance, offline mobile support & guardian alerts'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {isOffline && (
            <span className="badge badge-red" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
              <WifiOff size={13} style={{ marginRight: '4px' }} />
              अफलाइन मोड (Offline Mode)
            </span>
          )}

          <button onClick={handleSaveAttendance} disabled={saving} className="btn btn-primary">
            <Save size={16} />
            {saving ? (lang === 'ne' ? 'सुरक्षित हुँदैछ...' : 'Saving...') : (lang === 'ne' ? 'हाजिरी सुरक्षित गर्नुहोस्' : 'Save Attendance')}
          </button>
        </div>
      </div>

      {/* Class, Section, Date Selection Toolbar */}
      <div className="card" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.5fr auto', gap: '1rem', alignItems: 'flex-end' }}>
          {/* Class Select */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
              कक्षा (Class) *
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                const cid = e.target.value;
                setSelectedClass(cid);
                const cObj = classes.find(c => c.id === cid);
                if (cObj && cObj.sections && cObj.sections.length > 0) {
                  setSelectedSection(cObj.sections[0].id);
                } else {
                  setSelectedSection('');
                }
              }}
              className="form-select"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.nepali_name} ({c.name})</option>
              ))}
            </select>
          </div>

          {/* Section Select */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
              खण्ड (Section) *
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="form-select"
            >
              {currentClassObj?.sections && currentClassObj.sections.length > 0 ? (
                currentClassObj.sections.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.room_number || 'Room'})</option>
                ))
              ) : (
                <option value="">{lang === 'ne' ? '-- खण्ड उपलब्ध छैन --' : '-- No sections available --'}</option>
              )}
            </select>
          </div>

          {/* Bikram Sambat Date Picker */}
          <div>
            <NepaliDatePicker
              label="हाजिरी मिति वि.सं. (BS Date)"
              value={attendanceDateBs}
              onChange={(d) => setAttendanceDateBs(d)}
              lang={lang}
              required
            />
          </div>

          {/* Quick Mark All Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', paddingBottom: '0.75rem' }}>
            <button
              onClick={() => handleMarkAll('present')}
              className="btn btn-outline btn-sm"
              style={{ backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}
              title="सबैलाई उपस्थित गराउनुहोस्"
            >
              <Check size={14} />
              {lang === 'ne' ? 'सबै उपस्थित' : 'All Present'}
            </button>
            <button
              onClick={() => handleMarkAll('absent')}
              className="btn btn-outline btn-sm"
              style={{ backgroundColor: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca' }}
              title="सबैलाई अनुपस्थित गराउनुहोस्"
            >
              <X size={14} />
              {lang === 'ne' ? 'सबै अनुपस्थित' : 'All Absent'}
            </button>
          </div>
        </div>

        {/* Attendance Counter Badges */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', fontSize: '0.8rem' }}>
          <div>कुल विद्यार्थी: <strong>{toNepaliDigits(students.length)}</strong></div>
          <div style={{ color: '#047857' }}>उपस्थित: <strong>{toNepaliDigits(presentCount)}</strong></div>
          <div style={{ color: '#b91c1c' }}>अनुपस्थित: <strong>{toNepaliDigits(absentCount)}</strong></div>
          <div style={{ color: '#d97706' }}>ढिलो: <strong>{toNepaliDigits(lateCount)}</strong></div>
          <div style={{ color: '#6b21a8' }}>बिदा: <strong>{toNepaliDigits(excusedCount)}</strong></div>

          {absentCount > 0 && (
            <button
              onClick={handleNotifyGuardians}
              className="btn btn-crimson btn-sm"
              style={{ marginLeft: 'auto', fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
            >
              <Send size={12} />
              {lang === 'ne' ? `अनुपस्थित अभिभावकलाई SMS पठाउनुहोस् (${toNepaliDigits(absentCount)})` : `Send SMS to ${absentCount} Absent Guardians`}
            </button>
          )}
        </div>
      </div>

      {/* Notification Success Toast/Card */}
      {notificationResult && (
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '0.5rem',
          padding: '0.85rem',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, color: '#1e40af', fontSize: '0.85rem' }}>
              ✓ {notificationResult.message}
            </div>
            <button onClick={() => setNotificationResult(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <X size={16} />
            </button>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: '0.4rem' }}>
            {notificationResult.notifications.map((n, i) => (
              <div key={i} style={{ marginTop: '0.2rem' }}>
                • <strong>{n.guardian_name} ({n.guardian_phone}):</strong> {n.message_nepali}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Sheet Table */}
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '50px', textAlign: 'center' }}>रोल नं.</th>
              <th>विद्यार्थीको नाम (Student Name)</th>
              <th>भर्ना नं. (Adm No)</th>
              <th style={{ width: '280px', textAlign: 'center' }}>उपस्थिति स्थिति (Status)</th>
              <th>कैफियत / बिदाको कारण (Remarks)</th>
              <th style={{ textAlign: 'center', width: '100px' }}>अभिभावक फोन</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  हाजिरी पुस्तिका लोड हुँदैछ...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  यस कक्षा तथा खण्डमा कुनै विद्यार्थी दर्ता छैनन्।
                </td>
              </tr>
            ) : (
              students.map(s => (
                <tr key={s.student_id}>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>
                    {toNepaliDigits(s.roll_number || '-')}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>
                      {s.full_name_nepali}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {s.first_name} {s.last_name}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#1e40af' }}>
                    {s.admission_number}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(s.student_id, 'present')}
                        style={{
                          padding: '0.25rem 0.55rem',
                          borderRadius: '4px',
                          border: '1px solid',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          backgroundColor: s.status === 'present' ? '#059669' : '#ffffff',
                          color: s.status === 'present' ? '#ffffff' : '#059669',
                          borderColor: '#059669'
                        }}
                      >
                        उपस्थित (P)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(s.student_id, 'absent')}
                        style={{
                          padding: '0.25rem 0.55rem',
                          borderRadius: '4px',
                          border: '1px solid',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          backgroundColor: s.status === 'absent' ? '#dc2626' : '#ffffff',
                          color: s.status === 'absent' ? '#ffffff' : '#dc2626',
                          borderColor: '#dc2626'
                        }}
                      >
                        अनुपस्थित (A)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(s.student_id, 'late')}
                        style={{
                          padding: '0.25rem 0.55rem',
                          borderRadius: '4px',
                          border: '1px solid',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          backgroundColor: s.status === 'late' ? '#d97706' : '#ffffff',
                          color: s.status === 'late' ? '#ffffff' : '#d97706',
                          borderColor: '#d97706'
                        }}
                      >
                        ढिलो (L)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(s.student_id, 'excused')}
                        style={{
                          padding: '0.25rem 0.55rem',
                          borderRadius: '4px',
                          border: '1px solid',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          backgroundColor: s.status === 'excused' ? '#7c3aed' : '#ffffff',
                          color: s.status === 'excused' ? '#ffffff' : '#7c3aed',
                          borderColor: '#7c3aed'
                        }}
                      >
                        बिदा (E)
                      </button>
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="बिदा निवेदन वा कारण..."
                      value={s.remark || ''}
                      onChange={(e) => handleRemarkChange(s.student_id, e.target.value)}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
                    {s.guardian_phone || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
