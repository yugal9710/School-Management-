import React, { useState } from 'react';
import { School, Calendar, Globe, LogOut, Wifi, WifiOff, RefreshCw, User, ChevronDown, Server } from 'lucide-react';
import { toNepaliDigits } from '../utils/nepaliDate';
import { translations } from '../utils/translations';

export default function Navbar({
  user,
  tenant,
  tenantsList,
  activeTenantId,
  onSwitchTenant,
  lang,
  onToggleLang,
  todayBs,
  isOffline,
  onToggleOffline,
  pendingSyncCount,
  onSyncOffline,
  onOpenDevConsole,
  onLogout
}) {
  const t = translations[lang] || translations.ne;
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);

  // Determine date display string based on tenant date_format_pref
  const datePref = tenant ? tenant.date_format_pref : 'BS';
  const renderDate = () => {
    if (!todayBs) return '';
    if (datePref === 'AD') {
      return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    if (datePref === 'BOTH') {
      return `${todayBs.displayStringNe} (${todayBs.formattedBs} BS)`;
    }
    return lang === 'ne' ? `${todayBs.displayStringNe} (वि.सं.)` : `${todayBs.displayStringEn} BS`;
  };

  const isMultiSchoolUser = user && (user.role === 'super_admin' || user.role === 'palika_officer');

  return (
    <header className="no-print" style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 1.5rem'
      }}>
        {/* Left: School Identity & Multi-tenant Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#1e3a8a',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(30, 58, 138, 0.2)'
          }}>
            <School size={22} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1e3a8a' }}>
                {tenant ? (lang === 'ne' ? tenant.nepali_name : tenant.name) : t.systemTitle}
              </span>
              {tenant && (
                <span className={`badge ${tenant.category === 'community' ? 'badge-blue' : 'badge-purple'}`}>
                  {tenant.category === 'community' ? (lang === 'ne' ? 'सामुदायिक' : 'Community') : (lang === 'ne' ? 'संस्थागत' : 'Institutional')}
                </span>
              )}
            </div>

            {/* School address or Multi-tenant switcher button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.75rem', color: '#64748b' }}>
              {tenant ? (
                <span>{tenant.municipality}, {tenant.ward} {tenant.district ? `(${tenant.district})` : ''} | EMIS: <strong>{tenant.affiliation_code}</strong></span>
              ) : (
                <span>{t.systemSubtitle}</span>
              )}

              {/* Switch School Dropdown for Super Admin or Palika Officer */}
              {isMultiSchoolUser && tenantsList && tenantsList.length > 1 && (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowTenantDropdown(!showTenantDropdown)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      borderRadius: '4px',
                      border: '1px solid #bfdbfe',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    विद्यालय बदल्नुहोस् (Switch School)
                    <ChevronDown size={12} />
                  </button>

                  {showTenantDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '4px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      minWidth: '260px',
                      zIndex: 200,
                      padding: '0.35rem 0'
                    }}>
                      <div style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>
                        स्वीकृत विद्यालयहरू (Assigned Schools)
                      </div>
                      {tenantsList.map(tnt => (
                        <div
                          key={tnt.id}
                          onClick={() => {
                            onSwitchTenant(tnt.id);
                            setShowTenantDropdown(false);
                          }}
                          style={{
                            padding: '0.5rem 0.8rem',
                            cursor: 'pointer',
                            backgroundColor: tnt.id === activeTenantId ? '#f1f5f9' : '#ffffff',
                            fontWeight: tnt.id === activeTenantId ? 700 : 400,
                            fontSize: '0.8rem',
                            color: '#1e293b'
                          }}
                        >
                          <div>{lang === 'ne' ? tnt.nepali_name : tnt.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{tnt.category === 'community' ? 'सामुदायिक' : 'संस्थागत'} | {tnt.municipality}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Date, Offline Mode, Language Toggle, User & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
          {/* Bikram Sambat Date Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#334155'
          }}>
            <Calendar size={15} color="#dc2626" />
            <span>{renderDate()}</span>
          </div>

          {/* Offline Attendance Toggle & Sync Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={onToggleOffline}
              title={isOffline ? "Currently in Offline Mode" : "Switch to Offline Mode for Mobile/Weak Internet"}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.65rem',
                backgroundColor: isOffline ? '#fee2e2' : '#f1f5f9',
                color: isOffline ? '#b91c1c' : '#475569',
                border: `1px solid ${isOffline ? '#fca5a5' : '#cbd5e1'}`,
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
              <span>{isOffline ? t.offlineMode : t.onlineMode}</span>
            </button>

            {pendingSyncCount > 0 && (
              <button
                onClick={onSyncOffline}
                className="btn btn-sm btn-primary"
                title="Sync offline records to server"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
              >
                <RefreshCw size={12} />
                <span>{pendingSyncCount} {t.pendingSync}</span>
              </button>
            )}
          </div>

          {/* Language Switcher (नेपाली / EN) */}
          <button
            onClick={onToggleLang}
            className="btn btn-outline btn-sm"
            style={{ fontWeight: 700, padding: '0.35rem 0.65rem' }}
            title="भाषा बदल्नुहोस् (Switch Language)"
          >
            <Globe size={14} color="#2563eb" />
            <span>{lang === 'ne' ? 'English' : 'नेपाली'}</span>
          </button>

          {/* Developer Console Pill Button (Matches design in prompt attachment) */}
          <button
            onClick={onOpenDevConsole}
            id="btn-developer-console"
            title="Open Developer Console (SQL, Schema, Metrics & Dental Diagnostics)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.4rem 1rem',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(37, 99, 235, 0.25)',
              transition: 'background-color 0.15s ease, transform 0.1s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            <Server size={14} color="#ffffff" strokeWidth={2.2} />
            <span>Developer Console</span>
          </button>

          {/* User Profile & Role Tag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            paddingLeft: '0.5rem',
            borderLeft: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475569',
              fontWeight: 700,
              fontSize: '0.8rem'
            }}>
              <User size={16} />
            </div>

            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#1e293b' }}>
                {user ? (lang === 'ne' && user.nepali_name ? user.nepali_name : user.full_name) : 'User'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {user ? (t[user.role] || user.role) : ''}
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="btn btn-sm btn-outline"
              title="लगआउट (Logout)"
              style={{ marginLeft: '0.4rem', padding: '0.35rem 0.5rem', color: '#dc2626' }}
            >
              <LogOut size={14} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
