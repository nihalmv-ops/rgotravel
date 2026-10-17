import { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaCheckCircle,
  FaSync,
  FaShieldAlt,
  FaTimes
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function TopNavbar({ onMenuClick, title }) {
  const { adminUser } = useAdminAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sampleNotifications = [
    { id: 1, title: "New booking request #BK-8044 received", time: "10 mins ago", unread: true },
    { id: 2, title: "Payment confirmed for Booking #BK-8041", time: "1 hour ago", unread: false },
    { id: 3, title: "Bali Tropical Adventure package updated", time: "2 hours ago", unread: false }
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700"
        >
          <FaBars />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white capitalize">
            {title || "Dashboard"}
          </h1>
          <p className="hidden sm:block text-[11px] text-slate-400">
            GoTravel Enterprise Administrative Dashboard
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications, Status, Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
          <FaSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search tours, users, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-200 placeholder-slate-400 w-44"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="text-slate-400 hover:text-white">
              <FaTimes className="text-[10px]" />
            </button>
          )}
        </div>

        {/* Sync Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Sync</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition-colors relative cursor-pointer"
          >
            <FaBell className="text-sm" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
                <span className="font-bold text-white">Notifications</span>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    toast.info("All marked as read");
                  }}
                  className="text-[10px] text-sky-400 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <div className="space-y-2">
                {sampleNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      notif.unread
                        ? "bg-slate-800/80 border-sky-500/30 text-white"
                        : "bg-slate-800/20 border-slate-800 text-slate-400"
                    }`}
                  >
                    <p className="font-semibold text-slate-200">{notif.title}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-sky-500/30">
            {adminUser?.name?.slice(0, 2) || "AD"}
          </div>
          <span className="hidden sm:block text-xs font-bold text-white truncate max-w-[100px]">
            {adminUser?.name?.split(" ")[0] || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}

