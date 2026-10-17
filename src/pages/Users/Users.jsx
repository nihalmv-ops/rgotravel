import { useState, useMemo } from "react";
import {
  FaUserPlus,
  FaSearch,
  FaShieldAlt,
  FaTrash,
  FaTimes,
  FaCrown,
  FaUser
} from "react-icons/fa";
import { toast } from "react-toastify";
import { INITIAL_USERS } from "../../data/mockData";

export default function Users() {
  const [users, setUsers] = useState(() => {
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
  });

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("admin_users", JSON.stringify(updated));
  };

  const handleToggleStatus = (id) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        const next = u.status === "Active" ? "Suspended" : "Active";
        toast.info(`User ${u.name} status changed to ${next}`);
        return { ...u, status: next };
      }
      return u;
    });
    saveUsers(updated);
  };

  const handleChangeRole = (id, newRole) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, role: newRole } : u
    );
    saveUsers(updated);
    toast.success(`Role updated to ${newRole}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user profile?")) {
      const updated = users.filter((u) => u.id !== id);
      saveUsers(updated);
      toast.info("User record deleted.");
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      id: Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "+1 555-000-0000",
      role: formData.get("role") || "Customer",
      status: "Active",
      bookings: 0,
      spent: "$0",
      joinDate: new Date().toISOString().split("T")[0]
    };
    saveUsers([newUser, ...users]);
    toast.success("New user account created!");
    setModalOpen(false);
  };

  const filtered = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Users & Travelers Directory
          </h2>
          <p className="text-xs text-slate-400">
            Audit registered traveler accounts, manage security roles, and control account privileges.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer self-start sm:self-auto"
        >
          <FaUserPlus /> Add New User
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs w-full sm:w-72">
        <FaSearch className="text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-white placeholder-slate-400 w-full"
        />
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-800/50 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Contact Info</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Bookings</th>
                <th className="py-3 px-4 font-semibold">Total Spent</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {u.role.includes("Admin") && (
                            <FaShieldAlt className="text-sky-400 text-[10px]" title="Admin" />
                          )}
                          {u.role.includes("Premium") && (
                            <FaCrown className="text-amber-400 text-[10px]" title="Premium" />
                          )}
                        </p>
                        <p className="text-[11px] text-slate-400">Joined {u.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-slate-200">{u.email}</p>
                    <p className="text-[11px] text-slate-500">{u.phone}</p>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleChangeRole(u.id, e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1 text-white outline-none cursor-pointer"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Premium Traveler">Premium Traveler</option>
                      <option value="Manager">Manager</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-200">
                    {u.bookings} trip(s)
                  </td>
                  <td className="py-4 px-4 font-extrabold text-emerald-400">
                    {u.spent || "$0"}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                        u.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          u.status === "Active"
                            ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        }`}
                      >
                        {u.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        title="Delete User"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 transition-colors cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Create New User</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 555-0199"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  System Role
                </label>
                <select
                  name="role"
                  defaultValue="Customer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400 cursor-pointer"
                >
                  <option value="Customer">Customer</option>
                  <option value="Premium Traveler">Premium Traveler</option>
                  <option value="Manager">Manager</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-500 hover:to-sky-300 transition-all cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

