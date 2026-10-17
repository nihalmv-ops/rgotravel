import { useState, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaCheck,
  FaTimes,
  FaClock,
  FaEye,
  FaTrash,
  FaDownload,
  FaSync,
  FaCalendarAlt,
  FaUser,
  FaDollarSign
} from "react-icons/fa";
import { toast } from "react-toastify";
import { INITIAL_BOOKINGS } from "../../data/mockData";

export default function Bookings() {
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

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const saveBookings = (updated) => {
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    saveBookings(updated);
    toast.success(`Booking ${id} marked as ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking record?")) {
      const updated = bookings.filter((b) => b.id !== id);
      saveBookings(updated);
      toast.info("Booking removed.");
    }
  };

  const handleResetDemo = () => {
    saveBookings(INITIAL_BOOKINGS);
    toast.success("Demo bookings refreshed!");
  };

  const handleExportCSV = () => {
    const headers = "ID,Customer,Email,Phone,Tour,TravelDate,Guests,Amount,Payment,Status\n";
    const rows = bookings
      .map(
        (b) =>
          `"${b.id}","${b.customer || b.name}","${b.email}","${b.phone}","${b.tour || b.title}","${b.travelDate || b.date}","${b.guests || b.travelers}","${b.amount || b.price}","${b.paymentMethod || b.payment || 'Card'}","${b.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `gotravel_reservations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file downloaded successfully!");
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchFilter = filter === "All" || b.status === filter;
      const term = search.toLowerCase();
      const matchSearch =
        !search ||
        (b.customer && b.customer.toLowerCase().includes(term)) ||
        (b.name && b.name.toLowerCase().includes(term)) ||
        (b.email && b.email.toLowerCase().includes(term)) ||
        (b.id && b.id.toLowerCase().includes(term)) ||
        (b.tour && b.tour.toLowerCase().includes(term)) ||
        (b.title && b.title.toLowerCase().includes(term));
      return matchFilter && matchSearch;
    });
  }, [bookings, filter, search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Bookings & Reservations
          </h2>
          <p className="text-xs text-slate-400">
            Monitor client orders, manage fulfillment statuses, and export financial summaries.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <FaDownload /> Export CSV
          </button>
          <button
            onClick={handleResetDemo}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600/20 text-sky-400 hover:bg-blue-600/30 border border-blue-500/30 transition-colors cursor-pointer"
          >
            <FaSync /> Reset Demo
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "Confirmed", "Pending", "Cancelled"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === item
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {item} (
              {item === "All"
                ? bookings.length
                : bookings.filter((b) => b.status === item).length}
              )
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs w-full md:w-64">
          <FaSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-800/50 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Ref #</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Package / Tour</th>
                <th className="py-3 px-4 font-semibold">Travel Date</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No bookings found matching "{search}".
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-sky-400">
                      {b.id}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-white">{b.customer || b.name}</p>
                      <p className="text-[11px] text-slate-400">{b.email}</p>
                      <p className="text-[11px] text-slate-500">{b.phone}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-slate-200">{b.tour || b.title}</p>
                      <p className="text-[11px] text-slate-400">
                        {b.guests || b.travelers} Guests • {b.paymentMethod || b.payment || "Card"}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">
                      {b.travelDate || b.date || "Flexible"}
                    </td>
                    <td className="py-4 px-4 font-extrabold text-emerald-400 text-base">
                      {b.amount || b.price}
                    </td>
                    <td className="py-4 px-4">
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
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {b.status !== "Confirmed" && (
                          <button
                            onClick={() => handleStatusChange(b.id, "Confirmed")}
                            title="Approve & Confirm"
                            className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
                          >
                            <FaCheck />
                          </button>
                        )}
                        {b.status !== "Pending" && (
                          <button
                            onClick={() => handleStatusChange(b.id, "Pending")}
                            title="Mark as Pending"
                            className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors cursor-pointer"
                          >
                            <FaClock />
                          </button>
                        )}
                        {b.status !== "Cancelled" && (
                          <button
                            onClick={() => handleStatusChange(b.id, "Cancelled")}
                            title="Cancel Booking"
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                          >
                            <FaTimes />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedBooking(b)}
                          title="View Details"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Booking Information</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono font-bold text-sky-400">{selectedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-white">{selectedBooking.customer || selectedBooking.name}</span>
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
                <span className="text-slate-400">Tour Name:</span>
                <span className="font-bold text-white">{selectedBooking.tour || selectedBooking.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Travel Date:</span>
                <span className="text-slate-300">{selectedBooking.travelDate || selectedBooking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Travelers:</span>
                <span className="text-slate-300">{selectedBooking.guests || selectedBooking.travelers} Person(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment:</span>
                <span className="text-slate-300">{selectedBooking.paymentMethod || selectedBooking.payment || "Credit Card"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Price:</span>
                <span className="font-bold text-emerald-400 text-base">{selectedBooking.amount || selectedBooking.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-sky-400 uppercase">{selectedBooking.status}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleStatusChange(selectedBooking.id, "Confirmed");
                  setSelectedBooking({ ...selectedBooking, status: "Confirmed" });
                }}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  handleStatusChange(selectedBooking.id, "Cancelled");
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
    </div>
  );
}
