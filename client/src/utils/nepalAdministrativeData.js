/**
 * Nepal Administrative Division Hierarchy (7 Provinces, 77 Districts, 753 Local Levels)
 * Source: Official Government of Nepal Local Level Structure (CEHRD & MoFAGA compliant)
 */

export const NEPAL_PROVINCES = [
  { id: 'Koshi', nameEn: 'Koshi Province', nameNe: 'कोशी प्रदेश', display: 'कोशी प्रदेश (Koshi Province)' },
  { id: 'Madhesh', nameEn: 'Madhesh Province', nameNe: 'मधेश प्रदेश', display: 'मधेश प्रदेश (Madhesh Province)' },
  { id: 'Bagmati', nameEn: 'Bagmati Province', nameNe: 'बागमती प्रदेश', display: 'बागमती प्रदेश (Bagmati Province)' },
  { id: 'Gandaki', nameEn: 'Gandaki Province', nameNe: 'गण्डकी प्रदेश', display: 'गण्डकी प्रदेश (Gandaki Province)' },
  { id: 'Lumbini', nameEn: 'Lumbini Province', nameNe: 'लुम्बिनी प्रदेश', display: 'लुम्बिनी प्रदेश (Lumbini Province)' },
  { id: 'Karnali', nameEn: 'Karnali Province', nameNe: 'कर्णाली प्रदेश', display: 'कर्णाली प्रदेश (Karnali Province)' },
  { id: 'Sudurpashchim', nameEn: 'Sudurpashchim Province', nameNe: 'सुदूरपश्चिम प्रदेश', display: 'सुदूरपश्चिम प्रदेश (Sudurpashchim Province)' }
];

