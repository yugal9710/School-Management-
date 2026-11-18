# हाम्रो विद्यालय (Hamro Vidhyalaya) - Nepal Multi-Tenant School Management System

> **A modern, production-grade, multi-tenant school management platform engineered specifically for schools in Nepal.**
> Conforms strictly to **Curriculum Development Centre (CDC) Letter Grading Directive 2078**, **Government of Nepal CEHRD IEMIS** reporting standards, **Bikram Sambat (BS)** solar calendar, **NPR currency** handling, and **Nepal's Federal Address Structure**.

---

## 🌟 Key Nepal-Specific Features

1. **Multi-Tenant Architecture & Data Isolation**
   - Single system securely hosts multiple independent schools (tenants) across Nepal.
   - **Row-level isolation** via foreign keys (`tenant_id`) enforced across all API endpoints, database queries, search filters, and file downloads.
   - Platform Administrator manages tenant subscriptions and school onboarding.
   - Municipality / Rural Municipality Education Officer has explicitly authorized oversight restricted strictly to assigned municipal schools.

2. **Bikram Sambat (BS) & Gregorian (AD) Dual Calendar Engine**
   - Accurate solar calendar data for academic sessions (2070 BS - 2090+ BS).
   - School-configurable date preference: **BS Only (वि.सं. मात्र)**, **AD Only**, or **Dual (BS with AD subtitle)**.
   - Interactive 3-field BS Date Picker component (Year, Month, Day) with Devanagari numerals (०, १, २, ३, ४...).

3. **Bilingual Nepali Unicode & English Interface**
   - Instant language toggle (नेपाली / English) across all screens, navigation, dialogs, mark sheets, and receipts.
   - Preserves Unicode Devanagari text in student names, notices, receipts, and government exports.

4. **Nepal Federal Address Hierarchy**
   - 7 Provinces (कोशी, मधेश, बागमती, गण्डकी, लुम्बिनी, कर्णाली, सुदूरपश्चिम).
   - 77 Districts (काठमाडौँ, ललितपुर, भक्तपुर, कास्की, मोरङ, चितवन, झापा, etc.).
   - Local Government Levels: Metropolitan, Sub-Metropolitan, Municipality, and Rural Municipality (महानगर, उपमहानगर, नगर, गाउँपालिका).
   - Ward Number (वडा नं. १-३५) and Tole / Village (टोल / गाउँ).

5. **CDC Letter Grading Directive 2078 (लेटर ग्रेडिङ निर्देशिका, २०७८)**
   - Letter grades: **A+ (4.0)**, **A (3.6)**, **B+ (3.2)**, **B (2.8)**, **C+ (2.4)**, **C (2.0)**, **D (1.6)**, and **NG (0.0 Non-Graded)**.
   - **Independent Component Requirement**: Minimum 35% in Theory (TH) and 40% in Practical / Internal Assessment (PR/IN). Scoring below pass marks in either component automatically renders the final subject grade as **NG (Non-Graded)**.
   - Credit-hour weighted Grade Point Average (GPA) computation.
   - Formal review and publishing workflow: `Draft` ➔ `Under Review` ➔ `Approved` ➔ `Published`.

6. **Official Print-Ready Forms**
   - **CDC Standard Grade Sheet (लब्धांक पत्र / Progress Report)**: Formatted for standard A4 common school printers with School Header, EMIS code, Student particulars, Subject breakdown (TH + PR + Credits + GP), Overall GPA, and Headteacher / Seal placeholders.
   - **Official NPR Fee Receipt (रसिद)**: Two-part format (**विद्यालय प्रति / School Copy** and **विद्यार्थी प्रति / Student Copy**) with tax/PAN, in-words currency in Nepali ("पन्ध्र हजार रुपैयाँ मात्र") and English ("Fifteen Thousand Rupees Only"), and payment mode tags (Fonepay QR, Cash, Bank Transfer, eSewa/Khalti).

7. **Government CEHRD IEMIS Compatible Export**
   - 1-click export of student records in official Centre for Education and Human Resource Development (CEHRD) CSV format with **UTF-8 Byte Order Mark (BOM)** to prevent Devanagari font corruption in Microsoft Excel and government portals.
   - Standard caste/ethnicity codes (1=Dalit, 2=Janajati, 3=Madhesi, 4=Muslim, 5=Brahmin/Chhetri, 6=Tharu, 7=Other) and disability classification.

