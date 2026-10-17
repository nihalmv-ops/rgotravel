import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaDollarSign,
  FaSuitcase,
  FaMapMarkedAlt,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaStar,
  FaCheck,
  FaTimes,
  FaClock,
  FaArrowRight,
  FaDownload,
  FaSync
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  INITIAL_BOOKINGS,
  INITIAL_DESTINATIONS,
  INITIAL_PACKAGES,
  INITIAL_USERS
} from "../../data/mockData";

export default function Dashboard() {
  // Load data from localStorage or defaults
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_BOOKINGS;
  });

  const destinations = useMemo(() => {
    const saved = localStorage.getItem("admin_destinations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_DESTINATIONS;
  }, []);

  const users = useMemo(() => {
    const saved = localStorage.getItem("admin_users");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_USERS;
  }, []);

  // Update booking status
  const handleUpdateStatus = (id, newStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    toast.success(`Booking ${id} marked as ${newStatus}`);
  };

  // Metrics
  const totalRevenue = useMemo(() => {
    return bookings
      .filter((b) => b.status === "Confirmed")
      .reduce((acc, b) => {
        const val = Number(String(b.amount || b.price || "0").replace(/[^0-9.-]+/g, ""));
        return acc + (isNaN(val) ? 0 : val);
      }, 0);
  }, [bookings]);

  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const cancelledCount = bookings.filter((b) => b.status === "Cancelled").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-sky-950/60 border border-blue-500/20 p-6 sm:p-8">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-sky-500/20 text-sky-400 border border-sky-500/30">
            Enterprise Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome to GoTravel Admin
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time control over travel catalog, live reservations, client accounts, and revenue.
          </p>
        </div>

        {/* Ambient decorative circle */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Revenue */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <FaDollarSign className="text-lg" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            <FaChartLine />
            <span>+18.4% from last month</span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-2xl p-6 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <FaSuitcase className="text-lg" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {bookings.length}
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">{confirmedCount} Active</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{pendingCount} Pending</span>
          </div>
        </div>

        {/* Destinations */}
        <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Destinations
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <FaMapMarkedAlt className="text-lg" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {destinations.length}
          </div>
          <div className="mt-2 text-xs text-indigo-300 font-semibold">
            Across 6+ Countries
          </div>
        </div>

        {/* Users */}
        <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Travelers
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <FaUsers className="text-lg" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {users.length}
          </div>
          <div className="mt-2 text-xs text-amber-300 font-semibold">
            Registered customer accounts
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Bookings & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Recent Bookings
              </h3>
              <p className="text-xs text-slate-400">
                Latest client reservations needing review or fulfillment
              </p>
            </div>
            <Link
              to="/bookings"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <span>View All</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-3 font-semibold">Ref</th>
                  <th className="pb-3 font-semibold">Traveler</th>
                  <th className="pb-3 font-semibold">Tour</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-sky-400 text-xs">
                      {b.id}
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-white truncate max-w-[130px]">
                        {b.customer || b.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[130px]">
                        {b.email}
                      </p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-semibold text-slate-200 truncate max-w-[150px]">
                        {b.tour || b.title || b.destination}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {b.travelDate || b.date}
                      </p>
                    </td>
                    <td className="py-3.5 font-bold text-emerald-400">
                      {b.amount || b.price}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                          b.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : b.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      {b.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleUpdateStatus(b.id, "Confirmed")}
                            title="Approve"
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors cursor-pointer"
                          >
                            <FaCheck className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(b.id, "Cancelled")}
                            title="Cancel"
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Status Breakdown & Popular Tours */}
        <div className="space-y-6">
          {/* Booking Status Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              Booking Distribution
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-emerald-400">Confirmed ({confirmedCount})</span>
                  <span className="text-white">
                    {Math.round((confirmedCount / (bookings.length || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(confirmedCount / (bookings.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-amber-400">Pending Review ({pendingCount})</span>
                  <span className="text-white">
                    {Math.round((pendingCount / (bookings.length || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${(pendingCount / (bookings.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-rose-400">Cancelled ({cancelledCount})</span>
                  <span className="text-white">
                    {Math.round((cancelledCount / (bookings.length || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${(cancelledCount / (bookings.length || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Popular Destinations Widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Top Destinations</h3>
              <Link to="/destinations" className="text-xs font-bold text-sky-400 hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              {destinations.slice(0, 3).map((d) => (
                <div key={d.id} className="flex items-center gap-3">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{d.name}</p>
                    <p className="text-[11px] text-slate-400">{d.country}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-sky-400 block">{d.price}</span>
                    <span className="text-[10px] text-amber-400 font-bold flex items-center justify-end gap-1">
                      <FaStar className="text-[9px]" /> {d.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
