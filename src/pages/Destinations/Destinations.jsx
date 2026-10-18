import { useState, useMemo, useEffect, useRef } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaMapMarkerAlt,
  FaTimes,
  FaSearch,
  FaCloudUploadAlt,
  FaImage,
  FaLink,
  FaCalendarAlt,
  FaTag,
  FaInfoCircle,
  FaSync,
  FaCheckCircle,
  FaEye
} from "react-icons/fa";
import { toast } from "react-toastify";
import { INITIAL_DESTINATIONS } from "../../data/mockData";
import {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
  getImageUrl,
  API_BASE_URL
} from "../../services/api";

const CATEGORIES = [
  "Beach & Island",
  "Mountain & Snow",
  "Historical & Cultural",
  "City & Luxury",
  "Tropical Adventure",
  "Desert & Safari",
  "Nature & Wildlife"
];

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

  const [loading, setLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal State
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });
  const [imageUploadType, setImageUploadType] = useState("file"); // 'file' | 'url'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Detail View Modal State
  const [viewPlace, setViewPlace] = useState(null);

  // Sync to backend on load
  const loadPlacesFromBackend = async () => {
    setLoading(true);
    try {
      const res = await getPlaces();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setDestinations(res.data);
        localStorage.setItem("admin_destinations", JSON.stringify(res.data));
        setBackendConnected(true);
      }
    } catch (err) {
      // Backend is offline or not deployed yet — use local state
      setBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlacesFromBackend();
  }, []);

  const saveDestinationsLocally = (updated) => {
    setDestinations(updated);
    localStorage.setItem("admin_destinations", JSON.stringify(updated));
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setImageFile(null);
    setImagePreview("");
    setImageUploadType("file");
    setModal({ open: true, mode: "add", data: null });
  };

  // Open Edit Modal
  const handleOpenEditModal = (dest) => {
    setImageFile(null);
    setImagePreview(dest.image || "");
    setImageUploadType(dest.image?.startsWith("http") ? "url" : "file");
    setModal({ open: true, mode: "edit", data: dest });
  };

  // Handle local file selection with preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file size must be under 10MB.");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle Form Submit (POST or PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    // If an image file was selected, append it
    if (imageUploadType === "file" && imageFile) {
      formData.set("image", imageFile);
    } else if (imageUploadType === "url") {
      formData.set("imageUrl", formData.get("imageUrl") || "");
    }

    // Attempt backend upload
    try {
      if (modal.mode === "edit") {
        const res = await updatePlace(modal.data.id, formData);
        if (res.success) {
          toast.success("Tourist place updated in backend!");
          loadPlacesFromBackend();
        }
      } else {
        const res = await createPlace(formData);
        if (res.success) {
          toast.success("New tourist place uploaded to backend!");
          loadPlacesFromBackend();
        }
      }
    } catch (apiErr) {
      console.warn("Backend not reached, saving to local cache:", apiErr.message);

      // Graceful local fallback so the user is NEVER blocked
      const localPlaceData = {
        name: formData.get("name"),
        country: formData.get("country"),
        category: formData.get("category") || "Beach & Island",
        price: formData.get("price").startsWith("$")
          ? formData.get("price")
          : `$${formData.get("price")}`,
        rating: parseFloat(formData.get("rating")) || 4.8,
        description: formData.get("description") || "",
        bestTimeToVisit: formData.get("bestTimeToVisit") || "All year round",
        highlights: (formData.get("highlights") || "")
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
        image:
          imagePreview ||
          formData.get("imageUrl") ||
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        status: formData.get("status") || "Active"
      };

      if (modal.mode === "edit") {
        const updated = destinations.map((d) =>
          d.id === modal.data.id ? { ...d, ...localPlaceData } : d
        );
        saveDestinationsLocally(updated);
        toast.info("Place updated in local storage!");
      } else {
        const newEntry = { id: Date.now(), ...localPlaceData };
        saveDestinationsLocally([newEntry, ...destinations]);
        toast.info("Place saved to local storage!");
      }
    } finally {
      setIsSubmitting(false);
      setModal({ open: false, mode: "add", data: null });
    }
  };

  // Delete Tourist Place
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tourist place?")) {
      try {
        await deletePlace(id);
        toast.success("Place deleted from backend!");
      } catch (err) {
        console.warn("Backend offline, removing locally:", err.message);
      }
      const updated = destinations.filter((d) => d.id !== id);
      saveDestinationsLocally(updated);
      toast.info("Tourist place removed.");
    }
  };

  // Filtered List
  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase()) ||
        (d.category && d.category.toLowerCase().includes(search.toLowerCase()));

      const matchCategory =
        categoryFilter === "All" ||
        (d.category && d.category.toLowerCase() === categoryFilter.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [destinations, search, categoryFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Tourist Places & Destinations
            </h2>
            {backendConnected ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Backend API Connected
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Local Storage Mode
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Upload tourist place images, configure travel details, best visit seasons, and live pricing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={loadPlacesFromBackend}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <FaSync className={loading ? "animate-spin" : ""} /> Sync API
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer self-start sm:self-auto"
          >
            <FaCloudUploadAlt className="text-sm" /> Upload Tourist Place
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {["All", ...CATEGORIES.slice(0, 4)].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs w-full md:w-64">
          <FaSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by city, country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* Tourist Places Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-sky-500/40 transition-all flex flex-col shadow-lg"
          >
            {/* Image Preview Container */}
            <div className="relative h-48 overflow-hidden bg-slate-800">
              <img
                src={getImageUrl(dest.image)}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 font-bold text-xs flex items-center gap-1">
                <FaStar className="text-[10px]" /> {dest.rating}
              </div>
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white font-extrabold text-xs">
                {dest.price}
              </div>
              {dest.category && (
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-sky-300 font-semibold text-[10px]">
                  {dest.category}
                </div>
              )}
            </div>

            {/* Place Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-bold text-white">{dest.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {dest.status || "Active"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
                  <FaMapMarkerAlt className="text-sky-400 shrink-0" />
                  <span>{dest.country}</span>
                </p>

                {dest.description && (
                  <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                    {dest.description}
                  </p>
                )}

                {dest.bestTimeToVisit && (
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-800/50 p-2 rounded-lg">
                    <FaCalendarAlt className="text-sky-400 text-[10px]" />
                    <span>Best time: <strong className="text-slate-200">{dest.bestTimeToVisit}</strong></span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
                <button
                  onClick={() => setViewPlace(dest)}
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold"
                >
                  <FaEye /> View Details
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(dest)}
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

      {/* =========================================================
          UPLOAD / EDIT TOURIST PLACE MODAL
      ========================================================= */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {modal.mode === "edit" ? "Edit Tourist Place" : "Upload New Tourist Place"}
                </h3>
                <p className="text-xs text-slate-400">
                  Upload an image and specify tourist spot information
                </p>
              </div>
              <button
                onClick={() => setModal({ open: false, mode: "add", data: null })}
                className="text-slate-400 hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* IMAGE UPLOADER SECTION */}
              <div>
                <label className="block text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2">
                  Tourist Place Cover Image <span className="text-rose-400">*</span>
                </label>

                {/* Upload Method Switcher */}
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageUploadType("file")}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      imageUploadType === "file"
                        ? "bg-sky-500 text-slate-950"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <FaCloudUploadAlt /> Upload File from PC
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadType("url")}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      imageUploadType === "url"
                        ? "bg-sky-500 text-slate-950"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <FaLink /> Image URL
                  </button>
                </div>

                {imageUploadType === "file" ? (
                  <div>
                    {/* Drag & Drop File Upload Box */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-700 hover:border-sky-400 rounded-2xl p-4 text-center cursor-pointer bg-slate-800/40 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-2 group"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-44 rounded-xl overflow-hidden group">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <span className="text-xs font-bold text-white bg-sky-500 px-3 py-1 rounded-full">
                              Change Image
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-6 space-y-2">
                          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                            <FaCloudUploadAlt className="text-2xl" />
                          </div>
                          <p className="text-sm font-bold text-white">
                            Click or drag & drop tourist image
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Supports JPG, PNG, WebP (Max 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      name="imageUrl"
                      type="url"
                      defaultValue={modal.data?.image || ""}
                      onChange={(e) => setImagePreview(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                    />
                    {imagePreview && (
                      <div className="mt-2 h-36 rounded-xl overflow-hidden border border-slate-700">
                        <img
                          src={imagePreview}
                          alt="URL Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* PLACE NAME & COUNTRY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Tourist Place Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={modal.data?.name || ""}
                    placeholder="e.g. Bali"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Country <span className="text-rose-400">*</span>
                  </label>
                  <input
                    name="country"
                    type="text"
                    defaultValue={modal.data?.country || ""}
                    placeholder="e.g. Indonesia"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* CATEGORY & PRICE & RATING */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Category Tag
                  </label>
                  <select
                    name="category"
                    defaultValue={modal.data?.category || "Beach & Island"}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400 cursor-pointer text-xs"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Price Starting At
                  </label>
                  <input
                    name="price"
                    type="text"
                    defaultValue={modal.data?.price || "$799"}
                    placeholder="$799"
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Rating (1 - 5)
                  </label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    defaultValue={modal.data?.rating || 4.8}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* BEST TIME TO VISIT & STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Best Time to Visit
                  </label>
                  <input
                    name="bestTimeToVisit"
                    type="text"
                    defaultValue={modal.data?.bestTimeToVisit || "April to October"}
                    placeholder="e.g. November to April"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Display Status
                  </label>
                  <select
                    name="status"
                    defaultValue={modal.data?.status || "Active"}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400 cursor-pointer"
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* HIGHLIGHTS */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Attractions & Highlights (Comma Separated)
                </label>
                <input
                  name="highlights"
                  type="text"
                  defaultValue={
                    Array.isArray(modal.data?.highlights)
                      ? modal.data.highlights.join(", ")
                      : modal.data?.highlights || "Beaches, Temples, Coral Reefs"
                  }
                  placeholder="e.g. Coral Reefs, Volcano Trek, Waterfalls"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              {/* DESCRIPTION TEXTAREA */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Tourist Place Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={modal.data?.description || ""}
                  placeholder="Provide an enticing overview of this destination for travelers..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-400"
                />
              </div>

              {/* SUBMIT BUTTONS */}
              <div className="pt-3 flex gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModal({ open: false, mode: "add", data: null })}
                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-500 hover:to-sky-300 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FaSync className="animate-spin" />
                      <span>Saving to Server...</span>
                    </>
                  ) : (
                    <span>{modal.mode === "edit" ? "Update Details" : "Publish Place"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          VIEW PLACE DETAILS MODAL
      ========================================================= */}
      {viewPlace && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <div className="relative h-56">
              <img
                src={getImageUrl(viewPlace.image)}
                alt={viewPlace.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setViewPlace(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-900"
              >
                <FaTimes />
              </button>
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-sm">
                {viewPlace.price}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-white">{viewPlace.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                    <FaStar /> {viewPlace.rating}
                  </div>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <FaMapMarkerAlt className="text-sky-400" />
                  <span>{viewPlace.country}</span>
                  <span>•</span>
                  <span className="text-sky-400">{viewPlace.category}</span>
                </p>
              </div>

              {viewPlace.description && (
                <p className="text-xs text-slate-300 leading-relaxed">
                  {viewPlace.description}
                </p>
              )}

              {viewPlace.bestTimeToVisit && (
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800 text-xs">
                  <span className="text-slate-400 block font-semibold mb-0.5">Best Season:</span>
                  <span className="text-white font-bold">{viewPlace.bestTimeToVisit}</span>
                </div>
              )}

              {Array.isArray(viewPlace.highlights) && viewPlace.highlights.length > 0 && (
                <div>
                  <span className="text-xs text-slate-400 font-semibold block mb-2">Key Highlights:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {viewPlace.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-800 text-sky-300 border border-slate-700"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setViewPlace(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
