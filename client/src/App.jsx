import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import StudentsView from './views/StudentsView';
import AttendanceView from './views/AttendanceView';
import ExamsView from './views/ExamsView';
import FinanceView from './views/FinanceView';
import AcademicsView from './views/AcademicsView';
import NoticesView from './views/NoticesView';
import StaffView from './views/StaffView';
import LibraryTransportView from './views/LibraryTransportView';
import ReportsView from './views/ReportsView';
import TenantsView from './views/TenantsView';
import PalikaOverviewView from './views/PalikaOverviewView';
import SettingsView from './views/SettingsView';
import DentalHealthView from './views/DentalHealthView';
import AdminConsoleView from './views/AdminConsoleView';
import DeveloperConsole from './components/DeveloperConsole';
import { getClientTodayBs } from './utils/nepaliDate';
import { getOfflineQueue, syncOfflineQueueToServer } from './utils/offlineQueue';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('hamro_vidhyalaya_token') || null);
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [tenantsList, setTenantsList] = useState([]);
  const [activeTenantId, setActiveTenantId] = useState(null);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [lang, setLang] = useState(localStorage.getItem('hamro_vidhyalaya_lang') || 'ne');
  const [todayBs, setTodayBs] = useState(getClientTodayBs());
  const [isOffline, setIsOffline] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [showDevConsole, setShowDevConsole] = useState(false);

  // Initialize and check session
  useEffect(() => {
    updateOfflineCount();
    fetchTodayBs();
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const updateOfflineCount = () => {
    setPendingSyncCount(getOfflineQueue().length);
  };

  const fetchTodayBs = async () => {
    try {
      const res = await fetch('/api/nepali-calendar/today');
      if (res.ok) {
        const data = await res.json();
        setTodayBs(data);
      }
    } catch {
      setTodayBs(getClientTodayBs());
    }
  };

  const fetchUserProfile = async (targetTenantId) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (targetTenantId) {
        headers['X-Tenant-ID'] = targetTenantId;
      }
      const res = await fetch('/api/auth/me', { headers });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setTenant(data.tenant);
        setActiveTenantId(data.tenant ? data.tenant.id : null);
        if (data.assignedSchools) {
          setTenantsList(data.assignedSchools);
        }
        // Fetch all tenants if super_admin
        if (data.user.role === 'super_admin') {
          fetchSuperAdminTenants();
        }
      } else {
        handleLogout();
      }
    } catch (err) {
      console.warn('Profile fetch error:', err);
    }
  };

  const fetchSuperAdminTenants = async () => {
    try {
      const res = await fetch('/api/tenants', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setTenantsList(await res.json());
      }
    } catch (err) {
      console.warn('Error fetching all tenants:', err);
    }
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem('hamro_vidhyalaya_token', data.token);
    setToken(data.token);
    setUser(data.user);
    setTenant(data.tenant);
    setActiveTenantId(data.tenant ? data.tenant.id : null);
    if (data.assignedSchools) {
      setTenantsList(data.assignedSchools);
    }
    if (data.user.role === 'palika_officer') {
      setCurrentTab('palika');
    } else {
      setCurrentTab('dashboard');
    }
    if (data.tenant && data.tenant.default_language) {
      setLang(data.tenant.default_language);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hamro_vidhyalaya_token');
    setToken(null);
    setUser(null);
    setTenant(null);
    setActiveTenantId(null);
    setCurrentTab('dashboard');
  };

  const handleSwitchTenant = (newTenantId) => {
    setActiveTenantId(newTenantId);
    fetchUserProfile(newTenantId);
  };

  const handleToggleLang = () => {
    const next = lang === 'ne' ? 'en' : 'ne';
    setLang(next);
    localStorage.setItem('hamro_vidhyalaya_lang', next);
  };

  const handleToggleOffline = () => {
    setIsOffline(!isOffline);
  };

  const handleSyncOffline = async () => {
    if (!token) return;
    const result = await syncOfflineQueueToServer(token);
    alert(lang === 'ne' ? `अफलाइन हाजिरी सिङ्क भयो: ${result.totalRecords} जनाको रेकर्ड सुरक्षित!` : `Offline sync complete: ${result.totalRecords} records synced!`);
    updateOfflineCount();
  };

  if (!token) {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        lang={lang}
        onToggleLang={handleToggleLang}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Bar */}
      <Navbar
        user={user}
        tenant={tenant}
        tenantsList={tenantsList}
        activeTenantId={activeTenantId}
        onSwitchTenant={handleSwitchTenant}
        lang={lang}
        onToggleLang={handleToggleLang}
        todayBs={todayBs}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        pendingSyncCount={pendingSyncCount}
        onSyncOffline={handleSyncOffline}
        onOpenDevConsole={() => setShowDevConsole(true)}
        onLogout={handleLogout}
      />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Role-based Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          userRole={user?.role || 'student'}
          lang={lang}
        />

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
          {currentTab === 'dashboard' && (
            <DashboardView
              user={user}
              tenant={tenant}
              onNavigate={setCurrentTab}
              lang={lang}
              token={token}
            />
          )}

          {currentTab === 'tenants' && (
            <TenantsView
              token={token}
              lang={lang}
              user={user}
            />
          )}

          {currentTab === 'palika' && (
            <PalikaOverviewView
              token={token}
              lang={lang}
              user={user}
            />
          )}

          {currentTab === 'students' && (
            <StudentsView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'staff' && (
            <StaffView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'academics' && (
            <AcademicsView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'attendance' && (
            <AttendanceView
              token={token}
              lang={lang}
              tenant={tenant}
              isOffline={isOffline}
              onToggleOffline={handleToggleOffline}
              pendingSyncCount={pendingSyncCount}
              onSyncOffline={handleSyncOffline}
            />
          )}

          {currentTab === 'exams' && (
            <ExamsView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'finance' && (
            <FinanceView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'notices' && (
            <NoticesView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'library' && (
            <LibraryTransportView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'dental' && (
            <DentalHealthView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'transport' && (
            <LibraryTransportView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              token={token}
              lang={lang}
              tenant={tenant}
              onUpdateTenant={(updated) => setTenant(updated)}
            />
          )}

          {currentTab === 'admin_console' && (
            <AdminConsoleView
              token={token}
              lang={lang}
              tenant={tenant}
              user={user}
              onOpenDevConsole={() => setShowDevConsole(true)}
            />
          )}
        </main>
      </div>

      {/* Developer Console Modal / Drawer */}
      <DeveloperConsole
        isOpen={showDevConsole}
        onClose={() => setShowDevConsole(false)}
        token={token}
        tenant={tenant}
        user={user}
      />
    </div>
  );
}
