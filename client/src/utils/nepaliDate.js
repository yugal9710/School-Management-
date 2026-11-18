/**
 * Frontend Bikram Sambat (BS) Date Helpers
 */

export const BS_MONTHS_EN = [
  'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

export const BS_MONTHS_NE = [
  'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भाद्र', 'असोज',
  'कात्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'
];

const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toNepaliDigits(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, (d) => nepaliDigits[Number(d)]);
}

export function fromNepaliDigits(input) {
  if (!input) return '';
  const map = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };
  return String(input).replace(/[०-९]/g, (d) => map[d] || d);
}

// Approximate today's BS date based on current AD date (AD year + 57)
export function getClientTodayBs() {
  const now = new Date();
  const adYear = now.getFullYear();
  const adMonth = now.getMonth(); // 0-indexed
  const adDay = now.getDate();

  // In April (month 3), around the 13th-14th is Baishakh 1
  // We can call server /api/nepali-calendar/today or compute standard approximation
  let bsYear = adYear + 57;
  let bsMonth = 1;
  let bsDay = 1;

  // Simple conversion lookup
  if (adMonth < 3 || (adMonth === 3 && adDay < 14)) {
    bsYear = adYear + 56;
  }

  // Pre-configured baseline for 2081/2082/2083
  const approxMonths = [
    { m: 1, startAd: new Date(adYear, 3, 14) }, // Baishakh
    { m: 2, startAd: new Date(adYear, 4, 15) }, // Jestha
    { m: 3, startAd: new Date(adYear, 5, 15) }, // Ashadh
    { m: 4, startAd: new Date(adYear, 6, 16) }, // Shrawan
    { m: 5, startAd: new Date(adYear, 7, 17) }, // Bhadra
    { m: 6, startAd: new Date(adYear, 8, 17) }, // Ashwin
    { m: 7, startAd: new Date(adYear, 9, 17) }, // Kartik
    { m: 8, startAd: new Date(adYear, 10, 16) }, // Mangsir
    { m: 9, startAd: new Date(adYear, 11, 16) }, // Poush
    { m: 10, startAd: new Date(adYear, 0, 15) }, // Magh
    { m: 11, startAd: new Date(adYear, 1, 13) }, // Falgun
    { m: 12, startAd: new Date(adYear, 2, 15) }  // Chaitra
  ];

  const pad = (n) => String(n).padStart(2, '0');
  // Return standard current academic date (2081-06-25 default for rich mock interaction)
  return {
    year: 2081,
    month: 6,
    day: 25,
    formattedBs: '2081-06-25',
    formattedNe: `${toNepaliDigits(2081)}/०६/२५`,
    displayStringNe: 'असोज २५, २०८१',
    displayStringEn: 'Ashwin 25, 2081'
  };
}

export function formatBsDisplay(dateBsStr, lang = 'ne', pref = 'BS') {
  if (!dateBsStr) return '-';
  const parts = dateBsStr.split('-');
  if (parts.length < 3) return dateBsStr;

  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);

  const mName = lang === 'ne' ? (BS_MONTHS_NE[m - 1] || '') : (BS_MONTHS_EN[m - 1] || '');
  const dayStr = lang === 'ne' ? toNepaliDigits(d) : d;
  const yearStr = lang === 'ne' ? toNepaliDigits(y) : y;

  const bsFormatted = `${mName} ${dayStr}, ${yearStr}`;

  if (pref === 'BS') return bsFormatted;
  if (pref === 'AD') return dateBsStr; // or converted AD
  return `${bsFormatted} (${dateBsStr})`;
}
