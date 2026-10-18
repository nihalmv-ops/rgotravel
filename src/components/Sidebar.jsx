import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSuitcase,
  FaMapMarkedAlt,
  FaBoxOpen,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaPlane,
  FaTimes,
  FaExternalLinkAlt,
  FaShieldAlt
} from "react-icons/fa";
import { useAdminAuth } from "../context/AdminAuthContext";

const navItems = [
  { path: "/", label: "Dashboard", icon: FaTachometerAlt },
  { path: "/bookings", label: "Bookings", icon: FaSuitcase },
  { path: "/destinations", label: "Destinations", icon: FaMapMarkedAlt },
  { path: "/packages", label: "Tour Packages", icon: FaBoxOpen },
  { path: "/users", label: "Users & Travelers", icon: FaUsers },
  { path: "/analytics", label: "Analytics", icon: FaChartLine },
  { path: "/settings", label: "System Settings", icon: FaCog }
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
              <FaPlane className="text-lg -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-lg tracking-tight">GoTravel</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-sky-500/20 text-sky-400 border border-sky-500/30">PRO</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                Admin Console
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`
                }
              >
                <Icon className="text-base text-sky-400 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Client Web Link & Profile Card */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <a
            href={
              typeof window !== "undefined" && window.location.hostname === "localhost"
                ? "http://localhost:5173"
                : "https://rgotravel.vercel.app"
            }
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FaExternalLinkAlt className="text-[11px]" />
              <span>View Live Website</span>
            </span>
            <span className="text-[10px] text-sky-300 font-mono">Live</span>
          </a>

          {/* User profile info & logout */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {adminUser?.name?.slice(0, 2) || "AD"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {adminUser?.name || "Admin"}
                </p>
                <p className="text-[10px] text-sky-400 font-semibold truncate">
                  {adminUser?.role || "Super Admin"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

