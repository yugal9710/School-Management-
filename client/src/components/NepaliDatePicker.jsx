import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { BS_MONTHS_NE, BS_MONTHS_EN, toNepaliDigits } from '../utils/nepaliDate';

export default function NepaliDatePicker({ value, onChange, label, lang = 'ne', required = false }) {
  // value is expected in 'YYYY-MM-DD' BS format e.g. '2081-06-20'
  const parseVal = (str) => {
    if (!str) return { year: 2081, month: 1, day: 1 };
    const parts = str.split('-');
    return {
      year: parseInt(parts[0], 10) || 2081,
      month: parseInt(parts[1], 10) || 1,
      day: parseInt(parts[2], 10) || 1
    };
  };

  const initial = parseVal(value);
  const [year, setYear] = useState(initial.year);
  const [month, setMonth] = useState(initial.month);
  const [day, setDay] = useState(initial.day);

  useEffect(() => {
    if (value) {
      const p = parseVal(value);
      setYear(p.year);
      setMonth(p.month);
      setDay(p.day);
    }
  }, [value]);

  const handleYearChange = (e) => {
    const y = parseInt(e.target.value, 10);
    setYear(y);
    triggerChange(y, month, day);
  };

  const handleMonthChange = (e) => {
    const m = parseInt(e.target.value, 10);
    setMonth(m);
    triggerChange(year, m, day);
  };

  const handleDayChange = (e) => {
    const d = parseInt(e.target.value, 10);
    setDay(d);
    triggerChange(year, month, d);
  };

  const triggerChange = (y, m, d) => {
    const pad = (n) => String(n).padStart(2, '0');
    const formatted = `${y}-${pad(m)}-${pad(d)}`;
    onChange && onChange(formatted);
  };

  const years = [];
  for (let y = 2070; y <= 2090; y++) {
    years.push(y);
  }

  const days = [];
  for (let d = 1; d <= 32; d++) {
    days.push(d);
  }

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={14} color="#2563eb" />
            {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
          </span>
        </label>
      )}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {/* Year */}
        <select
          value={year}
          onChange={handleYearChange}
          className="form-select"
          style={{ flex: 1.2, fontWeight: 500 }}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {lang === 'ne' ? `${toNepaliDigits(y)} वि.सं.` : `${y} BS`}
            </option>
          ))}
        </select>

        {/* Month */}
        <select
          value={month}
          onChange={handleMonthChange}
          className="form-select"
          style={{ flex: 1.5, fontWeight: 500 }}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {lang === 'ne' ? `${BS_MONTHS_NE[m - 1]} (${toNepaliDigits(m)})` : `${BS_MONTHS_EN[m - 1]} (${m})`}
            </option>
          ))}
        </select>

        {/* Day */}
        <select
          value={day}
          onChange={handleDayChange}
          className="form-select"
          style={{ flex: 1, fontWeight: 500 }}
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {lang === 'ne' ? `${toNepaliDigits(d)} गते` : `Day ${d}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
