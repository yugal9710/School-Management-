import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CircleDollarSign,
  Bell,
  BookOpen,
  TrendingUp,
  Award,
  ArrowRight,
  HeartPulse
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function DashboardView({ user, tenant, onNavigate, lang = 'ne', token }) {
  const t = translations[lang] || translations.ne;
  const [stats, setStats] = useState({
    totalStudents: 145,
    totalStaff: 18,
    todayAttendancePct: 94.2,
    outstandingFeesNpr: 48600,
    activeNoticesCount: 2
  });
  const [recentNotices, setRecentNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [tenant, token]);

  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      const [noticesRes, financeRes, studentsRes] = await Promise.all([
        fetch('/api/communication/notices', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/finance/summary', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/students', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (noticesRes.ok) {
        const notices = await noticesRes.json();
        setRecentNotices(notices.slice(0, 3));
        setStats(prev => ({ ...prev, activeNoticesCount: notices.length }));
      }

      if (financeRes.ok) {
        const fin = await financeRes.json();
        setStats(prev => ({ ...prev, outstandingFeesNpr: fin.outstandingBalance }));
      }

      if (studentsRes.ok) {
        const stus = await studentsRes.json();
        setStats(prev => ({ ...prev, totalStudents: stus.length }));
      }
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: lang === 'ne' ? 'कुल विद्यार्थी संख्या' : 'Total Enrolled Students',
      value: lang === 'ne' ? toNepaliDigits(stats.totalStudents) : stats.totalStudents,
      sub: lang === 'ne' ? 'नियमित अध्ययनरत' : 'Active students',
      icon: GraduationCap,
      color: '#2563eb',
      bg: '#eff6ff',
      targetTab: 'students'
    },
    {
      title: lang === 'ne' ? 'शिक्षक तथा कर्मचारी' : 'Teaching & Staff',
      value: lang === 'ne' ? toNepaliDigits(stats.totalStaff) : stats.totalStaff,
      sub: lang === 'ne' ? 'स्वीकृत दरबन्दी' : 'Faculty members',
      icon: Users,
      color: '#059669',
      bg: '#ecfdf5',
      targetTab: 'staff'
    },
    {
      title: lang === 'ne' ? 'आजको विद्यार्थी उपस्थिति' : "Today's Attendance",
      value: `${lang === 'ne' ? toNepaliDigits(stats.todayAttendancePct) : stats.todayAttendancePct}%`,
      sub: lang === 'ne' ? 'सन्तोषजनक उपस्थिति' : 'Daily average',
      icon: CalendarCheck,
      color: '#d97706',
      bg: '#fffbeb',
      targetTab: 'attendance'
    },
    {
      title: lang === 'ne' ? 'बाँकी शुल्क बक्यौता' : 'Outstanding Fee Dues',
      value: `रु. ${Number(stats.outstandingFeesNpr).toLocaleString('en-IN')}`,
      sub: lang === 'ne' ? 'चालु शैक्षिक सत्र' : 'NPR current dues',
      icon: CircleDollarSign,
      color: '#dc2626',
      bg: '#fef2f2',
      targetTab: 'finance'
    }
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'नमस्ते,' : 'Welcome,'} {user ? (lang === 'ne' && user.nepali_name ? user.nepali_name : user.full_name) : 'User'}!
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {tenant ? (lang === 'ne' ? `${tenant.nepali_name} को दैनिक शैक्षिक तथा प्रशासनिक ड्यासबोर्ड` : `Daily academic and administrative dashboard for ${tenant.name}`) : t.systemSubtitle}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('attendance')} className="btn btn-outline btn-sm">
            <CalendarCheck size={14} color="#2563eb" />
            {lang === 'ne' ? 'हाजिरी लिनुहोस्' : 'Take Attendance'}
          </button>
          <button onClick={() => onNavigate('exams')} className="btn btn-outline btn-sm">
            <Award size={14} color="#d97706" />
            {lang === 'ne' ? 'लब्धांक पत्र हेर्नुहोस्' : 'View Grade Sheets'}
          </button>
          {['school_admin', 'super_admin'].includes(user?.role) && (
            <button onClick={() => onNavigate('students')} className="btn btn-primary btn-sm">
              <GraduationCap size={14} />
              {lang === 'ne' ? 'नयाँ भर्ना' : 'New Admission'}
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(card.targetTab)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.2rem 0' }}>
                  {card.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {card.sub}
                </div>
              </div>

              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: card.bg,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Recent Notices & Quick Modules Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }}>
        
        {/* Recent Notices */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
              <Bell size={18} color="#dc2626" />
              <span>{lang === 'ne' ? 'हालसालैका महत्त्वपूर्ण सूचनाहरू' : 'Important School Notices'}</span>
            </div>
            <button onClick={() => onNavigate('notices')} className="btn btn-outline btn-sm" style={{ border: 'none', color: '#2563eb' }}>
              {lang === 'ne' ? 'सबै हेर्नुहोस्' : 'View All'} &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentNotices.length > 0 ? (
              recentNotices.map(notice => (
                <div
                  key={notice.id}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '0.5rem',
                    backgroundColor: notice.priority === 'urgent' ? '#fef2f2' : '#f8fafc',
                    border: `1px solid ${notice.priority === 'urgent' ? '#fecaca' : '#e2e8f0'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: notice.priority === 'urgent' ? '#991b1b' : '#1e293b' }}>
                      {lang === 'ne' ? notice.title_nepali : notice.title}
                    </div>
                    <span className={`badge ${notice.priority === 'urgent' ? 'badge-red' : 'badge-blue'}`}>
                      {notice.priority === 'urgent' ? (lang === 'ne' ? 'अत्यावश्यक' : 'Urgent') : (lang === 'ne' ? 'सामान्य' : 'Normal')}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4, margin: 0 }}>
                    {lang === 'ne' ? notice.content_nepali : notice.content}
                  </p>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    {lang === 'ne' ? `प्रकाशित मिति: ${notice.published_date_bs} वि.सं.` : `Published: ${notice.published_date_bs} BS`}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                {lang === 'ne' ? 'कुनै नयाँ सूचना छैन' : 'No notices published yet'}
              </div>
            )}
          </div>
        </div>

        {/* Nepal Government Standards Checklist */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', color: '#1e293b', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
            <Award size={18} color="#059669" />
            <span>{lang === 'ne' ? 'नेपाल सरकारी मापदण्ड स्थिति' : 'Nepal Regulatory Compliance'}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <div style={{ color: '#059669', marginTop: '2px' }}>✓</div>
              <div>
                <strong>वि.सं. (BS) क्यालेन्डर प्रणाली:</strong>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>२०८१/२०८२ सत्र, सौर मास गणना तथा नेपाली मिति छनौट सक्रिय छ।</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <div style={{ color: '#059669', marginTop: '2px' }}>✓</div>
              <div>
                <strong>CDC लेटर ग्रेडिङ निर्देशिका २०७८:</strong>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>सैद्धान्तिक (TH ३५%) र प्रयोगात्मक (PR ४०%) अलग उत्तीर्णांक र GPA गणना।</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <div style={{ color: '#059669', marginTop: '2px' }}>✓</div>
              <div>
                <strong>CEHRD IEMIS अनुकूलता:</strong>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>शिक्षा तथा मानव स्रोत विकास केन्द्रको आधिकारिक ढाँचामा CSV डाटा निर्यात।</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <div style={{ color: '#059669', marginTop: '2px' }}>✓</div>
              <div>
                <strong>समावेशी तथा अपाङ्गता सहायता:</strong>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>विशेष सिकाइ आवश्यकता र व्यक्तिगत स्वास्थ्य विवरण सुरक्षित छ।</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
