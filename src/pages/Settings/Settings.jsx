import { useState } from "react";
import { FaSave, FaExclamationTriangle, FaDownload, FaSync } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  INITIAL_BOOKINGS,
  INITIAL_DESTINATIONS,
  INITIAL_PACKAGES,
  INITIAL_USERS
} from "../../data/mockData";

export default function Settings() {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      appName: "GoTravel",
      supportEmail: "support@gotravel.com",
      supportPhone: "+1 (800) 555-GO-TRAVEL",
      currency: "USD ($)",
      autoApprove: true,
      maintenanceMode: false,
      notificationsEmail: true,
      webhookUrl: "https://api.gotravel.com/webhooks/v1"
    };
  });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("gotravel_admin_settings", JSON.stringify(config));
    toast.success("System configuration saved successfully!");
  };

  const handleBackupExport = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      config,
      destinations: JSON.parse(localStorage.getItem("admin_destinations") || "[]"),
      packages: JSON.parse(localStorage.getItem("admin_packages") || "[]"),
      bookings: JSON.parse(localStorage.getItem("bookings") || "[]"),
      users: JSON.parse(localStorage.getItem("admin_users") || "[]")
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `gotravel_backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("JSON database backup downloaded!");
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        "DANGER: This action will restore all destinations, packages, bookings, and users to their original demo state. Continue?"
      )
    ) {
      localStorage.setItem("admin_destinations", JSON.stringify(INITIAL_DESTINATIONS));
      localStorage.setItem("admin_packages", JSON.stringify(INITIAL_PACKAGES));
      localStorage.setItem("bookings", JSON.stringify(INITIAL_BOOKINGS));
      localStorage.setItem("admin_users", JSON.stringify(INITIAL_USERS));
      toast.success("Factory defaults restored successfully!");
    }
  };

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Admin System Settings
        </h2>
        <p className="text-xs text-slate-400">
          Global brand settings, currency preferences, notification hooks, and database backups.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-2">
          General Brand Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Application Name
            </label>
            <input
              type="text"
              value={config.appName}
              onChange={(e) => setConfig({ ...config, appName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Base Currency
            </label>
            <select
              value={config.currency}
              onChange={(e) => setConfig({ ...config, currency: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
              <option value="INR (₹)">INR (₹)</option>
              <option value="AED (د.إ)">AED (د.إ)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Support Desk Email
            </label>
            <input
              type="email"
              value={config.supportEmail}
              onChange={(e) => setConfig({ ...config, supportEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Customer Support Hotline
            </label>
            <input
              type="text"
              value={config.supportPhone}
              onChange={(e) => setConfig({ ...config, supportPhone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-sky-400"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-2 pt-4">
          Automation & Operations
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div>
              <p className="text-sm font-bold text-white">Auto-Confirm Bookings</p>
              <p className="text-xs text-slate-400">
                Immediately mark paid reservations as Confirmed without manager approval
              </p>
            </div>
            <input
              type="checkbox"
              checked={config.autoApprove}
              onChange={(e) => setConfig({ ...config, autoApprove: e.target.checked })}
              className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div>
              <p className="text-sm font-bold text-white">Maintenance Mode</p>
              <p className="text-xs text-slate-400">
                Temporarily pause public checkout while performing catalog updates
              </p>
            </div>
            <input
              type="checkbox"
              checked={config.maintenanceMode}
              onChange={(e) =>
                setConfig({ ...config, maintenanceMode: e.target.checked })
              }
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer"
        >
          <FaSave /> Save Configuration
        </button>
      </form>

      {/* Database Backup & Danger Zone */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
          Backup & Reset
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
          <div>
            <p className="text-sm font-bold text-white">Export Full JSON Backup</p>
            <p className="text-xs text-slate-400">
              Download complete database dump of bookings, destinations, packages, and users.
            </p>
          </div>
          <button
            onClick={handleBackupExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer shrink-0"
          >
            <FaDownload /> Download Backup
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
          <div>
            <p className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <FaExclamationTriangle />
              <span>Reset All Admin Data</span>
            </p>
            <p className="text-xs text-slate-400">
              Revert all modifications and reload default sample data.
            </p>
          </div>
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors cursor-pointer shrink-0"
          >
            <FaSync /> Reset to Factory
          </button>
        </div>
      </div>
    </div>
  );
}

