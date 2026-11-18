/**
 * Number to Words converter for Nepalese Rupees (NPR / रु.)
 * Supports South Asian numbering system: Units, Tens, Hundreds, Thousands (हजार),
 * Lakhs (लाख = 100,000), Crores (करोड = 10,000,000) in Nepali and English.
 */

const nepaliUnits = [
  '', 'एक', 'दुई', 'तीन', 'चार', 'पाँच', 'छ', 'सात', 'आठ', 'नौ', 'दस',
  'एघार', 'बाह्र', 'तेह्र', 'चौध', 'पन्ध्र', 'सोह्र', 'सत्र', 'अठार', 'उन्नाइस', 'बीस',
  'एक्काइस', 'बाइस', 'तेइस', 'चौबिस', 'पच्चिस', 'छब्बिस', 'सत्ताइस', 'अट्ठाइस', 'उनन्तीस', 'तीस',
  'एकतीस', 'बत्तीस', 'तेत्तीस', 'चौतीस', 'पैंतीस', 'छत्तिस', 'सैंतीस', 'अठतीस', 'उनन्चालीस', 'चालीस',
  'एकचालीस', 'बयालीस', 'त्रिचालीस', 'चवालीस', 'पैंतालीस', 'छयालीस', 'सत्चालीस', 'अठचालीस', 'उनपचास', 'पचास',
  'एकाउन्न', 'बाउन्न', 'त्रिपन्न', 'चउन्न', 'पचपन्न', 'छप्पन्न', 'सन्ताउन्न', 'अन्ठाउन्न', 'उनन्साठी', 'साठी',
  'एकसट्ठी', 'बासट्ठी', 'त्रिसट्ठी', 'चौंसट्ठी', 'पैंसट्ठी', 'छयसट्ठी', 'सतसट्ठी', 'अठसट्ठी', 'उनन्सत्तरी', 'सत्तरी',
  'एकहत्तर', 'बहत्तर', 'त्रिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छयहत्तर', 'सतहत्तर', 'अठहत्तर', 'उन्यासी', 'असी',
  'एकासी', 'बयासी', 'त्रियासी', 'चौरासी', 'पचासी', 'छयासी', 'सतासी', 'अठासी', 'उनान्नब्बे', 'नब्बे',
  'एकान्नब्बे', 'बयानब्बे', 'त्रियान्नब्बे', 'चौरानब्बे', 'पन्चानब्बे', 'छयान्नब्बे', 'सन्तान्नब्बे', 'अन्ठान्नब्बे', 'उनान्सय'
];

const englishUnits = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
];

const englishTens = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertBelowThousandEn(n) {
  let str = '';
  if (n >= 100) {
    str += englishUnits[Math.floor(n / 100)] + ' Hundred ';
    n %= 100;
  }
  if (n > 0) {
    if (n < 20) {
      str += englishUnits[n] + ' ';
    } else {
      str += englishTens[Math.floor(n / 10)] + ' ';
      if (n % 10 > 0) {
        str += englishUnits[n % 10] + ' ';
      }
    }
  }
  return str.trim();
}

function numberToWordsEn(num) {
  if (num === 0) return 'Zero Rupees Only';
  let n = Math.floor(Math.abs(num));
  const paisa = Math.round((Math.abs(num) - n) * 100);

  let words = '';

  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const remainder = n;

  if (crore > 0) {
    words += convertBelowThousandEn(crore) + ' Crore ';
  }
  if (lakh > 0) {
    words += convertBelowThousandEn(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    words += convertBelowThousandEn(thousand) + ' Thousand ';
  }
  if (remainder > 0) {
    words += convertBelowThousandEn(remainder) + ' ';
  }

  words = words.trim() + ' Rupees';

  if (paisa > 0) {
    words += ' and ' + convertBelowThousandEn(paisa) + ' Paisa';
  }

  return words.trim() + ' Only';
}

function convertBelowThousandNe(n) {
  let str = '';
  if (n >= 100) {
    const h = Math.floor(n / 100);
    str += nepaliUnits[h] + ' सय ';
    n %= 100;
  }
  if (n > 0) {
    str += nepaliUnits[n] + ' ';
  }
  return str.trim();
}

function numberToWordsNe(num) {
  if (num === 0) return 'शून्य रुपैयाँ मात्र';
  let n = Math.floor(Math.abs(num));
  const paisa = Math.round((Math.abs(num) - n) * 100);

  let words = '';

  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const remainder = n;

  if (crore > 0) {
    words += convertBelowThousandNe(crore) + ' करोड ';
  }
  if (lakh > 0) {
    words += convertBelowThousandNe(lakh) + ' लाख ';
  }
  if (thousand > 0) {
    words += convertBelowThousandNe(thousand) + ' हजार ';
  }
  if (remainder > 0) {
    words += convertBelowThousandNe(remainder) + ' ';
  }

  words = words.trim() + ' रुपैयाँ';

  if (paisa > 0) {
    words += ' ' + convertBelowThousandNe(paisa) + ' पैसा';
  }

  return words.trim() + ' मात्र';
}

function formatNprCurrency(amount, lang = 'ne') {
  if (amount === undefined || amount === null) return lang === 'ne' ? 'रु. ०.००' : 'NPR 0.00';
  const formatted = Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return lang === 'ne' ? `रु. ${formatted}` : `NPR ${formatted}`;
}

module.exports = {
  numberToWordsEn,
  numberToWordsNe,
  formatNprCurrency
};
