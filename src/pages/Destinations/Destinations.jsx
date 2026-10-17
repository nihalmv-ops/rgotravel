import { useState, useMemo } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaMapMarkerAlt,
  FaTimes,
  FaSearch,
  FaImage
} from "react-icons/fa";
import { toast } from "react-toastify";
import { INITIAL_DESTINATIONS } from "../../data/mockData";

export default function Destinations() {
  const [destinations, setDestinations] = useState(() => {
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
  });

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });

  const saveDestinations = (updated) => {
    setDestinations(updated);
    localStorage.setItem("admin_destinations", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      const updated = destinations.filter((d) => d.id !== id);
      saveDestinations(updated);
      toast.info("Destination removed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const destData = {
      name: formData.get("name"),
      country: formData.get("country"),
      category: formData.get("category") || "General",
      price: formData.get("price").startsWith("$")
        ? formData.get("price")
        : `$${formData.get("price")}`,
      rating: parseFloat(formData.get("rating")) || 4.8,
      image:
        formData.get("image") ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      status: formData.get("status") || "Active"
    };

    if (modal.mode === "edit") {
      const updated = destinations.map((d) =>
        d.id === modal.data.id ? { ...d, ...destData } : d
      );
      saveDestinations(updated);
      toast.success("Destination updated successfully!");
    } else {
      const newEntry = { id: Date.now(), ...destData };
      saveDestinations([newEntry, ...destinations]);
      toast.success("New destination published!");
    }

    setModal({ open: false, mode: "add", data: null });
  };

  const filtered = useMemo(() => {
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase())
    );
  }, [destinations, search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Destinations Catalog
          </h2>
          <p className="text-xs text-slate-400">
            Create, update and showcase global destinations for traveler packages.
          </p>
        </div>
        <button
          onClick={() => setModal({ open: true, mode: "add", data: null })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer self-start sm:self-auto"
        >
          <FaPlus /> Add Destination
        </button>
      </div>

      {/* Search & Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs w-full sm:w-72">
          <FaSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by city or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-slate-400 w-full"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">
          Showing {filtered.length} of {destinations.length} destinations
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-sky-500/40 transition-all flex flex-col shadow-lg"
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
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-bold text-white">{dest.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {dest.status || "Active"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-sky-400" />
                  <span>{dest.country}</span>
                  {dest.category && (
                    <>
                      <span>•</span>
                      <span className="text-slate-500">{dest.category}</span>
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
                <span className="text-xs text-slate-500 font-mono">ID: #{dest.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setModal({ open: true, mode: "edit", data: dest })
                    }
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors cursor-pointer"
                    title="Edit Destination"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(dest.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 transition-colors cursor-pointer"
                    title="Delete Destination"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {modal.mode === "edit" ? "Edit Destination" : "Add New Destination"}
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
                  Destination Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={modal.data?.name || ""}
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
                  defaultValue={modal.data?.country || ""}
                  placeholder="e.g. Japan"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Price Starting At
                  </label>
                  <input
                    name="price"
                    type="text"
                    defaultValue={modal.data?.price || "$899"}
                    placeholder="$899"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Rating (1 to 5)
                  </label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    defaultValue={modal.data?.rating || 4.8}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Category Tag
                </label>
                <input
                  name="category"
                  type="text"
                  defaultValue={modal.data?.category || "Beach & Nature"}
                  placeholder="e.g. Mountain Resort"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
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
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

