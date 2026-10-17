import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaCamera,
  FaUserCircle,
  FaTrashAlt,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "./EditProfile.css";

// Helper function to compress images for localStorage safely without quota errors
const compressImage = (file, maxWidth = 600, maxHeight = 600, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Load initial data from localStorage if previously saved, else default values
  const [name, setName] = useState(
    () => localStorage.getItem("profileName") || "Nihal MV"
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("profileEmail") || "nihal@example.com"
  );
  const [phone, setPhone] = useState(
    () => localStorage.getItem("profilePhone") || "+91 9876543210"
  );
  const [location, setLocation] = useState(
    () => localStorage.getItem("profileLocation") || "Kerala, India"
  );
  const [photo, setPhoto] = useState(
    () => localStorage.getItem("profilePicture") || ""
  );

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  // Trigger file selection
  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Process chosen profile photo
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WebP).");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please choose an image smaller than 5MB.");
      e.target.value = "";
      return;
    }

    setIsProcessingPhoto(true);

    try {
      // Compress image to ~30-70KB so it never exceeds localStorage limits
      const compressedDataUrl = await compressImage(file, 600, 600, 0.85);
      setPhoto(compressedDataUrl);
      toast.info("Photo selected! Click 'Save Changes' to update your profile.");
    } catch (err) {
      console.error("Error processing photo:", err);
      toast.error("Could not process the selected image. Please try another.");
    } finally {
      setIsProcessingPhoto(false);
      // Reset input value so selecting the same file again triggers onChange
      e.target.value = "";
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setPhoto("");
    toast.info("Profile photo removed. Save changes to confirm.");
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors before saving.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Persist profile details
      localStorage.setItem("profileName", name.trim());
      localStorage.setItem("profileEmail", email.trim());
      localStorage.setItem("profilePhone", phone.trim());
      localStorage.setItem("profileLocation", location.trim());

      // Persist or remove photo
      if (photo) {
        localStorage.setItem("profilePicture", photo);
      } else {
        localStorage.removeItem("profilePicture");
      }

      toast.success("Profile updated successfully!");

      // Navigate back to profile
      setTimeout(() => {
        navigate("/profile");
      }, 500);
    } catch (err) {
      console.error("Error saving profile to localStorage:", err);
      if (err.name === "QuotaExceededError") {
        toast.error("Browser storage is full. Please remove some data or choose a smaller photo.");
      } else {
        toast.error("An error occurred while saving your profile.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glowing accents */}
      <div className="absolute -top-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card */}
      <div className="w-full max-w-xl bg-white/[0.12] backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative z-10 text-white transition-all duration-300">
        
        {/* Top bar with back link */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-sky-300 hover:text-white text-xs sm:text-sm font-medium transition-colors group cursor-pointer"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Profile</span>
          </Link>
          <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
            Account Details
          </span>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Edit Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Customize your personal info and traveler details
          </p>
        </div>

        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            role="button"
            tabIndex={0}
            onClick={handlePhotoClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePhotoClick();
              }
            }}
            aria-label="Upload profile picture"
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden cursor-pointer border-4 border-sky-400/80 shadow-[0_0_25px_rgba(56,189,248,0.35)] bg-slate-900/40 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-sky-400/50 transition-all duration-300 hover:scale-105"
          >
            {photo ? (
              <img
                src={photo}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-sky-400 p-1" />
            )}

            {/* Hover overlay with camera icon */}
            <div className="absolute inset-0 bg-slate-950/75 text-white flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
              {isProcessingPhoto ? (
                <FaSpinner className="text-2xl text-sky-400 animate-spin" />
              ) : (
                <>
                  <FaCamera className="text-xl sm:text-2xl text-sky-400" />
                  <span className="text-[11px] sm:text-xs font-semibold">
                    Change
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            className="hidden"
          />

          {/* Upload and Remove Photo actions */}
          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              onClick={handlePhotoClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline cursor-pointer transition-colors"
            >
              <FaCamera className="text-xs" />
              <span>{photo ? "Change Photo" : "Upload Photo"}</span>
            </button>

            {photo && (
              <>
                <span className="text-white/30 text-xs">•</span>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 hover:underline cursor-pointer transition-colors"
                >
                  <FaTrashAlt className="text-xs" />
                  <span>Remove</span>
                </button>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-300">
            Recommended: Square JPG, PNG or WebP (Max 5MB)
          </p>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="profile-name"
              className="block text-xs font-semibold text-sky-200 uppercase tracking-wider mb-2"
            >
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="flex items-center gap-3.5 px-4 py-3.5 sm:py-4 rounded-2xl bg-white/[0.08] border border-white/15 hover:bg-white/[0.12] focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/40 focus-within:bg-white/[0.12] transition-all duration-200">
              <FaUser className="text-sky-400 text-lg sm:text-xl shrink-0" />
              <input
                id="profile-name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className="w-full bg-transparent border-none outline-none text-white text-sm sm:text-base placeholder-slate-400"
                required
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-400 mt-1.5 ml-1">{errors.name}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="profile-email"
              className="block text-xs font-semibold text-sky-200 uppercase tracking-wider mb-2"
            >
              Email Address <span className="text-rose-400">*</span>
            </label>
            <div className="flex items-center gap-3.5 px-4 py-3.5 sm:py-4 rounded-2xl bg-white/[0.08] border border-white/15 hover:bg-white/[0.12] focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/40 focus-within:bg-white/[0.12] transition-all duration-200">
              <FaEnvelope className="text-sky-400 text-lg sm:text-xl shrink-0" />
              <input
                id="profile-email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                className="w-full bg-transparent border-none outline-none text-white text-sm sm:text-base placeholder-slate-400"
                required
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1.5 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="profile-phone"
              className="block text-xs font-semibold text-sky-200 uppercase tracking-wider mb-2"
            >
              Phone Number <span className="text-rose-400">*</span>
            </label>
            <div className="flex items-center gap-3.5 px-4 py-3.5 sm:py-4 rounded-2xl bg-white/[0.08] border border-white/15 hover:bg-white/[0.12] focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/40 focus-within:bg-white/[0.12] transition-all duration-200">
              <FaPhone className="text-sky-400 text-lg sm:text-xl shrink-0" />
              <input
                id="profile-phone"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                className="w-full bg-transparent border-none outline-none text-white text-sm sm:text-base placeholder-slate-400"
                required
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-rose-400 mt-1.5 ml-1">{errors.phone}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="profile-location"
              className="block text-xs font-semibold text-sky-200 uppercase tracking-wider mb-2"
            >
              Location <span className="text-rose-400">*</span>
            </label>
            <div className="flex items-center gap-3.5 px-4 py-3.5 sm:py-4 rounded-2xl bg-white/[0.08] border border-white/15 hover:bg-white/[0.12] focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/40 focus-within:bg-white/[0.12] transition-all duration-200">
              <FaMapMarkerAlt className="text-sky-400 text-lg sm:text-xl shrink-0" />
              <input
                id="profile-location"
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
                }}
                className="w-full bg-transparent border-none outline-none text-white text-sm sm:text-base placeholder-slate-400"
                required
              />
            </div>
            {errors.location && (
              <p className="text-xs text-rose-400 mt-1.5 ml-1">{errors.location}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 mt-2">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="order-2 sm:order-1 flex-1 py-3.5 px-6 rounded-full font-semibold text-slate-200 hover:text-white bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 transition-all duration-200 text-center cursor-pointer active:scale-[0.99]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="order-1 sm:order-2 flex-[2] flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 hover:from-blue-500 hover:to-sky-300 shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_rgba(56,189,248,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin text-lg" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="text-lg" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditProfile;
