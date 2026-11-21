import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Clock,
  Layers,
  Calendar,
  X,
  Edit,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';

/**
 * Grade Levels supported by Nepal School Education Structure (CDC & CEHRD)
 * From Early Childhood Development (ECD) through Grade 12.
 */
export const SUPPORTED_GRADE_LEVELS = [
  {
    level: 0,
    nameEn: 'ECD / PPC',
    nameNe: 'प्रारम्भिक बाल विकास (ECD / शिशु)',
    display: 'ECD / PPC (Early Childhood / Pre-Primary)',
    categoryEn: 'Pre-Primary Education',
    categoryNe: 'पूर्व-प्राथमिक शिक्षा',
    levelCode: 'ECD'
  },
  {
    level: 1,
    nameEn: 'Grade 1',
    nameNe: 'कक्षा १',
    display: 'Grade 1 (कक्षा १ - Basic Level / आधारभूत तह)',
    categoryEn: 'Basic Level (Grades 1-5)',
    categoryNe: 'आधारभूत तह (कक्षा १-५)',
    levelCode: 'BASIC-1'
  },
  {
    level: 2,
    nameEn: 'Grade 2',
    nameNe: 'कक्षा २',
    display: 'Grade 2 (कक्षा २ - Basic Level / आधारभूत तह)',
    categoryEn: 'Basic Level (Grades 1-5)',
    categoryNe: 'आधारभूत तह (कक्षा १-५)',
    levelCode: 'BASIC-2'
  },
  {
    level: 3,
    nameEn: 'Grade 3',
    nameNe: 'कक्षा ३',
    display: 'Grade 3 (कक्षा ३ - Basic Level / आधारभूत तह)',
    categoryEn: 'Basic Level (Grades 1-5)',
    categoryNe: 'आधारभूत तह (कक्षा १-५)',
    levelCode: 'BASIC-3'
  },
  {
    level: 4,
    nameEn: 'Grade 4',
    nameNe: 'कक्षा ४',
    display: 'Grade 4 (कक्षा ४ - Basic Level / आधारभूत तह)',
    categoryEn: 'Basic Level (Grades 1-5)',
    categoryNe: 'आधारभूत तह (कक्षा १-५)',
    levelCode: 'BASIC-4'
  },
  {
    level: 5,
    nameEn: 'Grade 5',
    nameNe: 'कक्षा ५',
    display: 'Grade 5 (कक्षा ५ - Basic Level / आधारभूत तह)',
    categoryEn: 'Basic Level (Grades 1-5)',
    categoryNe: 'आधारभूत तह (कक्षा १-५)',
    levelCode: 'BASIC-5'
  },
  {
    level: 6,
    nameEn: 'Grade 6',
    nameNe: 'कक्षा ६',
    display: 'Grade 6 (कक्षा ६ - Basic Level / आधारभूत तह)',
    categoryEn: 'Basic Level (Grades 6-8)',
    categoryNe: 'आधारभूत तह (कक्षा ६-८)',
    levelCode: 'BASIC-6'
  },
  {
    level: 7,
    nameEn: 'Grade 7',
    nameNe: 'कक्षा ७',
    display: 'Grade 7 (कक्षा ७ - Basic Level / आधारभूत तह)',
    categoryEn: 'Basic Level (Grades 6-8)',
    categoryNe: 'आधारभूत तह (कक्षा ६-८)',
    levelCode: 'BASIC-7'
  },
  {
    level: 8,
    nameEn: 'Grade 8',
    nameNe: 'कक्षा ८',
    display: 'Grade 8 (कक्षा ८ - Basic Level Final / BLE)',
    categoryEn: 'Basic Level Final (BLE Examination)',
    categoryNe: 'आधारभूत तह अन्तिम (BLE परीक्षा)',
    levelCode: 'BLE-8'
  },
  {
    level: 9,
    nameEn: 'Grade 9',
    nameNe: 'कक्षा ९',
    display: 'Grade 9 (कक्षा ९ - Secondary Level / माध्यमिक तह)',
    categoryEn: 'Secondary Level (Grades 9-10)',
    categoryNe: 'माध्यमिक तह (कक्षा ९-१०)',
    levelCode: 'SEC-9'
  },
  {
    level: 10,
    nameEn: 'Grade 10',
    nameNe: 'कक्षा १०',
    display: 'Grade 10 (कक्षा १० - Secondary Education Exam / SEE)',
    categoryEn: 'Secondary Level (SEE National Exam)',
    categoryNe: 'माध्यमिक शिक्षा परीक्षा (SEE राष्ट्रिय परीक्षा)',
    levelCode: 'SEE-10'
  },
  {
    level: 11,
    nameEn: 'Grade 11',
    nameNe: 'कक्षा ११',
    display: 'Grade 11 (कक्षा ११ - Higher Secondary / उच्च माध्यमिक)',
    categoryEn: 'Higher Secondary (Grades 11-12)',
    categoryNe: 'उच्च माध्यमिक तह (कक्षा ११-१२)',
    levelCode: 'HSEC-11'
  },
  {
    level: 12,
    nameEn: 'Grade 12',
    nameNe: 'कक्षा १२',
    display: 'Grade 12 (कक्षा १२ - National Examination Board / NEB Final)',
    categoryEn: 'Higher Secondary (NEB National Exam)',
    categoryNe: 'राष्ट्रिय परीक्षा बोर्ड (NEB अन्तिम परीक्षा)',
    levelCode: 'NEB-12'
  }
];

