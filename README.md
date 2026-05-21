<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

# 🏢 CRM — Customer Relationship Management System

> A full-stack, production-grade CRM platform engineered for **Simba Infotech & Institute LLP** to digitize and streamline the entire student lifecycle — from initial enquiry through enrollment, fee collection, and financial reporting.

🔗 **Live Demo:** [crm-bu7r.onrender.com](https://crm-bu7r.onrender.com)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Student Lifecycle Pipeline](#-student-lifecycle-pipeline)
- [Module Breakdown](#-module-breakdown)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Author](#-author)

---

## 🎯 Overview

This CRM system was developed during my internship at **Simba Infotech** to replace manual, spreadsheet-based student tracking with an intelligent, automated platform. The system manages the complete student journey — **Enquiry → Demo → Enrollment → Fees** — with real-time data synchronization across all modules, automated reminder workflows, and comprehensive financial tracking including GST-compliant invoicing.

### Problem Statement
The institute was managing hundreds of student records, fee payments, and follow-up reminders across disconnected spreadsheets, leading to data inconsistencies, missed follow-ups, and revenue leakage.

### Solution
A centralized, role-based CRM platform that automates the student pipeline, enforces data integrity through cross-document synchronization, and provides real-time dashboards for business intelligence.

---

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based authentication with dual-mode support (HTTP-only cookies + Bearer tokens)
- Password hashing with bcrypt (salt rounds: 10)
- Protected route middleware with server-side token verification on every navigation
- Secure cookie configuration (httpOnly, SameSite strict, Secure in production)

### 📊 Real-Time Dashboard
- 7 live statistical cards with at-a-glance KPIs (Enquiries, Demos, Enrollments, Fees)
- Color-coded metrics for active vs. cancelled records
- One-click navigation to any module from the dashboard

### 📝 Enquiry Management
- Comprehensive 15+ field enquiry capture form
- Dynamic, API-driven dropdown lists (Reference, Area, Hobbies, Interest, Counsellor, Course)
- Inline list item creation via modal — add new dropdown options without leaving the form
- Enquiry rating system (1–10 scale) for lead prioritization
- One-click "Move to Demo" pipeline transition
- Automated reminder tracking with sidebar badge notifications

### 🎓 Demo Class Management
- Seamless demo scheduling linked to parent enquiry records
- Bidirectional data synchronization — updates propagate to linked Enquiry and Enrollment records
- Status lifecycle tracking: `Demo → Enrolled | Cancelled`
- Cancellation cascade logic — cancelling a demo updates the parent enquiry status

### 📚 Enrollment Management
- Intelligent duplicate enrollment prevention (priority-based: linked ID check → name+course fallback)
- Auto-generated enrollment numbers (zero-padded, sequential: 0001, 0002, ...)
- Pre-populated forms via `location.state` data passthrough from Demo/Enquiry modules
- Placement status tracking (Pending / Placement / Not-required)
- Cross-document sync: enrollment updates propagate to linked Demo and Enquiry records

### 💰 Fees & Financial Management
- Multi-installment fee payment tracking with per-payment metadata
- Support for multiple payment methods: **Cash, Cheque, Online** with conditional fields
- **GST-compliant invoicing** with automated SGST (9%) and CGST (9%) back-calculation
- Printable, branded fee receipts with `window.print()` integration and dedicated print stylesheet
- Complete payment history view per student with installment numbering
- Fee reminder system with sidebar notification badges
- Real-time pending/paid fee recalculation on payment add/delete

### 📈 Income & Expense Tracking
- Financial overview dashboard with 3 KPI cards: Total Income, Total Expenses, Net Profit
- Full expense CRUD with categorization and payment method tracking
- Paginated expense table (10 records/page) with search functionality
- Income auto-derived from enrollment fee payments

### 📋 Work & Task Management
- Task creation with assignee and reminder date tracking
- Status lifecycle: `Pending → Completed | Cancelled`
- Dedicated reminder page with "Mark as Done" quick-action

### 🗑️ Three-Tier Soft Delete System
- **Soft delete** → items move to trash (recoverable)
- **Restore** → items return to active state
- **Permanent delete** → irreversible removal
- Dedicated Trash/DND page for managing soft-deleted records across all modules

### 🎨 UI/UX Excellence
- **Dark/Light mode** with localStorage persistence and instant toggle
- **Fully responsive design** — card-based mobile views, data tables on desktop (breakpoint: 768px)
- **Animated page transitions** via Framer Motion (fade + slide, 300ms easeInOut)
- **Collapsible sidebar** with hover-expand, tooltips, and active route highlighting
- **Live reminder badges** on sidebar with real-time counts for Enquiry, Demo, Fees, and Work
- **Communication shortcuts** — one-tap WhatsApp, SMS, and Phone call links from contact cards

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4 |
| **State Management** | Redux Toolkit with cross-slice synchronization |
| **Animations** | Framer Motion |
| **Routing** | React Router DOM v7 |
| **Icons** | FontAwesome 7, Heroicons v2 |
| **Responsive** | react-responsive (useMediaQuery) |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB with Mongoose 9 ODM |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **HTTP Client** | Axios with interceptors |
| **Deployment** | Render (Full-stack) |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT (React SPA)                   │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌─────────┐ │
│  │  Pages  │→ │Components│→ │Redux Store│→ │  Thunks │ │
│  └─────────┘  └──────────┘  └───────────┘  └────┬────┘ │
│                                                  │      │
│  ┌──────────────────────────────────────────────┐│      │
│  │  Axios Instance (interceptors, auth headers) ││      │
│  └──────────────────────────────────────────┬───┘│      │
└─────────────────────────────────────────────┼────┘      │
                                              │ HTTP/REST │
┌─────────────────────────────────────────────┼───────────┘
│                   SERVER (Express)          │            │
│  ┌────────────┐  ┌────────────┐  ┌─────────▼──────────┐│
│  │ Auth       │→ │ Routes     │→ │   Controllers      ││
│  │ Middleware │  │ (8 groups) │  │   (Business Logic)  ││
│  └────────────┘  └────────────┘  └─────────┬──────────┘│
│                                            │           │
│  ┌─────────────────────────────────────────▼──────────┐│
│  │         Mongoose ODM (7 Models/Schemas)            ││
│  └─────────────────────────────────────────┬──────────┘│
└────────────────────────────────────────────┼───────────┘
                                             │
┌────────────────────────────────────────────▼───────────┐
│                    MongoDB Atlas                       │
│  Collections: users, enquiries, demos, enrolls,       │
│               expenses, works, listitems              │
└───────────────────────────────────────────────────────┘
```

---

## 🔄 Student Lifecycle Pipeline

```
  ┌──────────┐     Move to Demo     ┌──────────┐      Enroll       ┌──────────────┐     Pay Fees     ┌──────────┐
  │ ENQUIRY  │ ──────────────────► │   DEMO   │ ─────────────────► │  ENROLLMENT  │ ───────────────► │   FEES   │
  │          │                      │          │                    │              │                  │          │
  │ • Capture│                      │ • Schedule│                   │ • Register   │                  │ • Collect│
  │ • Rate   │                      │ • Track  │                    │ • Assign     │                  │ • Receipt│
  │ • Remind │                      │ • Follow │                    │ • Track      │                  │ • GST    │
  └────┬─────┘                      └────┬─────┘                    └──────┬───────┘                  └──────────┘
       │                                 │                                 │
       │         ┌───────────┐           │          ┌───────────┐          │
       └────────►│ CANCELLED │◄──────────┘          │ CANCELLED │◄─────────┘
                 │ (Restore) │                      │ (Restore) │
                 └───────────┘                      └───────────┘

  ★ Bidirectional data sync across all linked records at every stage
```

---

## 📦 Module Breakdown

| Module | Frontend Pages | Backend Endpoints | Key Capabilities |
|--------|---------------|-------------------|-------------------|
| **Auth** | Login, Signup | 2 (POST) | JWT login, bcrypt registration |
| **Enquiry** | 5 pages | 11 endpoints | CRUD, cancel/restore, reminders, move-to-demo |
| **Demo** | 4 pages | 10 endpoints | CRUD, cancel/restore, reminders, cascade logic |
| **Enrollment** | 4 pages | 13 endpoints | CRUD, duplicate prevention, cancel/restore, fees |
| **Fees** | 5 pages | 3 endpoints | Pay, receipt, history, GST, reminders |
| **Work** | 3 pages | 8 endpoints | CRUD, reminders, status lifecycle |
| **Expense** | 1 page + modal | 4 endpoints | CRUD, categorization, income/expense dashboard |
| **Users** | 1 page | 2 endpoints | User list, profile |

**Total: 25+ frontend pages/views · 50+ RESTful API endpoints · 7 database models**

---

## 🗄️ Database Schema

### Core Models

```
User
├── username (String, unique)
├── email (String, unique)
└── password (String, hashed)

Enquiry
├── studentName, email (unique), gender, birthDate
├── firstMobile, secondMobile
├── leadDate, visitingDate, age
├── education, currentWorking, relationStatus
├── reference, area, hobbies, interest
├── reminderDate, enquiryRating (1-10)
├── counsellor, note
├── status (default: "Enquiry")
└── isDeleted (soft delete)

Demo
├── studentName, contact, course, reference
├── leadDate, time, reminder, note
├── status (Demo | Enrolled | Cancelled)
├── enquiryId → ref Enquiry
└── isDeleted (soft delete)

Enroll
├── studentName, email, contact, course
├── enrollNo (unique, auto-generated)
├── enrollDate, courseFees, totalFees
├── paidFees, pendingFees (auto-calculated)
├── teacherName, time, placementStatus
├── status, reason (cancellation)
├── payments[] → embedded Payment subdocs
├── demoId → ref Demo
├── enquiryId → ref Enquiry
└── isDeleted (soft delete)

  Payment (embedded in Enroll)
  ├── amount, paymentDate, paymentType
  ├── note, gstNo
  ├── reminderDate (next payment)
  ├── bankName, chequeNo, chequeDate
  └── (auto-generated _id)

Expense
├── name, category, amount
├── paymentMethod (Cash/Online/Cheque/Other)
├── date, note
└── createdBy → ref User

Work
├── workName, personName, reminderDate
├── details, status (Pending/Completed/Cancelled)
└── isDeleted (soft delete)

ListItem
├── name (String)
└── type (Reference/Area/Hobbies/Interest/Counsellor/Course)
```

---

## 🔌 API Endpoints

<details>
<summary><strong>Authentication</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login with credentials |

</details>

<details>
<summary><strong>Users</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/me` | Get current user profile |
| POST | `/user/logout` | Logout user |

</details>

<details>
<summary><strong>Enquiry Management</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/enquiry/` | List all enquiries |
| POST | `/enquiry/` | Create new enquiry |
| GET | `/enquiry/:id` | Get enquiry by ID |
| PUT | `/enquiry/:id` | Update enquiry |
| DELETE | `/enquiry/:id` | Soft delete enquiry |
| PATCH | `/enquiry/cancel/:id` | Cancel enquiry |
| PATCH | `/enquiry/restore/:id` | Restore cancelled |
| GET | `/enquiry/status/:status` | Filter by status |
| GET | `/enquiry/deleted/all` | List deleted |
| PUT | `/enquiry/restore/deleted/:id` | Restore deleted |
| DELETE | `/enquiry/force/:id` | Permanent delete |

</details>

<details>
<summary><strong>Demo Management</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/demo/` | List all demos |
| POST | `/demo/` | Create demo |
| GET | `/demo/:id` | Get demo by ID |
| PUT | `/demo/:id` | Update demo |
| DELETE | `/demo/:id` | Soft delete |
| PATCH | `/demo/cancel/:id` | Cancel demo |
| PATCH | `/demo/restore/:id` | Restore cancelled |
| GET | `/demo/deleted/all` | List deleted |
| PUT | `/demo/restore/deleted/:id` | Restore deleted |
| DELETE | `/demo/force/:id` | Permanent delete |

</details>

<details>
<summary><strong>Enrollment & Fees</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/enroll/` | List all enrollments |
| POST | `/enroll/` | Create enrollment |
| GET | `/enroll/:id` | Get by ID |
| GET | `/enroll/enrollno/:enrollNo` | Get by enrollment number |
| PUT | `/enroll/:id` | Update enrollment |
| DELETE | `/enroll/:id` | Soft delete |
| POST | `/enroll/fees/:id` | Add fee payment |
| DELETE | `/enroll/fees/:id/:paymentId` | Delete payment |
| PATCH | `/enroll/cancel/:id` | Cancel enrollment |
| PATCH | `/enroll/restore/:id` | Restore cancelled |
| GET | `/enroll/deleted/all` | List deleted |
| PUT | `/enroll/restore/deleted/:id` | Restore deleted |
| DELETE | `/enroll/force/:id` | Permanent delete |

</details>

<details>
<summary><strong>Work, Expense & List Items</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/work/` | Create work task |
| GET | `/work/` | List all tasks |
| PUT | `/work/:id` | Update task |
| DELETE | `/work/:id` | Soft delete task |
| GET | `/expense/` | List expenses |
| POST | `/expense/` | Create expense |
| PUT | `/expense/:id` | Update expense |
| DELETE | `/expense/:id` | Delete expense |
| POST | `/listItem/add` | Add dropdown item |
| GET | `/listItem/list` | Get dropdown items |

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas cluster)
- **npm** v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Nityam43/CRM.git
cd CRM

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Development

```bash
# Terminal 1 — Start backend server (port 3000)
cd backend
npm start

# Terminal 2 — Start frontend dev server (port 5173)
cd frontend
npm start
```

### Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# The built files are served by Express from ../public
```

---

## 🔧 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/crm
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## 📁 Project Structure

```
CRM/
├── backend/
│   ├── server.js                     # Entry point — DB connect & listen on :3000
│   ├── package.json
│   └── src/
│       ├── app.js                    # Express app config, CORS, routes
│       ├── config/                   # Configuration
│       ├── db/
│       │   └── db.js                 # MongoDB connection
│       ├── middleware/
│       │   └── authMiddleware.js     # JWT verification middleware
│       ├── models/
│       │   ├── user.model.js         # User schema
│       │   ├── enquiry.model.js      # Enquiry schema
│       │   ├── demo.model.js         # Demo schema
│       │   ├── enroll.model.js       # Enrollment + Payment schema
│       │   ├── expense.model.js      # Expense schema
│       │   ├── work.model.js         # Work/Task schema
│       │   └── listItem.model.js     # Dynamic dropdown schema
│       ├── controllers/
│       │   ├── auth.controller.js    # Register & Login logic
│       │   ├── enquiry.controller.js # Enquiry CRUD + pipeline logic
│       │   ├── demo.controller.js    # Demo CRUD + cascade logic
│       │   ├── enroll.controller.js  # Enrollment + Fees logic (412 lines)
│       │   ├── expense.controller.js # Expense CRUD
│       │   ├── work.controller.js    # Work/Task CRUD
│       │   ├── user.controller.js    # User profile
│       │   └── listItem.controller.js# Dropdown items
│       └── routes/
│           ├── auth.routes.js
│           ├── enquiry.routes.js
│           ├── demo.routes.js
│           ├── enroll.routes.js      # 13 endpoints (most complex)
│           ├── expense.routes.js
│           ├── work.routes.js
│           ├── user.routes.js
│           └── listItem.routes.js
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx                  # React entry point
│       ├── App.jsx                   # Theme provider + router
│       ├── ThemeContext.jsx           # Dark/Light mode context
│       ├── index.css                 # Global styles + Tailwind
│       ├── print.css                 # Print-specific styles
│       ├── api/
│       │   └── axios.js              # Axios instance + interceptors
│       ├── redux/
│       │   ├── store.js              # Redux store (7 slices)
│       │   ├── thunks.js             # 42+ async thunks
│       │   └── slices/
│       │       ├── authSlice.js
│       │       ├── enquirySlice.js   # Cross-slice sync
│       │       ├── demoSlice.js      # Cross-slice sync
│       │       ├── enrollSlice.js    # Cross-slice sync
│       │       ├── feesSlice.js
│       │       ├── workSlice.js
│       │       └── expenseSlice.js
│       ├── routes/
│       │   └── Mainroutes.jsx        # 25+ routes with AnimatePresence
│       ├── components/
│       │   ├── Layout.jsx            # App shell with sidebar
│       │   ├── Sidebar.jsx           # 871-line navigation (largest component)
│       │   ├── Login.jsx             # Authentication UI
│       │   ├── Signup.jsx            # Registration UI
│       │   ├── ProtectedRoute.jsx    # Auth guard
│       │   ├── PageTransition.jsx    # Framer Motion wrapper
│       │   ├── EnquiryCard.jsx       # Mobile enquiry card
│       │   ├── DemoCard.jsx          # Mobile demo card
│       │   ├── EnrollCard.jsx        # Mobile enrollment card
│       │   ├── FeesCard.jsx          # Mobile fees card with GST
│       │   ├── CancelCard.jsx        # Cancelled record cards
│       │   ├── AddExpenseModal.jsx    # Expense form modal
│       │   ├── AddListItemModal.jsx  # Dynamic dropdown modal
│       │   └── ...ReminderCards      # Reminder card components
│       └── pages/
│           ├── Dashboard.jsx         # KPI dashboard
│           ├── Enquiry/              # 5 pages
│           ├── Demo/                 # 4 pages
│           ├── Enroll/               # 4 pages
│           ├── Fees/                 # 5 pages
│           ├── Work/                 # 3 pages
│           ├── IncomeExpense/        # 1 page
│           ├── UsersList.jsx
│           ├── Tasks.jsx
│           └── DNDList.jsx           # Trash management
│
└── project_flow.md                   # Architecture documentation
```

---

## 👤 Author

**Nityam Savaliya**
- Developed during internship at **Simba Infotech & Institute LLP**
- GitHub: [@Nityam43](https://github.com/Nityam43)

---

<p align="center">
  Built with ❤️ during my internship at Simba Infotech
</p>
