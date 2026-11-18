import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Clock,
  Layers,
  Calendar,
  X
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function AcademicsView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    code: 'NEP.101',
    name: 'Nepali',
    nepali_name: 'नेपाली',
    credit_hours: 4.0,
    theory_full_marks: 75,
    theory_pass_marks: 26.25,
    practical_full_marks: 25,
    practical_pass_marks: 10,
    subject_type: 'compulsory'
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchSubjectsAndTimetable(selectedClassId);
    }
  }, [selectedClassId]);

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/academics/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
        if (data.length > 0) {
          setSelectedClassId(data[0].id);
        }
      }
    } catch (err) {
      console.warn('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjectsAndTimetable = async (classId) => {
    try {
      const subRes = await fetch(`/api/academics/subjects?class_id=${classId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (subRes.ok) setSubjects(await subRes.json());

      const cObj = classes.find(c => c.id === classId);
      const secId = cObj && cObj.sections.length > 0 ? cObj.sections[0].id : null;
      if (secId) {
        const ttRes = await fetch(`/api/academics/timetable?class_id=${classId}&section_id=${secId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (ttRes.ok) setTimetables(await ttRes.json());
      }
    } catch (err) {
      console.warn('Error fetching subjects & timetable:', err);
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/academics/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...subjectForm, class_id: selectedClassId })
      });
      if (res.ok) {
        alert(lang === 'ne' ? 'नयाँ विषय थपियो!' : 'Subject added successfully!');
        setShowSubjectModal(false);
        fetchSubjectsAndTimetable(selectedClassId);
      }
    } catch (err) {
      alert('Error creating subject');
    }
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const daysOfWeekNe = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'कक्षा, पाठ्यक्रम तथा समयतालिका (Timetable)' : 'Academics & Curriculum Structure'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'CDC क्रेडिट घण्टा, सैद्धान्तिक/प्रयोगात्मक विभाजन र साप्ताहिक रुटिन' : 'CDC credit hours, theory/practical breakdown & weekly schedules'}
          </p>
        </div>

        {['school_admin', 'super_admin'].includes(user?.role) && (
          <button onClick={() => setShowSubjectModal(true)} className="btn btn-primary">
            <Plus size={16} />
            {lang === 'ne' ? 'नयाँ विषय थप्नुहोस्' : 'Add Subject'}
          </button>
        )}
      </div>

      {/* Class Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
        {classes.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedClassId(c.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: `1.5px solid ${selectedClassId === c.id ? '#1e3a8a' : '#cbd5e1'}`,
              backgroundColor: selectedClassId === c.id ? '#eff6ff' : '#ffffff',
              color: selectedClassId === c.id ? '#1e3a8a' : '#475569',
              fontWeight: selectedClassId === c.id ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {c.nepali_name} ({c.name})
          </button>
        ))}
      </div>

      {/* Curriculum Subject Breakdown Table */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
          {lang === 'ne' ? 'पाठ्यक्रम संरचना तथा क्रेडिट घण्टा विभाजन (CDC Standards)' : 'Curriculum & Credit Hour Breakdown'}
        </h3>

        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>कोड (Code)</th>
                <th>विषयको नाम (Subject Name)</th>
                <th>प्रकार (Type)</th>
                <th style={{ textAlign: 'center' }}>क्रेडिट घण्टा (CH)</th>
                <th style={{ textAlign: 'center' }}>सैद्धान्तिक (TH)</th>
                <th style={{ textAlign: 'center' }}>प्रयोगात्मक (PR/IN)</th>
                <th style={{ textAlign: 'center' }}>कुल पूर्णाङ्क (Full)</th>
                <th style={{ textAlign: 'center' }}>उत्तीर्णाङ्क (Pass)</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(sub => (
                <tr key={sub.id}>
                  <td style={{ fontWeight: 700, color: '#1e40af' }}>{sub.code}</td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{sub.nepali_name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub.name}</div>
                  </td>
                  <td>
                    <span className={`badge ${
                      sub.subject_type === 'compulsory' ? 'badge-blue' :
                      sub.subject_type === 'technical' ? 'badge-purple' : 'badge-amber'
                    }`}>
                      {sub.subject_type}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{sub.credit_hours}</td>
                  <td style={{ textAlign: 'center' }}>
                    <strong>{sub.theory_full_marks}</strong> (Pass: {sub.theory_pass_marks})
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <strong>{sub.practical_full_marks}</strong> (Pass: {sub.practical_pass_marks})
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#1e293b' }}>
                    {sub.full_marks}
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 600, color: '#047857' }}>
                    {sub.pass_marks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Routine / Timetable Sample Preview */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
          {lang === 'ne' ? 'साप्ताहिक कक्षा रुटिन (Weekly Timetable)' : 'Weekly Class Timetable'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', fontSize: '0.8rem' }}>
          {daysOfWeek.map((day, idx) => (
            <div key={day} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#1e3a8a', color: '#ffffff', padding: '0.4rem', textAlign: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
                {lang === 'ne' ? daysOfWeekNe[idx] : day}
              </div>
              <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', backgroundColor: '#f8fafc', minHeight: '130px' }}>
                <div style={{ padding: '0.35rem', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontWeight: 600, color: '#1e40af' }}>10:00 - 10:45 AM</div>
                  <div style={{ fontSize: '0.75rem' }}>अनिवार्य गणित</div>
                </div>
                <div style={{ padding: '0.35rem', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontWeight: 600, color: '#1e40af' }}>10:45 - 11:30 AM</div>
                  <div style={{ fontSize: '0.75rem' }}>विज्ञान तथा प्रविधि</div>
                </div>
                <div style={{ padding: '0.35rem', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontWeight: 600, color: '#1e40af' }}>11:45 - 12:30 PM</div>
                  <div style={{ fontSize: '0.75rem' }}>अंग्रेजी (English)</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Subject Modal */}
      {showSubjectModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>नयाँ विषय थप्नुहोस्</h3>
              <button onClick={() => setShowSubjectModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubject}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विषय कोड (Code) *</label>
                  <input type="text" className="form-input" value={subjectForm.code} onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विषयको नाम नेपालीमा *</label>
                  <input type="text" className="form-input" value={subjectForm.nepali_name} onChange={(e) => setSubjectForm({ ...subjectForm, nepali_name: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Subject Name (English) *</label>
                  <input type="text" className="form-input" value={subjectForm.name} onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>सैद्धान्तिक पूर्णाङ्क (TH Full)</label>
                    <input type="number" className="form-input" value={subjectForm.theory_full_marks} onChange={(e) => setSubjectForm({ ...subjectForm, theory_full_marks: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>प्रयोगात्मक पूर्णाङ्क (PR Full)</label>
                    <input type="number" className="form-input" value={subjectForm.practical_full_marks} onChange={(e) => setSubjectForm({ ...subjectForm, practical_full_marks: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowSubjectModal(false)} className="btn btn-outline">रद्द गर्नुहोस्</button>
                <button type="submit" className="btn btn-primary">सुरक्षित गर्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
