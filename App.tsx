import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from './pages/student/StudentLayout';
import AboutPage from './pages/student/AboutPage';
import FacilitiesPage from './pages/student/FacilitiesPage';
import RegistrationPage from './pages/student/RegistrationPage';
import LocationPage from './pages/student/LocationPage';
// AdminLogin and other login pages are now deprecated in favor of LandingPage
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import StudentListPage from './pages/admin/StudentListPage';
import FeePendingPage from './pages/admin/FeePendingPage';
import RoomsPage from './pages/admin/RoomsPage';
import ComplaintsPage from './pages/admin/ComplaintsPage';
import AttendancePage from './pages/admin/AttendancePage';
import { useAppContext } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import PhotoGalleryPage from './pages/student/PhotoGalleryPage';
import ContactPage from './pages/student/ContactPage'; // Renamed from WardenProfilePage
import MessagesPage from './pages/admin/MessagesPage';
import ApplicationsPage from './pages/admin/ApplicationsPage';
import OfflineRegistrationPage from './pages/admin/OfflineRegistrationPage'; // New admin page
import WardenProfileSettingsPage from './pages/admin/WardenProfileSettingsPage'; // New admin page

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminLoggedIn } = useAppContext();
  return isAdminLoggedIn ? <>{children}</> : <Navigate to="/" />;
};


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Main Landing/Login Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Student Portal Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="about" />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="facilities" element={<FacilitiesPage />} />
          <Route path="gallery" element={<PhotoGalleryPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="students" element={<StudentListPage />} />
          <Route path="fees" element={<FeePendingPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="offline-registration" element={<OfflineRegistrationPage />} />
          <Route path="warden-settings" element={<WardenProfileSettingsPage />} />
        </Route>

        {/* Redirect any old, deprecated login routes */}
        <Route path="/admin/login" element={<Navigate to="/" />} />
        <Route path="/admin/login-system" element={<Navigate to="/" />} />
        <Route path="/admin/portal" element={<Navigate to="/" />} />
        <Route path="/admin/prathap-portal" element={<Navigate to="/" />} />
        <Route path="/admin/dashboard-login" element={<Navigate to="/" />} />
        <Route path="/admin/secure-login" element={<Navigate to="/" />} />

      </Routes>
    </HashRouter>
  );
}

export default App;