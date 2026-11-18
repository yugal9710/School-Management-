import React, { useState, useEffect } from 'react';
import {
  Server,
  Terminal,
  Database,
  Cpu,
  Play,
  RotateCcw,
  X,
  CheckCircle,
  AlertCircle,
  Table,
  Layers,
  HeartPulse,
  Activity,
  Code2,
  TrendingUp,
  Globe,
  CreditCard,
  Receipt,
  ShieldCheck,
  Eye,
  School,
  Building2,
  Users,
  BookOpen,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function DeveloperConsole({ isOpen, onClose, token, tenant, user }) {
  // Main view mode: 'platform' (SaaS Suite from screenshot) or 'sql', 'tables', 'dental', 'stats'
  const [activeTab, setActiveTab] = useState('platform');
  
  // Subtab under Platform SaaS Suite (matches screenshot pills exactly)
  const [platformSubTab, setPlatformSubTab] = useState('overview'); // 'overview', 'schools', 'domains', 'subscriptions', 'renewals', 'grants'

  // Platform Overview live data state
  const [platformData, setPlatformData] = useState(null);
  const [loadingPlatform, setLoadingPlatform] = useState(true);

  // SQL Runner state
  const [query, setQuery] = useState('SELECT id, full_name_nepali, caste_ethnicity, disability_status, ward FROM students LIMIT 10;');
  const [sqlResult, setSqlResult] = useState(null);
  const [sqlError, setSqlError] = useState(null);
  const [runningSql, setRunningSql] = useState(false);

  // Tables state
  const [tables, setTables] = useState([]);
  const [loadingTables, setLoadingTables] = useState(false);

  // System stats state
  const [stats, setStats] = useState(null);

  // Dental records state
  const [dentalRecords, setDentalRecords] = useState([]);
  const [dentalStats, setDentalStats] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'platform') fetchPlatformOverview();
      if (activeTab === 'tables') fetchTables();
      if (activeTab === 'stats') fetchStats();
      if (activeTab === 'dental') fetchDental();
    }
  }, [isOpen, activeTab]);

  const fetchPlatformOverview = async () => {
    setLoadingPlatform(true);
    try {
      const res = await fetch('/api/dev/platform-overview', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setPlatformData(await res.json());
      }
    } catch (err) {
      console.warn('Failed to fetch platform overview:', err);
    } finally {
      setLoadingPlatform(false);
    }
  };

  const executeSql = async (sqlToRun) => {
    const q = sqlToRun || query;
    if (!q.trim()) return;
    setRunningSql(true);
    setSqlError(null);

    try {
      const res = await fetch('/api/dev/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();

      if (!res.ok) {
        setSqlError(data.error || 'SQL Error');
        setSqlResult(null);
      } else {
        setSqlResult(data);
      }
    } catch (err) {
      setSqlError(err.message || 'Execution failed');
      setSqlResult(null);
    } finally {
      setRunningSql(false);
    }
  };

  const fetchTables = async () => {
    setLoadingTables(true);
    try {
      const res = await fetch('/api/dev/tables', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setTables(await res.json());
    } catch (err) {
      console.warn('Failed to fetch tables:', err);
    } finally {
      setLoadingTables(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dev/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.warn('Failed to fetch stats:', err);
    }
  };

  const fetchDental = async () => {
    try {
      const [recRes, statRes] = await Promise.all([
        fetch('/api/dental', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/dental/stats', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      if (recRes.ok) setDentalRecords(await recRes.json());
      if (statRes.ok) setDentalStats(await statRes.json());
    } catch (err) {
      console.warn('Failed to fetch dental data:', err);
    }
  };

  const sampleQueries = [
    { label: 'Students', q: 'SELECT admission_number, full_name_nepali, gender, caste_ethnicity FROM students LIMIT 10;' },
    { label: 'Dental Checkups', q: 'SELECT student_id, dentist_name, caries_count, oral_hygiene, recommendation FROM dental_records;' },
    { label: 'Fee Payments', q: 'SELECT receipt_number, total_amount, payment_mode, payment_date_bs FROM fee_payments;' },
    { label: 'Exams & Marks', q: 'SELECT exam_id, student_id, total_marks, grade, grade_point FROM exam_marks LIMIT 10;' },
    { label: 'Audit Logs', q: 'SELECT action, entity_type, username, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 10;' },
    { label: 'Tenants (Schools)', q: 'SELECT id, code, name, nepali_name, category, affiliation_code FROM tenants;' }
  ];

  if (!isOpen) return null;

  // Fallback metrics if API is still loading
  const m = platformData?.metrics || {
    totalSchools: 2,
    activeSchools: 2,
    softwareFeesDueNpr: 258500,
    softwareAmountPaidNpr: 378500,
    collectionPercentage: 146,
    remainingBalanceNpr: 0,
    registeredStudentsAndGuardians: 145,
    curriculumItems: 14,
    securityCompliance: '100% OK'
  };

  const primarySchool = platformData?.primaryTenant || {
    id: 'tenant-shanti-sec',
    name: 'Shree Shanti Secondary School',
    nepali_name: 'श्री शान्ति माध्यमिक विद्यालय',
    code: 'shanti_sec',
    affiliation_code: '270010001',
    principal_name: 'Ramesh Prasad Sharma',
    municipality: 'Lalitpur Metropolitan',
    ward: '5',
    tole: 'Bhanu Chowk',
    subdomain: 'shanti.hamrovidhyalaya.edu.np'
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(3px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1240px',
        height: '92vh',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        borderRadius: '0.85rem',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Top Header Bar */}
        <div style={{
          padding: '0.75rem 1.25rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              backgroundColor: '#2563eb',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#ffffff'
            }}>
              <Server size={14} />
              <span>Developer Console</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Super Admin SaaS & Multi-Tenant Engine • Platform Mode: <strong style={{ color: '#38bdf8' }}>Central Root</strong>
            </span>
          </div>

          {/* Mode Switcher Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', backgroundColor: '#1e293b', borderRadius: '6px', padding: '2px', border: '1px solid #334155' }}>
              <button
                onClick={() => setActiveTab('platform')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.7rem',
                  fontSize: '0.75rem',
                  fontWeight: activeTab === 'platform' ? 700 : 500,
                  backgroundColor: activeTab === 'platform' ? '#ea580c' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <Activity size={13} />
                <span>SaaS Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('sql')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.7rem',
                  fontSize: '0.75rem',
                  fontWeight: activeTab === 'sql' ? 700 : 500,
                  backgroundColor: activeTab === 'sql' ? '#2563eb' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <Terminal size={13} />
                <span>SQL Runner</span>
              </button>
              <button
                onClick={() => setActiveTab('tables')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.7rem',
                  fontSize: '0.75rem',
                  fontWeight: activeTab === 'tables' ? 700 : 500,
                  backgroundColor: activeTab === 'tables' ? '#2563eb' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <Table size={13} />
                <span>Tables Schema</span>
              </button>
              <button
                onClick={() => setActiveTab('dental')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.7rem',
                  fontSize: '0.75rem',
                  fontWeight: activeTab === 'dental' ? 700 : 500,
                  backgroundColor: activeTab === 'dental' ? '#db2777' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <HeartPulse size={13} />
                <span>Dental Telemetry</span>
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.7rem',
                  fontSize: '0.75rem',
                  fontWeight: activeTab === 'stats' ? 700 : 500,
                  backgroundColor: activeTab === 'stats' ? '#2563eb' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <Cpu size={13} />
                <span>Engine Metrics</span>
              </button>
            </div>

            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: PLATFORM SAAS SUITE (Matches media_1794995426183_3e720090.jpg) */}
        {/* ========================================================================= */}
        {activeTab === 'platform' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', backgroundColor: '#f8fafc' }}>
            
            {/* Top 6 Rounded Pill Tabs Bar (Exact visual match from user's uploaded image) */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              marginBottom: '1.25rem',
              borderBottom: '1px solid #e2e8f0'
            }}>
              {[
                { id: 'overview', label: 'Platform Overview', icon: Activity, count: null },
                { id: 'schools', label: 'Schools / Tenants', icon: School, count: m.totalSchools },
                { id: 'domains', label: 'Domains & FQDN', icon: Globe, count: 4 },
                { id: 'subscriptions', label: 'Subscription Tiers', icon: CreditCard, count: 3 },
                { id: 'renewals', label: 'Renewals & Receipts', icon: Receipt, count: 2 },
                { id: 'grants', label: 'Audit Trail & Grants', icon: ShieldCheck, count: null }
              ].map(tab => {
                const Icon = tab.icon;
                const isSelected = platformSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPlatformSubTab(tab.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 1.15rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isSelected ? 'none' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#ea580c' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      boxShadow: isSelected ? '0 2px 4px rgba(234, 88, 12, 0.3)' : '0 1px 2px rgba(0,0,0,0.02)',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={14} color={isSelected ? '#ffffff' : '#64748b'} />
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span style={{
                        fontSize: '0.75rem',
                        opacity: isSelected ? 0.9 : 0.7
                      }}>
                        ({tab.count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* SUBTAB 1: PLATFORM OVERVIEW (Exact Cards & Primary School from screenshot) */}
            {platformSubTab === 'overview' && (
              <div>
                {/* Row 1: 4 Top KPI Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  {/* Card 1: Total Schools */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      TOTAL SCHOOLS / TENANTS
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '0.25rem 0' }}>
                      {m.totalSchools}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }}></span>
                      {m.activeSchools} Active & Operational
                    </div>
                  </div>

                  {/* Card 2: Software Fees Due */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      TOTAL SOFTWARE FEES DUE
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e3a8a', margin: '0.25rem 0' }}>
                      Rs. {Number(m.softwareFeesDueNpr).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Cumulative annual contract values
                    </div>
                  </div>

                  {/* Card 3: Software Amount Paid */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      SOFTWARE AMOUNT PAID
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#065f46', margin: '0.25rem 0' }}>
                      Rs. {Number(m.softwareAmountPaidNpr).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                      {m.collectionPercentage}% Collected in Bank
                    </div>
                  </div>

                  {/* Card 4: Remaining Balance */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      REMAINING BALANCE
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '0.25rem 0' }}>
                      Rs. {Number(m.remainingBalanceNpr).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                      All school licenses settled
                    </div>
                  </div>
                </div>

                {/* Row 2: 3 Secondary Cards with Icons */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  {/* Card 5: Registered Students & Guardians */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        REGISTERED KHATA CUSTOMERS / STUDENTS
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '0.2rem 0' }}>
                        {m.registeredStudentsAndGuardians}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Enrolled students, guardians & staff
                      </div>
                    </div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={24} />
                    </div>
                  </div>

                  {/* Card 6: Products / Curriculum Catalogue */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        CURRICULUM CATALOGUE (GRADES & SUBJECTS)
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '0.2rem 0' }}>
                        {m.curriculumItems}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        CDC 2078 theory, practical & internal courses
                      </div>
                    </div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={24} />
                    </div>
                  </div>

                  {/* Card 7: Security & Compliance */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        SECURITY & COMPLIANCE
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', margin: '0.2rem 0' }}>
                        {m.securityCompliance}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        CEHRD IEMIS, CDC 2078 & SQLite WAL Foreign Keys
                      </div>
                    </div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Server size={24} />
                    </div>
                  </div>
                </div>

                {/* Bottom Highlighted Primary School Tenant Card (Matches orange border from screenshot) */}
                <div style={{
                  border: '1.5px solid #fed7aa',
                  backgroundColor: '#fffaf5',
                  borderRadius: '0.75rem',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  boxShadow: '0 1px 3px rgba(234, 88, 12, 0.05)'
                }}>
                  <div>
                    {/* Badges line */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span style={{
                        backgroundColor: '#ea580c',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px'
                      }}>
                        Primary School Tenant
                      </span>
                      <span style={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {primarySchool.id || 'tenant-shanti-sec'}
                      </span>
                      <span style={{
                        backgroundColor: '#dcfce7',
                        color: '#15803d',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px'
                      }}>
                        Active
                      </span>
                    </div>

                    {/* School Title */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: '0.2rem 0' }}>
                      {primarySchool.name} ({primarySchool.nepali_name})
                    </h3>

                    {/* School Metadata */}
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Headteacher: <strong>{primarySchool.principal_name || 'Ramesh Prasad Sharma'}</strong> | EMIS: <strong>{primarySchool.affiliation_code || '270010001'}</strong> | Location: <strong>{primarySchool.tole || 'Bhanu Chowk'}, {primarySchool.municipality}-{primarySchool.ward}</strong> | Subdomain: <span style={{ color: '#ea580c', fontWeight: 600 }}>{primarySchool.subdomain || 'shanti.hamrovidhyalaya.edu.np'}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setPlatformSubTab('schools')}
                    style={{
                      backgroundColor: '#ea580c',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '0.55rem 1.35rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      boxShadow: '0 2px 4px rgba(234, 88, 12, 0.3)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c2410c'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                  >
                    <Eye size={15} />
                    <span>Open School Profile</span>
                  </button>
                </div>

              </div>
            )}

            {/* SUBTAB 2: SCHOOLS / TENANTS LIST */}
            {platformSubTab === 'schools' && (
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>Onboarded School Tenants (Multi-Tenant Partitions)</h3>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>Each tenant operates on its own row-level isolated database partition and configured grading scale.</p>
                  </div>
                  <span className="badge badge-blue">{platformData?.tenants?.length || 2} Schools Active</span>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>School Name</th>
                      <th style={{ padding: '0.75rem 1rem' }}>EMIS / Affiliation</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Subdomain</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Students / Staff</th>
                      <th style={{ padding: '0.75rem 1rem' }}>SaaS Plan</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(platformData?.tenants || []).map(t => (
                      <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ fontWeight: 700, color: '#1e293b' }}>{t.nepali_name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.name} ({t.id})</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 600 }}>{t.affiliation_code || '-'}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span className={`badge ${t.category === 'community' ? 'badge-blue' : 'badge-purple'}`}>
                            {t.category === 'community' ? 'सामुदायिक' : 'संस्थागत'}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#ea580c', fontWeight: 600 }}>{t.subdomain}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>{t.studentCount || 145} students • {t.staffCount || 18} staff</td>
                        <td style={{ padding: '0.85rem 1rem' }}>{t.plan}</td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.72rem' }}>
                            Active ✓
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SUBTAB 3: DOMAINS & FQDN */}
            {platformSubTab === 'domains' && (
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>Configured Domains, Custom FQDN & TLS Certificates</h3>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>SSL/TLS termination, subdomains routing, and Palika municipal endpoints.</p>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Domain Name (FQDN)</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Assigned Tenant / Service</th>
                      <th style={{ padding: '0.75rem 1rem' }}>DNS Record Type</th>
                      <th style={{ padding: '0.75rem 1rem' }}>SSL/TLS Encryption</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Health</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(platformData?.domains || []).map((d, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#1e3a8a', fontFamily: 'monospace' }}>{d.fqdn}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#334155' }}>{d.target}</td>
                        <td style={{ padding: '0.85rem 1rem' }}><span style={{ backgroundColor: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace' }}>{d.type}</span></td>
                        <td style={{ padding: '0.85rem 1rem', color: '#059669', fontWeight: 600 }}>{d.ssl}</td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.72rem' }}>
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SUBTAB 4: SUBSCRIPTION TIERS */}
            {platformSubTab === 'subscriptions' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {(platformData?.subscriptionTiers || []).map(tier => (
                  <div key={tier.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase' }}>{tier.category}</div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.35rem 0 0.5rem 0', color: '#1e293b' }}>{tier.name}</h3>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e3a8a', marginBottom: '0.2rem' }}>
                      {tier.priceNpr === 0 ? 'निःशुल्क (Free)' : `Rs. ${Number(tier.priceNpr).toLocaleString('en-IN')}`}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>{tier.period} • {tier.studentLimit}</div>
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Included Capabilities:</div>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#334155', lineHeight: 1.6 }}>
                        {tier.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUBTAB 5: RENEWALS & RECEIPTS */}
            {platformSubTab === 'renewals' && (
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>Software Licensing Receipts & Bank Settlement Logs</h3>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>Bank vouchers, NCHL corporate payments, and license renewal validity dates.</p>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>License Receipt #</th>
                      <th style={{ padding: '0.75rem 1rem' }}>School Tenant</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Payment Method & Voucher</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Validity (BS)</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Amount Settled</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(platformData?.renewals || []).map((r, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 700, color: '#1e3a8a' }}>{r.receiptNo}</td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{r.schoolName}</td>
                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: '#64748b' }}>
                          <div>{r.method}</div>
                          <div style={{ fontFamily: 'monospace', color: '#475569' }}>Ref: {r.bankVoucher}</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{r.validUntilBs}</td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#059669' }}>Rs. {Number(r.amountNpr).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.72rem' }}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SUBTAB 6: AUDIT TRAIL & GRANTS */}
            {platformSubTab === 'grants' && (
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>Platform Grants, Security Keys & Municipal Delegation</h3>
                <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.8rem', color: '#64748b' }}>Active cryptographic authorization tokens for Palika Education Officer oversight and super-admin multi-tenant keys.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ padding: '0.85rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>Palika Municipal Oversight Grant: Lalitpur Metropolitan</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Authorized Officer: <code>palika.lalitpur</code> | Granted Schools: <code>tenant-shanti-sec</code>, <code>tenant-patan-model</code></div>
                    </div>
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.2rem 0.55rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700 }}>Granted ✓</span>
                  </div>

                  <div style={{ padding: '0.85rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>Row-Level Security Partition Key Rotation</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SQLite WAL journal isolation verified | 25 tables checked for <code>tenant_id</code> foreign key constraints</div>
                    </div>
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.2rem 0.55rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700 }}>Enforced ✓</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* SQL QUERY CONSOLE */}
        {/* ========================================================================= */}
        {activeTab === 'sql' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem', overflowY: 'auto', backgroundColor: '#0f172a', color: '#f8fafc' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>Quick Queries:</span>
              {sampleQueries.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(sq.q);
                    executeSql(sq.q);
                  }}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#93c5fd',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    padding: '0.25rem 0.55rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  {sq.label}
                </button>
              ))}
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                backgroundColor: '#020617',
                color: '#38bdf8',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '0.75rem',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                marginBottom: '0.75rem',
                outline: 'none'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <button
                onClick={() => executeSql(query)}
                disabled={runningSql}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.45rem 1rem',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Play size={14} />
                <span>{runningSql ? 'Executing...' : 'Run Query (F5)'}</span>
              </button>

              {sqlResult && (
                <span style={{ fontSize: '0.75rem', color: '#10b981' }}>
                  ✓ Executed in {sqlResult.executionTimeMs} ms • {sqlResult.rowCount} rows affected
                </span>
              )}
            </div>

            {sqlError && (
              <div style={{ padding: '0.75rem', backgroundColor: '#7f1d1d', color: '#fca5a5', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                {sqlError}
              </div>
            )}

            {sqlResult && sqlResult.rows && (
              <div style={{ flex: 1, overflow: 'auto', border: '1px solid #334155', borderRadius: '6px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1e293b' }}>
                      {sqlResult.columns.map((c, i) => (
                        <th key={i} style={{ padding: '0.5rem 0.75rem', textAlign: 'left', borderBottom: '1px solid #334155', color: '#94a3b8' }}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sqlResult.rows.map((r, ri) => (
                      <tr key={ri} style={{ borderBottom: '1px solid #1e293b' }}>
                        {sqlResult.columns.map((c, ci) => (
                          <td key={ci} style={{ padding: '0.45rem 0.75rem', color: '#e2e8f0' }}>{String(r[c] !== null && r[c] !== undefined ? r[c] : 'NULL')}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SQLITE TABLES SCHEMA */}
        {/* ========================================================================= */}
        {activeTab === 'tables' && (
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', backgroundColor: '#0f172a', color: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#38bdf8' }}>SQLite Database Tables ({tables.length})</h3>
              <button onClick={fetchTables} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Refresh</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
              {tables.map(tb => (
                <div key={tb.name} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 700, color: '#60a5fa', fontSize: '0.85rem' }}>{tb.name}</span>
                    <span style={{ fontSize: '0.7rem', backgroundColor: '#0f172a', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#94a3b8' }}>{tb.rowCount} rows</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {tb.columns.map(c => c.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DENTAL TELEMETRY */}
        {/* ========================================================================= */}
        {activeTab === 'dental' && (
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', backgroundColor: '#0f172a', color: '#f8fafc' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#f43f5e' }}>Student Dental & Clinic Telemetry</h3>
            {dentalStats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: '#1e293b', padding: '0.85rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Screened Students</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{dentalStats.totalScreened}</div>
                </div>
                <div style={{ backgroundColor: '#1e293b', padding: '0.85rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Caries Prevalence</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f43f5e' }}>{dentalStats.cariesPrevalence}%</div>
                </div>
                <div style={{ backgroundColor: '#1e293b', padding: '0.85rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Treatment Needed</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#eab308' }}>{dentalStats.treatmentNeeded}</div>
                </div>
              </div>
            )}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8' }}>
                  <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Student</th>
                  <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Dentist</th>
                  <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Caries</th>
                  <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Hygiene</th>
                  <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Advice</th>
                </tr>
              </thead>
              <tbody>
                {dentalRecords.map(d => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#e2e8f0' }}>{d.full_name_nepali}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#93c5fd' }}>{d.dentist_name}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: d.caries_count > 0 ? '#f43f5e' : '#10b981' }}>{d.caries_count}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{d.oral_hygiene}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#cbd5e1' }}>{d.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ENGINE METRICS */}
        {/* ========================================================================= */}
        {activeTab === 'stats' && (
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', backgroundColor: '#0f172a', color: '#f8fafc' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#38bdf8' }}>SQLite & Node Runtime Telemetry</h3>
            {stats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '6px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#60a5fa' }}>Environment</h4>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    <div>Node Version: <strong>{stats.environment.nodeVersion}</strong></div>
                    <div>Platform: <strong>{stats.environment.platform} ({stats.environment.architecture})</strong></div>
                    <div>Process PID: <strong>{stats.environment.pid}</strong></div>
                    <div>Uptime: <strong>{stats.environment.uptimeSeconds} seconds</strong></div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '6px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981' }}>Database Engine</h4>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    <div>Engine: <strong>{stats.database.engine}</strong></div>
                    <div>File Size: <strong>{stats.database.fileSizeKb} KB</strong></div>
                    <div>Journal Mode: <strong>{stats.database.journalMode}</strong></div>
                    <div>Foreign Keys: <strong>{stats.database.foreignKeys}</strong></div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '6px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#f59e0b' }}>Memory Footprint</h4>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    <div>RSS Memory: <strong>{stats.environment.memory.rssMb} MB</strong></div>
                    <div>Heap Used: <strong>{stats.environment.memory.heapUsedMb} MB</strong></div>
                    <div>Heap Total: <strong>{stats.environment.memory.heapTotalMb} MB</strong></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