8. **Offline Attendance Sync for Mobile Phones & Weak Connectivity**
   - Teachers can toggle **Offline Mode (अफलाइन मोड)** in classrooms with weak or zero internet.
   - Attendance is saved locally in browser queue and synced when connectivity is restored with automatic conflict resolution.
   - Automated guardian SMS absence alerts in Nepali and English.

---

## 👥 User Roles & Demo Login Credentials

The system comes pre-seeded with realistic Nepali institutions and 9 user roles:

| Role | Username | Password | School / Scope | Description |
| :--- | :--- | :--- | :--- | :--- |
| **System Administrator** | `superadmin` | `admin123` | System-wide | Platform owner, school onboarding, tenant suspend/activate |
| **School Administrator** | `admin.shanti` | `admin123` | Shree Shanti Secondary (Community) | Headteacher, full school control, approvals |
| **School Administrator** | `admin.valley` | `admin123` | Kathmandu Valley (Institutional) | Headteacher (Private school tenant) |
| **Teacher** | `teacher.ram` | `teacher123` | Shree Shanti Secondary | Attendance, exam marks entry, timetables |
| **Student** | `student.aarav` | `student123` | Shree Shanti Secondary | View results, schedule, attendance, dues |
| **Parent / Guardian** | `parent.shrestha` | `parent123` | Shree Shanti Secondary | Ward's progress, absence alerts, fee dues |
| **Accountant** | `accountant.sita` | `acc123` | Shree Shanti Secondary | Fee dues, NPR receipt generation, ledgers |
| **Librarian** | `librarian.krishna` | `lib123` | Shree Shanti Secondary | Books catalog, lending, returns, fines |
| **Transport Manager** | `transport.hari` | `trans123` | Shree Shanti Secondary | Bus routes, vehicle number, driver phone |
| **Palika Education Officer** | `palika.lalitpur` | `palika123` | Lalitpur Metropolitan | Oversight across assigned municipal schools |

---

## 📂 Project Architecture

```
School Management/
├── client/                     # Modern React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Sidebar, NepaliDatePicker, PrintableGradeSheet, PrintableReceipt
│   │   ├── utils/              # Translations (Bilingual), NepaliDate (BS/AD), OfflineQueue
│   │   ├── views/              # 12 Modular Views (Dashboard, Students, Attendance, Exams, Finance, etc.)
│   │   ├── App.jsx             # Root application orchestrator & tenant switcher
│   │   └── index.css           # Styling system & standard A4 print media queries
│   └── dist/                   # Production-built bundle
├── server/                     # Express.js REST API Backend
│   ├── db/
│   │   └── database.js         # SQLite schema & seed using Node 24 native DatabaseSync
│   ├── middleware/
│   │   └── auth.js             # JWT, role permissions & row-level tenant_id isolation
│   ├── routes/                 # Modular REST APIs (auth, tenants, students, attendance, exams, etc.)
│   ├── utils/                  # NepaliCalendar (BS<->AD), CDCGrading (2078), NumberToWords, IEMIS
│   └── index.js                # Server entrypoint (serves APIs & client build on port 5000)
├── data/                       # Persistent SQLite database storage
├── tests/
│   └── system.test.js          # Automated verification test suite
└── package.json
```

---

## 🚀 Quickstart & Running the System

### 1. Start the Server
```powershell
npm start
```
The server will start listening on **http://localhost:5000**.
It automatically initializes the SQLite database, runs migrations, seeds initial data, and serves the frontend client.

### 2. Run Automated Verification Tests
```powershell
npm test
```
Executes all 10 unit and integration tests verifying BS dates, CDC 2078 grading, NPR words conversion, multi-tenant isolation, and CEHRD IEMIS CSV generation.

---

## 🏛️ Government References & Compliance
- **Curriculum Development Centre (CDC)**: [moecdc.gov.np](https://moecdc.gov.np/) — Letter Grading Directive 2078
- **Office of the Controller of Examinations (SEE)**: [see.gov.np](https://see.gov.np/)
- **Ministry of Education, CEHRD IEMIS Portal**: [emis.cehrd.gov.np](https://emis.cehrd.gov.np/)
