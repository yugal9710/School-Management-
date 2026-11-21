import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  FileSpreadsheet,
  AlertCircle,
  X,
  Phone,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { translations, ETHNICITY_OPTIONS, DISABILITY_OPTIONS } from '../utils/translations';
import {
  NEPAL_PROVINCES,
  getDistrictsByProvince,
  getLocalLevelsByDistrict,
  getWardsByLocalLevel
} from '../utils/nepalAdministrativeData';
import { toNepaliDigits } from '../utils/nepaliDate';
import NepaliDatePicker from '../components/NepaliDatePicker';

export default function StudentsView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null);

  // New Admission Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    full_name_nepali: '',
    student_phone: '',
    gender: 'male',
    dob_bs: '2067-04-15',
    dob_ad: '2010-07-30',
    blood_group: 'A+',
    caste_ethnicity: 'Janajati',
    mother_tongue: 'Nepali',
    disability_status: 'none',
    inclusion_support_notes: '',
    current_class_id: '',
    current_section_id: '',
    // Permanent Address Hierarchy
    permanent_province: 'Bagmati',
    permanent_district: 'Lalitpur',
    permanent_municipality: 'Lalitpur',
    permanent_ward: '5',
    permanent_tole: 'महालक्ष्मीस्थान',
    // Same as Permanent flag
    same_as_permanent: true,
    // Temporary Address Hierarchy
    temporary_province: 'Bagmati',
    temporary_district: 'Lalitpur',
    temporary_municipality: 'Lalitpur',
    temporary_ward: '5',
    temporary_tole: 'महालक्ष्मीस्थान',
    father_name: '',
    father_phone: '',
    mother_name: '',
    guardian_name: '',
    guardian_phone: ''
  });

  // Handlers for Dependent Local-Level Hierarchy
  const handlePermanentProvinceChange = (newProv) => {
    const districts = getDistrictsByProvince(newProv);
    const firstDist = districts[0]?.id || '';
    const localLevels = getLocalLevelsByDistrict(newProv, firstDist);
    const firstLL = localLevels[0]?.name || '';
    const wards = getWardsByLocalLevel(newProv, firstDist, firstLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setFormData(prev => {
      const updated = {
        ...prev,
        permanent_province: newProv,
        permanent_district: firstDist,
        permanent_municipality: firstLL,
        permanent_ward: firstWard
      };
      if (prev.same_as_permanent) {
        updated.temporary_province = newProv;
        updated.temporary_district = firstDist;
        updated.temporary_municipality = firstLL;
        updated.temporary_ward = firstWard;
      }
      return updated;
    });
  };

  const handlePermanentDistrictChange = (newDist) => {
    const localLevels = getLocalLevelsByDistrict(formData.permanent_province, newDist);
    const firstLL = localLevels[0]?.name || '';
    const wards = getWardsByLocalLevel(formData.permanent_province, newDist, firstLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setFormData(prev => {
      const updated = {
        ...prev,
        permanent_district: newDist,
        permanent_municipality: firstLL,
        permanent_ward: firstWard
      };
      if (prev.same_as_permanent) {
        updated.temporary_district = newDist;
        updated.temporary_municipality = firstLL;
        updated.temporary_ward = firstWard;
      }
      return updated;
    });
  };

  const handlePermanentMunicipalityChange = (newLL) => {
    const wards = getWardsByLocalLevel(formData.permanent_province, formData.permanent_district, newLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setFormData(prev => {
      const updated = {
        ...prev,
        permanent_municipality: newLL,
        permanent_ward: firstWard
      };
      if (prev.same_as_permanent) {
        updated.temporary_municipality = newLL;
        updated.temporary_ward = firstWard;
      }
      return updated;
    });
  };

  const handlePermanentWardChange = (newWard) => {
    setFormData(prev => {
      const updated = { ...prev, permanent_ward: newWard };
      if (prev.same_as_permanent) {
        updated.temporary_ward = newWard;
      }
      return updated;
    });
  };

  const handlePermanentToleChange = (newTole) => {
    setFormData(prev => {
      const updated = { ...prev, permanent_tole: newTole };
      if (prev.same_as_permanent) {
        updated.temporary_tole = newTole;
      }
      return updated;
    });
  };

  const handleSameAsPermanentToggle = (checked) => {
    setFormData(prev => {
      const updated = { ...prev, same_as_permanent: checked };
      if (checked) {
        updated.temporary_province = prev.permanent_province;
        updated.temporary_district = prev.permanent_district;
        updated.temporary_municipality = prev.permanent_municipality;
        updated.temporary_ward = prev.permanent_ward;
        updated.temporary_tole = prev.permanent_tole;
      }
      return updated;
    });
  };

  // Handlers for Temporary Address
  const handleTemporaryProvinceChange = (newProv) => {
    const districts = getDistrictsByProvince(newProv);
    const firstDist = districts[0]?.id || '';
    const localLevels = getLocalLevelsByDistrict(newProv, firstDist);
    const firstLL = localLevels[0]?.name || '';
    const wards = getWardsByLocalLevel(newProv, firstDist, firstLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setFormData(prev => ({
      ...prev,
      temporary_province: newProv,
      temporary_district: firstDist,
      temporary_municipality: firstLL,
      temporary_ward: firstWard
    }));
  };

  const handleTemporaryDistrictChange = (newDist) => {
    const localLevels = getLocalLevelsByDistrict(formData.temporary_province, newDist);
    const firstLL = localLevels[0]?.name || '';
    const wards = getWardsByLocalLevel(formData.temporary_province, newDist, firstLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setFormData(prev => ({
      ...prev,
      temporary_district: newDist,
      temporary_municipality: firstLL,
      temporary_ward: firstWard
    }));
  };

  const handleTemporaryMunicipalityChange = (newLL) => {
    const wards = getWardsByLocalLevel(formData.temporary_province, formData.temporary_district, newLL);
    const firstWard = wards[0] ? String(wards[0]) : '1';

    setFormData(prev => ({
      ...prev,
      temporary_municipality: newLL,
      temporary_ward: firstWard
    }));
  };

  const handleTemporaryWardChange = (newWard) => {
    setFormData(prev => ({ ...prev, temporary_ward: newWard }));
  };

  const handleTemporaryToleChange = (newTole) => {
    setFormData(prev => ({ ...prev, temporary_tole: newTole }));
  };

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, [selectedClass, selectedCaste, searchTerm]);

  // Ensure current_section_id stays synced whenever class or classes change
  useEffect(() => {
    if (classes.length > 0 && formData.current_class_id) {
      const cls = classes.find(c => c.id === formData.current_class_id);
      if (cls && cls.sections && cls.sections.length > 0) {
        const hasValidSec = cls.sections.some(s => s.id === formData.current_section_id);
        if (!hasValidSec) {
          setFormData(prev => ({ ...prev, current_section_id: cls.sections[0].id }));
        }
      }
    }
  }, [formData.current_class_id, classes]);

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/academics/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
        if (data.length > 0) {
          setClasses(data);
          setFormData(prev => {
            const activeClass = data.find(c => c.id === prev.current_class_id) || data[0];
            const activeSec = activeClass?.sections?.find(s => s.id === prev.current_section_id)?.id || activeClass?.sections?.[0]?.id || '';
            return {
              ...prev,
              current_class_id: activeClass.id,
              current_section_id: activeSec
            };
          });
        }
      }
    } catch (err) {
      console.warn('Error fetching classes:', err);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedClass) params.append('class_id', selectedClass);
      if (selectedCaste) params.append('caste', selectedCaste);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`/api/students?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.warn('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = async (id) => {
    try {
      const res = await fetch(`/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedStudentProfile(data);
      }
    } catch (err) {
      alert('Failed to load student profile');
    }
  };

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to enroll student');
        return;
      }

      alert(lang === 'ne' ? `विद्यार्थी सफलतापूर्वक भर्ना भयो! (भर्ना नं.: ${data.admissionNumber})` : `Student admitted successfully! Admission No: ${data.admissionNumber}`);
      setShowAddModal(false);
      fetchStudents();
    } catch (err) {
      alert('Network error during admission');
    }
  };

  return (
    <div>
      {/* Top Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'विद्यार्थी अभिलेख तथा भर्ना व्यवस्थापन' : 'Student Information & Admissions'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'कुल दर्ता विद्यार्थी, कक्षा विवरण तथा समावेशी अभिलेख' : 'Manage student profiles, admissions, federal address & inclusion records'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {['school_admin', 'super_admin'].includes(user?.role) && (
            <button
              onClick={() => {
                if (classes.length > 0) {
                  const targetClass = classes.find(c => c.id === formData.current_class_id) || classes[0];
                  const targetSec = targetClass?.sections?.find(s => s.id === formData.current_section_id)?.id || targetClass?.sections?.[0]?.id || '';
                  setFormData(prev => ({
                    ...prev,
                    current_class_id: targetClass.id,
                    current_section_id: targetSec
                  }));
                }
                setShowAddModal(true);
              }}
              className="btn btn-primary"
            >
              <Plus size={16} />
              {lang === 'ne' ? 'नयाँ विद्यार्थी भर्ना' : 'New Admission'}
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '1.25rem', padding: '0.85rem 1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: 1.5, minWidth: '220px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={lang === 'ne' ? 'नाम, भर्ना नं., वा फोन नम्बरबाट खोज्नुहोस्...' : 'Search by name, adm no, or phone...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2rem' }}
            />
          </div>

          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="form-select"
            style={{ flex: 1, minWidth: '150px' }}
          >
            <option value="">{lang === 'ne' ? 'सबै कक्षाहरू (All Grades)' : 'All Grades'}</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {lang === 'ne' ? c.nepali_name : c.name}
              </option>
            ))}
          </select>

          {/* Caste / Ethnicity Filter */}
          <select
            value={selectedCaste}
            onChange={(e) => setSelectedCaste(e.target.value)}
            className="form-select"
            style={{ flex: 1, minWidth: '150px' }}
          >
            <option value="">{lang === 'ne' ? 'सबै जात/जाति (All Ethnicities)' : 'All Ethnicities'}</option>
            {ETHNICITY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {lang === 'ne' ? opt.labelNe : opt.labelEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '45px', textAlign: 'center' }}>रोल</th>
              <th>{lang === 'ne' ? 'विद्यार्थीको नाम' : 'Student Name'}</th>
              <th>भर्ना नं. (Adm No)</th>
              <th>कक्षा / खण्ड</th>
              <th>जात/जाति समूह</th>
              <th>अपाङ्गता स्थिति</th>
              <th>अभिभावक / सम्पर्क</th>
              <th>ठेगाना (पालिका/वडा)</th>
              <th style={{ textAlign: 'center' }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  लोड हुँदैछ...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  कुनै विद्यार्थी फेला परेन।
                </td>
              </tr>
            ) : (
              students.map(s => (
                <tr key={s.id}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>
                    {toNepaliDigits(s.roll_number || '-')}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>
                      {s.full_name_nepali}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {s.first_name} {s.last_name} ({s.gender === 'male' ? 'छात्र/M' : 'छात्रा/F'})
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#1e40af' }}>
                    {s.admission_number}
                  </td>
                  <td>
                    <span className="badge badge-blue">
                      {s.class_nepali_name || s.class_name} - {s.section_name}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-gray">
                      {s.caste_ethnicity}
                    </span>
                  </td>
                  <td>
                    {s.disability_status !== 'none' ? (
                      <span className="badge badge-amber">
                        {s.disability_status}
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>-</span>
                    )}
                  </td>
                  <td>
                    <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{s.guardian_name || s.father_name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Phone size={10} /> {s.guardian_phone || '-'}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>
                    {s.municipality}, वडा {s.ward}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleViewProfile(s.id)}
                      className="btn btn-outline btn-sm"
                      title="पूरा विवरण हेर्नुहोस्"
                      style={{ padding: '0.25rem 0.5rem' }}
                    >
                      <Eye size={14} color="#2563eb" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: View Detailed Student Profile */}
      {selectedStudentProfile && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '680px' }}>
            <div className="modal-header" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <GraduationCap size={22} color="#facc15" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                    {selectedStudentProfile.full_name_nepali} ({selectedStudentProfile.first_name} {selectedStudentProfile.last_name})
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.9 }}>
                    भर्ना नं.: {selectedStudentProfile.admission_number} | कक्षा: {selectedStudentProfile.class_nepali_name} ({selectedStudentProfile.section_name})
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedStudentProfile(null)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem', fontSize: '0.875rem' }}>
              {/* Quick Stat Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ backgroundColor: '#eff6ff', padding: '0.75rem', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>उपस्थिति दर</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e40af' }}>{selectedStudentProfile.attendanceRate}%</div>
                </div>
                <div style={{ backgroundColor: '#ecfdf5', padding: '0.75rem', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>कुल भुक्तानी</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#047857' }}>रु. {Number(selectedStudentProfile.totalFeePaid).toLocaleString('en-IN')}</div>
                </div>
                <div style={{ backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>बाँकी बक्यौता</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b91c1c' }}>रु. {Number(selectedStudentProfile.outstandingBalance).toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Personal Details */}
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                व्यक्तिगत तथा पारिवारिक विवरण (Personal Details)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem', marginBottom: '1.25rem' }}>
                <div><strong>जन्म मिति (BS):</strong> {selectedStudentProfile.dob_bs} ({selectedStudentProfile.dob_ad || '-'} AD)</div>
                <div><strong>रक्त समूह (Blood Group):</strong> {selectedStudentProfile.blood_group || '-'}</div>
                <div><strong>जात/जाति समूह:</strong> {selectedStudentProfile.caste_ethnicity}</div>
                <div><strong>मातृभाषा:</strong> {selectedStudentProfile.mother_tongue || 'नेपाली'}</div>
                <div><strong>विद्यार्थीको फोन (Student Phone):</strong> {selectedStudentProfile.student_phone || '-'}</div>
                <div><strong>बुवाको नाम:</strong> {selectedStudentProfile.father_name || '-'}</div>
                <div><strong>आमाको नाम:</strong> {selectedStudentProfile.mother_name || '-'}</div>
                <div><strong>अभिभावकको नाम:</strong> {selectedStudentProfile.guardian_name || '-'}</div>
                <div><strong>सम्पर्क फोन:</strong> {selectedStudentProfile.guardian_phone || '-'}</div>
              </div>

              {/* Nepal Federal Address */}
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                ठेगाना विवरण (Federal Address Hierarchy)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem', marginBottom: '0.5rem' }}>
                <div><strong>स्थायी प्रदेश (Permanent Province):</strong> {selectedStudentProfile.permanent_province || selectedStudentProfile.province}</div>
                <div><strong>स्थायी जिल्ला (District):</strong> {selectedStudentProfile.permanent_district || selectedStudentProfile.district}</div>
                <div><strong>स्थानीय तह (Municipality):</strong> {selectedStudentProfile.permanent_municipality || selectedStudentProfile.municipality}</div>
                <div><strong>वडा नं. (Ward):</strong> {selectedStudentProfile.permanent_ward || selectedStudentProfile.ward} (टोल: {selectedStudentProfile.permanent_tole || selectedStudentProfile.tole || '-'})</div>
              </div>
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.5rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', color: '#475569', marginBottom: '1.25rem' }}>
                <strong>अस्थायी / हालको ठेगाना:</strong>{' '}
                {selectedStudentProfile.same_as_permanent
                  ? 'स्थायी ठेगाना सरह (Same as Permanent Address)'
                  : `${selectedStudentProfile.temporary_province || selectedStudentProfile.province || '-'}, ${selectedStudentProfile.temporary_district || selectedStudentProfile.district || '-'}, ${selectedStudentProfile.temporary_municipality || selectedStudentProfile.municipality || '-'}, वडा नं. ${selectedStudentProfile.temporary_ward || selectedStudentProfile.ward || '-'} (${selectedStudentProfile.temporary_tole || selectedStudentProfile.tole || '-'})`}
              </div>

              {/* Sensitive Inclusion & Disability Notes */}
              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                padding: '0.85rem',
                borderRadius: '6px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#92400e', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={16} color="#d97706" />
                  समावेशी तथा विशेष सिकाइ सहायता विवरण (Confidential Inclusion Notes)
                </div>
                <div style={{ fontSize: '0.8rem', color: '#78350f' }}>
                  <strong>अपाङ्गता स्थिति:</strong> {selectedStudentProfile.disability_status}
                </div>
                {selectedStudentProfile.inclusion_support_notes && (
                  <div style={{ fontSize: '0.8rem', color: '#78350f', marginTop: '0.2rem' }}>
                    <strong>विशेष सिकाइ तथा स्वास्थ्य आवश्यकता:</strong> {selectedStudentProfile.inclusion_support_notes}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedStudentProfile(null)} className="btn btn-outline">
                बन्द गर्नुहोस्
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: New Student Admission Form */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '750px' }}>
            <div className="modal-header" style={{ backgroundColor: '#2563eb', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={20} />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                  {lang === 'ne' ? 'नयाँ विद्यार्थी भर्ना फारम' : 'New Student Admission Form'}
                </h3>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdmissionSubmit}>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                
                {/* Academic Placement */}
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.6rem' }}>
                  १. भर्ना कक्षा तथा खण्ड (Class Placement)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      कक्षा (Class) *
                    </label>
                    <select
                      value={formData.current_class_id}
                      onChange={(e) => {
                        const cid = e.target.value;
                        const cObj = classes.find(c => c.id === cid);
                        const firstSec = cObj?.sections && cObj.sections.length > 0 ? cObj.sections[0].id : '';
                        setFormData(prev => ({
                          ...prev,
                          current_class_id: cid,
                          current_section_id: firstSec
                        }));
                      }}
                      className="form-select"
                      required
                    >
                      {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.nepali_name} ({c.name})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      खण्ड (Section) *
                    </label>
                    {(() => {
                      const selectedClassObj = classes.find(c => c.id === formData.current_class_id);
                      const availableSections = selectedClassObj?.sections || [];
                      return (
                        <>
                          <select
                            value={formData.current_section_id}
                            onChange={(e) => setFormData(prev => ({ ...prev, current_section_id: e.target.value }))}
                            className="form-select"
                            required
                          >
                            {availableSections.length === 0 ? (
                              <option value="" disabled>
                                {lang === 'ne' ? '-- खण्ड उपलब्ध छैन --' : '-- No sections available --'}
                              </option>
                            ) : (
                              availableSections.map(s => (
                                <option key={s.id} value={s.id}>
                                  {s.name} {s.room_number ? `(${s.room_number})` : ''}
                                </option>
                              ))
                            )}
                          </select>
                          <small style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.25rem', display: 'block' }}>
                            {availableSections.length > 0
                              ? (lang === 'ne'
                                  ? `${toNepaliDigits(availableSections.length)} वटा खण्ड उपलब्ध`
                                  : `${availableSections.length} section(s) available`)
                              : (lang === 'ne'
                                  ? 'यस कक्षाको लागि खण्ड फेला परेन'
                                  : 'No sections configured')}
                          </small>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Personal Information */}
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.6rem' }}>
                  २. विद्यार्थीको व्यक्तिगत विवरण (Personal Information)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      पूरा नाम नेपालीमा (Devanagari) *
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="उदा: आरव श्रेष्ठ"
                      value={formData.full_name_nepali}
                      onChange={(e) => setFormData({ ...formData, full_name_nepali: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      First Name (English) *
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Aarav"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      Last Name (English) *
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Shrestha"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <NepaliDatePicker
                      label="जन्म मिति वि.सं. (DOB in BS)"
                      value={formData.dob_bs}
                      onChange={(v) => setFormData({ ...formData, dob_bs: v })}
                      lang={lang}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      लिङ्ग (Gender) *
                    </label>
                    <select
                      className="form-select"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="male">छात्र (Male)</option>
                      <option value="female">छात्रा (Female)</option>
                      <option value="other">अन्य (Other)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      रक्त समूह (Blood Group)
                    </label>
                    <select
                      className="form-select"
                      value={formData.blood_group}
                      onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {lang === 'ne' ? 'विद्यार्थीको फोन (Student Phone)' : 'Student Phone'}
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="98XXXXXXXX"
                      value={formData.student_phone}
                      onChange={(e) => setFormData({ ...formData, student_phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Inclusion, Caste & IEMIS Categories */}
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.6rem' }}>
                  ३. समावेशी तथा सरकारी IEMIS समूह (Inclusion Categories)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      जात/जाति समूह (IEMIS) *
                    </label>
                    <select
                      className="form-select"
                      value={formData.caste_ethnicity}
                      onChange={(e) => setFormData({ ...formData, caste_ethnicity: e.target.value })}
                      required
                    >
                      {ETHNICITY_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.labelNe} ({opt.labelEn})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      मातृभाषा (Mother Tongue)
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.mother_tongue}
                      onChange={(e) => setFormData({ ...formData, mother_tongue: e.target.value })}
                      placeholder="उदा: नेपाली, नेवारी, मैथिली"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      अपाङ्गता स्थिति (Disability)
                    </label>
                    <select
                      className="form-select"
                      value={formData.disability_status}
                      onChange={(e) => setFormData({ ...formData, disability_status: e.target.value })}
                    >
                      {DISABILITY_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.labelNe}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    विशेष सिकाइ तथा स्वास्थ्य सहायता विवरण (Inclusion & Accommodations)
                  </label>
                  <textarea
                    rows="2"
                    className="form-textarea"
                    placeholder="उदा: ह्वीलचेयर र्‍याम्प आवश्यकता, कम दृष्टि (ठूलो फन्ट परीक्षा प्रश्नपत्र)..."
                    value={formData.inclusion_support_notes}
                    onChange={(e) => setFormData({ ...formData, inclusion_support_notes: e.target.value })}
                  />
                </div>

                {/* 4. Nepal Permanent Federal Address */}
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.6rem' }}>
                  ४. स्थायी ठेगाना (Permanent Address)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      प्रदेश (Province) *
                    </label>
                    <select
                      className="form-select"
                      value={formData.permanent_province}
                      onChange={(e) => handlePermanentProvinceChange(e.target.value)}
                      required
                    >
                      {NEPAL_PROVINCES.map(p => (
                        <option key={p.id} value={p.id}>{p.display}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      जिल्ला (District) *
                    </label>
                    <select
                      className="form-select"
                      value={formData.permanent_district}
                      onChange={(e) => handlePermanentDistrictChange(e.target.value)}
                      required
                    >
                      {getDistrictsByProvince(formData.permanent_province).map(d => (
                        <option key={d.id} value={d.id}>{d.display}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      स्थानीय तह / पालिका (Municipality) *
                    </label>
                    <select
                      className="form-select"
                      value={formData.permanent_municipality}
                      onChange={(e) => handlePermanentMunicipalityChange(e.target.value)}
                      required
                    >
                      {getLocalLevelsByDistrict(formData.permanent_province, formData.permanent_district).map(ll => (
                        <option key={ll.name} value={ll.name}>{ll.display}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      वडा नं. (Ward) *
                    </label>
                    <select
                      className="form-select"
                      value={formData.permanent_ward}
                      onChange={(e) => handlePermanentWardChange(e.target.value)}
                      required
                    >
                      {getWardsByLocalLevel(formData.permanent_province, formData.permanent_district, formData.permanent_municipality).map(w => (
                        <option key={w} value={String(w)}>
                          {lang === 'ne' ? `वडा नं. ${toNepaliDigits(w)}` : `Ward No. ${w}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      टोल / ठेगाना (Tole/Village)
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="उदा: महालक्ष्मीस्थान, कोटेश्वर"
                      value={formData.permanent_tole}
                      onChange={(e) => handlePermanentToleChange(e.target.value)}
                    />
                  </div>
                </div>

                {/* 5. Nepal Temporary Address & Same as Permanent Checkbox */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a', margin: 0 }}>
                    ५. अस्थायी / हालको ठेगाना (Temporary / Current Address)
                  </h4>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    backgroundColor: '#eff6ff',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.same_as_permanent}
                      onChange={(e) => handleSameAsPermanentToggle(e.target.checked)}
                      style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563eb' }}
                    />
                    <span>{lang === 'ne' ? 'स्थायी र अस्थायी ठेगाना एउटै छ (Same as permanent)' : 'Same as permanent address'}</span>
                  </label>
                </div>

                {formData.same_as_permanent ? (
                  <div style={{
                    backgroundColor: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '6px',
                    padding: '0.85rem 1rem',
                    marginBottom: '1.25rem',
                    fontSize: '0.82rem',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}>
                    <MapPin size={18} color="#2563eb" />
                    <div>
                      <strong>{lang === 'ne' ? 'स्थायी ठेगाना सरह स्वचालित सिङ्क भएको छ:' : 'Auto-synced with Permanent Address:'}</strong>{' '}
                      {formData.permanent_province}, {formData.permanent_district}, {formData.permanent_municipality}, वडा नं. {toNepaliDigits(formData.permanent_ward)} {formData.permanent_tole ? `(${formData.permanent_tole})` : ''}
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          प्रदेश (Province) *
                        </label>
                        <select
                          className="form-select"
                          value={formData.temporary_province}
                          onChange={(e) => handleTemporaryProvinceChange(e.target.value)}
                          required
                        >
                          {NEPAL_PROVINCES.map(p => (
                            <option key={p.id} value={p.id}>{p.display}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          जिल्ला (District) *
                        </label>
                        <select
                          className="form-select"
                          value={formData.temporary_district}
                          onChange={(e) => handleTemporaryDistrictChange(e.target.value)}
                          required
                        >
                          {getDistrictsByProvince(formData.temporary_province).map(d => (
                            <option key={d.id} value={d.id}>{d.display}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          स्थानीय तह / पालिका (Municipality) *
                        </label>
                        <select
                          className="form-select"
                          value={formData.temporary_municipality}
                          onChange={(e) => handleTemporaryMunicipalityChange(e.target.value)}
                          required
                        >
                          {getLocalLevelsByDistrict(formData.temporary_province, formData.temporary_district).map(ll => (
                            <option key={ll.name} value={ll.name}>{ll.display}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          वडा नं. (Ward) *
                        </label>
                        <select
                          className="form-select"
                          value={formData.temporary_ward}
                          onChange={(e) => handleTemporaryWardChange(e.target.value)}
                          required
                        >
                          {getWardsByLocalLevel(formData.temporary_province, formData.temporary_district, formData.temporary_municipality).map(w => (
                            <option key={w} value={String(w)}>
                              {lang === 'ne' ? `वडा नं. ${toNepaliDigits(w)}` : `Ward No. ${w}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          टोल / ठेगाना (Tole/Village)
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="उदा: नयाँ बानेश्वर, पुतलीसडक"
                          value={formData.temporary_tole}
                          onChange={(e) => handleTemporaryToleChange(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* 6. Parents & Guardians */}
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.6rem' }}>
                  ६. अभिभावक तथा सम्पर्क विवरण (Parents & Emergency Contact)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>बुवाको नाम (Father's Name)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.father_name}
                      onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>आमाको नाम (Mother's Name)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.mother_name}
                      onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>अभिभावकको नाम (Guardian)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.guardian_name}
                      onChange={(e) => setFormData({ ...formData, guardian_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>सम्पर्क मोबाइल नं. (Phone) *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="98XXXXXXXX"
                      value={formData.guardian_phone}
                      onChange={(e) => setFormData({ ...formData, guardian_phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  रद्द गर्नुहोस्
                </button>
                <button type="submit" className="btn btn-primary">
                  भर्ना दर्ता गर्नुहोस् (Enroll Student)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
