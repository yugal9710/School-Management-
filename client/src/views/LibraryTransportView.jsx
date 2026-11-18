import React, { useState, useEffect } from 'react';
import { Library, Bus, Plus, CheckCircle, Search, BookOpen, User, Phone, X } from 'lucide-react';
import { translations } from '../utils/translations';
import { toNepaliDigits } from '../utils/nepaliDate';

export default function LibraryTransportView({ token, lang = 'ne', tenant, user }) {
  const t = translations[lang] || translations.ne;
  const [activeSubTab, setActiveSubTab] = useState('library');
  const [books, setBooks] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [issueForm, setIssueForm] = useState({
    borrower_name: 'Aarav Shrestha',
    borrower_id: 'stu-aarav-shrestha',
    due_date_bs: '2081-07-20'
  });

  useEffect(() => {
    fetchData();
  }, [activeSubTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeSubTab === 'library') {
        const res = await fetch('/api/library/books', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setBooks(await res.json());
      } else {
        const res = await fetch('/api/transport/routes', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setRoutes(await res.json());
      }
    } catch (err) {
      console.warn('Error fetching library/transport data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    if (!selectedBook) return;
    try {
      const res = await fetch('/api/library/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          book_id: selectedBook.id,
          ...issueForm
        })
      });
      if (res.ok) {
        alert(lang === 'ne' ? 'पुस्तक सफलतापूर्वक जारी गरियो!' : 'Book issued successfully!');
        setShowIssueModal(false);
        fetchData();
      }
    } catch (err) {
      alert('Issue error');
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            {lang === 'ne' ? 'पुस्तकालय तथा विद्यालय यातायात व्यवस्थापन' : 'Library & Transport Management'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            {lang === 'ne' ? 'पुस्तक सूची, जारी तथा फिर्ता अभिलेख, र बस रुट तथा चालक विवरण' : 'Books catalog, lending records, bus routes & driver tracking'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#e2e8f0', padding: '0.25rem', borderRadius: '6px' }}>
          <button
            onClick={() => setActiveSubTab('library')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: activeSubTab === 'library' ? '#ffffff' : 'transparent',
              color: activeSubTab === 'library' ? '#1e3a8a' : '#64748b'
            }}
          >
            <Library size={15} />
            {lang === 'ne' ? 'पुस्तकालय (Library)' : 'Library'}
          </button>

          <button
            onClick={() => setActiveSubTab('transport')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: activeSubTab === 'transport' ? '#ffffff' : 'transparent',
              color: activeSubTab === 'transport' ? '#1e3a8a' : '#64748b'
            }}
          >
            <Bus size={15} />
            {lang === 'ne' ? 'यातायात (Transport)' : 'Transport'}
          </button>
        </div>
      </div>

      {/* Content for Library */}
      {activeSubTab === 'library' ? (
        <div>
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>दाखिला नं. (Acc No)</th>
                  <th>पुस्तकको नाम (Book Title)</th>
                  <th>लेखक (Author)</th>
                  <th>विधा (Category)</th>
                  <th>प्रकाशन (Publisher)</th>
                  <th style={{ textAlign: 'center' }}>उपलब्ध प्रति</th>
                  <th>र्‍याक (Location)</th>
                  <th style={{ textAlign: 'center' }}>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {books.map(b => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 700, color: '#1e40af' }}>{b.isbn_acc_no}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{b.title_nepali || b.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.title}</div>
                    </td>
                    <td>{b.author}</td>
                    <td><span className="badge badge-gray">{b.category}</span></td>
                    <td>{b.publisher || '-'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${b.available_copies > 0 ? 'badge-green' : 'badge-red'}`}>
                        {toNepaliDigits(b.available_copies)} / {toNepaliDigits(b.total_copies)}
                      </span>
                    </td>
                    <td>{b.rack_location || '-'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => {
                          setSelectedBook(b);
                          setShowIssueModal(true);
                        }}
                        disabled={b.available_copies <= 0}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      >
                        जारी गर्नुहोस् (Issue)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Content for Transport */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {routes.map(r => (
            <div key={r.id} className="card" style={{ borderLeft: '4px solid #d97706' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1e293b' }}>
                  {r.route_name_nepali || r.route_name}
                </div>
                <span className="badge badge-amber">{r.vehicle_number}</span>
              </div>

              <div style={{ fontSize: '0.825rem', color: '#475569', marginBottom: '0.75rem' }}>
                <div><strong>चालक (Driver):</strong> {r.driver_name}</div>
                <div><strong>सम्पर्क:</strong> <Phone size={11} style={{ display: 'inline', marginRight: '3px' }} />{r.driver_phone}</div>
                <div><strong>मासिक भाडा:</strong> रु. {Number(r.monthly_fare).toLocaleString('en-IN')}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem', color: '#64748b' }}>
                <div>सिट क्षमता: <strong>{r.capacity} सिट</strong></div>
                <div>विद्यार्थी: <strong>{r.assignedStudentsCount || 24} जना</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Issue Book Modal */}
      {showIssueModal && selectedBook && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '450px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>पुस्तक जारी (Issue Book)</h3>
              <button onClick={() => setShowIssueModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleIssueBook}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>पुस्तक:</div>
                  <div style={{ fontWeight: 700, color: '#1e3a8a' }}>{selectedBook.title_nepali} ({selectedBook.title})</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>विद्यार्थी वा कर्मचारीको नाम *</label>
                  <input type="text" className="form-input" value={issueForm.borrower_name} onChange={(e) => setIssueForm({ ...issueForm, borrower_name: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>फिर्ता मिति वि.सं. (Due Date BS) *</label>
                  <input type="text" className="form-input" value={issueForm.due_date_bs} onChange={(e) => setIssueForm({ ...issueForm, due_date_bs: e.target.value })} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowIssueModal(false)} className="btn btn-outline">रद्द गर्नुहोस्</button>
                <button type="submit" className="btn btn-primary">जारी गर्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