export default function AcademicsView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Class Setup & Edit Modal State
  const [showClassModal, setShowClassModal] = useState(false);
  const [classModalMode, setClassModalMode] = useState('add'); // 'add' or 'edit'
  const [classForm, setClassForm] = useState({
    id: '',
    name: '',
    nepali_name: '',
    grade_level: '',
    stream: 'General',
    display_order: 1
  });
  const [classFormErrors, setClassFormErrors] = useState({});
  const [submittingClass, setSubmittingClass] = useState(false);

  // Subject Modal State
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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchClasses = async (targetSelectId) => {
    try {
      const res = await fetch('/api/academics/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
        if (targetSelectId) {
          setSelectedClassId(targetSelectId);
        } else if (data.length > 0 && !selectedClassId) {
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
      const secId = cObj && cObj.sections && cObj.sections.length > 0 ? cObj.sections[0].id : null;
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

  // Open Add Class Modal
  const handleOpenAddClass = () => {
    setClassModalMode('add');
    setClassForm({
      id: '',
      name: '',
      nepali_name: '',
      grade_level: '',
      stream: 'General',
      display_order: classes.length + 1
    });
    setClassFormErrors({});
    setShowClassModal(true);
  };

  // Open Edit Class Modal
  const handleOpenEditClass = (targetClass) => {
    setClassModalMode('edit');
    setClassForm({
      id: targetClass.id,
      name: targetClass.name,
      nepali_name: targetClass.nepali_name,
      grade_level: targetClass.grade_level !== undefined ? String(targetClass.grade_level) : '',
      stream: targetClass.stream || 'General',
      display_order: targetClass.display_order || 1
    });
    setClassFormErrors({});
    setShowClassModal(true);
  };

  // Handle Class Grade & Details Submission
  const handleSaveClass = async (e) => {
    e.preventDefault();
    const errors = {};

    // Validate Class grade field
    if (classForm.grade_level === '' || classForm.grade_level === undefined || classForm.grade_level === null) {
      errors.grade_level = lang === 'ne'
        ? 'कक्षा तह (Class grade) छनौट गर्न अनिवार्य छ।'
        : 'Please select a Class grade. This field is required.';
    }

    if (!classForm.name.trim()) {
      errors.name = lang === 'ne' ? 'कक्षाको नाम अंग्रेजीमा आवश्यक छ।' : 'Class name in English is required.';
    }

    if (!classForm.nepali_name.trim()) {
      errors.nepali_name = lang === 'ne' ? 'कक्षाको नाम नेपालीमा आवश्यक छ।' : 'Class name in Nepali is required.';
    }

    if (Object.keys(errors).length > 0) {
      setClassFormErrors(errors);
      return;
    }

    setSubmittingClass(true);
    setClassFormErrors({});

    try {
      const url = classModalMode === 'add' ? '/api/academics/classes' : `/api/academics/classes/${classForm.id}`;
      const method = classModalMode === 'add' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: classForm.name.trim(),
          nepali_name: classForm.nepali_name.trim(),
          grade_level: parseInt(classForm.grade_level, 10),
          stream: classForm.stream,
          display_order: parseInt(classForm.display_order, 10) || 1
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setClassFormErrors({ submit: data.error || 'Failed to save class' });
        setSubmittingClass(false);
        return;
      }

      showToast(
        classModalMode === 'add'
          ? (lang === 'ne' ? 'नयाँ कक्षा तथा कक्षा तह सफलतापूर्वक थपियो!' : 'New class and Class grade created successfully!')
          : (lang === 'ne' ? 'कक्षा तथा कक्षा तह सफलतापूर्वक अद्यावधिक गरियो!' : 'Class grade and details updated successfully!')
      );

      setShowClassModal(false);
      const savedId = classModalMode === 'add' ? data.id : classForm.id;
      fetchClasses(savedId);
    } catch (err) {
      setClassFormErrors({ submit: err.message || 'Error saving class' });
    } finally {
      setSubmittingClass(false);
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
        showToast(lang === 'ne' ? 'नयाँ विषय थपियो!' : 'Subject added successfully!');
        setShowSubjectModal(false);
        fetchSubjectsAndTimetable(selectedClassId);
      }
    } catch (err) {
      alert('Error creating subject');
    }
  };

  const selectedClass = classes.find(c => c.id === selectedClassId);
  const gradeLevelInfo = selectedClass && SUPPORTED_GRADE_LEVELS.find(g => g.level === selectedClass.grade_level);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const daysOfWeekNe = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार'];

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#10b981',
          color: '#ffffff',
          padding: '0.85rem 1.4rem',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          zIndex: 9999,
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'कक्षा, पाठ्यक्रम तथा समयतालिका (Academics)' : 'Academics & Curriculum Structure'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.825rem', margin: '0.2rem 0 0 0' }}>
            {lang === 'ne'
              ? 'कक्षा तह (Class grade), CDC पाठ्यक्रम क्रेडिट घण्टा, सैद्धान्तिक/प्रयोगात्मक विभाजन र साप्ताहिक रुटिन'
              : 'Configure Class grade levels, CDC credit hours, theory/practical breakdown & weekly schedules'}
          </p>
        </div>

        {['school_admin', 'super_admin'].includes(user?.role) && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleOpenAddClass}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
              title="Add a new class and configure its Class grade"
            >
              <Plus size={16} />
              <span>{lang === 'ne' ? 'नयाँ कक्षा थप्नुहोस्' : 'Add New Class'}</span>
            </button>
            <button
              onClick={() => setShowSubjectModal(true)}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
              disabled={!selectedClassId}
            >
              <Plus size={16} />
              <span>{lang === 'ne' ? 'नयाँ विषय थप्नुहोस्' : 'Add Subject'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Class Selector Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.25rem'
      }}>
        {classes.map(c => {
          const isSelected = selectedClassId === c.id;
          const gInfo = SUPPORTED_GRADE_LEVELS.find(g => g.level === c.grade_level);
          return (
            <button
              key={c.id}
              onClick={() => setSelectedClassId(c.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1.1rem',
                borderRadius: '8px',
                border: isSelected ? '2px solid #1e3a8a' : '1px solid #cbd5e1',
                backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                color: isSelected ? '#1e3a8a' : '#475569',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? '0 2px 4px rgba(30, 58, 138, 0.15)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <GraduationCap size={15} color={isSelected ? '#1e3a8a' : '#64748b'} />
              <span>{c.nepali_name} ({c.name})</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '9999px',
                backgroundColor: isSelected ? '#dbeafe' : '#f1f5f9',
                color: isSelected ? '#1e40af' : '#64748b',
                fontWeight: 700
              }}>
                {gInfo ? (lang === 'ne' ? gInfo.nameNe : `Grade ${c.grade_level}`) : `Grade ${c.grade_level}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* SELECTED CLASS DETAILS & GRADE LEVEL CARD */}
      {selectedClass && (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.75rem',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#1e3a8a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(30, 58, 138, 0.2)'
              }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                    {selectedClass.nepali_name} ({selectedClass.name})
                  </h3>

                  {/* Clearly Labeled Class Grade Badge */}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      border: '1px solid #bfdbfe'
                    }}
                    title="Configured Class grade level"
                  >
                    <span>Class grade:</span>
                    <strong>{gradeLevelInfo ? (lang === 'ne' ? gradeLevelInfo.display : `Grade ${selectedClass.grade_level}`) : `Grade ${selectedClass.grade_level}`}</strong>
                  </span>

                  <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                    {selectedClass.stream || 'General'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', fontSize: '0.8rem', color: '#64748b', flexWrap: 'wrap' }}>
                  <span>
                    {lang === 'ne' ? 'शैक्षिक तह:' : 'Level Category:'}{' '}
                    <strong style={{ color: '#334155' }}>
                      {gradeLevelInfo ? (lang === 'ne' ? gradeLevelInfo.categoryNe : gradeLevelInfo.categoryEn) : 'Basic/Secondary'}
                    </strong>
                  </span>
                  <span>|</span>
                  <span>
                    {lang === 'ne' ? 'कुल खण्डहरू (Sections):' : 'Sections:'}{' '}
                    <strong style={{ color: '#334155' }}>
                      {selectedClass.sections && selectedClass.sections.length > 0
                        ? selectedClass.sections.map(s => s.name).join(', ')
                        : (lang === 'ne' ? 'खण्ड उपलब्ध छैन' : 'None')}
                    </strong>
                  </span>
                  <span>|</span>
                  <span>
                    {lang === 'ne' ? 'अध्ययनरत विद्यार्थी:' : 'Enrolled Students:'}{' '}
                    <strong style={{ color: '#16a34a' }}>
                      {lang === 'ne' ? toNepaliDigits(selectedClass.studentCount || 0) : (selectedClass.studentCount || 0)} {lang === 'ne' ? 'जना' : 'students'}
                    </strong>
                  </span>
                  <span>|</span>
                  <span>
                    {lang === 'ne' ? 'पाठ्यक्रम विषयहरू:' : 'Curriculum Subjects:'}{' '}
                    <strong style={{ color: '#2563eb' }}>
                      {selectedClass.subjectsCount || subjects.length} {lang === 'ne' ? 'विषय' : 'subjects'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Class Grade Button */}
            {['school_admin', 'super_admin'].includes(user?.role) && (
              <button
                onClick={() => handleOpenEditClass(selectedClass)}
                className="btn btn-outline btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 600,
                  borderColor: '#2563eb',
                  color: '#1d4ed8'
                }}
                title="Edit Class grade level and settings"
              >
                <Edit size={14} />
                <span>{lang === 'ne' ? 'कक्षा तह सम्पादन (Edit Grade)' : 'Edit Class Grade'}</span>
              </button>
            )}
          </div>

          {/* Contextual Grade Level Explanation Box */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '0.78rem',
            color: '#475569',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
            lineHeight: 1.5
          }}>
            <Info size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>{lang === 'ne' ? 'कक्षा तहको प्रभाव (Curriculum & Settings Effect):' : 'How Class grade affects content & settings:'}</strong>{' '}
              {lang === 'ne'
                ? `यस कक्षाको लागि "Class grade: ${selectedClass.grade_level}" तोकिएको छ। यसले नेपाल सरकार पाठ्यक्रम विकास केन्द्र (CDC २०७८) को क्रेडिट घण्टा (४.०), सैद्धान्तिक (७५% मा ३५% उत्तीर्णांक) र आन्तरिक/प्रयोगात्मक (२५% मा ४०% उत्तीर्णांक) विभाजन, GPA गणना, र CEHRD IEMIS आधिकारिक सरकारी प्रतिवेदन ढाँचा स्वतः नियन्त्रण गर्दछ।`
                : `Configured as "Class grade: ${selectedClass.grade_level}". This grade level determines Curriculum Development Centre (CDC 2078) 4.0 credit hour allocations, theory (75%) vs practical (25%) pass mark thresholds, GPA scales, and official CEHRD IEMIS reporting codes.`}
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Subject Breakdown Table */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'पाठ्यक्रम संरचना तथा क्रेडिट घण्टा विभाजन (CDC Standards)' : 'Curriculum & Credit Hour Breakdown'}
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {lang === 'ne' ? 'लेटर ग्रेडिङ निर्देशिका २०७८ अनुकूल' : 'CDC 2078 Letter Grading Compliant'}
          </span>
        </div>

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
              {subjects.length > 0 ? (
                subjects.map(sub => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                    {lang === 'ne' ? 'यस कक्षामा कुनै विषय दर्ता गरिएको छैन।' : 'No subjects added to this class yet.'}
                  </td>
                </tr>
              )}
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

      {/* ========================================================================= */}
      {/* MODAL: CLASS SETUP & EDIT SCREEN (With clearly labeled "Class grade" field) */}
      {/* ========================================================================= */}
      {showClassModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="class-modal-title"
        >
          <div className="modal-content" style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3 id="class-modal-title" style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e293b' }}>
                {classModalMode === 'add'
                  ? (lang === 'ne' ? 'नयाँ कक्षा तथा कक्षा तह दर्ता (Class Setup)' : 'Add New Class (Class Setup)')
                  : (lang === 'ne' ? 'कक्षा तथा कक्षा तह सम्पादन (Edit Class)' : 'Edit Class & Grade Level')}
              </h3>
              <button
                type="button"
                onClick={() => setShowClassModal(false)}
                aria-label="Close modal"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveClass}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {classFormErrors.submit && (
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    color: '#991b1b',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <AlertCircle size={16} />
                    <span>{classFormErrors.submit}</span>
                  </div>
                )}

                {/* 1. CLEARLY LABELED "Class grade" FIELD */}
                <div>
                  <label
                    htmlFor="class-grade-field"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: classFormErrors.grade_level ? '#dc2626' : '#1e293b',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {lang === 'ne' ? 'कक्षा तह (Class grade) *' : 'Class grade *'}
                  </label>

                  <select
                    id="class-grade-field"
                    name="grade_level"
                    value={classForm.grade_level}
                    onChange={(e) => {
                      const val = e.target.value;
                      setClassForm(prev => {
                        const g = SUPPORTED_GRADE_LEVELS.find(item => String(item.level) === val);
                        return {
                          ...prev,
                          grade_level: val,
                          // Auto-suggest names if empty or adding
                          name: prev.name || (g ? g.nameEn : ''),
                          nepali_name: prev.nepali_name || (g ? g.nameNe : '')
                        };
                      });
                      if (classFormErrors.grade_level) {
                        setClassFormErrors(prev => ({ ...prev, grade_level: '' }));
                      }
                    }}
                    required
                    aria-required="true"
                    aria-invalid={classFormErrors.grade_level ? 'true' : 'false'}
                    aria-describedby="class-grade-help-text"
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem',
                      border: classFormErrors.grade_level ? '2px solid #ef4444' : '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff',
                      color: '#1e293b'
                    }}
                  >
                    <option value="">{lang === 'ne' ? '-- कक्षा तह छनौट गर्नुहोस् (Select Class Grade) * --' : '-- Select Class Grade * --'}</option>
                    {SUPPORTED_GRADE_LEVELS.map(g => (
                      <option key={g.level} value={g.level}>
                        {g.display}
                      </option>
                    ))}
                  </select>

                  {/* Validation Error Message */}
                  {classFormErrors.grade_level && (
                    <div role="alert" style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={13} />
                      <span>{classFormErrors.grade_level}</span>
                    </div>
                  )}

                  {/* Contextual Explanation: How the grade is used */}
                  <div
                    id="class-grade-help-text"
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      color: '#1e40af',
                      lineHeight: 1.45
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Info size={13} />
                      <span>{lang === 'ne' ? 'कक्षा तहको प्रयोग र प्रभाव (How Class grade is used):' : 'How Class grade affects content & settings:'}</span>
                    </div>
                    <div>
                      {lang === 'ne'
                        ? 'चयन गरिएको "Class grade" ले नेपाल सरकार CDC २०७८ को अनिवार्य विषय संरचना, क्रेडिट घण्टा, सैद्धान्तिक र प्रयोगात्मक उत्तीर्णांक विभाजन, र CEHRD IEMIS आधिकारिक सरकारी प्रतिवेदन ढाँचा स्वतः निर्धारण गर्दछ।'
                        : 'The selected Class grade automatically determines Nepal CDC 2078 curriculum credit hours, compulsory and optional subject choices, theory vs practical pass thresholds, and CEHRD IEMIS government reporting codes.'}
                    </div>
                  </div>
                </div>

                {/* 2. CLASS NAME (English & Nepali) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label
                      htmlFor="class-name-en"
                      style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}
                    >
                      Class Name (English) *
                    </label>
                    <input
                      id="class-name-en"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Grade 10"
                      value={classForm.name}
                      onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                      required
                    />
                    {classFormErrors.name && (
                      <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{classFormErrors.name}</span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="class-name-ne"
                      style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}
                    >
                      कक्षाको नाम (नेपाली) *
                    </label>
                    <input
                      id="class-name-ne"
                      type="text"
                      className="form-input"
                      placeholder="उदा. कक्षा १०"
                      value={classForm.nepali_name}
                      onChange={(e) => setClassForm({ ...classForm, nepali_name: e.target.value })}
                      required
                    />
                    {classFormErrors.nepali_name && (
                      <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{classFormErrors.nepali_name}</span>
                    )}
                  </div>
                </div>

                {/* 3. STREAM & DISPLAY ORDER */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label
                      htmlFor="class-stream"
                      style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}
                    >
                      {lang === 'ne' ? 'शैक्षिक धार (Stream)' : 'Academic Stream'}
                    </label>
                    <select
                      id="class-stream"
                      value={classForm.stream}
                      onChange={(e) => setClassForm({ ...classForm, stream: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="General">साधारण (General)</option>
                      <option value="Science">विज्ञान (Science)</option>
                      <option value="Management">व्यवस्थापन (Management)</option>
                      <option value="Education">शिक्षा (Education)</option>
                      <option value="Technical">प्राविधिक तथा व्यावसायिक (Technical)</option>
                      <option value="Religious">धार्मिक (Sanskrit / Madarasa / Gumba)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="class-display-order"
                      style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}
                    >
                      {lang === 'ne' ? 'क्रम संख्या (Display Order)' : 'Display Order'}
                    </label>
                    <input
                      id="class-display-order"
                      type="number"
                      min="0"
                      max="30"
                      className="form-input"
                      value={classForm.display_order}
                      onChange={(e) => setClassForm({ ...classForm, display_order: e.target.value })}
                    />
                  </div>
                </div>

              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.25rem', borderTop: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  onClick={() => setShowClassModal(false)}
                  className="btn btn-outline"
                >
                  {lang === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submittingClass}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <CheckCircle size={16} />
                  <span>
                    {submittingClass
                      ? (lang === 'ne' ? 'सुरक्षित हुँदैछ...' : 'Saving...')
                      : (classModalMode === 'add'
                          ? (lang === 'ne' ? 'कक्षा थप्नुहोस्' : 'Save Class')
                          : (lang === 'ne' ? 'परिवर्तन सुरक्षित गर्नुहोस्' : 'Update Class Grade'))}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SUBJECT */}
      {showSubjectModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                {lang === 'ne' ? 'नयाँ विषय थप्नुहोस् (Add Subject)' : 'Add New Subject'}
              </h3>
              <button onClick={() => setShowSubjectModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
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
                <button type="button" onClick={() => setShowSubjectModal(false)} className="btn btn-outline">{lang === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel'}</button>
                <button type="submit" className="btn btn-primary">{lang === 'ne' ? 'सुरक्षित गर्नुहोस्' : 'Save Subject'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
