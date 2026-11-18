import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Key,
  Database,
  Download,
  RotateCcw,
  Plus,
  Search,
  CheckCircle,
  AlertTriangle,
  Lock,
  UserCheck,
  UserX,
  FileText,
  Activity,
  Server,
  Layers,
  Calendar,
  X
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function AdminConsoleView({ token, lang = 'ne', tenant, user, onOpenDevConsole }) {
  const t = translations[lang] || translations.ne;
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'audit', 'backup', 'rollover'
  const [usersList, setUsersList] = useState([]);
  const [roleCounts, setRoleCounts] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Modals
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUserForPassword, setSelectedUserForPassword] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  // New User Form State
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    password: '',
    full_name: '',
    nepali_name: '',
    email: '',
    phone: '',
    role: 'teacher'
  });

  useEffect(() => {
    fetchUsers();
    fetchAuditLogs();
    fetchStats();
  }, [tenant]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsersList(data.users || []);
        setRoleCounts(data.counts || []);
      }
    } catch (err) {
      console.warn('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setAuditLogs(await res.json());
      }
    } catch (err) {
      console.warn('Error fetching audit logs:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setStats(await res.json());
      }
    } catch (err) {
      console.warn('Error fetching admin stats:', err);
    }
  };

  const handleToggleUserStatus = async (targetUser) => {
    const nextStatus = targetUser.is_active ? 0 : 1;
    const confirmMsg = targetUser.is_active
      ? (lang === 'ne' ? `के तपाईं ${targetUser.full_name} को खाता निष्क्रिय (Deactivate) गर्न निश्चित हुनुहुन्छ?` : `Deactivate account for ${targetUser.full_name}?`)
      : (lang === 'ne' ? `के तपाईं ${targetUser.full_name} को खाता पुनः सक्रिय (Activate) गर्न निश्चित हुनुहुन्छ?` : `Activate account for ${targetUser.full_name}?`);

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/admin/users/${targetUser.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: nextStatus })
      });

      if (res.ok) {
        showToast(lang === 'ne' ? 'प्रयोगकर्ता स्थिति सफलतापूर्वक अद्यावधिक गरियो।' : 'User status updated successfully.');
        fetchUsers();
        fetchAuditLogs();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update user status');
      }
    } catch (err) {
      console.error('Status toggle error:', err);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPasswordInput || !selectedUserForPassword) return;

    try {
      const res = await fetch(`/api/admin/users/${selectedUserForPassword.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ new_password: newPasswordInput })
      });

      if (res.ok) {
        showToast(lang === 'ne' ? `${selectedUserForPassword.username} को नयाँ पासवर्ड सफलतापूर्वक परिवर्तन भयो!` : `Password reset successfully for ${selectedUserForPassword.username}!`);
        setShowPasswordModal(false);
        setNewPasswordInput('');
        setSelectedUserForPassword(null);
        fetchAuditLogs();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newUserForm)
      });

      if (res.ok) {
        showToast(lang === 'ne' ? 'नयाँ प्रयोगकर्ता सफलतापूर्वक दर्ता भयो!' : 'New user created successfully!');
        setShowAddUserModal(false);
        setNewUserForm({
          username: '',
          password: '',
          full_name: '',
          nepali_name: '',
          email: '',
          phone: '',
          role: 'teacher'
        });
        fetchUsers();
        fetchAuditLogs();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create user');
      }
    } catch (err) {
      console.error('User creation error:', err);
    }
  };

  const handleDownloadBackup = () => {
    const url = `/api/admin/backup`;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `backup_${tenant?.id || 'school'}_${Date.now()}.json`;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    showToast(lang === 'ne' ? 'विद्यालयको सम्पूर्ण डाटाब्याकअप (JSON) डाउनलोड भयो।' : 'School database backup downloaded.');
  };

  // Filter users
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = searchTerm === '' ||
      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.nepali_name?.includes(searchTerm) ||
      u.username?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === '' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleLabels = {
    super_admin: { label: 'केन्द्रीय प्रशासक', color: '#9333ea', bg: '#f3e8ff' },
    school_admin: { label: 'विद्यालय प्रशासक (प्र.अ.)', color: '#1e3a8a', bg: '#dbeafe' },
    teacher: { label: 'शिक्षक (Teacher)', color: '#0284c7', bg: '#e0f2fe' },
    accountant: { label: 'लेखापाल (Accountant)', color: '#059669', bg: '#d1fae5' },
    librarian: { label: 'पुस्तकालयाध्यक्ष (Librarian)', color: '#d97706', bg: '#fef3c7' },
    transport_manager: { label: 'यातायात व्यवस्थापक', color: '#e11d48', bg: '#ffe4e6' },
    palika_officer: { label: 'पालिका अधिकृत', color: '#4f46e5', bg: '#e0e7ff' },
    student: { label: 'विद्यार्थी (Student)', color: '#475569', bg: '#f1f5f9' },
    parent: { label: 'अभिभावक (Parent)', color: '#0d9488', bg: '#ccfbf1' }
  };

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

      {/* Header Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1.4rem 1.6rem',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#1e3a8a',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(30, 58, 138, 0.25)'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                {lang === 'ne' ? 'प्रशासक कन्सोल (Admin Console)' : 'Admin Console'}
              </h2>
              <span className="badge badge-blue">
                {tenant ? (lang === 'ne' ? tenant.nepali_name : tenant.name) : 'School Portal'}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
              {lang === 'ne'
                ? 'प्रयोगकर्ता पहुँच, अनुमति व्यवस्थापन, सुरक्षा अडिट लगहरू र विद्यालय डाटाब्याकअप'
                : 'User role management, access control, audit trail monitoring, and school database backup'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleDownloadBackup}
            className="btn btn-outline btn-sm"
            style={{ fontWeight: 600, borderColor: '#cbd5e1' }}
            title="Download full JSON database snapshot"
          >
            <Download size={14} color="#2563eb" />
            <span>{lang === 'ne' ? 'डाटाब्याकअप (JSON)' : 'Database Backup'}</span>
          </button>

          {onOpenDevConsole && user?.role === 'super_admin' && (
            <button
              onClick={onOpenDevConsole}
              className="btn btn-sm"
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                borderRadius: '9999px',
                padding: '0.4rem 1rem'
              }}
              title="Open Live Developer Console"
            >
              <Server size={14} />
              <span>Developer Console</span>
            </button>
          )}

          <button
            onClick={() => setShowAddUserModal(true)}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 600 }}
          >
            <Plus size={15} />
            <span>{lang === 'ne' ? 'नयाँ प्रयोगकर्ता' : 'Add User'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div className="card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'ne' ? 'कुल प्रणाली प्रयोगकर्ता' : 'Total Active Users'}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>
              {lang === 'ne' ? toNepaliDigits(usersList.length) : usersList.length} {lang === 'ne' ? 'जना' : 'users'}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'ne' ? 'सुरक्षा तथा अडिट लगहरू' : 'Audit Logs Logged'}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>
              {lang === 'ne' ? toNepaliDigits(auditLogs.length) : auditLogs.length} {lang === 'ne' ? 'घटना' : 'events'}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'ne' ? 'डाटाब्याकअप स्थिति' : 'Backup Health'}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>
              Optimal (WAL)
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'ne' ? 'IEMIS र बहु-विद्यालय' : 'Tenant Security'}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>
              Isolated & Ready
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '2px solid #e2e8f0',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            border: 'none',
            borderBottom: activeTab === 'users' ? '3px solid #1e3a8a' : '3px solid transparent',
            backgroundColor: 'transparent',
            color: activeTab === 'users' ? '#1e3a8a' : '#64748b',
            fontWeight: activeTab === 'users' ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.88rem'
          }}
        >
          <Users size={16} />
          <span>{lang === 'ne' ? 'प्रयोगकर्ता व्यवस्थापन' : 'User Accounts'}</span>
          <span style={{
            fontSize: '0.7rem',
            backgroundColor: activeTab === 'users' ? '#dbeafe' : '#f1f5f9',
            color: activeTab === 'users' ? '#1e3a8a' : '#64748b',
            padding: '0.1rem 0.45rem',
            borderRadius: '9999px',
            fontWeight: 700
          }}>
            {usersList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            border: 'none',
            borderBottom: activeTab === 'audit' ? '3px solid #1e3a8a' : '3px solid transparent',
            backgroundColor: 'transparent',
            color: activeTab === 'audit' ? '#1e3a8a' : '#64748b',
            fontWeight: activeTab === 'audit' ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.88rem'
          }}
        >
          <Activity size={16} />
          <span>{lang === 'ne' ? 'सुरक्षा तथा अडिट लग' : 'Audit Trail Logs'}</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            border: 'none',
            borderBottom: activeTab === 'backup' ? '3px solid #1e3a8a' : '3px solid transparent',
            backgroundColor: 'transparent',
            color: activeTab === 'backup' ? '#1e3a8a' : '#64748b',
            fontWeight: activeTab === 'backup' ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.88rem'
          }}
        >
          <Database size={16} />
          <span>{lang === 'ne' ? 'डाटाब्याकअप तथा निर्यात' : 'Backup & Recovery'}</span>
        </button>

        <button
          onClick={() => setActiveTab('rollover')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            border: 'none',
            borderBottom: activeTab === 'rollover' ? '3px solid #1e3a8a' : '3px solid transparent',
            backgroundColor: 'transparent',
            color: activeTab === 'rollover' ? '#1e3a8a' : '#64748b',
            fontWeight: activeTab === 'rollover' ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.88rem'
          }}
        >
          <Calendar size={16} />
          <span>{lang === 'ne' ? 'शैक्षिक सत्र नवीकरण' : 'Academic Year Rollover'}</span>
        </button>
      </div>

      {/* TAB 1: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div>
          {/* Filters Bar */}
          <div className="card" style={{ padding: '0.9rem 1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder={lang === 'ne' ? 'प्रयोगकर्ताको नाम वा युजरनेमबाट खोज्नुहोस्...' : 'Search by name or username...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.8rem 0.5rem 2.2rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{
                  padding: '0.5rem 0.8rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="">{lang === 'ne' ? 'सबै भूमिकाहरू (All Roles)' : 'All Roles'}</option>
                <option value="school_admin">{lang === 'ne' ? 'विद्यालय प्रशासक (प्र.अ.)' : 'School Admin'}</option>
                <option value="teacher">{lang === 'ne' ? 'शिक्षक (Teacher)' : 'Teacher'}</option>
                <option value="accountant">{lang === 'ne' ? 'लेखापाल (Accountant)' : 'Accountant'}</option>
                <option value="librarian">{lang === 'ne' ? 'पुस्तकालयाध्यक्ष (Librarian)' : 'Librarian'}</option>
                <option value="transport_manager">{lang === 'ne' ? 'यातायात व्यवस्थापक' : 'Transport Manager'}</option>
                <option value="student">{lang === 'ne' ? 'विद्यार्थी (Student)' : 'Student'}</option>
                <option value="parent">{lang === 'ne' ? 'अभिभावक (Parent)' : 'Parent'}</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'युजरनेम' : 'Username'}</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'पूरा नाम' : 'Full Name'}</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'पद / भूमिका' : 'Role'}</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'सम्पर्क' : 'Contact'}</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'खाता स्थिति' : 'Status'}</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700, textAlign: 'right' }}>{lang === 'ne' ? 'कार्यहरू' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => {
                    const rInfo = roleLabels[u.role] || { label: u.role, color: '#475569', bg: '#f1f5f9' };
                    return (
                      <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 600, color: '#1e293b' }}>
                          {u.username}
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>
                            {lang === 'ne' && u.nepali_name ? u.nepali_name : u.full_name}
                          </div>
                          {u.nepali_name && <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.full_name}</div>}
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: rInfo.bg,
                            color: rInfo.color
                          }}>
                            {rInfo.label}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: '#64748b' }}>
                          <div>{u.email || '-'}</div>
                          <div>{u.phone || '-'}</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          {u.is_active ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#059669', fontWeight: 600, fontSize: '0.75rem' }}>
                              <CheckCircle size={14} />
                              {lang === 'ne' ? 'सक्रिय' : 'Active'}
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#dc2626', fontWeight: 600, fontSize: '0.75rem' }}>
                              <UserX size={14} />
                              {lang === 'ne' ? 'निष्क्रिय' : 'Suspended'}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => {
                                setSelectedUserForPassword(u);
                                setShowPasswordModal(true);
                              }}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                              title="Reset Password"
                            >
                              <Key size={13} />
                              <span>{lang === 'ne' ? 'पासवर्ड' : 'Password'}</span>
                            </button>

                            <button
                              onClick={() => handleToggleUserStatus(u)}
                              className="btn btn-sm"
                              style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                backgroundColor: u.is_active ? '#fee2e2' : '#dcfce7',
                                color: u.is_active ? '#b91c1c' : '#15803d',
                                border: 'none'
                              }}
                              title={u.is_active ? 'Suspend Account' : 'Activate Account'}
                            >
                              {u.is_active ? <UserX size={13} /> : <UserCheck size={13} />}
                              <span>{u.is_active ? (lang === 'ne' ? 'निलम्बन' : 'Suspend') : (lang === 'ne' ? 'सक्रिय' : 'Activate')}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                      {lang === 'ne' ? 'कुनै प्रयोगकर्ता भेटिएन।' : 'No users found matching query.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT TRAIL LOGS */}
      {activeTab === 'audit' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
                {lang === 'ne' ? 'विद्यालय सुरक्षा तथा कार्य सम्पादन अडिट लग (Audit Trail)' : 'Security & Administrative Audit Logs'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {lang === 'ne' ? 'विद्यार्थी भर्ना, परीक्षा अंक अनुमोदन, शुल्क संकलन र खाता परिमार्जनका पछिल्ला ५० गतिविधिहरू' : 'Last 50 recorded security and transactional events with actor identity'}
              </div>
            </div>
            <button onClick={fetchAuditLogs} className="btn btn-outline btn-sm">
              <RotateCcw size={13} />
              <span>{lang === 'ne' ? 'ताजा गर्नुहोस्' : 'Refresh'}</span>
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'मिति / समय' : 'Timestamp'}</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'कर्ता (Actor)' : 'User'}</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'कार्य (Action)' : 'Action'}</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'प्रभावित क्षेत्र' : 'Entity'}</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{lang === 'ne' ? 'विवरण (Details)' : 'Summary'}</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length > 0 ? (
                auditLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#1e3a8a' }}>
                      {log.username || 'System'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#475569', fontFamily: 'monospace' }}>
                      {log.entity_type} {log.entity_id ? `(${log.entity_id})` : ''}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#334155', fontSize: '0.78rem' }}>
                      {log.details || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                    {lang === 'ne' ? 'कुनै अडिट लग भेटिएन।' : 'No audit records logged yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: BACKUP & DATA RECOVERY */}
      {activeTab === 'backup' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Database size={22} color="#2563eb" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>
                {lang === 'ne' ? 'विद्यालय डाटाब्याकअप डाउनलोड' : 'School Database Snapshot'}
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {lang === 'ne'
                ? 'यस विद्यालयको सम्पूर्ण विद्यार्थी, शिक्षक, परीक्षा अंक, शुल्क हिसाब, हाजिरी तथा दन्त परीक्षणका रेकर्डहरू एकमुष्ट JSON फाइलमा डाउनलोड गरी सुरक्षित राख्न सकिन्छ।'
                : 'Generate and download an immediate JSON snapshot containing all student profiles, exam marks, fee receipts, dental clinic checks, and attendance records.'}
            </p>

            <button
              onClick={handleDownloadBackup}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
            >
              <Download size={16} />
              <span>{lang === 'ne' ? 'सम्पूर्ण डाटा डाउनलोड गर्नुहोस् (JSON)' : 'Download Full Backup (JSON)'}</span>
            </button>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <ShieldCheck size={22} color="#059669" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>
                {lang === 'ne' ? 'CEHRD IEMIS तथा बहु-विद्यालय सुरक्षा' : 'IEMIS & Tenant Isolation'}
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.82rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px' }}>
                <strong style={{ color: '#166534' }}>✓ Row-Level Tenant Security:</strong>
                <div style={{ color: '#15803d', marginTop: '0.2rem' }}>
                  विद्यालय आईडी: <code>{tenant?.id}</code> का सबै रेकर्डहरू अन्य विद्यालयहरूबाट पूर्ण रूपमा सुरक्षित छन्।
                </div>
              </div>

              <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px' }}>
                <strong style={{ color: '#1e40af' }}>✓ CDC 2078 Grading & CEHRD IEMIS:</strong>
                <div style={{ color: '#1d4ed8', marginTop: '0.2rem' }}>
                  प्रतिवेदन मेनुबाट नेपाल सरकारको आधिकारिक ढाँचामा IEMIS CSV निर्यात गर्न सकिन्छ।
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ACADEMIC YEAR ROLLOVER */}
      {activeTab === 'rollover' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Calendar size={22} color="#d97706" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>
              {lang === 'ne' ? 'नयाँ शैक्षिक सत्र नवीकरण तथा कक्षा स्तरोन्नति' : 'Academic Year Rollover & Student Promotion'}
            </h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            {lang === 'ne'
              ? 'चालु शैक्षिक सत्र (२०८१) समाप्त गरी नयाँ शैक्षिक सत्र (२०८२) मा विद्यार्थीहरूलाई अर्को कक्षामा पदोन्नति (Promotion) गर्ने प्रक्रिया। CDC निर्देशिका अनुसार अनुत्तीर्ण विद्यार्थीहरूलाई सोही कक्षामा राख्न वा पुनः परीक्षा अवसर दिन सकिन्छ।'
              : 'Transition from Academic Year 2081 to 2082 BS. Automatically promote passed students to the next grade according to CDC 2078 letter grading rules while retaining historical records.'}
          </p>

          <div style={{ padding: '1rem', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#92400e', marginBottom: '0.4rem' }}>
              {lang === 'ne' ? 'सत्र नवीकरण पूर्वका आवश्यकताहरू:' : 'Pre-requisites before Rollover:'}
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#78350f', lineHeight: 1.6 }}>
              <li>{lang === 'ne' ? 'सबै विषयहरूको वार्षिक परीक्षाको लब्धांक पत्र प्रकाशित भइसकेको हुनुपर्छ।' : 'All final exam marks must be published and approved.'}</li>
              <li>{lang === 'ne' ? 'लेखा शाखाबाट बक्यौता शुल्कको फरफारक वा अर्को सत्रमा सार्ने निर्णय भएको हुनुपर्छ।' : 'Outstanding fees reconciled or transferred to next year ledger.'}</li>
              <li>{lang === 'ne' ? 'सत्र नवीकरण गर्नुअगाडि डाटाब्याकअप लिन अनिवार्य छ।' : 'Take a full JSON database backup before executing rollover.'}</li>
            </ul>
          </div>

          <button
            onClick={() => alert(lang === 'ne' ? 'शैक्षिक सत्र २०८१ को अन्तिम परीक्षा नतिजा प्रकाशन पश्चात मात्र पदोन्नति प्रक्रिया सुरु गर्न सकिनेछ।' : 'Student promotion requires all term exam marks to be finalized.')}
            className="btn btn-outline"
            style={{ borderColor: '#d97706', color: '#b45309', fontWeight: 700 }}
          >
            <RotateCcw size={15} />
            <span>{lang === 'ne' ? 'पदोन्नति पूर्वावलोकन (Preview Rollover)' : 'Preview Class Promotion'}</span>
          </button>
        </div>
      )}

      {/* MODAL: ADD NEW USER */}
      {showAddUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem', color: '#1e293b' }}>
                <Plus size={18} color="#1e3a8a" />
                <span>{lang === 'ne' ? 'नयाँ प्रयोगकर्ता दर्ता गर्नुहोस्' : 'Add New User Account'}</span>
              </div>
              <button onClick={() => setShowAddUserModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                  {lang === 'ne' ? 'प्रयोगकर्ता नाम (Username) *' : 'Username *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. teacher.ramesh or acc.hari"
                  value={newUserForm.username}
                  onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value.toLowerCase().trim() })}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                  {lang === 'ne' ? 'सुरुवाती पासवर्ड *' : 'Initial Password *'}
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter secure password"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                    {lang === 'ne' ? 'पूरा नाम (नेपाली) *' : 'Full Name (Nepali) *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. रमेश कुमार श्रेष्ठ"
                    value={newUserForm.nepali_name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, nepali_name: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                    {lang === 'ne' ? 'Full Name (English) *' : 'Full Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar Shrestha"
                    value={newUserForm.full_name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, full_name: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                  {lang === 'ne' ? 'भूमिका तथा पद (Role) *' : 'Role / Position *'}
                </label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', backgroundColor: '#ffffff' }}
                >
                  <option value="teacher">{lang === 'ne' ? 'शिक्षक (Teacher)' : 'Teacher'}</option>
                  <option value="school_admin">{lang === 'ne' ? 'विद्यालय प्रशासक / प्र.अ. (School Admin)' : 'School Admin'}</option>
                  <option value="accountant">{lang === 'ne' ? 'लेखापाल (Accountant)' : 'Accountant'}</option>
                  <option value="librarian">{lang === 'ne' ? 'पुस्तकालयाध्यक्ष (Librarian)' : 'Librarian'}</option>
                  <option value="transport_manager">{lang === 'ne' ? 'यातायात व्यवस्थापक (Transport Manager)' : 'Transport Manager'}</option>
                  <option value="student">{lang === 'ne' ? 'विद्यार्थी (Student)' : 'Student'}</option>
                  <option value="parent">{lang === 'ne' ? 'अभिभावक (Parent)' : 'Parent'}</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                    {lang === 'ne' ? 'इमेल ठेगाना' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    placeholder="user@school.edu.np"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                    {lang === 'ne' ? 'सम्पर्क फोन' : 'Phone'}
                  </label>
                  <input
                    type="text"
                    placeholder="98XXXXXXXX"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="btn btn-outline"
                >
                  {lang === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel'}
                </button>
                <button type="submit" className="btn btn-primary">
                  {lang === 'ne' ? 'खाता सिर्जना गर्नुहोस्' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET PASSWORD */}
      {showPasswordModal && selectedUserForPassword && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.05rem', color: '#1e293b' }}>
                <Key size={18} color="#2563eb" />
                <span>{lang === 'ne' ? 'पासवर्ड रिसेट गर्नुहोस्' : 'Reset User Password'}</span>
              </div>
              <button onClick={() => setShowPasswordModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                प्रयोगकर्ता: <strong>{selectedUserForPassword.full_name} ({selectedUserForPassword.username})</strong>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                  {lang === 'ne' ? 'नयाँ पासवर्ड (New Password) *' : 'New Password *'}
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="btn btn-outline"
                >
                  {lang === 'ne' ? 'रद्द' : 'Cancel'}
                </button>
                <button type="submit" className="btn btn-primary">
                  {lang === 'ne' ? 'सुरक्षित गर्नुहोस्' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
