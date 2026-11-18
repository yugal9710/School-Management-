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
  Code2
} from 'lucide-react';

export default function DeveloperConsole({ isOpen, onClose, token, tenant, user }) {
  const [activeTab, setActiveTab] = useState('sql'); // 'sql', 'tables', 'dental', 'stats', 'tenant'
  
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
      if (activeTab === 'tables') fetchTables();
      if (activeTab === 'stats') fetchStats();
      if (activeTab === 'dental') fetchDental();
    }
  }, [isOpen, activeTab]);

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
        maxWidth: '1100px',
        height: '88vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        borderRadius: '0.85rem',
        border: '1px solid #334155',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      }}>
        {/* Console Top Header */}
        <div style={{
          padding: '0.75rem 1.25rem',
          backgroundColor: '#1e293b',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              backgroundColor: '#2563eb',
              padding: '0.3rem 0.6rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#ffffff'
            }}>
              <Server size={14} />
              <span>Developer Console</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Hamro Vidhyalaya SMS • SQLite Engine • Active Tenant: <strong style={{ color: '#60a5fa' }}>{tenant?.id || 'Platform'}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
              Connected (Node 24)
            </span>
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
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          backgroundColor: '#0f172a',
          borderBottom: '1px solid #334155',
          padding: '0 0.5rem'
        }}>
          {[
            { id: 'sql', label: 'SQL Query Console', icon: Terminal },
            { id: 'tables', label: 'SQLite Tables Schema', icon: Table },
            { id: 'dental', label: 'Dental & Health Explorer', icon: HeartPulse },
            { id: 'stats', label: 'System & DB Metrics', icon: Cpu },
            { id: 'tenant', label: 'Tenant State Inspector', icon: Layers }
          ].map(t => {
            const Icon = t.icon;
            const isSel = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1rem',
                  backgroundColor: isSel ? '#1e293b' : 'transparent',
                  color: isSel ? '#60a5fa' : '#94a3b8',
                  border: 'none',
                  borderBottom: `2px solid ${isSel ? '#3b82f6' : 'transparent'}`,
                  fontSize: '0.8rem',
                  fontWeight: isSel ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                <Icon size={15} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Console Body Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', backgroundColor: '#020617' }}>
          
          {/* TAB 1: SQL Console */}
          {activeTab === 'sql' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
              
              {/* Sample Query Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Quick Queries:</span>
                {sampleQueries.map((sq, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(sq.q);
                      executeSql(sq.q);
                    }}
                    style={{
                      padding: '0.2rem 0.55rem',
                      fontSize: '0.7rem',
                      backgroundColor: '#1e293b',
                      color: '#93c5fd',
                      border: '1px solid #334155',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {sq.label}
                  </button>
                ))}
              </div>

              {/* Editor Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter SQL query e.g. SELECT * FROM students;"
                  rows="3"
                  style={{
                    width: '100%',
                    backgroundColor: '#0f172a',
                    color: '#f8fafc',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => executeSql()}
                    disabled={runningSql}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 1rem',
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Play size={14} />
                    {runningSql ? 'Running...' : 'Run Query (F5)'}
                  </button>

                  {sqlResult && (
                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>
                      ✓ Executed in {sqlResult.executionTimeMs} ms • {sqlResult.rowCount || sqlResult.changes || 0} rows affected
                    </span>
                  )}
                </div>
              </div>

              {/* Error Box */}
              {sqlError && (
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#450a0a',
                  border: '1px solid #991b1b',
                  borderRadius: '6px',
                  color: '#fecaca',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertCircle size={16} />
                  <span>{sqlError}</span>
                </div>
              )}

              {/* Result Grid */}
              {sqlResult && sqlResult.rows && (
                <div style={{ flex: 1, overflowX: 'auto', border: '1px solid #334155', borderRadius: '6px', backgroundColor: '#0f172a' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8', textAlign: 'left' }}>
                        {sqlResult.columns.map(col => (
                          <th key={col} style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #334155', whiteSpace: 'nowrap' }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sqlResult.rows.map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderBottom: '1px solid #1e293b' }}>
                          {sqlResult.columns.map(col => (
                            <td key={col} style={{ padding: '0.45rem 0.75rem', color: '#e2e8f0', whiteSpace: 'nowrap' }}>
                              {row[col] !== null && row[col] !== undefined ? String(row[col]) : <em style={{ color: '#64748b' }}>NULL</em>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SQLite Tables Schema Inspector */}
          {activeTab === 'tables' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#60a5fa' }}>
                  SQLite Database Tables ({tables.length} tables found)
                </h3>
                <button
                  onClick={fetchTables}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#94a3b8',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Refresh
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                {tables.map(tbl => (
                  <div key={tbl.name} style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.85rem' }}>
                        📋 {tbl.name}
                      </span>
                      <span style={{ backgroundColor: '#1e3a8a', color: '#93c5fd', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                        {tbl.rowCount} rows
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.7rem', color: '#94a3b8' }}>
                      {tbl.columns.slice(0, 6).map(col => (
                        <div key={col.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: col.pk ? '#facc15' : '#cbd5e1' }}>
                            {col.name} {col.pk && '🔑'}
                          </span>
                          <span style={{ color: '#64748b' }}>{col.type}</span>
                        </div>
                      ))}
                      {tbl.columns.length > 6 && (
                        <div style={{ color: '#64748b', fontStyle: 'italic', marginTop: '2px' }}>
                          + {tbl.columns.length - 6} more columns...
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('sql');
                        const q = `SELECT * FROM ${tbl.name} LIMIT 10;`;
                        setQuery(q);
                        executeSql(q);
                      }}
                      style={{
                        marginTop: '0.65rem',
                        width: '100%',
                        padding: '0.3rem',
                        backgroundColor: '#1e293b',
                        color: '#60a5fa',
                        border: '1px solid #334155',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      Query Table &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Dental & Oral Health Explorer */}
          {activeTab === 'dental' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#ec4899' }}>
                    🦷 Student Dental Health & Clinic Telemetry
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                    Annual School Dental Checkup Camp Records (दन्त स्वास्थ्य परीक्षण)
                  </p>
                </div>
                <button
                  onClick={fetchDental}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#94a3b8',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Refresh
                </button>
              </div>

              {/* Dental Stats Cards */}
              {dentalStats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>परीक्षण गरिएका विद्यार्थी</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>{dentalStats.totalScreened}</div>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>क्याभिटी दर (Caries %)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f43f5e' }}>{dentalStats.cariesPrevalencePct}%</div>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>उपचार आवश्यक (Treatment)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>{dentalStats.needTreatment}</div>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>स्वच्छ मुख स्वास्थ्य (Good)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{dentalStats.hygieneDistribution.good + dentalStats.hygieneDistribution.excellent}</div>
                  </div>
                </div>
              )}

              {/* Dental Records Table */}
              <div style={{ overflowX: 'auto', border: '1px solid #334155', borderRadius: '6px', backgroundColor: '#0f172a' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8', textAlign: 'left' }}>
                      <th style={{ padding: '0.5rem 0.75rem' }}>विद्यार्थी</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>परीक्षण मिति</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>परीक्षक दन्त चिकित्सक</th>
                      <th style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>क्याभिटी (Caries)</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>समस्या भएको दाँत</th>
                      <th style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>मुख स्वास्थ्य</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>डाक्टरको सल्लाह</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dentalRecords.map(r => (
                      <tr key={r.id} style={{ borderBottom: '1px solid #1e293b' }}>
                        <td style={{ padding: '0.5rem 0.75rem', color: '#f8fafc', fontWeight: 600 }}>
                          {r.full_name_nepali} ({r.first_name})
                        </td>
                        <td style={{ padding: '0.5rem 0.75rem', color: '#94a3b8' }}>{r.checkup_date_bs} BS</td>
                        <td style={{ padding: '0.5rem 0.75rem', color: '#38bdf8' }}>{r.dentist_name}</td>
                        <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center', fontWeight: 700, color: r.caries_count > 0 ? '#f43f5e' : '#10b981' }}>
                          {r.caries_count}
                        </td>
                        <td style={{ padding: '0.5rem 0.75rem', color: '#cbd5e1' }}>{r.cavity_teeth || '-'}</td>
                        <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            backgroundColor: r.oral_hygiene === 'excellent' ? '#064e3b' : r.oral_hygiene === 'good' ? '#1e3a8a' : '#7f1d1d',
                            color: '#ffffff'
                          }}>
                            {r.oral_hygiene.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '0.5rem 0.75rem', color: '#94a3b8', maxWidth: '300px' }}>
                          {r.recommendation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: System & Database Metrics */}
          {activeTab === 'stats' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#38bdf8' }}>
                  Node.js Runtime & SQLite Telemetry
                </h3>
                <button
                  onClick={fetchStats}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#94a3b8',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Refresh
                </button>
              </div>

              {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {/* Environment */}
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      🚀 Environment
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                      <div>Node Runtime: <strong>{stats.environment.nodeVersion}</strong></div>
                      <div>OS Platform: <strong>{stats.environment.platform} ({stats.environment.architecture})</strong></div>
                      <div>Process PID: <strong>{stats.environment.pid}</strong></div>
                      <div>Server Uptime: <strong>{stats.environment.uptimeSeconds} seconds</strong></div>
                    </div>
                  </div>

                  {/* Memory */}
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      💾 Memory Consumption
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                      <div>RSS Memory: <strong>{stats.environment.memory.rssMb} MB</strong></div>
                      <div>Heap Used: <strong>{stats.environment.memory.heapUsedMb} MB</strong></div>
                      <div>Heap Total: <strong>{stats.environment.memory.heapTotalMb} MB</strong></div>
                    </div>
                  </div>

                  {/* Database Engine */}
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      🗄️ Database Engine
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                      <div>Driver: <strong>{stats.database.engine}</strong></div>
                      <div>File Size: <strong>{stats.database.fileSizeKb} KB</strong></div>
                      <div>Journal Mode: <strong>{stats.database.journalMode}</strong></div>
                      <div>Foreign Keys: <strong>{stats.database.foreignKeys}</strong></div>
                    </div>
                  </div>

                  {/* Record Counts */}
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#c084fc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      📊 Total Records
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                      <div>Tenants: <strong>{stats.counts.tenants}</strong></div>
                      <div>Users: <strong>{stats.counts.users}</strong></div>
                      <div>Students: <strong>{stats.counts.students}</strong></div>
                      <div>Staff: <strong>{stats.counts.staff}</strong></div>
                      <div>Exam Marks: <strong>{stats.counts.examMarks}</strong></div>
                      <div>Dental Cards: <strong>{stats.counts.dentalRecords}</strong></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Tenant State Inspector */}
          {activeTab === 'tenant' && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#facc15' }}>
                Multi-Tenant State & Partition Inspector
              </h3>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  Current Session Context
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                  <div>Active Tenant ID: <strong style={{ color: '#38bdf8' }}>{tenant?.id || 'None'}</strong></div>
                  <div>Tenant Code: <strong>{tenant?.code || 'None'}</strong></div>
                  <div>School Name: <strong>{tenant?.name}</strong></div>
                  <div>Category: <strong>{tenant?.category}</strong></div>
                  <div>Logged In Role: <strong>{user?.role}</strong></div>
                  <div>Isolation Header: <strong>X-Tenant-ID: {tenant?.id}</strong></div>
                </div>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  Security Verification Rule
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                  Row-level isolation is enforced on every query. If any request from an authenticated user attempts to read or mutate records with a different `tenant_id`, the middleware in <code>server/middleware/auth.js</code> intercepts the call and terminates the request with HTTP 403 Forbidden.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{
          padding: '0.6rem 1.25rem',
          backgroundColor: '#1e293b',
          borderTop: '1px solid #334155',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <div>Hotkeys: Click outside or Press Close to exit Developer Console</div>
          <button
            onClick={onClose}
            style={{
              padding: '0.3rem 0.8rem',
              backgroundColor: '#334155',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
}
