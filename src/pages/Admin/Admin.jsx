import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSuitcase,
  FaMapMarkedAlt,
  FaBoxOpen,
  FaUsers,
  FaCog,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCheck,
  FaTimes,
  FaEye,
  FaArrowLeft,
  FaDollarSign,
  FaChartLine,
  FaBell,
  FaBars,
  FaPlane,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaSync,
  FaShieldAlt,
  FaDownload,
} from "react-icons/fa";
import { toast } from "react-toastify";
import initialDestinations from "../../data/destinations";
import initialPackages from "../../data/packages";

// Initial mock bookings if none exist in localStorage
const DEFAULT_MOCK_BOOKINGS = [
  {
    id: "BK-1001",
    name: "Nihal MV",
    email: "nihal@example.com",
    phone: "+91 9876543210",
    title: "Bali Adventure",
    location: "Indonesia",
    date: "2026-11-15",
    travelers: 2,
    price: "$1,598",
    payment: "Card",
    status: "Confirmed",
    createdAt: "2026-10-12",
  },
  {
    id: "BK-1002",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    phone: "+1 555-234-5678",
    title: "Swiss Alps Tour",
    location: "Switzerland",
    date: "2026-12-05",
    travelers: 4,
    price: "$5,996",
    payment: "PayPal",
    status: "Confirmed",
    createdAt: "2026-10-14",
  },
  {
    id: "BK-1003",
    name: "Liam Chen",
    email: "liam@example.com",
    phone: "+44 7700 900077",
    title: "Maldives Beach Holiday",
    location: "Maldives",
    date: "2026-11-20",
    travelers: 2,
    price: "$1,998",
    payment: "Card",
    status: "Pending",
    createdAt: "2026-10-16",
  },
  {
    id: "BK-1004",
    name: "Emma Watson",
    email: "emma@example.com",
    phone: "+1 310-555-8899",
    title: "Dubai Luxury Experience",
    location: "UAE",
    date: "2026-10-25",
    travelers: 1,
    price: "$1,199",
    payment: "Card",
    status: "Cancelled",
    createdAt: "2026-10-09",
  },
];

// Initial mock users
const DEFAULT_USERS = [
  {
    id: 1,
    name: "Nihal MV",
    email: "nihal@example.com",
    phone: "+91 9876543210",
    role: "Admin",
    bookingsCount: 3,
    status: "Active",
    joined: "2026-01-10",
  },
  {
    id: 2,
    name: "Sophia Martinez",
    email: "sophia@example.com",
    phone: "+1 555-234-5678",
    role: "Premium",
    bookingsCount: 5,
    status: "Active",
    joined: "2026-03-22",
  },
  {
    id: 3,
    name: "Liam Chen",
    email: "liam@example.com",
    phone: "+44 7700 900077",
    role: "User",
    bookingsCount: 2,
    status: "Active",
    joined: "2026-05-18",
  },
  {
    id: 4,
    name: "Emma Watson",
    email: "emma@example.com",
    phone: "+1 310-555-8899",
    role: "User",
    bookingsCount: 1,
    status: "Suspended",
    joined: "2026-07-04",
  },
];

