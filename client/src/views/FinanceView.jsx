import React, { useState, useEffect } from 'react';
import {
  CircleDollarSign,
  Plus,
  Receipt,
  Printer,
  CheckCircle,
  CreditCard,
  QrCode,
  DollarSign,
  Search,
  Filter,
  X
} from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';
import PrintableReceipt from '../components/PrintableReceipt';

export default function FinanceView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [summary, setSummary] = useState({
    totalCollected: 0,
    totalBilled: 0,
    totalDiscounts: 0,
    outstandingBalance: 0,
    recentPayments: []
  });
  const [dues, setDues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [activeReceiptData, setActiveReceiptData] = useState(null);

  // Collect Payment Form
  const [paymentForm, setPaymentForm] = useState({
    student_id: '',
    payment_mode: 'cash',
    remarks: 'Tuition and laboratory fee',
    items: [
      { fee_category_name: 'मासिक पढाइ शुल्क (Tuition)', amount_paid: 1200, discount_applied: 0 }
    ]
  });

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    setLoading(true);
    try {
      const [sumRes, duesRes, catRes, stuRes] = await Promise.all([
        fetch('/api/finance/summary', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/finance/dues', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/finance/categories', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/students', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (sumRes.ok) setSummary(await sumRes.json());
      if (duesRes.ok) setDues(await duesRes.json());
      if (catRes.ok) setCategories(await catRes.json());
      if (stuRes.ok) {
        const sList = await stuRes.json();
        setStudents(sList);
        if (sList.length > 0 && !paymentForm.student_id) {
          setPaymentForm(prev => ({ ...prev, student_id: sList[0].id }));
        }
      }
    } catch (err) {
      console.warn('Finance data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReceipt = async (paymentId) => {
    try {
      const res = await fetch(`/api/finance/receipts/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setActiveReceiptData(data);
      }
    } catch (err) {
      alert('Error fetching receipt');
    }
  };

  const handleCollectPaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/finance/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentForm)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Payment failed');
        return;
      }

      setShowCollectModal(false);
      fetchFinanceData();

      // Automatically open printable receipt
      handleOpenReceipt(data.paymentId);
    } catch (err) {
      alert('Payment submission error');
    }
  };

  const isFinanceAdmin = ['school_admin', 'accountant', 'super_admin'].includes(user?.role);

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'शुल्क व्यवस्थापन तथा आर्थिक अभिलेख (NPR)' : 'Fees & Finance Management (NPR)'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'नेपाली रुपैयाँमा शुल्क संकलन, दुई-प्रति रसिद, बक्यौता तथा वित्तीय प्रतिवेदन' : 'NPR fees collection, official two-part receipts & financial accounting'}
          </p>
        </div>

        {isFinanceAdmin && (
          <button onClick={() => setShowCollectModal(true)} className="btn btn-primary">
            <Plus size={16} />
            {lang === 'ne' ? 'शुल्क संकलन / रसिद जारी' : 'Collect Fee & Issue Receipt'}
          </button>
        )}
      </div>

      {/* Financial Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ borderLeft: '4px solid #059669' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>कुल संकलित शुल्क (Collected)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857', margin: '0.2rem 0' }}>
            रु. {Number(summary.totalCollected).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669' }}>चालु शैक्षिक सत्र</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>कुल बाँकी बक्यौता (Outstanding Dues)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#b91c1c', margin: '0.2rem 0' }}>
            रु. {Number(summary.outstandingBalance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>अध्यावधिक बक्यौता</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>कुल शुल्क माग (Total Billed)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e40af', margin: '0.2rem 0' }}>
            रु. {Number(summary.totalBilled).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>सबै शीर्षकहरू</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #d97706' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>छुट तथा छात्रवृत्ति (Discounts)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706', margin: '0.2rem 0' }}>
            रु. {Number(summary.totalDiscounts).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>सहुलियत अनुदान</div>
        </div>
      </div>

      {/* Grid: Fee Dues Table & Recent Receipts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>
        
        {/* Student Fee Dues */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
              {lang === 'ne' ? 'विद्यार्थी शुल्क बक्यौता सूची' : 'Student Fee Dues'}
            </h3>
            <span className="badge badge-gray">{dues.length} Dues</span>
          </div>

          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>विद्यार्थी (Student)</th>
                  <th>कक्षा</th>
                  <th>शीर्षक (Fee Type)</th>
                  <th style={{ textAlign: 'right' }}>रकम (NPR)</th>
                  <th style={{ textAlign: 'right' }}>बुझाएको</th>
                  <th style={{ textAlign: 'center' }}>स्थिति</th>
                </tr>
              </thead>
              <tbody>
                {dues.map(d => (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{d.full_name_nepali}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{d.admission_number}</div>
                    </td>
                    <td>{d.class_nepali_name}</td>
                    <td>{d.fee_nepali_name} ({d.month_bs || 'Term'})</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>
                      रु. {Number(d.amount).toLocaleString('en-IN')}
                    </td>
                    <td style={{ textAlign: 'right', color: '#047857', fontWeight: 600 }}>
                      रु. {Number(d.paid_amount).toLocaleString('en-IN')}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${
                        d.status === 'paid' ? 'badge-green' :
                        d.status === 'partial' ? 'badge-amber' : 'badge-red'
                      }`}>
                        {d.status === 'paid' ? 'चुक्ता' : d.status === 'partial' ? 'आंशिक' : 'बाँकी'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Payment Receipts */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
              {lang === 'ne' ? 'जारी गरिएका रसिदहरू' : 'Recent Fee Receipts'}
            </h3>
            <span className="badge badge-blue">{summary.recentPayments?.length || 0} Receipts</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {summary.recentPayments && summary.recentPayments.length > 0 ? (
              summary.recentPayments.map(p => (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e40af', fontSize: '0.85rem' }}>
                      {p.receipt_number}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                      {p.full_name_nepali} ({p.admission_number})
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      मिति: {p.payment_date_bs} BS • {p.payment_mode.toUpperCase()}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#047857' }}>
                      रु. {Number(p.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <button
                      onClick={() => handleOpenReceipt(p.id)}
                      className="btn btn-outline btn-sm"
                      style={{ marginTop: '0.3rem', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                    >
                      <Printer size={12} />
                      रसिद हेर्नुहोस्
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                कुनै रसिद जारी गरिएको छैन।
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Collect Fee Modal */}
      {showCollectModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '580px' }}>
            <div className="modal-header" style={{ backgroundColor: '#059669', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Receipt size={20} />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                  {lang === 'ne' ? 'शुल्क संकलन तथा रसिद जारी' : 'Collect Fee & Print Receipt'}
                </h3>
              </div>
              <button onClick={() => setShowCollectModal(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCollectPaymentSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Select Student */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    विद्यार्थी छनौट गर्नुहोस् (Select Student) *
                  </label>
                  <select
                    className="form-select"
                    value={paymentForm.student_id}
                    onChange={(e) => setPaymentForm({ ...paymentForm, student_id: e.target.value })}
                    required
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.full_name_nepali} ({s.admission_number}) - {s.class_nepali_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Particulars & Amount */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      शुल्क विवरण (Particulars) *
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={paymentForm.items[0]?.fee_category_name || ''}
                      onChange={(e) => {
                        const newItems = [...paymentForm.items];
                        newItems[0].fee_category_name = e.target.value;
                        setPaymentForm({ ...paymentForm, items: newItems });
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      बुझाएको रकम रु. (NPR) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="form-input"
                      value={paymentForm.items[0]?.amount_paid || ''}
                      onChange={(e) => {
                        const newItems = [...paymentForm.items];
                        newItems[0].amount_paid = Number(e.target.value);
                        setPaymentForm({ ...paymentForm, items: newItems });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Payment Mode */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    भुक्तानी माध्यम (Payment Mode) *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {[
                      { id: 'cash', label: 'नगद (Cash)' },
                      { id: 'fonepay_qr', label: 'फोनपे (QR)' },
                      { id: 'bank_transfer', label: 'बैंक (Bank)' },
                      { id: 'esewa_khalti', label: 'eSewa/Khalti' }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setPaymentForm({ ...paymentForm, payment_mode: mode.id })}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '6px',
                          border: `1.5px solid ${paymentForm.payment_mode === mode.id ? '#059669' : '#cbd5e1'}`,
                          backgroundColor: paymentForm.payment_mode === mode.id ? '#ecfdf5' : '#ffffff',
                          color: paymentForm.payment_mode === mode.id ? '#047857' : '#334155',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    कैफियत (Remarks)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={paymentForm.remarks}
                    onChange={(e) => setPaymentForm({ ...paymentForm, remarks: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowCollectModal(false)} className="btn btn-outline">
                  रद्द गर्नुहोस्
                </button>
                <button type="submit" className="btn btn-success">
                  रकम बुझिलिई रसिद निकाल्नुहोस्
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {activeReceiptData && (
        <PrintableReceipt
          data={activeReceiptData}
          onClose={() => setActiveReceiptData(null)}
          lang={lang}
        />
      )}
    </div>
  );
}
