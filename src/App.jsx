import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAdminAuth } from "./context/AdminAuthContext";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Bookings from "./pages/Bookings/Bookings";
import Destinations from "./pages/Destinations/Destinations";
import Packages from "./pages/Packages/Packages";
import Users from "./pages/Users/Users";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";

function ProtectedLayout({ children, title }) {
  const { isAuthenticated } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNavbar onMenuClick={() => setMobileOpen(true)} title={title} />
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/":
        return "Executive Dashboard";
      case "/bookings":
        return "Bookings & Reservations";
      case "/destinations":
        return "Destinations Catalog";
      case "/packages":
        return "Tour Packages Management";
      case "/users":
        return "User & Customer Directory";
      case "/analytics":
        return "Financial & Trend Analytics";
      case "/settings":
        return "System Settings";
      default:
        return "Admin Portal";
    }
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedLayout title={getPageTitle(location.pathname)}>
              <Dashboard />
            </ProtectedLayout>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedLayout title={getPageTitle(location.pathname)}>
              <Bookings />
            </ProtectedLayout>
          }
        />

        <Route
          path="/destinations"
          element={
            <ProtectedLayout title={getPageTitle(location.pathname)}>
              <Destinations />
            </ProtectedLayout>
          }
        />

        <Route
          path="/packages"
          element={
            <ProtectedLayout title={getPageTitle(location.pathname)}>
              <Packages />
            </ProtectedLayout>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedLayout title={getPageTitle(location.pathname)}>
              <Users />
            </ProtectedLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedLayout title={getPageTitle(location.pathname)}>
              <Analytics />
            </ProtectedLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedLayout title={getPageTitle(location.pathname)}>
              <Settings />
            </ProtectedLayout>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

