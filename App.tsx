import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from './src/store';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const LandingPage = lazy(() => import('./src/pages/LandingPage'));
const LoginPage = lazy(() => import('./src/pages/LoginPage'));
const RegisterPage = lazy(() => import('./src/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./src/pages/ForgotPasswordPage'));
const PublicAttendancePage = lazy(() => import('./src/pages/PublicAttendancePage'));
const DashboardLayout = lazy(() => import('./src/components/DashboardLayout'));
const DashboardHome = lazy(() => import('./src/pages/dashboard/DashboardHome'));
const MembersPage = lazy(() => import('./src/pages/dashboard/MembersPage'));
const AttendanceManagement = lazy(() => import('./src/pages/dashboard/AttendanceManagement'));
const ModulePage = lazy(() => import('./src/pages/dashboard/ModulePage'));

function Loading() {
  return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/attendance" element={<PublicAttendancePage />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="attendance" element={<AttendanceManagement />} />
            <Route path="classes" element={<ModulePage />} />
            <Route path="reports" element={<ModulePage />} />
            <Route path="settings" element={<ModulePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
