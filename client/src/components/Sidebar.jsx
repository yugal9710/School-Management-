import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Landmark,
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck,
  Award,
  CircleDollarSign,
  Bell,
  Library,
  Bus,
  FileSpreadsheet,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { translations } from '../utils/translations';

export default function Sidebar({ currentTab, onSelectTab, userRole, lang = 'ne' }) {
  const t = translations[lang] || translations.ne;

  // Define nav items with allowed roles
  const allNavItems = [
    {
      id: 'dashboard',
      label: t.navDashboard,
      icon: LayoutDashboard,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent', 'accountant', 'librarian', 'transport_manager', 'palika_officer']
    },
    {
      id: 'tenants',
      label: t.navTenants,
      icon: Building2,
      roles: ['super_admin']
    },
    {
      id: 'palika',
      label: t.navPalika,
      icon: Landmark,
      roles: ['super_admin', 'palika_officer']
    },
    {
      id: 'students',
      label: t.navStudents,
      icon: GraduationCap,
      roles: ['super_admin', 'school_admin', 'teacher', 'accountant', 'palika_officer']
    },
    {
      id: 'staff',
      label: t.navStaff,
      icon: Users,
      roles: ['super_admin', 'school_admin', 'palika_officer']
    },
    {
      id: 'academics',
      label: t.navAcademics,
      icon: BookOpen,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent']
    },
    {
      id: 'attendance',
      label: t.navAttendance,
      icon: CalendarCheck,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent', 'palika_officer']
    },
    {
      id: 'exams',
      label: t.navExams,
      icon: Award,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent', 'palika_officer']
    },
    {
      id: 'finance',
      label: t.navFinance,
      icon: CircleDollarSign,
      roles: ['super_admin', 'school_admin', 'accountant', 'student', 'parent']
    },
    {
      id: 'notices',
      label: t.navNotices,
      icon: Bell,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent', 'accountant', 'librarian', 'transport_manager', 'palika_officer']
    },
    {
      id: 'library',
      label: t.navLibrary,
      icon: Library,
      roles: ['super_admin', 'school_admin', 'librarian', 'teacher', 'student']
    },
    {
      id: 'transport',
      label: t.navTransport,
      icon: Bus,
      roles: ['super_admin', 'school_admin', 'transport_manager', 'student', 'parent']
    },
    {
      id: 'reports',
      label: t.navReports,
      icon: FileSpreadsheet,
      roles: ['super_admin', 'school_admin', 'palika_officer', 'accountant']
    },
    {
      id: 'settings',
      label: t.navSettings,
      icon: Settings,
      roles: ['super_admin', 'school_admin']
    },
    {
      id: 'admin_console',
      label: t.navAdminConsole || 'Admin Console',
      icon: ShieldCheck,
      roles: ['super_admin', 'school_admin']
    }
  ];

  const visibleItems = allNavItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="no-print sidebar" style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      minHeight: 'calc(100vh - 58px)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem 0.5rem'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.5rem',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                backgroundColor: isActive ? '#eff6ff' : 'transparent',
                color: isActive ? '#1d4ed8' : '#475569',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <Icon size={18} color={isActive ? '#1d4ed8' : '#64748b'} />
              <span>{item.label}</span>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '15%',
                  bottom: '15%',
                  width: '3.5px',
                  backgroundColor: '#1d4ed8',
                  borderRadius: '0 4px 4px 0'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Branding Info */}
      <div style={{ padding: '0.75rem 0.85rem', borderTop: '1px solid #f1f5f9', fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>
        <div>नेपाल सरकार शिक्षा मापदण्ड अनुकूल</div>
        <div>Nepal CDC 2078 & IEMIS Ready</div>
      </div>
    </aside>
  );
}