function Admin() {
  const navigate = useNavigate();

  // Active tab navigation
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search query (global top bar or local tab)
  const [searchQuery, setSearchQuery] = useState("");

  // ===============================
  // 1. BOOKINGS STATE
  // ===============================
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error("Error reading bookings:", err);
      }
    }
    return DEFAULT_MOCK_BOOKINGS;
  });

  const [bookingFilter, setBookingFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const saveBookings = (updated) => {
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const handleUpdateBookingStatus = (id, newStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    saveBookings(updated);
    toast.success(`Booking status changed to ${newStatus}`);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking record?")) {
      const updated = bookings.filter((b) => b.id !== id);
      saveBookings(updated);
      toast.info("Booking record removed.");
    }
  };

  const handleSeedDemoBookings = () => {
    saveBookings(DEFAULT_MOCK_BOOKINGS);
    toast.success("Demo bookings loaded successfully!");
  };

  // ===============================
  // 2. DESTINATIONS STATE
  // ===============================
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem("admin_destinations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error("Error reading destinations:", err);
      }
    }
    return initialDestinations;
  });

  const [destinationModal, setDestinationModal] = useState({
    open: false,
    mode: "add", // 'add' | 'edit'
    data: null,
  });

  const saveDestinations = (updated) => {
    setDestinations(updated);
    localStorage.setItem("admin_destinations", JSON.stringify(updated));
  };

  const handleDeleteDestination = (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      const updated = destinations.filter((d) => d.id !== id);
      saveDestinations(updated);
      toast.info("Destination removed.");
    }
  };

  const handleSaveDestination = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDest = {
      name: formData.get("name"),
      country: formData.get("country"),
      price: formData.get("price").startsWith("$")
        ? formData.get("price")
        : `$${formData.get("price")}`,
      rating: parseFloat(formData.get("rating")) || 4.8,
      image:
        formData.get("image") ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    };

    if (destinationModal.mode === "edit") {
      const updated = destinations.map((d) =>
        d.id === destinationModal.data.id ? { ...d, ...newDest } : d
      );
      saveDestinations(updated);
      toast.success("Destination updated successfully!");
    } else {
      const newEntry = { id: Date.now(), ...newDest };
      saveDestinations([newEntry, ...destinations]);
      toast.success("New destination added!");
    }

    setDestinationModal({ open: false, mode: "add", data: null });
  };

  // ===============================
  // 3. PACKAGES STATE
  // ===============================
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem("admin_packages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error("Error reading packages:", err);
      }
    }
    return initialPackages;
  });

  const [packageModal, setPackageModal] = useState({
    open: false,
    mode: "add",
    data: null,
  });

  const savePackages = (updated) => {
    setPackages(updated);
    localStorage.setItem("admin_packages", JSON.stringify(updated));
  };

  const handleDeletePackage = (id) => {
    if (window.confirm("Are you sure you want to delete this tour package?")) {
      const updated = packages.filter((p) => p.id !== id);
      savePackages(updated);
      toast.info("Tour package removed.");
    }
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPkg = {
      title: formData.get("title"),
      location: formData.get("location"),
      days: formData.get("days"),
      people: formData.get("people"),
      price: formData.get("price").startsWith("$")
        ? formData.get("price")
        : `$${formData.get("price")}`,
      rating: formData.get("rating") || "4.9",
      image:
        formData.get("image") ||
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    };

    if (packageModal.mode === "edit") {
      const updated = packages.map((p) =>
        p.id === packageModal.data.id ? { ...p, ...newPkg } : p
      );
      savePackages(updated);
      toast.success("Package updated successfully!");
    } else {
      const newEntry = { id: Date.now(), ...newPkg };
      savePackages([newEntry, ...packages]);
      toast.success("New tour package added!");
    }

    setPackageModal({ open: false, mode: "add", data: null });
  };

  // ===============================
  // 4. USERS STATE
  // ===============================
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("admin_users");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error("Error reading users:", err);
      }
    }
    return DEFAULT_USERS;
  });

  const [userModal, setUserModal] = useState({ open: false });

  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("admin_users", JSON.stringify(updated));
  };

  const handleToggleUserStatus = (id) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        const nextStatus = u.status === "Active" ? "Suspended" : "Active";
        toast.info(`User ${u.name} is now ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    saveUsers(updated);
  };

  const handleChangeUserRole = (id, newRole) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, role: newRole } : u
    );
    saveUsers(updated);
    toast.success(`Role changed to ${newRole}`);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      id: Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "+1 555-000-0000",
      role: formData.get("role") || "User",
      bookingsCount: 0,
      status: "Active",
      joined: new Date().toISOString().split("T")[0],
    };
    saveUsers([newUser, ...users]);
    toast.success("User created successfully!");
    setUserModal({ open: false });
  };

  // ===============================
  // 5. SYSTEM SETTINGS STATE
  // ===============================
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("admin_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      siteName: "GoTravel",
      supportEmail: "support@gotravel.com",
      currency: "USD ($)",
      autoApprove: true,
      maintenanceMode: false,
    };
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    toast.success("Admin settings saved!");
  };

  const handleResetAllData = () => {
    if (
      window.confirm(
        "WARNING: This will reset all destinations, packages, and bookings back to initial defaults. Continue?"
      )
    ) {
      localStorage.removeItem("bookings");
      localStorage.removeItem("admin_destinations");
      localStorage.removeItem("admin_packages");
      localStorage.removeItem("admin_users");
      setBookings(DEFAULT_MOCK_BOOKINGS);
      setDestinations(initialDestinations);
      setPackages(initialPackages);
      setUsers(DEFAULT_USERS);
      toast.success("All data restored to factory defaults!");
    }
  };

  // ===============================
  // METRICS & STATS
  // ===============================
  const totalRevenue = useMemo(() => {
    return bookings
      .filter((b) => b.status === "Confirmed")
      .reduce((sum, b) => {
        const cleanPrice = Number(String(b.price || "0").replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(cleanPrice) ? 0 : cleanPrice);
      }, 0);
  }, [bookings]);

  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const cancelledCount = bookings.filter((b) => b.status === "Cancelled").length;

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchFilter =
        bookingFilter === "All" || b.status === bookingFilter;
      const matchQuery =
        !searchQuery ||
        b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchQuery;
    });
  }, [bookings, bookingFilter, searchQuery]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = "ID,Name,Email,Phone,Package,Travelers,Price,Status,Date\n";
    const rows = bookings
      .map(
        (b) =>
          `"${b.id}","${b.name}","${b.email}","${b.phone}","${b.title}","${b.travelers}","${b.price}","${b.status}","${b.date}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `gotravel_bookings_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Bookings report downloaded as CSV!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-sky-500 selection:text-white">
      {/* =========================================================
          SIDEBAR (DESKTOP & MOBILE DRAWER)
      ========================================================= */}
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-white text-xl font-black tracking-wider"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
              <FaPlane className="text-lg -rotate-45" />
            </div>
            <div>
              <span>GoTravel</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-sky-400">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {[
            { id: "dashboard", label: "Dashboard", icon: FaTachometerAlt },
            { id: "bookings", label: "Bookings", icon: FaSuitcase, badge: pendingCount > 0 ? pendingCount : null },
            { id: "destinations", label: "Destinations", icon: FaMapMarkedAlt },
            { id: "packages", label: "Tour Packages", icon: FaBoxOpen },
            { id: "users", label: "Users & Travelers", icon: FaUsers },
            { id: "settings", label: "System Settings", icon: FaCog },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`text-base ${isActive ? "text-white" : "text-sky-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            <span>View Client Site</span>
          </Link>
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================
          MAIN CONTENT VIEW
      ========================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
            >
              <FaBars />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-white capitalize">
              {activeTab.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <FaSearch className="text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-200 placeholder-slate-400 w-36 sm:w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Quick Live Site Pill */}
            <Link
              to="/"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <span>Live Site</span>
            </Link>

            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={() => toast.info(`You have ${pendingCount} pending booking(s)`)}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors relative cursor-pointer"
              >
                <FaBell className="text-sm" />
                {pendingCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-slate-900" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-4 sm:p-8 space-y-8 flex-1">
          {/* =========================================================
              TAB 1: DASHBOARD OVERVIEW
          ========================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Total Revenue */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Total Revenue
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <FaDollarSign className="text-lg" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    ${totalRevenue.toLocaleString()}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <FaChartLine />
                    <span>Based on confirmed bookings</span>
                  </div>
                </div>

                {/* Total Bookings */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-sky-500/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Total Bookings
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <FaSuitcase className="text-lg" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {bookings.length}
                  </h3>
                  <div className="mt-2 text-xs text-slate-400 flex gap-2">
                    <span className="text-emerald-400 font-bold">{confirmedCount} Active</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{pendingCount} Pending</span>
                  </div>
                </div>

                {/* Active Destinations */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Destinations
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <FaMapMarkedAlt className="text-lg" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {destinations.length}
                  </h3>
                  <div className="mt-2 text-xs text-indigo-300 font-semibold">
                    Across 6+ Countries
                  </div>
                </div>

                {/* Total Customers */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Travelers
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <FaUsers className="text-lg" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {users.length}
                  </h3>
                  <div className="mt-2 text-xs text-amber-300 font-semibold">
                    Registered accounts
                  </div>
                </div>
              </div>

              {/* Quick Actions & Seed Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900 to-sky-900/30 border border-blue-500/20">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-sky-400 text-lg" />
                  <span className="text-sm font-bold text-white">Quick Management Controls</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setDestinationModal({ open: true, mode: "add", data: null });
                      setActiveTab("destinations");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" /> Add Destination
                  </button>
                  <button
                    onClick={() => {
                      setPackageModal({ open: true, mode: "add", data: null });
                      setActiveTab("packages");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" /> Add Package
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FaDownload className="text-[10px]" /> Export CSV
                  </button>
                </div>
              </div>

              {/* Recent Bookings & Status Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings Table (2 cols) */}
                <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Recent Bookings
                      </h3>
                      <p className="text-xs text-slate-400">
                        Latest travel requests submitted by travelers
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="pb-3 font-semibold">Traveler</th>
                          <th className="pb-3 font-semibold">Destination</th>
                          <th className="pb-3 font-semibold">Amount</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {bookings.slice(0, 5).map((b) => (
                          <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-3.5 pr-2">
                              <p className="font-bold text-white truncate max-w-[140px]">
                                {b.name}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate max-w-[140px]">
                                {b.email}
                              </p>
                            </td>
                            <td className="py-3.5 px-2">
                              <span className="font-semibold text-slate-200 truncate block max-w-[140px]">
                                {b.title || b.location}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {b.date}
                              </span>
                            </td>
                            <td className="py-3.5 px-2 font-bold text-emerald-400">
                              {b.price}
                            </td>
                            <td className="py-3.5 px-2">
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
                            <td className="py-3.5 pl-2 text-right">
                              {b.status === "Pending" ? (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, "Confirmed")}
                                  className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
                                >
                                  Approve
                                </button>
                              ) : (
                                <button
                                  onClick={() => setSelectedBooking(b)}
                                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                                >
                                  Details
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Status Breakdown & Popular Tours (1 col) */}
                <div className="space-y-6">
                  {/* Status Breakdown */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-white mb-4">
                      Booking Statuses
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-emerald-400">Confirmed</span>
                          <span className="text-white">{confirmedCount} ({Math.round((confirmedCount / (bookings.length || 1)) * 100)}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${(confirmedCount / (bookings.length || 1)) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-amber-400">Pending Approval</span>
                          <span className="text-white">{pendingCount} ({Math.round((pendingCount / (bookings.length || 1)) * 100)}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${(pendingCount / (bookings.length || 1)) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-rose-400">Cancelled</span>
                          <span className="text-white">{cancelledCount} ({Math.round((cancelledCount / (bookings.length || 1)) * 100)}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-rose-500 rounded-full"
                            style={{ width: `${(cancelledCount / (bookings.length || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Destinations */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-white mb-3">
                      Top Destinations
                    </h3>
                    <div className="space-y-3">
                      {destinations.slice(0, 3).map((d) => (
                        <div key={d.id} className="flex items-center gap-3">
                          <img
                            src={d.image}
                            alt={d.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate">{d.name}</p>
                            <p className="text-[11px] text-slate-400">{d.country}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                            <FaStar /> {d.rating}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: BOOKINGS MANAGER
          ========================================================= */}
          {activeTab === "bookings" && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">All Bookings</h2>
                  <p className="text-xs text-slate-400">
                    Manage client reservations, status, payments and confirmations
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <FaDownload /> Export CSV
                  </button>
                  <button
                    onClick={handleSeedDemoBookings}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-600/20 text-sky-400 hover:bg-blue-600/30 border border-blue-500/30 transition-colors"
                  >
                    <FaSync /> Reset Demo
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
                {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      bookingFilter === status
                        ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {status} ({status === "All" ? bookings.length : bookings.filter((b) => b.status === status).length})
                  </button>
                ))}
              </div>

              {/* Bookings Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="pb-3 font-semibold">Ref #</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Package / Tour</th>
                      <th className="pb-3 font-semibold">Travel Date</th>
                      <th className="pb-3 font-semibold">Price</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          No bookings found matching the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 font-mono font-semibold text-sky-400 text-xs">
                            {b.id}
                          </td>
                          <td className="py-4">
                            <p className="font-bold text-white">{b.name}</p>
                            <p className="text-[11px] text-slate-400">{b.email}</p>
                            <p className="text-[11px] text-slate-500">{b.phone}</p>
                          </td>
                          <td className="py-4">
                            <p className="font-bold text-slate-200">{b.title || b.location}</p>
                            <p className="text-[11px] text-slate-400">
                              {b.travelers} Traveler(s) • {b.payment || "Card"}
                            </p>
                          </td>
                          <td className="py-4 text-slate-300 font-medium">
                            {b.date || "Flexible"}
                          </td>
                          <td className="py-4 font-bold text-emerald-400 text-base">
                            {b.price}
                          </td>
                          <td className="py-4">
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
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Approve Button */}
                              {b.status !== "Confirmed" && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, "Confirmed")}
                                  title="Approve / Confirm"
                                  className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
                                >
                                  <FaCheck />
                                </button>
                              )}

                              {/* Mark Pending */}
                              {b.status !== "Pending" && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, "Pending")}
                                  title="Mark as Pending"
                                  className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors cursor-pointer"
                                >
                                  <FaClock />
                                </button>
                              )}

                              {/* Cancel */}
                              {b.status !== "Cancelled" && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, "Cancelled")}
                                  title="Cancel Booking"
                                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                                >
                                  <FaTimes />
                                </button>
                              )}

                              {/* View Details */}
                              <button
                                onClick={() => setSelectedBooking(b)}
                                title="View Details"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                              >
                                <FaEye />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                title="Delete"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 transition-colors cursor-pointer"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 3: DESTINATIONS MANAGER
          ========================================================= */}
          {activeTab === "destinations" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Destinations</h2>
                  <p className="text-xs text-slate-400">
                    Manage travel spots displayed on the GoTravel homepage and catalogue
                  </p>
                </div>
                <button
                  onClick={() =>
                    setDestinationModal({ open: true, mode: "add", data: null })
                  }
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <FaPlus /> Add New Destination
                </button>
              </div>

              {/* Destinations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden group hover:border-sky-500/40 transition-all flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 font-bold text-xs flex items-center gap-1">
                        <FaStar className="text-[10px]" /> {dest.rating}
                      </div>
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white font-extrabold text-xs">
                        {dest.price}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-white">{dest.name}</h4>
                        <p className="text-xs text-slate-400">{dest.country}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
                        <span className="text-xs text-slate-500">
                          ID: #{dest.id}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setDestinationModal({
                                open: true,
                                mode: "edit",
                                data: dest,
                              })
                            }
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteDestination(dest.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 4: TOUR PACKAGES MANAGER
          ========================================================= */}
          {activeTab === "packages" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Tour Packages</h2>
                  <p className="text-xs text-slate-400">
                    Manage curated tour offers, duration, capacity, and package pricing
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPackageModal({ open: true, mode: "add", data: null })
                  }
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <FaPlus /> Add New Package
                </button>
              </div>

              {/* Packages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden group hover:border-sky-500/40 transition-all flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 font-bold text-xs flex items-center gap-1">
                        <FaStar className="text-[10px]" /> {pkg.rating}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-base font-bold text-white">{pkg.title}</h4>
                          <span className="text-sm font-extrabold text-emerald-400">
                            {pkg.price}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{pkg.location}</p>

                        <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
                          <span className="px-2.5 py-1 rounded-md bg-slate-800">
                            ⏳ {pkg.days}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-slate-800">
                            👥 {pkg.people} People
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
                        <span className="text-xs text-slate-500">ID: #{pkg.id}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setPackageModal({ open: true, mode: "edit", data: pkg })
                            }
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 5: USERS MANAGER
          ========================================================= */}
          {activeTab === "users" && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Registered Users</h2>
                  <p className="text-xs text-slate-400">
                    Manage client profiles, administrative roles, and membership privileges
                  </p>
                </div>
                <button
                  onClick={() => setUserModal({ open: true })}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <FaPlus /> Create User
                </button>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Contact</th>
                      <th className="pb-3 font-semibold">Role</th>
                      <th className="pb-3 font-semibold">Bookings</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                              {u.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-white">{u.name}</p>
                              <p className="text-[11px] text-slate-400">
                                Joined {u.joined}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-slate-200">{u.email}</p>
                          <p className="text-[11px] text-slate-500">{u.phone}</p>
                        </td>
                        <td className="py-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleChangeUserRole(u.id, e.target.value)}
                            className="bg-slate-800 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1 text-white outline-none cursor-pointer"
                          >
                            <option value="User">User</option>
                            <option value="Premium">Premium</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-4 font-bold text-slate-300">
                          {u.bookingsCount} Trip(s)
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.status === "Active"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => handleToggleUserStatus(u.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                              u.status === "Active"
                                ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            }`}
                          >
                            {u.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 6: SYSTEM SETTINGS
          ========================================================= */}
          {activeTab === "settings" && (
            <div className="max-w-2xl bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Admin Platform Settings</h2>
                <p className="text-xs text-slate-400">
                  Global parameters, currency settings, and system maintenance
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Application Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Support Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, supportEmail: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Default Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      setSettings({ ...settings, currency: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-sky-400 cursor-pointer"
                  >
                    <option value="USD ($)">USD ($)</option>
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="INR (₹)">INR (₹)</option>
                    <option value="GBP (£)">GBP (£)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div>
                    <p className="text-sm font-bold text-white">
                      Auto-Confirm Bookings
                    </p>
                    <p className="text-xs text-slate-400">
                      Instantly confirm new bookings without manual approval
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoApprove}
                    onChange={(e) =>
                      setSettings({ ...settings, autoApprove: e.target.checked })
                    }
                    className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div>
                    <p className="text-sm font-bold text-white">
                      Maintenance Mode
                    </p>
                    <p className="text-xs text-slate-400">
                      Temporarily disable new checkout bookings
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maintenanceMode: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer"
                  >
                    Save System Settings
                  </button>
                </div>
              </form>

              {/* Danger Zone */}
              <div className="pt-6 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                  Danger Zone
                </h4>
                <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-white">
                      Reset Admin Data
                    </p>
                    <p className="text-xs text-slate-400">
                      Restores all bookings, destinations, packages and users to factory defaults.
                    </p>
                  </div>
                  <button
                    onClick={handleResetAllData}
                    className="px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors cursor-pointer shrink-0"
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================
          MODALS
      ========================================================= */}
      {/* 1. Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking Ref:</span>
                <span className="font-mono font-bold text-sky-400">{selectedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Name:</span>
                <span className="font-bold text-white">{selectedBooking.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-300">{selectedBooking.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-slate-300">{selectedBooking.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tour / Destination:</span>
                <span className="font-bold text-white">{selectedBooking.title || selectedBooking.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Travel Date:</span>
                <span className="text-slate-300">{selectedBooking.date || "Flexible"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Travelers:</span>
                <span className="text-slate-300">{selectedBooking.travelers} Person(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Price:</span>
                <span className="font-bold text-emerald-400 text-base">{selectedBooking.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-sky-400 uppercase">{selectedBooking.status}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleUpdateBookingStatus(selectedBooking.id, "Confirmed");
                  setSelectedBooking({ ...selectedBooking, status: "Confirmed" });
                }}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  handleUpdateBookingStatus(selectedBooking.id, "Cancelled");
                  setSelectedBooking({ ...selectedBooking, status: "Cancelled" });
                }}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Destination Add/Edit Modal */}
      {destinationModal.open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {destinationModal.mode === "edit" ? "Edit Destination" : "Add Destination"}
              </h3>
              <button
                onClick={() => setDestinationModal({ open: false, mode: "add", data: null })}
                className="text-slate-400 hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveDestination} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Destination Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={destinationModal.data?.name || ""}
                  placeholder="e.g. Kyoto"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Country
                </label>
                <input
                  name="country"
                  type="text"
                  defaultValue={destinationModal.data?.country || ""}
                  placeholder="e.g. Japan"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Price
                  </label>
                  <input
                    name="price"
                    type="text"
                    defaultValue={destinationModal.data?.price || "$899"}
                    placeholder="$899"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Rating (1-5)
                  </label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    defaultValue={destinationModal.data?.rating || 4.9}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  defaultValue={destinationModal.data?.image || ""}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDestinationModal({ open: false, mode: "add", data: null })}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-500 hover:to-sky-300 transition-all"
                >
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Package Add/Edit Modal */}
      {packageModal.open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {packageModal.mode === "edit" ? "Edit Tour Package" : "Add Tour Package"}
              </h3>
              <button
                onClick={() => setPackageModal({ open: false, mode: "add", data: null })}
                className="text-slate-400 hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Package Title
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={packageModal.data?.title || ""}
                  placeholder="e.g. Kyoto Sakura Experience"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Location / Country
                </label>
                <input
                  name="location"
                  type="text"
                  defaultValue={packageModal.data?.location || ""}
                  placeholder="e.g. Japan"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Duration
                  </label>
                  <input
                    name="days"
                    type="text"
                    defaultValue={packageModal.data?.days || "6 Days"}
                    placeholder="6 Days"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Group Capacity
                  </label>
                  <input
                    name="people"
                    type="text"
                    defaultValue={packageModal.data?.people || "2-8"}
                    placeholder="2-8"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Price
                  </label>
                  <input
                    name="price"
                    type="text"
                    defaultValue={packageModal.data?.price || "$1199"}
                    placeholder="$1199"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Rating
                  </label>
                  <input
                    name="rating"
                    type="text"
                    defaultValue={packageModal.data?.rating || "4.9"}
                    placeholder="4.9"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  defaultValue={packageModal.data?.image || ""}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setPackageModal({ open: false, mode: "add", data: null })}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-500 hover:to-sky-300 transition-all"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Add User Modal */}
      {userModal.open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Create New User</h3>
              <button
                onClick={() => setUserModal({ open: false })}
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
                  Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 555-123-4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue="User"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400 cursor-pointer"
                >
                  <option value="User">User</option>
                  <option value="Premium">Premium Traveler</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setUserModal({ open: false })}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
