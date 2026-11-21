# JajaCare: Clinic Management System

A web-based Hospital Management System for the University of Ibadan Health Services (Jaja Clinic).

**Course:** CSC 476 - Semester Project
**Institution:** University of Ibadan, Department of Computer Science
**Semester:** 2025/2026

---

## Live Links

- **Live Web Application (Frontend):** [https://jajacare.vercel.app](https://jajacare.vercel.app)
- **Live API (Backend):** [https://jajacare-backend.onrender.com/api/health](https://jajacare-backend.onrender.com/api/health)
- **Backend Repository:** (https://github.com/luhmmie/jajacare_backend)

**Note for Reviewers:** The backend is hosted on Render's free tier, which sleeps after 15 minutes of inactivity. If the first login attempt takes up to 50 seconds, please be patient as the server wakes up. Subsequent requests will be instant.

---

## Overview

JajaCare is a centralized clinic management system designed to digitize the manual, paper-based workflows at Jaja Clinic. It provides a secure, role-based environment for medical personnel to manage patient registration, triage, consultations, and pharmaceutical dispensing in real-time.

The system eliminates physical paper charts, enforces automated drug-allergy checks, and provides real-time operational analytics to the clinic administration.

---

## Demo Credentials

To test the system, use the following credentials on the login page. Please select the correct "Duty Role" tab that matches the account.

| Role | Staff ID | Password | Dashboard Features |
| :--- | :--- | :--- | :--- |
| Admin | `ADMIN001` | `pass` | Full clinic analytics, staff management, system settings. |
| Doctor | `DOC001` | `pass` | Patient records, consultation charting, e-prescribing. |
| Nurse | `NUR001` | `pass` | Triage queue, vital signs recording, ward management. |
| Receptionist | `REC001` | `pass` | Patient registration, appointment scheduling. |
| Pharmacist | `PHM001` | `pass` | Dispense queue, stock management, drug interaction checks. |

---

## Key Features

- **Role-Based Access Control (RBAC):** Strict separation of duties across 5 distinct medical roles.
- **Digital Patient Registration:** Auto-generates unique Patient IDs (JC-2026-XXXX) and checks for duplicate matric numbers.
- **Clinical Triage & Vitals:** Nurses can record BP, temperature, pulse, and SpO2, which are instantly available to doctors.
- **Consultation & e-Prescribing:** Doctors can view patient history, add diagnoses, and generate electronic prescriptions with automated allergy warnings.
- **Pharmacy Dispensary Sync:** Real-time queue for pharmacists to process prescriptions and update stock.
- **Dashboard Analytics:** Real-time metrics on patient influx, pending consultations, and ward occupancy.

---

## Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- React Router v7
- Recharts
- React Icons

**Backend & Database**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT & Bcrypt

**Deployment**
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---