export const NEPAL_ADMINISTRATIVE_DATA = {
  "Koshi": {
    "id": "Koshi",
    "nameEn": "Koshi Province",
    "nameNe": "कोशी प्रदेश",
    "districts": {
      "Bhojpur": {
        "id": "Bhojpur",
        "nameEn": "Bhojpur",
        "nameNe": "भोजपुर",
        "localLevels": [
          {
            "name": "Bhojpur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhojpur Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Shadananda",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shadananda Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Arun",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Arun Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Aamchok",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aamchok Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Hatuwagadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Hatuwagadhi Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Pauwadungma",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pauwadungma Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Ramprasad Rai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ramprasad Rai Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Salpasilichho",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Salpasilichho Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Tyamkemaiyung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tyamkemaiyung Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Dhankuta": {
        "id": "Dhankuta",
        "nameEn": "Dhankuta",
        "nameNe": "धनकुटा",
        "localLevels": [
          {
            "name": "Dhankuta",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dhankuta Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Mahalaxmi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mahalaxmi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Pakhribas",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Pakhribas Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Chaubise",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chaubise Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Chhathar Jorpati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chhathar Jorpati Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Khalsa Chhintang Sahidbhumi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khalsa Chhintang Sahidbhumi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sangurigadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sangurigadhi Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          }
        ]
      },
      "Ilam": {
        "id": "Ilam",
        "nameEn": "Ilam",
        "nameNe": "इलाम",
        "localLevels": [
          {
            "name": "Deumai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Deumai Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Ilam",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ilam Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Mai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mai Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Suryodaya",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Suryodaya Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Chulachuli",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chulachuli Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Fakphokthum",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Fakphokthum Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Maijogmai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Maijogmai Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Mangsebung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mangsebung Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Rong",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rong Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Sandakpur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sandakpur Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Jhapa": {
        "id": "Jhapa",
        "nameEn": "Jhapa",
        "nameNe": "झापा",
        "localLevels": [
          {
            "name": "Arjundhara",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Arjundhara Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Bhadrapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhadrapur Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Birtamod",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Birtamod Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Damak",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Damak Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Gauradaha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gauradaha Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Kankai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kankai Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Mechinagar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mechinagar Municipality",
            "totalWards": 15,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15
            ]
          },
          {
            "name": "Shivasatakshi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shivasatakshi Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Barhadashi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Barhadashi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Buddhashanti",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Buddhashanti Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Gauriganj",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gauriganj Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Haldibari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Haldibari Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Jhapa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jhapa Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kachankawal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kachankawal Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kamal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kamal Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Khotang": {
        "id": "Khotang",
        "nameEn": "Khotang",
        "nameNe": "खोटाङ",
        "localLevels": [
          {
            "name": "Diktel Rupakot Majhuwagadhi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Diktel Rupakot Majhuwagadhi Municipality",
            "totalWards": 15,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15
            ]
          },
          {
            "name": "Halesi Tuwachung",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Halesi Tuwachung Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Aiselukharka",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aiselukharka Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Barahapokhari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Barahapokhari Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Diprung Chuichumma",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Diprung Chuichumma Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Jantedhunga",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jantedhunga Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Kepilasagadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kepilasagadhi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Khotehang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khotehang Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Rawabesi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rawabesi Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Sakela",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sakela Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Morang": {
        "id": "Morang",
        "nameEn": "Morang",
        "nameNe": "मोरङ",
        "localLevels": [
          {
            "name": "Biratnagar",
            "category": "Metropolitan City",
            "categoryNe": "महानगरपालिका",
            "fullTitle": "Biratnagar Metropolitan City",
            "totalWards": 19,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ]
          },
          {
            "name": "Belbari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Belbari Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Letang",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Letang Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Pathari-Shanishchare",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Pathari-Shanishchare Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Rangeli",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rangeli Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Ratuwamai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ratuwamai Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Sunwarshi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sunwarshi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Sundarharaicha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sundarharaicha Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Urlabari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Urlabari Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Budhiganga",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Budhiganga Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Dhanpalthan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dhanpalthan Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Gramthan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gramthan Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Jahada",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jahada Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kanepokhari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kanepokhari Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Katahari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Katahari Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kerabari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kerabari Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Miklajung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Miklajung Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Okhaldhunga": {
        "id": "Okhaldhunga",
        "nameEn": "Okhaldhunga",
        "nameNe": "ओखलढुङ्गा",
        "localLevels": [
          {
            "name": "Siddhicharan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Siddhicharan Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Champadevi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Champadevi Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Chisankhugadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chisankhugadhi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Khijidemba",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khijidemba Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Likhu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Likhu Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Manebhanjyang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Manebhanjyang Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Molung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Molung Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Sunkoshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sunkoshi Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          }
        ]
      },
      "Panchthar": {
        "id": "Panchthar",
        "nameEn": "Panchthar",
        "nameNe": "पाँचथर",
        "localLevels": [
          {
            "name": "Phidim",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Phidim Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Falelung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Falelung Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Falgunanda",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Falgunanda Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Hilihang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Hilihang Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kummayak",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kummayak Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Miklajung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Miklajung Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Tumbewa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tumbewa Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Yangwarak",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Yangwarak Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Sankhuwasabha": {
        "id": "Sankhuwasabha",
        "nameEn": "Sankhuwasabha",
        "nameNe": "संखुवासभा",
        "localLevels": [
          {
            "name": "Chainpur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chainpur Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Dharmadevi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dharmadevi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Khandbari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Khandbari Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Madi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Madi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Panchakhapan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Panchakhapan Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Bhotkhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhotkhola Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Chichila",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chichila Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Makalu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Makalu Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Sabhapokhari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sabhapokhari Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Silichong",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Silichong Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Solukhumbu": {
        "id": "Solukhumbu",
        "nameEn": "Solukhumbu",
        "nameNe": "सोलुखुम्बु",
        "localLevels": [
          {
            "name": "Solududhkunda",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Solududhkunda Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Khumbu Pasanglhamu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khumbu Pasanglhamu Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Likhu Pike",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Likhu Pike Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Mahakulung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mahakulung Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Nechasalyan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Nechasalyan Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Sotang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sotang Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Thulung Dudhkoshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Thulung Dudhkoshi Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Mapya Dudhkoshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mapya Dudhkoshi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Sunsari": {
        "id": "Sunsari",
        "nameEn": "Sunsari",
        "nameNe": "सुनसरी",
        "localLevels": [
          {
            "name": "Dharan",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Dharan Sub-Metropolitan City",
            "totalWards": 20,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20
            ]
          },
          {
            "name": "Itahari",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Itahari Sub-Metropolitan City",
            "totalWards": 20,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20
            ]
          },
          {
            "name": "Barahachhetra",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Barahachhetra Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Duhabi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Duhabi Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Inaruwa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Inaruwa Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Ramdhuni",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ramdhuni Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Barju",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Barju Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Bhokraha Narsingh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhokraha Narsingh Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Dewanganj",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dewanganj Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Gadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gadhi Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Harinagar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Harinagar Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Koshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Koshi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Taplejung": {
        "id": "Taplejung",
        "nameEn": "Taplejung",
        "nameNe": "ताप्लेजुङ",
        "localLevels": [
          {
            "name": "Phungling",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Phungling Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Aathrai Tribeni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aathrai Tribeni Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Maiwakhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Maiwakhola Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Meringden",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Meringden Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Mikwakhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mikwakhola Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Phaktanglung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Phaktanglung Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Pathibhara Yangwarak",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pathibhara Yangwarak Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Sidingba",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sidingba Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sirijangha",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sirijangha Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Terhathum": {
        "id": "Terhathum",
        "nameEn": "Terhathum",
        "nameNe": "तेह्रथुम",
        "localLevels": [
          {
            "name": "Laligurans",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Laligurans Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Myanglung",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Myanglung Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Aathrai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aathrai Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Chhathar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chhathar Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Menchayayem",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Menchayayem Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Phedap",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Phedap Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Udayapur": {
        "id": "Udayapur",
        "nameEn": "Udayapur",
        "nameNe": "उदयपुर",
        "localLevels": [
          {
            "name": "Belaka",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Belaka Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chaudandigadhi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chaudandigadhi Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Katari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Katari Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Triyuga",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Triyuga Municipality",
            "totalWards": 16,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16
            ]
          },
          {
            "name": "Limchungbung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Limchungbung Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Rautamai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rautamai Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Tapli",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tapli Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Udayapurgadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Udayapurgadhi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      }
    }
  },
  "Madhesh": {
    "id": "Madhesh",
    "nameEn": "Madhesh Province",
    "nameNe": "मधेश प्रदेश",
    "districts": {
      "Bara": {
        "id": "Bara",
        "nameEn": "Bara",
        "nameNe": "बारा",
        "localLevels": [
          {
            "name": "Jitpur Simara",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Jitpur Simara Sub-Metropolitan City",
            "totalWards": 24,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24
            ]
          },
          {
            "name": "Kalaiya",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Kalaiya Sub-Metropolitan City",
            "totalWards": 27,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27
            ]
          },
          {
            "name": "Kolhabi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kolhabi Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Mahagadhimai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mahagadhimai Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Nijgadh",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Nijgadh Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Pachrauta",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Pachrauta Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Simraungadh",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Simraungadh Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Adarsha Kotwal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Adarsha Kotwal Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Baragadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Baragadhi Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Bishrampur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bishrampur Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Devtal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Devtal Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Karaiyamai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Karaiyamai Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Parwanipur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Parwanipur Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Pheta",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pheta Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Prasauni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Prasauni Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Suwarna",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Suwarna Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Dhanusha": {
        "id": "Dhanusha",
        "nameEn": "Dhanusha",
        "nameNe": "धनुषा",
        "localLevels": [
          {
            "name": "Janakpurdham",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Janakpurdham Sub-Metropolitan City",
            "totalWards": 25,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25
            ]
          },
          {
            "name": "Bideha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bideha Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chhireshwarnath",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chhireshwarnath Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Dhanusadham",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dhanusadham Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Ganeshman Charnath",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ganeshman Charnath Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Hansapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Hansapur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Kamala",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kamala Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Mithila",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mithila Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Mithila Bihari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mithila Bihari Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Nagarain",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Nagarain Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Sabaila",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sabaila Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Sahidnagar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sahidnagar Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Aaurahi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aaurahi Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Bateshwar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bateshwar Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Dhanauji",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dhanauji Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Janaknandini",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Janaknandini Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Lakshminya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Lakshminya Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Mukhiyapatti Musarmiya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mukhiyapatti Musarmiya Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Mahottari": {
        "id": "Mahottari",
        "nameEn": "Mahottari",
        "nameNe": "महोत्तरी",
        "localLevels": [
          {
            "name": "Aurahi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Aurahi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Balwa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Balwa Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Bardibas",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bardibas Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Bhangaha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhangaha Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Gaushala",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gaushala Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Jaleshwar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Jaleshwar Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Loharpatti",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Loharpatti Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Manara Shiswa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Manara Shiswa Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Matihani",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Matihani Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Ramgopalpur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ramgopalpur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Ekdara",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ekdara Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Mahottari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mahottari Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Pipra",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pipra Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Samsi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Samsi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sonama",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sonama Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Parsa": {
        "id": "Parsa",
        "nameEn": "Parsa",
        "nameNe": "पर्सा",
        "localLevels": [
          {
            "name": "Birgunj",
            "category": "Metropolitan City",
            "categoryNe": "महानगरपालिका",
            "fullTitle": "Birgunj Metropolitan City",
            "totalWards": 32,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
              32
            ]
          },
          {
            "name": "Bahudarmai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bahudarmai Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Parsagadhi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Parsagadhi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Pokhariya",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Pokhariya Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Bindabasini",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bindabasini Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Chhipaharmai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chhipaharmai Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Dhobini",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dhobini Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Jagarnathpur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jagarnathpur Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Jirabhawani",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jirabhawani Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Kalikamai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kalikamai Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Pakaha Mainpur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pakaha Mainpur Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Paterwa Sugauli",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Paterwa Sugauli Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Sakhuwa Prasauni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sakhuwa Prasauni Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Thori",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Thori Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Rautahat": {
        "id": "Rautahat",
        "nameEn": "Rautahat",
        "nameNe": "रौतहट",
        "localLevels": [
          {
            "name": "Baudhimai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Baudhimai Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Brindaban",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Brindaban Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chandrapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chandrapur Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Dewahi Gonahi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dewahi Gonahi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Gadhimai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gadhimai Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Garuda",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Garuda Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Gaur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gaur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Gujara",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gujara Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Ishanath",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ishanath Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Katahariya",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Katahariya Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Madhav Narayan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Madhav Narayan Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Maulapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Maulapur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Paroha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Paroha Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Phatuwa Bijayapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Phatuwa Bijayapur Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Rajdevi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rajdevi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Rajpur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rajpur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Durga Bhagwati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Durga Bhagwati Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Yamunamai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Yamunamai Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Saptari": {
        "id": "Saptari",
        "nameEn": "Saptari",
        "nameNe": "सप्तरी",
        "localLevels": [
          {
            "name": "Bode Barsain",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bode Barsain Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Dakneshwori",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dakneshwori Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Hanumannagar Kankalini",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Hanumannagar Kankalini Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Kanchanrup",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kanchanrup Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Khadak",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Khadak Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Rajbiraj",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rajbiraj Municipality",
            "totalWards": 16,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16
            ]
          },
          {
            "name": "Saptakoshi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Saptakoshi Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Shambhunath",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shambhunath Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Surunga",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Surunga Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Agnisair Krishna Savaran",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Agnisair Krishna Savaran Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Balan-Bihul",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Balan-Bihul Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Bishnupur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bishnupur Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Chhinnamasta",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chhinnamasta Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Mahadeva",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mahadeva Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Rajgadh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rajgadh Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Rupani",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rupani Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Tilathi Koiladi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tilathi Koiladi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Tirahut",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tirahut Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Sarlahi": {
        "id": "Sarlahi",
        "nameEn": "Sarlahi",
        "nameNe": "सर्लाही",
        "localLevels": [
          {
            "name": "Bagmati",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bagmati Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Balara",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Balara Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Barahathawa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Barahathawa Municipality",
            "totalWards": 18,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18
            ]
          },
          {
            "name": "Godaita",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Godaita Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Harion",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Harion Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Haripur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Haripur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Haripurwa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Haripurwa Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Ishworpur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ishworpur Municipality",
            "totalWards": 15,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15
            ]
          },
          {
            "name": "Kabilasi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kabilasi Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Lalbandi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Lalbandi Municipality",
            "totalWards": 17,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17
            ]
          },
          {
            "name": "Malangwa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Malangwa Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Basbariya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Basbariya Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Bishnu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bishnu Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Bramhapuri",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bramhapuri Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Chakraghatta",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chakraghatta Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chandranagar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chandranagar Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Dhankaul",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dhankaul Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kaudena",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kaudena Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Parsa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Parsa Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Ramnagar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ramnagar Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Siraha": {
        "id": "Siraha",
        "nameEn": "Siraha",
        "nameNe": "सिराहा",
        "localLevels": [
          {
            "name": "Dhangadhimai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dhangadhimai Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Golbazar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Golbazar Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Kalyanpur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kalyanpur Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Karjanha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Karjanha Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Lahan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Lahan Municipality",
            "totalWards": 24,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24
            ]
          },
          {
            "name": "Mirchaiya",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mirchaiya Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Siraha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Siraha Municipality",
            "totalWards": 22,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22
            ]
          },
          {
            "name": "Sukhipur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sukhipur Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Arnama",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Arnama Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Aurahi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aurahi Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Bariyarpatti",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bariyarpatti Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Bhagwanpur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhagwanpur Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Bishnupur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bishnupur Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Laxmipur Patari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Laxmipur Patari Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Naraha",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Naraha Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Nawarajpur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Nawarajpur Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Sakhuwanankarkatti",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sakhuwanankarkatti Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      }
    }
  },
  "Bagmati": {
    "id": "Bagmati",
    "nameEn": "Bagmati Province",
    "nameNe": "बागमती प्रदेश",
    "districts": {
      "Bhaktapur": {
        "id": "Bhaktapur",
        "nameEn": "Bhaktapur",
        "nameNe": "भक्तपुर",
        "localLevels": [
          {
            "name": "Bhaktapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhaktapur Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Changunarayan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Changunarayan Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Madhyapur Thimi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Madhyapur Thimi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Suryabinayak",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Suryabinayak Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          }
        ]
      },
      "Chitwan": {
        "id": "Chitwan",
        "nameEn": "Chitwan",
        "nameNe": "चितवन",
        "localLevels": [
          {
            "name": "Bharatpur",
            "category": "Metropolitan City",
            "categoryNe": "महानगरपालिका",
            "fullTitle": "Bharatpur Metropolitan City",
            "totalWards": 29,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29
            ]
          },
          {
            "name": "Kalika",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kalika Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Khairahani",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Khairahani Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Madi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Madi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Rapti",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rapti Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Ratnanagar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ratnanagar Municipality",
            "totalWards": 16,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16
            ]
          },
          {
            "name": "Ichchhakamana",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ichchhakamana Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Dhading": {
        "id": "Dhading",
        "nameEn": "Dhading",
        "nameNe": "धादिङ",
        "localLevels": [
          {
            "name": "Dhunibeshi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dhunibeshi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Nilkantha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Nilkantha Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Benighat Rorang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Benighat Rorang Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Gajuri",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gajuri Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Galchhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Galchhi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Gangajamuna",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gangajamuna Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Jwalamukhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jwalamukhi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Khaniyabas",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khaniyabas Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Netrawati Dabjong",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Netrawati Dabjong Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Rubi Valley",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rubi Valley Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Siddhalek",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Siddhalek Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Thakre",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Thakre Rural Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Tripurasundari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tripurasundari Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Dolakha": {
        "id": "Dolakha",
        "nameEn": "Dolakha",
        "nameNe": "दोलखा",
        "localLevels": [
          {
            "name": "Bhimeshwar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhimeshwar Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Jiri",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Jiri Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Baiteshwar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Baiteshwar Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Bigu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bigu Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Gaurishankar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gaurishankar Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Kalinchok",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kalinchok Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Melung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Melung Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sailung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sailung Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Tamakoshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tamakoshi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Kathmandu": {
        "id": "Kathmandu",
        "nameEn": "Kathmandu",
        "nameNe": "काठमाडौँ",
        "localLevels": [
          {
            "name": "Kathmandu",
            "category": "Metropolitan City",
            "categoryNe": "महानगरपालिका",
            "fullTitle": "Kathmandu Metropolitan City",
            "totalWards": 32,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
              32
            ]
          },
          {
            "name": "Budhanilkantha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Budhanilkantha Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Chandragiri",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chandragiri Municipality",
            "totalWards": 15,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15
            ]
          },
          {
            "name": "Dakshinkali",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dakshinkali Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Gokarneshwar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gokarneshwar Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Kageshwari Manohara",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kageshwari Manohara Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Kirtipur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kirtipur Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Nagarjun",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Nagarjun Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Shankharapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shankharapur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Tarakeshwar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Tarakeshwar Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Tokha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Tokha Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          }
        ]
      },
      "Kavrepalanchok": {
        "id": "Kavrepalanchok",
        "nameEn": "Kavrepalanchok",
        "nameNe": "काभ्रेपलाञ्चोक",
        "localLevels": [
          {
            "name": "Banepa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Banepa Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Dhulikhel",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dhulikhel Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Mandandeupur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mandandeupur Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Namobuddha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Namobuddha Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Panauti",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Panauti Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Panchkhal",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Panchkhal Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Bethanchok",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bethanchok Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Bhumlu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhumlu Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Chaurideurali",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chaurideurali Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Khanikhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khanikhola Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Mahabharat",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mahabharat Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Roshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Roshi Rural Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Temal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Temal Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Lalitpur": {
        "id": "Lalitpur",
        "nameEn": "Lalitpur",
        "nameNe": "ललितपुर",
        "localLevels": [
          {
            "name": "Lalitpur",
            "category": "Metropolitan City",
            "categoryNe": "महानगरपालिका",
            "fullTitle": "Lalitpur Metropolitan City",
            "totalWards": 29,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29
            ]
          },
          {
            "name": "Godawari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Godawari Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Mahalaxmi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mahalaxmi Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Bagmati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bagmati Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Konjyosom",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Konjyosom Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Mahankal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mahankal Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Makwanpur": {
        "id": "Makwanpur",
        "nameEn": "Makwanpur",
        "nameNe": "मकवानपुर",
        "localLevels": [
          {
            "name": "Hetauda",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Hetauda Sub-Metropolitan City",
            "totalWards": 19,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ]
          },
          {
            "name": "Thaha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Thaha Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Bagmati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bagmati Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Bakaiya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bakaiya Rural Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Bhimphedi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhimphedi Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Indrasarowar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Indrasarowar Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Kailash",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kailash Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Makawanpurgadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Makawanpurgadhi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Manahari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Manahari Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Raksirang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Raksirang Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Nuwakot": {
        "id": "Nuwakot",
        "nameEn": "Nuwakot",
        "nameNe": "नुवाकोट",
        "localLevels": [
          {
            "name": "Belkotgadhi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Belkotgadhi Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Bidur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bidur Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Dupcheshwar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dupcheshwar Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kakani",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kakani Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Kispang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kispang Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Likhu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Likhu Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Myagang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Myagang Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Panchakanya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Panchakanya Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Shivapuri",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Shivapuri Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Suryagadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Suryagadhi Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Tadi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tadi Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Tarkeshwar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tarkeshwar Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Ramechhap": {
        "id": "Ramechhap",
        "nameEn": "Ramechhap",
        "nameNe": "रामेछाप",
        "localLevels": [
          {
            "name": "Manthali",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Manthali Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Ramechhap",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ramechhap Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Doramba Shailung",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Doramba Shailung Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Gokulganga",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gokulganga Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Khadadevi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khadadevi Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Likhu Tamakoshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Likhu Tamakoshi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sunapati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sunapati Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Umakunda",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Umakunda Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Rasuwa": {
        "id": "Rasuwa",
        "nameEn": "Rasuwa",
        "nameNe": "रसुवा",
        "localLevels": [
          {
            "name": "Aamachhodingmo",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aamachhodingmo Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Gosaikunda",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gosaikunda Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Kalika",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kalika Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Naukunda",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Naukunda Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Uttargaya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Uttargaya Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Sindhuli": {
        "id": "Sindhuli",
        "nameEn": "Sindhuli",
        "nameNe": "सिन्धुली",
        "localLevels": [
          {
            "name": "Dudhauli",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dudhauli Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Kamalamai",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kamalamai Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Fikkal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Fikkal Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Ghanglekh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ghanglekh Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Golanjor",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Golanjor Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Hariharpurgadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Hariharpurgadhi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Marin",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Marin Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sunkoshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sunkoshi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Tinpatan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tinpatan Rural Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          }
        ]
      },
      "Sindhupalchok": {
        "id": "Sindhupalchok",
        "nameEn": "Sindhupalchok",
        "nameNe": "सिन्धुपाल्चोक",
        "localLevels": [
          {
            "name": "Barhabise",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Barhabise Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chautara Sangachokgadhi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chautara Sangachokgadhi Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Melamchi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Melamchi Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Balephi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Balephi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Bhotekoshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhotekoshi Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Helambu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Helambu Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Indrawati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Indrawati Rural Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Jugal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jugal Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Lisankhu Pakhar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Lisankhu Pakhar Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Panchpokhari Thangpal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Panchpokhari Thangpal Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Sunkoshi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sunkoshi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Tripurasundari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tripurasundari Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      }
    }
  },
  "Gandaki": {
    "id": "Gandaki",
    "nameEn": "Gandaki Province",
    "nameNe": "गण्डकी प्रदेश",
    "districts": {
      "Baglung": {
        "id": "Baglung",
        "nameEn": "Baglung",
        "nameNe": "बागलुङ",
        "localLevels": [
          {
            "name": "Baglung",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Baglung Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Dhorpatan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dhorpatan Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Galkot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Galkot Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Jaimuni",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Jaimuni Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Badigad",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Badigad Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Bareng",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bareng Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Kanthekhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kanthekhola Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Nisikhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Nisikhola Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Taman Khola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Taman Khola Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Tara Khola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tara Khola Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Gorkha": {
        "id": "Gorkha",
        "nameEn": "Gorkha",
        "nameNe": "गोरखा",
        "localLevels": [
          {
            "name": "Gorkha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gorkha Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Palungtar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Palungtar Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Aarughat",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aarughat Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Ajirkot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ajirkot Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Barpak Sulikot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Barpak Sulikot Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Bhimsen Thapa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhimsen Thapa Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Chumnubri",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chumnubri Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Dharche",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dharche Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Gandaki",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gandaki Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Sahid Lakhan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sahid Lakhan Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Siranchok",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Siranchok Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Kaski": {
        "id": "Kaski",
        "nameEn": "Kaski",
        "nameNe": "कास्की",
        "localLevels": [
          {
            "name": "Pokhara",
            "category": "Metropolitan City",
            "categoryNe": "महानगरपालिका",
            "fullTitle": "Pokhara Metropolitan City",
            "totalWards": 33,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
              32,
              33
            ]
          },
          {
            "name": "Annapurna",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Annapurna Rural Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Machhapuchchhre",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Machhapuchchhre Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Madi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Madi Rural Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Rupa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rupa Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Lamjung": {
        "id": "Lamjung",
        "nameEn": "Lamjung",
        "nameNe": "लमजुङ",
        "localLevels": [
          {
            "name": "Besisahar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Besisahar Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Madhya Nepal",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Madhya Nepal Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Rainas",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rainas Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Sundarbazar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sundarbazar Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Dordi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dordi Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Dudhpokhari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dudhpokhari Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Kwholasothar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kwholasothar Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Marsyangdi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Marsyangdi Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Manang": {
        "id": "Manang",
        "nameEn": "Manang",
        "nameNe": "मनाङ",
        "localLevels": [
          {
            "name": "Chame",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chame Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Manang Ingshyang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Manang Ingshyang Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Narpa Bhumi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Narpa Bhumi Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Nason",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Nason Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Mustang": {
        "id": "Mustang",
        "nameEn": "Mustang",
        "nameNe": "मुस्ताङ",
        "localLevels": [
          {
            "name": "Baragung Muktichhetra",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Baragung Muktichhetra Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Dalome",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dalome Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Gharapjhong",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gharapjhong Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Lomanthang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Lomanthang Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Thasang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Thasang Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Myagdi": {
        "id": "Myagdi",
        "nameEn": "Myagdi",
        "nameNe": "म्याग्दी",
        "localLevels": [
          {
            "name": "Beni",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Beni Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Annapurna",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Annapurna Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Dhaulagiri",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dhaulagiri Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Malika",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Malika Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Mangala",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mangala Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Raghuganga",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Raghuganga Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Nawalpur": {
        "id": "Nawalpur",
        "nameEn": "Nawalpur",
        "nameNe": "नवलपुर (नवलपरासी पूर्व)",
        "localLevels": [
          {
            "name": "Devchuli",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Devchuli Municipality",
            "totalWards": 17,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17
            ]
          },
          {
            "name": "Gaindakot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gaindakot Municipality",
            "totalWards": 18,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18
            ]
          },
          {
            "name": "Kawasoti",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kawasoti Municipality",
            "totalWards": 17,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17
            ]
          },
          {
            "name": "Madhyabindu",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Madhyabindu Municipality",
            "totalWards": 15,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15
            ]
          },
          {
            "name": "Binayi Tribeni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Binayi Tribeni Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Bulingtar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bulingtar Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Baudikali",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Baudikali Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Hupsekot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Hupsekot Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Parbat": {
        "id": "Parbat",
        "nameEn": "Parbat",
        "nameNe": "पर्वत",
        "localLevels": [
          {
            "name": "Kushma",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kushma Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Phalewas",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Phalewas Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Bihadi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bihadi Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Jaljala",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jaljala Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Mahashila",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mahashila Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Modi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Modi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Paiyun",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Paiyun Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Syangja": {
        "id": "Syangja",
        "nameEn": "Syangja",
        "nameNe": "स्याङ्जा",
        "localLevels": [
          {
            "name": "Bhirkot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhirkot Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chapakot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chapakot Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Galyang",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Galyang Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Putalibazar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Putalibazar Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Waling",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Waling Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Aandhikhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aandhikhola Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Arjunchaupari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Arjunchaupari Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Biruwa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Biruwa Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Harinas",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Harinas Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kaligandaki",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kaligandaki Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Phedikhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Phedikhola Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Tanahun": {
        "id": "Tanahun",
        "nameEn": "Tanahun",
        "nameNe": "तनहुँ",
        "localLevels": [
          {
            "name": "Bhanu",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhanu Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Bhimad",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhimad Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Byas",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Byas Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Shuklagandaki",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shuklagandaki Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Aanbukhaireni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aanbukhaireni Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Bandipur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bandipur Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Devghat",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Devghat Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Ghiring",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ghiring Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Myagde",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Myagde Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Rhishing",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rhishing Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      }
    }
  },
  "Lumbini": {
    "id": "Lumbini",
    "nameEn": "Lumbini Province",
    "nameNe": "लुम्बिनी प्रदेश",
    "districts": {
      "Arghakhanchi": {
        "id": "Arghakhanchi",
        "nameEn": "Arghakhanchi",
        "nameNe": "अर्घाखाँची",
        "localLevels": [
          {
            "name": "Bhumikasthan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhumikasthan Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Sandhikharka",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sandhikharka Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Sitganga",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sitganga Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Chhatradev",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chhatradev Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Malarani",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Malarani Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Panini",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Panini Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Banke": {
        "id": "Banke",
        "nameEn": "Banke",
        "nameNe": "बाँके",
        "localLevels": [
          {
            "name": "Nepalgunj",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Nepalgunj Sub-Metropolitan City",
            "totalWards": 23,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23
            ]
          },
          {
            "name": "Kohalpur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kohalpur Municipality",
            "totalWards": 15,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15
            ]
          },
          {
            "name": "Baijanath",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Baijanath Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Duduwa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Duduwa Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Janki",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Janki Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Khajura",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khajura Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Narainapur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Narainapur Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Rapti Sonari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rapti Sonari Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Bardiya": {
        "id": "Bardiya",
        "nameEn": "Bardiya",
        "nameNe": "बर्दिया",
        "localLevels": [
          {
            "name": "Bansgadhi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bansgadhi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Barbardiya",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Barbardiya Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Gulariya",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gulariya Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Madhuwan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Madhuwan Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Rajapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rajapur Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Thakurbaba",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Thakurbaba Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Badhaiyatal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Badhaiyatal Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Geruwa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Geruwa Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Dang": {
        "id": "Dang",
        "nameEn": "Dang",
        "nameNe": "दाङ",
        "localLevels": [
          {
            "name": "Ghorahi",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Ghorahi Sub-Metropolitan City",
            "totalWards": 19,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ]
          },
          {
            "name": "Tulsipur",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Tulsipur Sub-Metropolitan City",
            "totalWards": 19,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ]
          },
          {
            "name": "Lamahi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Lamahi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Babai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Babai Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Banglachuli",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Banglachuli Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Dangisharan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dangisharan Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Gadhawa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gadhawa Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Rajpur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rajpur Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Rapti",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rapti Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Shantinagar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Shantinagar Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Eastern Rukum": {
        "id": "Eastern Rukum",
        "nameEn": "Eastern Rukum",
        "nameNe": "पूर्वी रुकुम",
        "localLevels": [
          {
            "name": "Bhume",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhume Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Putha Uttarganga",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Putha Uttarganga Rural Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Sisne",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sisne Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Gulmi": {
        "id": "Gulmi",
        "nameEn": "Gulmi",
        "nameNe": "गुल्मी",
        "localLevels": [
          {
            "name": "Musikot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Musikot Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Resunga",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Resunga Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Chandrakot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chandrakot Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Chatrakot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chatrakot Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Dhurkot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dhurkot Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Gulmidarbar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gulmidarbar Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Isma",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Isma Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Kaligandaki",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kaligandaki Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Madane",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Madane Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Malika",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Malika Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Ruru",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ruru Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Satyawati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Satyawati Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Kapilvastu": {
        "id": "Kapilvastu",
        "nameEn": "Kapilvastu",
        "nameNe": "कपिलवस्तु",
        "localLevels": [
          {
            "name": "Banganga",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Banganga Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Buddhabhumi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Buddhabhumi Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Kapilvastu",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kapilvastu Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Krishnanagar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Krishnanagar Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Maharajgunj",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Maharajgunj Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Shivaraj",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shivaraj Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Bijayanagar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bijayanagar Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Mayadevi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mayadevi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Suddhodhan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Suddhodhan Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Yashodhara",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Yashodhara Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Parasi": {
        "id": "Parasi",
        "nameEn": "Parasi",
        "nameNe": "परासी (नवलपरासी पश्चिम)",
        "localLevels": [
          {
            "name": "Bardaghat",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bardaghat Municipality",
            "totalWards": 16,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16
            ]
          },
          {
            "name": "Ramgram",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ramgram Municipality",
            "totalWards": 18,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18
            ]
          },
          {
            "name": "Sunwal",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sunwal Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Palhi Nandan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Palhi Nandan Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Pratappur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pratappur Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Sarawal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sarawal Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Susta",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Susta Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Palpa": {
        "id": "Palpa",
        "nameEn": "Palpa",
        "nameNe": "पाल्पा",
        "localLevels": [
          {
            "name": "Rampur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rampur Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Tansen",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Tansen Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Bagnaskali",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bagnaskali Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Mathagadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mathagadhi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Nisdi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Nisdi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Purbakhola",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Purbakhola Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Rainadevi Chhahara",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rainadevi Chhahara Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Rambha",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rambha Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Ribdikot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ribdikot Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Tinau",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tinau Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Pyuthan": {
        "id": "Pyuthan",
        "nameEn": "Pyuthan",
        "nameNe": "प्युठान",
        "localLevels": [
          {
            "name": "Pyuthan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Pyuthan Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Sworgadwary",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sworgadwary Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Airawati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Airawati Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Gaumukhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gaumukhi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Jhimruk",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jhimruk Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Mallarani",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mallarani Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Mandavi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mandavi Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Naubahini",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Naubahini Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Sarumarani",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sarumarani Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Rolpa": {
        "id": "Rolpa",
        "nameEn": "Rolpa",
        "nameNe": "रोल्पा",
        "localLevels": [
          {
            "name": "Rolpa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Rolpa Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Gangadev",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gangadev Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Lungri",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Lungri Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Madi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Madi Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Pariwartan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pariwartan Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Runtigadhi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Runtigadhi Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Sunchhahari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sunchhahari Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sunil Smriti",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sunil Smriti Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Thawang",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Thawang Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Tribeni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tribeni Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Rupandehi": {
        "id": "Rupandehi",
        "nameEn": "Rupandehi",
        "nameNe": "रुपन्देही",
        "localLevels": [
          {
            "name": "Butwal",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Butwal Sub-Metropolitan City",
            "totalWards": 19,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ]
          },
          {
            "name": "Devdaha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Devdaha Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Lumbini Sanskritik",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Lumbini Sanskritik Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Sainamaina",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sainamaina Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Siddharthanagar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Siddharthanagar Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Tillotama",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Tillotama Municipality",
            "totalWards": 17,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17
            ]
          },
          {
            "name": "Gaidahawa",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gaidahawa Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Kanchan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kanchan Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Kotahimai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kotahimai Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Marchawari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Marchawari Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Mayadevi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mayadevi Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Omsatiya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Omsatiya Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Rohini",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Rohini Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sammarimai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sammarimai Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Siyari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Siyari Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sudhdhodhan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sudhdhodhan Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      }
    }
  },
  "Karnali": {
    "id": "Karnali",
    "nameEn": "Karnali Province",
    "nameNe": "कर्णाली प्रदेश",
    "districts": {
      "Dailekh": {
        "id": "Dailekh",
        "nameEn": "Dailekh",
        "nameNe": "दैलेख",
        "localLevels": [
          {
            "name": "Aathabis",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Aathabis Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chamunda Bindrasaini",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chamunda Bindrasaini Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Dullu",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dullu Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Narayan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Narayan Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Bhagawatimai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhagawatimai Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Bhairabi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhairabi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Dungeshwar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dungeshwar Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Gurans",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gurans Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Mahabu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mahabu Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Naumule",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Naumule Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Thantikandh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Thantikandh Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Dolpa": {
        "id": "Dolpa",
        "nameEn": "Dolpa",
        "nameNe": "डोल्पा",
        "localLevels": [
          {
            "name": "Thuli Bheri",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Thuli Bheri Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Tripurasundari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Tripurasundari Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Chharka Tangsong",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chharka Tangsong Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Dolpo Buddha",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dolpo Buddha Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Jagadulla",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jagadulla Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Kaike",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kaike Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Mudkechula",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mudkechula Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Shey Phoksundo",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Shey Phoksundo Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Humla": {
        "id": "Humla",
        "nameEn": "Humla",
        "nameNe": "हुम्ला",
        "localLevels": [
          {
            "name": "Adanchuli",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Adanchuli Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Chankheli",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chankheli Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Kharpunath",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kharpunath Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Namkha",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Namkha Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Sarkegad",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sarkegad Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Simkot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Simkot Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Tanjakot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tanjakot Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Jajarkot": {
        "id": "Jajarkot",
        "nameEn": "Jajarkot",
        "nameNe": "जाजरकोट",
        "localLevels": [
          {
            "name": "Bheri",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bheri Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Chhedagad",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chhedagad Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Nalgad",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Nalgad Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Barekot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Barekot Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Junichande",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Junichande Rural Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Kuse",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kuse Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Shiwalaya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Shiwalaya Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Jumla": {
        "id": "Jumla",
        "nameEn": "Jumla",
        "nameNe": "जुम्ला",
        "localLevels": [
          {
            "name": "Chandannath",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chandannath Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Guthichaur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Guthichaur Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Hima",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Hima Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kanakasundari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kanakasundari Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Patarasi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Patarasi Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sinja",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sinja Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Tatopani",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tatopani Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Tila",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tila Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Kalikot": {
        "id": "Kalikot",
        "nameEn": "Kalikot",
        "nameNe": "कालिकोट",
        "localLevels": [
          {
            "name": "Khandachakra",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Khandachakra Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Raskot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Raskot Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Tilagufa",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Tilagufa Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Mahawai",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mahawai Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Narharinath",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Narharinath Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Pachaljharana",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pachaljharana Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Palata",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Palata Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Sanni Triveni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sanni Triveni Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Shubha Kalika",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Shubha Kalika Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Mugu": {
        "id": "Mugu",
        "nameEn": "Mugu",
        "nameNe": "मुगु",
        "localLevels": [
          {
            "name": "Chhayanath Rara",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chhayanath Rara Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Khatyad",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khatyad Rural Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Mugum Karmarong",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mugum Karmarong Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Soru",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Soru Rural Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          }
        ]
      },
      "Salyan": {
        "id": "Salyan",
        "nameEn": "Salyan",
        "nameNe": "सल्यान",
        "localLevels": [
          {
            "name": "Bagchaur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bagchaur Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Bangad Kupinde",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bangad Kupinde Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Shaarda",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shaarda Municipality",
            "totalWards": 15,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15
            ]
          },
          {
            "name": "Chhatreshwori",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chhatreshwori Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Darma",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Darma Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Kalimati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kalimati Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kapurkot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kapurkot Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Kumakh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kumakh Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Siddha Kumakh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Siddha Kumakh Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Tribeni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tribeni Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Surkhet": {
        "id": "Surkhet",
        "nameEn": "Surkhet",
        "nameNe": "सुर्खेत",
        "localLevels": [
          {
            "name": "Bheriganga",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bheriganga Municipality",
            "totalWards": 13,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ]
          },
          {
            "name": "Birendranagar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Birendranagar Municipality",
            "totalWards": 16,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16
            ]
          },
          {
            "name": "Gurbhakot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gurbhakot Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Lekbeshi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Lekbeshi Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Panchpuri",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Panchpuri Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Barahtal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Barahtal Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Chaukune",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chaukune Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Chingad",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chingad Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Simta",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Simta Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Western Rukum": {
        "id": "Western Rukum",
        "nameEn": "Western Rukum",
        "nameNe": "पश्चिम रुकुम",
        "localLevels": [
          {
            "name": "Aathbiskot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Aathbiskot Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Chaurjahari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Chaurjahari Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Musikot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Musikot Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Banfikot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Banfikot Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Sani Bheri",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sani Bheri Rural Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Tribeni",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Tribeni Rural Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          }
        ]
      }
    }
  },
  "Sudurpashchim": {
    "id": "Sudurpashchim",
    "nameEn": "Sudurpashchim Province",
    "nameNe": "सुदूरपश्चिम प्रदेश",
    "districts": {
      "Achham": {
        "id": "Achham",
        "nameEn": "Achham",
        "nameNe": "अछाम",
        "localLevels": [
          {
            "name": "Kamalbazar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Kamalbazar Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Mangalsen",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mangalsen Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Panchadewal Binayak",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Panchadewal Binayak Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Sanphebagar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Sanphebagar Municipality",
            "totalWards": 14,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14
            ]
          },
          {
            "name": "Bannigadhi Jayagadh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bannigadhi Jayagadh Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Chaurpati",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chaurpati Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Dhakari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dhakari Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Mellekh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mellekh Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Ramaroshan",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ramaroshan Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Turmakhad",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Turmakhad Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Baitadi": {
        "id": "Baitadi",
        "nameEn": "Baitadi",
        "nameNe": "बैतडी",
        "localLevels": [
          {
            "name": "Dasharathchand",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dasharathchand Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Melauli",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Melauli Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Patan",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Patan Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Purchaudi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Purchaudi Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Dilasaini",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dilasaini Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Dogadakedar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dogadakedar Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Pancheshwar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Pancheshwar Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Shivanath",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Shivanath Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Sigas",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sigas Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Surnaya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Surnaya Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          }
        ]
      },
      "Bajhang": {
        "id": "Bajhang",
        "nameEn": "Bajhang",
        "nameNe": "बझाङ",
        "localLevels": [
          {
            "name": "Bungal",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bungal Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Jaya Prithvi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Jaya Prithvi Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Bithadchir",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bithadchir Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chabispathivera",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chabispathivera Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Durgathali",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Durgathali Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kedarseu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kedarseu Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Khaptadchhanna",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Khaptadchhanna Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Masta",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Masta Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Saipal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Saipal Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Surma",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Surma Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Talkot",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Talkot Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Thalara",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Thalara Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ]
      },
      "Bajura": {
        "id": "Bajura",
        "nameEn": "Bajura",
        "nameNe": "बाजुरा",
        "localLevels": [
          {
            "name": "Badimalika",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Badimalika Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Budhiganga",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Budhiganga Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Budhinanda",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Budhinanda Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Tribeni",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Tribeni Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Chhededaha",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chhededaha Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Gaumul",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Gaumul Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Himali",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Himali Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Jagannath",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jagannath Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Swami Kartik Khapar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Swami Kartik Khapar Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Dadeldhura": {
        "id": "Dadeldhura",
        "nameEn": "Dadeldhura",
        "nameNe": "डडेल्धुरा",
        "localLevels": [
          {
            "name": "Amargadhi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Amargadhi Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Parashuram",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Parashuram Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Aalitaal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Aalitaal Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Ajaymeru",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ajaymeru Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Bhageshwar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bhageshwar Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Ganayapdhura",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Ganayapdhura Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Navadurga",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Navadurga Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          }
        ]
      },
      "Darchula": {
        "id": "Darchula",
        "nameEn": "Darchula",
        "nameNe": "दार्चुला",
        "localLevels": [
          {
            "name": "Mahakali",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Mahakali Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Shailyashikhar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shailyashikhar Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Apihimal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Apihimal Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Byas",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Byas Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Dunhu",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Dunhu Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Lekam",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Lekam Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Malikarjun",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Malikarjun Rural Municipality",
            "totalWards": 8,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8
            ]
          },
          {
            "name": "Marma",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Marma Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Naugad",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Naugad Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Doti": {
        "id": "Doti",
        "nameEn": "Doti",
        "nameNe": "डोटी",
        "localLevels": [
          {
            "name": "Dipayal Silgadhi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dipayal Silgadhi Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Shikhar",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shikhar Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Adharsha",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Adharsha Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Badikedar",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Badikedar Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Bogtan Foodsil",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bogtan Foodsil Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Jorayal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Jorayal Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "K I Singh",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "K I Singh Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Purbi Chauki",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Purbi Chauki Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Sayal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Sayal Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      },
      "Kailali": {
        "id": "Kailali",
        "nameEn": "Kailali",
        "nameNe": "कैलाली",
        "localLevels": [
          {
            "name": "Dhangadhi",
            "category": "Sub-Metropolitan City",
            "categoryNe": "उपमहानगरपालिका",
            "fullTitle": "Dhangadhi Sub-Metropolitan City",
            "totalWards": 19,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ]
          },
          {
            "name": "Bhajani",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhajani Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Gauriganga",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Gauriganga Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Ghodaghodi",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Ghodaghodi Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Godawari",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Godawari Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Lamkichuha",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Lamkichuha Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Tikapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Tikapur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Bardagoriya",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Bardagoriya Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Chure",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Chure Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "Janaki",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Janaki Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Joshipur",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Joshipur Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          },
          {
            "name": "Kailari",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Kailari Rural Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Mohanyal",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Mohanyal Rural Municipality",
            "totalWards": 7,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ]
          }
        ]
      },
      "Kanchanpur": {
        "id": "Kanchanpur",
        "nameEn": "Kanchanpur",
        "nameNe": "कञ्चनपुर",
        "localLevels": [
          {
            "name": "Bedkot",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bedkot Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Belauri",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Belauri Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Bhimdatta",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Bhimdatta Municipality",
            "totalWards": 19,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ]
          },
          {
            "name": "Dodhara Chandani",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Dodhara Chandani Municipality",
            "totalWards": 10,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          {
            "name": "Krishnapur",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Krishnapur Municipality",
            "totalWards": 9,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "Punarbas",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Punarbas Municipality",
            "totalWards": 11,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          },
          {
            "name": "Shuklaphanta",
            "category": "Municipality",
            "categoryNe": "नगरपालिका",
            "fullTitle": "Shuklaphanta Municipality",
            "totalWards": 12,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          },
          {
            "name": "Beldandi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Beldandi Rural Municipality",
            "totalWards": 5,
            "wards": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "name": "Laljhadi",
            "category": "Rural Municipality",
            "categoryNe": "गाउँपालिका",
            "fullTitle": "Laljhadi Rural Municipality",
            "totalWards": 6,
            "wards": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          }
        ]
      }
    }
  }
};

/**
 * Get districts in a selected province.
 * Accepts province ID (e.g. 'Bagmati') or display name (e.g. 'बागमती प्रदेश')
 */
export function getDistrictsByProvince(provinceKey) {
  if (!provinceKey) return [];
  // Normalize province key
  let match = Object.keys(NEPAL_ADMINISTRATIVE_DATA).find(k => 
    k.toLowerCase() === provinceKey.toLowerCase() ||
    provinceKey.includes(k) ||
    (NEPAL_ADMINISTRATIVE_DATA[k].nameNe && provinceKey.includes(NEPAL_ADMINISTRATIVE_DATA[k].nameNe))
  );
  if (!match) {
    // Try matching by exact ID or name
    match = Object.keys(NEPAL_ADMINISTRATIVE_DATA).find(k => 
      NEPAL_ADMINISTRATIVE_DATA[k].nameEn.toLowerCase() === provinceKey.toLowerCase()
    );
  }
  if (!match) return [];
  const distObj = NEPAL_ADMINISTRATIVE_DATA[match].districts;
  return Object.values(distObj).map(d => ({
    id: d.id,
    nameEn: d.nameEn,
    nameNe: d.nameNe,
    display: `${d.nameNe} (${d.nameEn})`
  }));
}

/**
 * Get local levels / municipalities in a selected district.
 */
export function getLocalLevelsByDistrict(provinceKey, districtKey) {
  if (!districtKey) return [];
  // Normalize district key (remove brackets if present, e.g. "Kathmandu (काठमाडौँ)" -> "Kathmandu")
  const cleanDist = districtKey.split('(')[0].trim();
  
  // Search in specified province if given
  let searchProvinces = Object.keys(NEPAL_ADMINISTRATIVE_DATA);
  if (provinceKey) {
    const pMatch = searchProvinces.find(k => 
      k.toLowerCase() === provinceKey.toLowerCase() ||
      provinceKey.includes(k) ||
      (NEPAL_ADMINISTRATIVE_DATA[k].nameNe && provinceKey.includes(NEPAL_ADMINISTRATIVE_DATA[k].nameNe))
    );
    if (pMatch) searchProvinces = [pMatch];
  }

  for (const p of searchProvinces) {
    const districts = NEPAL_ADMINISTRATIVE_DATA[p].districts;
    for (const d of Object.keys(districts)) {
      if (
        d.toLowerCase() === cleanDist.toLowerCase() ||
        districtKey.toLowerCase().includes(d.toLowerCase()) ||
        districts[d].nameNe === cleanDist ||
        districtKey.includes(districts[d].nameNe)
      ) {
        return districts[d].localLevels.map(ll => ({
          name: ll.name,
          category: ll.category,
          categoryNe: ll.categoryNe,
          fullTitle: ll.fullTitle,
          totalWards: ll.totalWards,
          wards: ll.wards,
          display: `${ll.name} ${ll.categoryNe} (${ll.fullTitle})`
        }));
      }
    }
  }
  return [];
}

/**
 * Get ward list for a selected local level in a district.
 */
export function getWardsByLocalLevel(provinceKey, districtKey, localLevelName) {
  if (!localLevelName) return [];
  const lls = getLocalLevelsByDistrict(provinceKey, districtKey);
  const cleanLL = localLevelName.trim().toLowerCase();
  const found = lls.find(l => 
    l.name.toLowerCase() === cleanLL ||
    cleanLL.includes(l.name.toLowerCase()) ||
    l.fullTitle.toLowerCase() === cleanLL ||
    cleanLL.includes(l.fullTitle.toLowerCase())
  );
  if (found) {
    return found.wards;
  }
  // Fallback: if 1..N
  return Array.from({ length: 15 }, (_, i) => i + 1);
}
