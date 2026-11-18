import React, { useState } from 'react';
import { School, Lock, User, Globe, AlertCircle, ArrowRight } from 'lucide-react';
import { translations } from '../utils/translations';

export default function LoginView({ onLoginSuccess, lang, onToggleLang }) {
  const t = translations[lang] || translations.ne;
  const [username, setUsername] = useState('admin.shanti');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoAccounts = [
    { label: lang === 'ne' ? 'प्र.अ. (Shree Shanti)' : 'Headteacher (Shanti)', user: 'admin.shanti', pass: 'admin123', role: 'school_admin' },
    { label: lang === 'ne' ? 'शिक्षक' : 'Teacher', user: 'teacher.ram', pass: 'teacher123', role: 'teacher' },
    { label: lang === 'ne' ? 'विद्यार्थी' : 'Student', user: 'student.aarav', pass: 'student123', role: 'student' },
    { label: lang === 'ne' ? 'अभिभावक' : 'Parent', user: 'parent.shrestha', pass: 'parent123', role: 'parent' },
    { label: lang === 'ne' ? 'लेखापाल' : 'Accountant', user: 'accountant.sita', pass: 'acc123', role: 'accountant' },
    { label: lang === 'ne' ? 'पुस्तकालयाध्यक्ष' : 'Librarian', user: 'librarian.krishna', pass: 'lib123', role: 'librarian' },
    { label: lang === 'ne' ? 'यातायात' : 'Transport', user: 'transport.hari', pass: 'trans123', role: 'transport_manager' },
    { label: lang === 'ne' ? 'पालिका शिक्षा अधिकृत' : 'Palika Officer', user: 'palika.lalitpur', pass: 'palika123', role: 'palika_officer' },
    { label: lang === 'ne' ? 'केन्द्रीय प्रशासक' : 'Platform Super Admin', user: 'superadmin', pass: 'admin123', role: 'super_admin' },
  ];

  const handleLogin = async (e) => {
    e && e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      onLoginSuccess(data);
    } catch (err) {
      setError(err.message || 'Connection error to school server');
      setLoading(false);
    }
  };

  const selectDemo = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        {/* Header Ribbon */}
        <div style={{
          backgroundColor: '#1e3a8a',
          color: '#ffffff',
          padding: '2rem 1.5rem 1.5rem 1.5rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Language toggle top right */}
          <button
            onClick={onToggleLang}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#ffffff',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Globe size={13} />
            {lang === 'ne' ? 'English' : 'नेपाली'}
          </button>

          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            color: '#1e3a8a',
            margin: '0 auto 0.75rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <School size={32} color="#1e3a8a" />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
            {t.systemTitle}
          </h1>
          <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '0.25rem' }}>
            {t.systemSubtitle}
          </p>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255,255,255,0.18)',
            padding: '0.15rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            marginTop: '0.6rem',
            letterSpacing: '0.5px'
          }}>
            Multi-Tenant • BS/AD Calendar • CDC 2078 • CEHRD IEMIS
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: '2rem 1.75rem' }}>
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: '0.5rem',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              border: '1px solid #fecaca'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={15} color="#2563eb" />
                  {lang === 'ne' ? 'प्रयोगकर्ता नाम (Username)' : 'Username'}
                </span>
              </label>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Lock size={15} color="#2563eb" />
                  {lang === 'ne' ? 'पासवर्ड (Password)' : 'Password'}
                </span>
              </label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', fontWeight: 700 }}
            >
              {loading ? (
                <span>{lang === 'ne' ? 'लगइन हुँदैछ...' : 'Signing in...'}</span>
              ) : (
                <>
                  <span>{lang === 'ne' ? 'प्रणालीमा प्रवेश गर्नुहोस्' : 'Sign in to Portal'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login selector */}
          <div style={{ marginTop: '1.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
              {lang === 'ne' ? 'डेमो खाता छनौट गर्नुहोस् (Quick Demo Logins):' : 'Select a Demo Role to Test:'}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {demoAccounts.map((acc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectDemo(acc.user, acc.pass)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.55rem',
                    backgroundColor: username === acc.user ? '#eff6ff' : '#f8fafc',
                    color: username === acc.user ? '#1d4ed8' : '#475569',
                    border: `1px solid ${username === acc.user ? '#93c5fd' : '#cbd5e1'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: username === acc.user ? 700 : 500
                  }}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
