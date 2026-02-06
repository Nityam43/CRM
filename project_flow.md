# Website Full Flow and Architecture

## Overview
This is a CRM (Customer Relationship Management) application designed for managing student enquiries, demos, enrollments, and fee payments.

**Tech Stack:**
- **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT)
- **Frontend:** React, Vite, Tailwind CSS, Redux Toolkit, React Router, Axios

---

## Authenticated User Flow

The application is protected and requires authentication for most features.

### 1. Authentication
- **Public Pages:**
  - `/login`: User login page.
  - `/signup`: User registration page.
- **Flow:**
  - User lands on `/login` (default redirect from `*`).
  - Upon successful login (JWT token received), user is redirected to `/dashboard`.
  - Token is stored (likely in localStorage/cookies) and used for subsequent API requests via Axios interceptors.

### 2. Dashboard
- **Route:** `/dashboard`
- **Purpose:** Overview of the system status, key metrics, and quick actions.

### 3. User Management
- **Route:** `/users`
- **Purpose:** List and manage system users (likely admin/staff).
- **Backend Endpoint:** `/user` routes.

### 4. Enquiry Management
Managing initial student interests.
- **Routes:**
  - `/enquiry/add`: Form to add a new enquiry.
  - `/enquiry/list`: List of all active enquiries.
  - `/enquiry/edit/:id`: Edit a specific enquiry.
  - `/enquiry/cancel`: List of cancelled enquiries.
  - `/enquiry/reminders`: Follow-up reminders for enquiries.
- **Backend Endpoint:** `/enquiry` routes.
- **Data Model:** `Enquiry` (Student name, contact, course, status, etc.)

### 5. Demo Class Management
Scheduling and tracking demo classes for students.
- **Routes:**
  - `/demo/list`: List of scheduled demos.
  - `/demo/edit/:id`: Edit demo details.
  - `/demo/cancel`: List of cancelled demos.
  - `/demo/reminders`: Reminders for upcoming or follow-up demos.
- **Backend Endpoint:** `/demo` routes.
- **Data Model:** `Demo` (Linked to Enquiry, Demo date, time, teacher, status)

### 6. Enrollment Management
Converting enquiries/demos into enrolled students.
- **Routes:**
  - `/enroll/add`: Form to enroll a student (likely converts from Enquiry/Demo).
  - `/enroll/list`: List of enrolled students.
  - `/enroll/edit/:id`: Edit enrollment details.
  - `/enroll/cancel`: List of cancelled enrollments.
- **Backend Endpoint:** `/enroll` routes.
- **Data Model:** `Enroll` (Student info, Course fees, Paid fees, Teacher, Status)

### 7. Fees Management
Handling student payments.
- **Routes:**
  - `/fees/list`: Overview of fee status for students.
  - `/fees/pay`: Interface to record a new payment.
  - `/fees/receipt/:enrollNo`: View/Print receipt for a student's payments.
  - `/fees/receipt/:enrollNo/:paymentId`: View/Print a specific transaction receipt.
  - `/fees/history/:enrollNo`: Payment history for a specific student.
- **Backend Endpoint:** `/enroll` routes (Payments are likely embedded in the `Enroll` model or a related `Payment` model).
- **Data Model:** `Payment` schema (embedded in Enroll model: amount, date, type, receipt no).

### 8. Task Management
- **Route:** `/tasks`
- **Purpose:** General task tracking for users.

---

## Backend API Structure
The backend exposes RESTful APIs to support the frontend flow.

- **Auth:** `/auth` (Login, Register)
- **Users:** `/user` (CRUD Users)
- **Enquiries:** `/enquiry` (CRUD Enquiries)
- **List Items:** `/listItem` (Helper for dropdowns/configurations likely)
- **Demos:** `/demo` (CRUD Demos)
- **Enrollments:** `/enroll` (CRUD Enrollments & Payments)

## Database Schema Highlights
- **User:** Username, Email, Password.
- **Enquiry:** Student details, Course, Status (Pending, Demo, Enrolled).
- **Demo:** Linked to Enquiry, Schedule details.
- **Enroll:** Comprehensive student record, Fee structure, Payment history (array of payments).
