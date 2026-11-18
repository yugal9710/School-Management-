import React from 'react';
import { Printer, X, Receipt, CheckCircle } from 'lucide-react';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function PrintableReceipt({ data, onClose, lang = 'ne' }) {
  if (!data) return null;
  const { school, receipt, student, items } = data;

  const handlePrint = () => {
    window.print();
  };

  const renderSingleCopy = (copyTitle) => (
    <div style={{ border: '2px solid #334155', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1.5px solid #334155', paddingBottom: '0.5rem', marginBottom: '0.6rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>
            {school.nepaliName}
          </h2>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
            {school.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {school.address} | फोन: {school.phone}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#1e3a8a',
            color: '#ffffff',
            padding: '2px 8px',
            fontSize: '0.7rem',
            fontWeight: 700,
            borderRadius: '3px',
            textTransform: 'uppercase',
            marginBottom: '0.2rem'
          }}>
            {copyTitle}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dc2626' }}>
            रसिद नं. (Receipt No): {receipt.receiptNumber}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>
            {school.panNo}
          </div>
        </div>
      </div>

      {/* Student & Date Particulars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.4rem 1rem', fontSize: '0.8rem', marginBottom: '0.75rem', backgroundColor: '#f8fafc', padding: '0.5rem', borderRadius: '4px' }}>
        <div><strong>विद्यार्थीको नाम (Student Name):</strong> {student.nepaliName} ({student.name})</div>
        <div><strong>मिति (Date):</strong> वि.सं. {receipt.paymentDateBs} ({receipt.paymentDateAd} AD)</div>
        <div><strong>कक्षा / खण्ड (Grade & Section):</strong> {student.classNepaliName} - {student.sectionName}</div>
        <div><strong>भर्ना नं. (Adm No):</strong> {student.admissionNo} (Roll: {toNepaliDigits(student.rollNo)})</div>
        <div><strong>अभिभावक (Guardian):</strong> {student.guardianName || '-'} ({student.guardianPhone || '-'})</div>
        <div><strong>भुक्तानी माध्यम (Mode):</strong> <span className="badge badge-blue">{receipt.paymentMode.toUpperCase()}</span></div>
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '0.75rem', border: '1px solid #cbd5e1' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', color: '#334155', textAlign: 'left' }}>
            <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', width: '35px', textAlign: 'center' }}>क्र.सं.</th>
            <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1' }}>शुल्क विवरण (Particulars)</th>
            <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'right', width: '90px' }}>छुट (Disc)</th>
            <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'right', width: '120px' }}>रकम रु. (NPR)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{toNepaliDigits(idx + 1)}</td>
              <td style={{ padding: '4px 6px', border: '1px solid #cbd5e1' }}>{item.fee_category_name}</td>
              <td style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'right' }}>
                {item.discount_applied > 0 ? `रु. ${Number(item.discount_applied).toLocaleString('en-IN')}` : '-'}
              </td>
              <td style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 600 }}>
                रु. {Number(item.amount_paid).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: '#f8fafc', fontWeight: 700 }}>
            <td colSpan="3" style={{ padding: '6px', border: '1px solid #cbd5e1', textAlign: 'right' }}>
              कुल जम्मा भुक्तानी (Total Amount Paid):
            </td>
            <td style={{ padding: '6px', border: '1px solid #cbd5e1', textAlign: 'right', color: '#1e3a8a', fontSize: '0.95rem' }}>
              रु. {Number(receipt.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tbody>
      </table>

      {/* In-Words Currency */}
      <div style={{ fontSize: '0.75rem', backgroundColor: '#eff6ff', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid #bfdbfe', marginBottom: '1.25rem' }}>
        <div><strong>अक्षरेपी:</strong> {receipt.amountInWordsNe}</div>
        <div style={{ color: '#64748b', marginTop: '2px' }}><strong>In Words:</strong> {receipt.amountInWordsEn}</div>
      </div>

      {/* Signatures */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.75rem', marginTop: '1rem' }}>
        <div style={{ textAlign: 'center', width: '130px' }}>
          <div style={{ borderBottom: '1px dotted #475569', height: '24px', marginBottom: '0.2rem' }}></div>
          <div>बुझाउनेको दस्तखत (Depositor)</div>
        </div>
        <div style={{ textAlign: 'center', width: '130px' }}>
          <div style={{ borderBottom: '1px dotted #475569', height: '24px', marginBottom: '0.2rem' }}></div>
          <div>रकम बुझिलिने (Accountant / Cashier)</div>
          <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{receipt.receivedBy}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '780px', maxHeight: '95vh' }}>
        {/* Top Action Bar (hidden in print) */}
        <div className="modal-header no-print" style={{ backgroundColor: '#059669', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Receipt size={22} color="#ffffff" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {lang === 'ne' ? 'शुल्क भुक्तानी आधिकारिक रसिद' : 'Official NPR Fee Receipt'}
              </h3>
              <p style={{ fontSize: '0.75rem', opacity: 0.9, margin: 0 }}>
                {receipt.receiptNumber} - {student.nepaliName} ({student.name})
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handlePrint} className="btn btn-primary" style={{ backgroundColor: '#1e3a8a' }}>
              <Printer size={16} />
              {lang === 'ne' ? 'रसिद प्रिन्ट गर्नुहोस्' : 'Print Receipt'}
            </button>
            <button onClick={onClose} className="btn btn-outline" style={{ backgroundColor: '#ffffff', color: '#1e293b' }}>
              <X size={16} />
              {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
            </button>
          </div>
        </div>

        {/* Printable Document Body: Two-part receipt (School Copy + Student Copy) */}
        <div className="modal-body printable-document" style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
          {/* Part 1: School Copy */}
          {renderSingleCopy('विद्यालय प्रति / School Copy')}

          {/* Dotted cutting separator */}
          <div style={{
            borderTop: '2px dashed #94a3b8',
            position: 'relative',
            margin: '1.5rem 0',
            textAlign: 'center'
          }}>
            <span style={{
              position: 'relative',
              top: '-10px',
              backgroundColor: '#ffffff',
              padding: '0 10px',
              fontSize: '0.7rem',
              color: '#94a3b8'
            }}>
              ✂ यहाँबाट च्यात्नुहोस् (Cut along the dotted line) ✂
            </span>
          </div>

          {/* Part 2: Student Copy */}
          {renderSingleCopy('विद्यार्थी/अभिभावक प्रति / Student Copy')}
        </div>
      </div>
    </div>
  );
}
