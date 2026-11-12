# GymPro ERP & Management System 🏋️‍♂️

A comprehensive, production-ready SaaS ERP and Gym Management platform built with **React 19**, **TypeScript**, **Vite**, **Material UI (MUI v7)**, and **Redux Toolkit**.

---

## 🌟 Key Features & Modules

### 1. 🌐 Public Landing Page
- **Hero & Value Proposition**: Modern responsive design with Arabic/English RTL support.
- **Feature Showcase**: Clear breakdown of gym operations, POS, scheduling, and staff monitoring.
- **Pricing Plans**: Tiered subscription plans (Basic, Professional, Enterprise).
- **Contact & Inquiry Form**: Direct communication and location details.
- **Quick Links**: Fast navigation to Login, Registration, and the Public Attendance Kiosk.

### 2. 🔐 Authentication System
- **Sign In / Sign Up**: Role-based signup (Member, Captain, Employee) with input validation.
- **Google SSO**: One-click authentication with Google.
- **Forgot Password**: Password reset recovery flow with user feedback.
- **Route Protection**: Automated guards preventing unauthorized access to executive dashboards.

### 3. 🕒 Public Attendance Kiosk (`/attendance`)
- **Self-Service Kiosk**: Designed for tablet/front-desk check-in without requiring admin access.
- **Live Digital Clock**: Real-time Arabic/English synchronized time display.
- **Member Check-in**: Fast check-in by Member ID or Phone number.
- **Staff & Captain Check-in / Check-out**: Shift attendance tracking (Check-in and Check-out buttons).
- **Recent Feed**: Live visual feed of today's check-ins with status badges.

### 4. 📊 Staff & Captain Attendance Management (`/dashboard/attendance`)
- **Real-Time KPIs**: Track Today's Present, Late Arrivals, Absences, and Leaves/Permissions.
- **Shift Tracking**: Day and Night shift monitoring with calculated late minutes.
- **Status Categorization**: Present, Late, Absent, Sick Leave, Annual Leave, Permissions, and Day-offs.
- **Leave Request Management**: Modal dialog to record and approve annual leaves, sick leaves, and short permissions.
- **Filtering & Search**: Filter by Date, Staff Type (Captain/Employee), Shift (Day/Night), and Attendance Status.

### 5. 🏢 Executive Dashboard & Operations
- **Members Management**: Search, register new members, membership status tracking (Active, Expiring, Frozen), and branch assignments.
- **Analytics & Revenue**: Branch utilization metrics, revenue performance bars, and visit counts.
- **Bilingual Support (i18n)**: Seamless Arabic (RTL) and English (LTR) language switching.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **UI Library**: [Material UI (MUI v7)](https://mui.com/) with `@emotion/react` & `@emotion/styled`
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Internationalization**: [i18next](https://www.i18next.com/) & `react-i18next`
- **Notifications**: [react-hot-toast](https://react-hot-toast.com/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ahmedeid-dev/gymOS.git

# Navigate to project directory
cd gymOS

# Switch to branch 1.1.0
git checkout 1.1.0

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build & Verification

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
├── App.tsx                     # Main application routing & protected route wrappers
├── index.html                  # HTML entry point
├── index.css                   # Global styles & custom animations
├── src/
│   ├── components/
│   │   └── DashboardLayout.tsx # Responsive sidebar navigation and header
│   ├── pages/
│   │   ├── LandingPage.tsx     # Public landing page
│   │   ├── LoginPage.tsx       # Sign in with email/pass and Google
│   │   ├── RegisterPage.tsx    # User registration with roles
│   │   ├── ForgotPasswordPage.tsx # Password recovery
│   │   ├── PublicAttendancePage.tsx # Front-desk kiosk for members & staff
│   │   └── dashboard/
│   │       ├── DashboardHome.tsx        # Overview analytics & stats
│   │       ├── MembersPage.tsx          # Member directory & enrollment
│   │       ├── AttendanceManagement.tsx # Staff shifts, leaves & tardiness tracking
│   │       └── ModulePage.tsx           # Generic modules (Classes, Reports, Settings)
│   ├── store.ts                # Redux store (Auth, Members, Staff & Attendance slices)
│   ├── theme.ts                # Custom MUI theme (Colors, Typography & Shape)
│   ├── i18n.ts                 # Arabic & English localization resources
│   └── main.tsx                # React root bootstrap & providers
```

---

## 📄 License

Private repository - All rights reserved.
