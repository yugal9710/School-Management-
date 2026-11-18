/**
 * Comprehensive Bikram Sambat (BS) <-> Gregorian (AD) Calendar Engine
 * Accurate for Nepal academic sessions and official calendars (2070 BS - 2090 BS, extensible)
 */

// Calendar mapping: days in each of the 12 BS months (Baishakh to Chaitra)
const calendarData = {
  2070: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2072: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2073: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2074: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2075: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2083: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2084: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2085: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2087: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2088: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2089: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2090: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
};

// Anchor: 2080-01-01 BS = 2023-04-14 AD (Friday)
const ANCHOR_BS_YEAR = 2080;
const ANCHOR_BS_MONTH = 1;
const ANCHOR_BS_DAY = 1;
const ANCHOR_AD_DATE = new Date(Date.UTC(2023, 3, 14)); // April 14, 2023 UTC

const bsMonthsEn = [
  'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

const bsMonthsNe = [
  'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भाद्र', 'असोज',
  'कात्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'
];

const nepaliDays = [
  { en: 'Sunday', ne: 'आइतबार', shortEn: 'Sun', shortNe: 'आइत' },
  { en: 'Monday', ne: 'सोमबार', shortEn: 'Mon', shortNe: 'सोम' },
  { en: 'Tuesday', ne: 'मंगलबार', shortEn: 'Tue', shortNe: 'मंगल' },
  { en: 'Wednesday', ne: 'बुधबार', shortEn: 'Wed', shortNe: 'बुध' },
  { en: 'Thursday', ne: 'बिहीबार', shortEn: 'Thu', shortNe: 'बिही' },
  { en: 'Friday', ne: 'शुक्रबार', shortEn: 'Fri', shortNe: 'शुक्र' },
  { en: 'Saturday', ne: 'शनिबार', shortEn: 'Sat', shortNe: 'शनि' }
];

const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

function toNepaliDigits(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, (d) => nepaliDigits[Number(d)]);
}

function fromNepaliDigits(input) {
  if (!input) return '';
  const map = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };
  return String(input).replace(/[०-९]/g, (d) => map[d] || d);
}

function getDaysInBsMonth(year, month) {
  const yData = calendarData[year];
  if (!yData) {
    // Default fallback approximation
    const def = [31, 31, 32, 31, 31, 30, 30, 29, 30, 29, 30, 30];
    return def[month - 1] || 30;
  }
  return yData[month - 1];
}

/**
 * Converts AD Date object or ISO string to BS Date Object { year, month, day, dayOfWeek, formattedBs, formattedNe }
 */
function adToBs(adInput) {
  const adDate = typeof adInput === 'string' ? new Date(adInput) : new Date(adInput.getTime());
  // Normalize to UTC midnight
  const targetUtc = Date.UTC(adDate.getFullYear(), adDate.getMonth(), adDate.getDate());
  const anchorUtc = ANCHOR_AD_DATE.getTime();

  let diffDays = Math.round((targetUtc - anchorUtc) / (24 * 60 * 60 * 1000));

  let currentYear = ANCHOR_BS_YEAR;
  let currentMonth = ANCHOR_BS_MONTH;
  let currentDay = ANCHOR_BS_DAY;

  if (diffDays >= 0) {
    while (diffDays > 0) {
      const daysInMonth = getDaysInBsMonth(currentYear, currentMonth);
      const remainingDaysInMonth = daysInMonth - currentDay + 1;

      if (diffDays >= remainingDaysInMonth) {
        diffDays -= remainingDaysInMonth;
        currentDay = 1;
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      } else {
        currentDay += diffDays;
        diffDays = 0;
      }
    }
  } else {
    diffDays = Math.abs(diffDays);
    while (diffDays > 0) {
      if (diffDays < currentDay) {
        currentDay -= diffDays;
        diffDays = 0;
      } else {
        diffDays -= currentDay;
        currentMonth--;
        if (currentMonth < 1) {
          currentMonth = 12;
          currentYear--;
        }
        currentDay = getDaysInBsMonth(currentYear, currentMonth);
      }
    }
  }

  const dayOfWeekIndex = adDate.getDay();
  const pad = (n) => String(n).padStart(2, '0');

  return {
    year: currentYear,
    month: currentMonth,
    day: currentDay,
    monthNameEn: bsMonthsEn[currentMonth - 1],
    monthNameNe: bsMonthsNe[currentMonth - 1],
    dayOfWeek: nepaliDays[dayOfWeekIndex],
    formattedBs: `${currentYear}-${pad(currentMonth)}-${pad(currentDay)}`,
    formattedNe: `${toNepaliDigits(currentYear)}/${toNepaliDigits(pad(currentMonth))}/${toNepaliDigits(pad(currentDay))}`,
    displayStringEn: `${bsMonthsEn[currentMonth - 1]} ${currentDay}, ${currentYear}`,
    displayStringNe: `${bsMonthsNe[currentMonth - 1]} ${toNepaliDigits(currentDay)}, ${toNepaliDigits(currentYear)}`
  };
}

