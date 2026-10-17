import { useState, useMemo } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaClock,
  FaUsers,
  FaTimes,
  FaSearch
} from "react-icons/fa";
import { toast } from "react-toastify";
import { INITIAL_PACKAGES } from "../../data/mockData";

export default function Packages() {
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem("admin_packages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PACKAGES;
  });

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });

  const savePackages = (updated) => {
    setPackages(updated);
    localStorage.setItem("admin_packages", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour package?")) {
      const updated = packages.filter((p) => p.id !== id);
      savePackages(updated);
      toast.info("Package removed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pkgData = {
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
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
      featured: formData.get("featured") === "on"
    };

    if (modal.mode === "edit") {
      const updated = packages.map((p) =>
        p.id === modal.data.id ? { ...p, ...pkgData } : p
      );
      savePackages(updated);
      toast.success("Tour package updated successfully!");
    } else {
      const newEntry = { id: Date.now(), ...pkgData };
      savePackages([newEntry, ...packages]);
      toast.success("New tour package published!");
    }

    setModal({ open: false, mode: "add", data: null });
  };

  const filtered = useMemo(() => {
    return packages.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [packages, search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Tour Packages Catalog
          </h2>
          <p className="text-xs text-slate-400">
            Design, schedule, and price all-inclusive tour expeditions and travel packages.
          </p>
        </div>
        <button
          onClick={() => setModal({ open: true, mode: "add", data: null })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer self-start sm:self-auto"
        >
          <FaPlus /> Add New Package
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs w-full sm:w-72">
        <FaSearch className="text-slate-400" />
        <input
          type="text"
          placeholder="Search package title or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-white placeholder-slate-400 w-full"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-sky-500/40 transition-all flex flex-col shadow-lg"
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
              {pkg.featured && (
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-sky-500/90 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                  Featured
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-base font-bold text-white">{pkg.title}</h4>
                  <span className="text-sm font-extrabold text-emerald-400 shrink-0">
                    {pkg.price}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{pkg.location}</p>

                <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-800 flex items-center gap-1.5">
                    <FaClock className="text-sky-400 text-[10px]" />
                    <span>{pkg.days}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-800 flex items-center gap-1.5">
                    <FaUsers className="text-sky-400 text-[10px]" />
                    <span>{pkg.people} People</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
                <span className="text-xs text-slate-500 font-mono">ID: #{pkg.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModal({ open: true, mode: "edit", data: pkg })}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors cursor-pointer"
                    title="Edit Package"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 transition-colors cursor-pointer"
                    title="Delete Package"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {modal.mode === "edit" ? "Edit Tour Package" : "Add Tour Package"}
              </h3>
              <button
                onClick={() => setModal({ open: false, mode: "add", data: null })}
                className="text-slate-400 hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Package Title
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={modal.data?.title || ""}
                  placeholder="e.g. Bali Tropical Adventure"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Location / Region
                </label>
                <input
                  name="location"
                  type="text"
                  defaultValue={modal.data?.location || ""}
                  placeholder="e.g. Indonesia"
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
                    defaultValue={modal.data?.days || "5 Days"}
                    placeholder="5 Days"
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
                    defaultValue={modal.data?.people || "2-8"}
                    placeholder="2-8"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Package Price
                  </label>
                  <input
                    name="price"
                    type="text"
                    defaultValue={modal.data?.price || "$799"}
                    placeholder="$799"
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
                    type="text"
                    defaultValue={modal.data?.rating || "4.9"}
                    placeholder="4.9"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Cover Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  defaultValue={modal.data?.image || ""}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  defaultChecked={modal.data?.featured || false}
                  className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                />
                <label htmlFor="featured" className="text-xs text-slate-300 cursor-pointer">
                  Feature this package on homepage hero & top deals
                </label>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModal({ open: false, mode: "add", data: null })}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-500 hover:to-sky-300 transition-all cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
