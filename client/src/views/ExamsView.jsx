import React, { useState, useEffect } from 'react';
import {
  Award,
  Plus,
  Printer,
  CheckCircle,
  Clock,
  Send,
  Eye,
  FileSpreadsheet,
  AlertTriangle,
  X,
  Save,
  BookOpen
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';
import PrintableGradeSheet from '../components/PrintableGradeSheet';

export default function ExamsView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [marksData, setMarksData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Grade sheet modal
  const [gradeSheetData, setGradeSheetData] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [academicYears, setAcademicYears] = useState([]);
  const [terms, setTerms] = useState([]);

  // New Exam Form
  const [newExamForm, setNewExamForm] = useState({
    academic_year_id: '',
    term_id: '',
    name: 'Second Terminal Examination 2081',
    nepali_name: 'दोस्रो त्रैमासिक परीक्षा २०८१',
    start_date_bs: '2081-06-20',
    end_date_bs: '2081-06-30'
  });

  useEffect(() => {
    fetchExams();
    fetchClasses();
    fetchAcademicYears();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchSubjects(selectedClassId);
    }
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedExamId && selectedClassId && selectedSubjectId) {
      fetchMarksGrid();
    }
  }, [selectedExamId, selectedClassId, selectedSectionId, selectedSubjectId]);

  const fetchExams = async () => {
    try {
      const res = await fetch('/api/exams', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setExams(data);
        if (data.length > 0 && !selectedExamId) {
          setSelectedExamId(data[0].id);
        }
      }
    } catch (err) {
      console.warn('Error fetching exams:', err);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/academics/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
        if (data.length > 0 && !selectedClassId) {
          setSelectedClassId(data[0].id);
          if (data[0].sections.length > 0) {
            setSelectedSectionId(data[0].sections[0].id);
          }
        }
      }
    } catch (err) {
      console.warn('Error fetching classes:', err);
    }
  };

  const fetchAcademicYears = async () => {
    try {
      const res = await fetch('/api/academics/academic-years', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAcademicYears(data.years || []);
        setTerms(data.terms || []);
        if (data.years && data.years.length > 0) {
          setNewExamForm(prev => ({
            ...prev,
            academic_year_id: data.years[0].id,
            term_id: data.terms && data.terms[0] ? data.terms[0].id : ''
          }));
        }
      }
    } catch (err) {
      console.warn('Error fetching academic years:', err);
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const res = await fetch(`/api/academics/subjects?class_id=${classId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubjects(data);
        if (data.length > 0) {
          setSelectedSubjectId(data[0].id);
        }
      }
    } catch (err) {
      console.warn('Error fetching subjects:', err);
    }
  };

  const fetchMarksGrid = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        class_id: selectedClassId,
        subject_id: selectedSubjectId
      });
      if (selectedSectionId) params.append('section_id', selectedSectionId);

      const res = await fetch(`/api/exams/${selectedExamId}/marks?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMarksData(data);
      }
    } catch (err) {
      console.warn('Error fetching marks grid:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkChange = (studentId, field, val) => {
    if (!marksData) return;
    setMarksData(prev => ({
      ...prev,
      students: prev.students.map(s => {
        if (s.student_id !== studentId) return s;
        const updated = { ...s, [field]: val };

        // Instant local preview calculation
        const th = Number(field === 'theory_marks' ? val : updated.theory_marks) || 0;
        const pr = Number(field === 'practical_marks' ? val : updated.practical_marks) || 0;
        const total = th + pr;
        const full = (prev.subject.theory_full_marks || 0) + (prev.subject.practical_full_marks || 0);
        const pct = full > 0 ? (total / full) * 100 : 0;

        let gr = 'NG';
        let gp = 0.0;
        if (pct >= 90) { gr = 'A+'; gp = 4.0; }
        else if (pct >= 80) { gr = 'A'; gp = 3.6; }
        else if (pct >= 70) { gr = 'B+'; gp = 3.2; }
        else if (pct >= 60) { gr = 'B'; gp = 2.8; }
        else if (pct >= 50) { gr = 'C+'; gp = 2.4; }
        else if (pct >= 40) { gr = 'C'; gp = 2.0; }
        else if (pct >= 35) { gr = 'D'; gp = 1.6; }

        // CDC 2078 check: TH must be >= 35%, PR >= 40%
        const thPass = prev.subject.theory_full_marks ? (th >= prev.subject.theory_pass_marks) : true;
        const prPass = prev.subject.practical_full_marks ? (pr >= prev.subject.practical_pass_marks) : true;
        if (!thPass || !prPass) {
          gr = 'NG';
          gp = 0.0;
        }

        return {
          ...updated,
          total_marks: total,
          grade: gr,
          grade_point: gp
        };
      })
    }));
  };

  const handleSaveMarks = async () => {
    if (!marksData || !marksData.students) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/exams/${selectedExamId}/marks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject_id: selectedSubjectId,
          marks: marksData.students.map(s => ({
            student_id: s.student_id,
            theory_marks: s.theory_marks,
            practical_marks: s.practical_marks,
            is_absent: s.is_absent,
            remarks: s.remarks
          }))
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to save marks');
      } else {
        alert(lang === 'ne' ? 'प्राप्ताङ्कहरू CDC २०७८ नियम अनुसार सफलतापूर्वक सुरक्षित गरियो!' : 'Marks evaluated & saved per CDC 2078 rules!');
        fetchMarksGrid();
      }
    } catch (err) {
      alert('Error saving marks');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/exams/${selectedExamId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ review_status: newStatus })
      });
      // Fallback with PATCH if needed
      let data;
      if (!res.ok) {
        const patchRes = await fetch(`/api/exams/${selectedExamId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ review_status: newStatus })
        });
        data = await patchRes.json();
      } else {
        data = await res.json();
      }
      alert(`Exam status updated to: ${newStatus}`);
      fetchExams();
    } catch (err) {
      alert('Error changing exam status');
    }
  };

  const handleOpenGradeSheet = async (studentId) => {
    try {
      const res = await fetch(`/api/exams/${selectedExamId}/grade-sheet/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setGradeSheetData(data);
      } else {
        const err = await res.json();
        alert(err.error || 'Cannot view grade sheet');
      }
    } catch (err) {
      alert('Error generating grade sheet');
    }
  };

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newExamForm)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to create exam');
      } else {
        alert(lang === 'ne' ? 'परीक्षा सिर्जना गरियो!' : 'Exam created successfully!');
        setShowCreateModal(false);
        fetchExams();
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const activeExam = exams.find(e => e.id === selectedExamId);

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'परीक्षा मूल्याङ्कन तथा लब्धांक पत्र व्यवस्थापन' : 'Examinations & Mark Sheets'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'CDC २०७८ निर्देशिका अनुसार सैद्धान्तिक र प्रयोगात्मक प्राप्ताङ्क प्रविष्टि तथा लब्धांक पत्र' : 'Nepal CDC 2078 theory/practical grading & official grade sheets'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {['school_admin', 'super_admin'].includes(user?.role) && (
            <button onClick={() => setShowCreateModal(true)} className="btn btn-outline">
              <Plus size={16} />
              {lang === 'ne' ? 'नयाँ परीक्षा थप्नुहोस्' : 'Create Exam'}
            </button>
          )}

          <button onClick={handleSaveMarks} disabled={saving} className="btn btn-primary">
            <Save size={16} />
            {saving ? (lang === 'ne' ? 'सुरक्षित हुँदैछ...' : 'Saving...') : (lang === 'ne' ? 'प्राप्ताङ्क सुरक्षित गर्नुहोस्' : 'Save Marks')}
          </button>
        </div>
      </div>

      {/* Selector Toolbar */}
      <div className="card" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1fr 1.5fr', gap: '1rem', alignItems: 'flex-end' }}>
          {/* Exam Select */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
              परीक्षा (Exam Period) *
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="form-select"
            >
              {exams.map(ex => (
                <option key={ex.id} value={ex.id}>
                  {lang === 'ne' ? ex.nepali_name : ex.name} ({ex.review_status})
                </option>
              ))}
            </select>
          </div>

          {/* Class Select */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
              कक्षा (Class) *
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => {
                const cid = e.target.value;
                setSelectedClassId(cid);
                const cObj = classes.find(c => c.id === cid);
                if (cObj && cObj.sections.length > 0) {
                  setSelectedSectionId(cObj.sections[0].id);
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
              खण्ड (Section)
            </label>
            <select
              value={selectedSectionId}
              onChange={(e) => setSelectedSectionId(e.target.value)}
              className="form-select"
            >
              {classes.find(c => c.id === selectedClassId)?.sections?.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Subject Select */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
              विषय (Subject & CDC Credit) *
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="form-select"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.nepali_name} ({s.code}) - TH:{s.theory_full_marks} / PR:{s.practical_full_marks}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exam Review Status Banner & Workflow */}
        {activeExam && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid #f1f5f9',
            fontSize: '0.8rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: '#475569' }}>परीक्षा स्थिति (Workflow Status):</span>
              <span className={`badge ${
                activeExam.review_status === 'published' ? 'badge-green' :
                activeExam.review_status === 'approved' ? 'badge-blue' :
                activeExam.review_status === 'under_review' ? 'badge-amber' : 'badge-gray'
              }`}>
                {activeExam.review_status.toUpperCase()}
              </span>
            </div>

            {/* Workflow status buttons for School Admin */}
            {['school_admin', 'super_admin'].includes(user?.role) && (
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {activeExam.review_status === 'draft' && (
                  <button onClick={() => handleStatusChange('under_review')} className="btn btn-outline btn-sm">
                    पुनरावलोकनमा पठाउनुहोस् (Submit for Review)
                  </button>
                )}
                {activeExam.review_status === 'under_review' && (
                  <button onClick={() => handleStatusChange('approved')} className="btn btn-outline btn-sm" style={{ color: '#047857' }}>
                    स्वीकृत गर्नुहोस् (Approve Marks)
                  </button>
                )}
                {activeExam.review_status === 'approved' && (
                  <button onClick={() => handleStatusChange('published')} className="btn btn-success btn-sm">
                    <CheckCircle size={14} />
                    नतिजा प्रकाशित गर्नुहोस् (Publish Results)
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Marks Grid Table */}
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '45px', textAlign: 'center' }}>रोल</th>
              <th>विद्यार्थीको नाम (Student Name)</th>
              <th>भर्ना नं.</th>
              <th style={{ width: '130px', textAlign: 'center' }}>
                सैद्धान्तिक (TH)
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>
                  पूर्णाङ्क: {marksData?.subject?.theory_full_marks || 75} (उत्तीर्ण: {marksData?.subject?.theory_pass_marks || 26.25})
                </div>
              </th>
              <th style={{ width: '130px', textAlign: 'center' }}>
                प्रयोगात्मक (PR/IN)
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>
                  पूर्णाङ्क: {marksData?.subject?.practical_full_marks || 25} (उत्तीर्ण: {marksData?.subject?.practical_pass_marks || 10})
                </div>
              </th>
              <th style={{ textAlign: 'center', width: '90px' }}>कुल प्राप्ताङ्क</th>
              <th style={{ textAlign: 'center', width: '80px' }}>ग्रेड (Grade)</th>
              <th style={{ textAlign: 'center', width: '80px' }}>जीपी (GP)</th>
              <th style={{ textAlign: 'center', width: '140px' }}>लब्धांक पत्र (Grade Sheet)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  प्राप्ताङ्क तालिका लोड हुँदैछ...
                </td>
              </tr>
            ) : !marksData || marksData.students.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  विद्यार्थी फेला परेन।
                </td>
              </tr>
            ) : (
              marksData.students.map(s => {
                const isNG = s.grade === 'NG';
                return (
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
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        max={marksData.subject.theory_full_marks}
                        step="0.5"
                        className="form-input"
                        placeholder="TH"
                        value={s.theory_marks !== '' && s.theory_marks !== null ? s.theory_marks : ''}
                        onChange={(e) => handleMarkChange(s.student_id, 'theory_marks', e.target.value)}
                        style={{ width: '80px', margin: '0 auto', textAlign: 'center', fontWeight: 700 }}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {marksData.subject.practical_full_marks > 0 ? (
                        <input
                          type="number"
                          min="0"
                          max={marksData.subject.practical_full_marks}
                          step="0.5"
                          className="form-input"
                          placeholder="PR"
                          value={s.practical_marks !== '' && s.practical_marks !== null ? s.practical_marks : ''}
                          onChange={(e) => handleMarkChange(s.student_id, 'practical_marks', e.target.value)}
                          style={{ width: '80px', margin: '0 auto', textAlign: 'center', fontWeight: 700 }}
                        />
                      ) : (
                        <span style={{ color: '#94a3b8' }}>N/A</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: '#1e293b' }}>
                      {s.total_marks !== null ? s.total_marks : '-'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {s.grade ? (
                        <span style={{
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          color: isNG ? '#dc2626' : '#1e40af'
                        }}>
                          {s.grade}
                        </span>
                      ) : '-'}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>
                      {s.grade_point !== null ? Number(s.grade_point).toFixed(2) : '-'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleOpenGradeSheet(s.student_id)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', color: '#1e40af', borderColor: '#bfdbfe' }}
                      >
                        <Printer size={13} />
                        लब्धांक पत्र
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* CDC Standard Printable Grade Sheet Modal */}
      {gradeSheetData && (
        <PrintableGradeSheet
          data={gradeSheetData}
          onClose={() => setGradeSheetData(null)}
          lang={lang}
        />
      )}

      {/* Create New Exam Modal */}
      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                {lang === 'ne' ? 'नयाँ परीक्षा सिर्जना फारम' : 'Create New Examination'}
              </h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateExam}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    शैक्षिक सत्र (Academic Year) *
                  </label>
                  <select
                    className="form-select"
                    value={newExamForm.academic_year_id}
                    onChange={(e) => setNewExamForm({ ...newExamForm, academic_year_id: e.target.value })}
                    required
                  >
                    {academicYears.map(y => (
                      <option key={y.id} value={y.id}>{y.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    त्रैमासिक परीक्षा (Term) *
                  </label>
                  <select
                    className="form-select"
                    value={newExamForm.term_id}
                    onChange={(e) => setNewExamForm({ ...newExamForm, term_id: e.target.value })}
                    required
                  >
                    {terms.map(t => (
                      <option key={t.id} value={t.id}>{t.nepali_name} ({t.name})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    परीक्षाको नाम नेपालीमा *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={newExamForm.nepali_name}
                    onChange={(e) => setNewExamForm({ ...newExamForm, nepali_name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Exam Name (English) *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={newExamForm.name}
                    onChange={(e) => setNewExamForm({ ...newExamForm, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-outline">
                  रद्द गर्नुहोस्
                </button>
                <button type="submit" className="btn btn-primary">
                  परीक्षा दर्ता गर्नुहोस्
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