/**
 * Converts BS Date (year, month, day) to Gregorian Date (YYYY-MM-DD string and Date object)
 */
function bsToAd(year, month, day) {
  let totalDays = 0;

  if (year >= ANCHOR_BS_YEAR) {
    for (let y = ANCHOR_BS_YEAR; y < year; y++) {
      for (let m = 1; m <= 12; m++) {
        totalDays += getDaysInBsMonth(y, m);
      }
    }
    for (let m = 1; m < month; m++) {
      totalDays += getDaysInBsMonth(year, m);
    }
    totalDays += (day - 1);
  } else {
    for (let y = year; y < ANCHOR_BS_YEAR; y++) {
      for (let m = 1; m <= 12; m++) {
        totalDays -= getDaysInBsMonth(y, m);
      }
    }
    for (let m = 1; m < month; m++) {
      totalDays += getDaysInBsMonth(year, m);
    }
    totalDays += (day - 1);
  }

  const resultUtc = ANCHOR_AD_DATE.getTime() + (totalDays * 24 * 60 * 60 * 1000);
  const adDate = new Date(resultUtc);

  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = adDate.getUTCFullYear();
  const mm = pad(adDate.getUTCMonth() + 1);
  const dd = pad(adDate.getUTCDate());

  return {
    adDate,
    formattedAd: `${yyyy}-${mm}-${dd}`,
    year: yyyy,
    month: adDate.getUTCMonth() + 1,
    day: adDate.getUTCDate()
  };
}

function getTodayBs() {
  return adToBs(new Date());
}

/**
 * Dual date helper: returns string according to tenant date_format_pref ('BS', 'AD', or 'BOTH')
 */
function formatDualDate(bsDateStr, adDateStr, pref = 'BS', lang = 'ne') {
  if (!bsDateStr) return '';
  const parts = bsDateStr.split('-');
  const bsYear = parseInt(parts[0], 10);
  const bsMonth = parseInt(parts[1], 10);
  const bsDay = parseInt(parts[2], 10);

  const mName = lang === 'ne' ? bsMonthsNe[bsMonth - 1] : bsMonthsEn[bsMonth - 1];
  const formattedBs = lang === 'ne'
    ? `${mName} ${toNepaliDigits(bsDay)}, ${toNepaliDigits(bsYear)}`
    : `${mName} ${bsDay}, ${bsYear}`;

  if (pref === 'BS') return formattedBs;
  if (pref === 'AD') return adDateStr || bsToAd(bsYear, bsMonth, bsDay).formattedAd;

  // BOTH
  const adFormatted = adDateStr || bsToAd(bsYear, bsMonth, bsDay).formattedAd;
  return `${formattedBs} (${adFormatted} AD)`;
}

module.exports = {
  bsMonthsEn,
  bsMonthsNe,
  nepaliDays,
  nepaliDigits,
  toNepaliDigits,
  fromNepaliDigits,
  getDaysInBsMonth,
  adToBs,
  bsToAd,
  getTodayBs,
  formatDualDate
};
