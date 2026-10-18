import staticDestinations from "../data/destinations";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Resolves full URL for an image.
 * Handles uploaded backend images (/uploads/...), external URLs, and local fallbacks.
 */
export function getImageUrl(image) {
  if (!image) {
    return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800";
  }
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:")
  ) {
    return image;
  }
  const serverOrigin = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${serverOrigin}${image.startsWith("/") ? "" : "/"}${image}`;
}

/**
 * Fetches all tourist places from backend API.
 * Gracefully falls back to localStorage or static destinations if API is unreachable.
 */
export async function fetchTouristPlaces() {
  try {
    const res = await fetch(`${API_BASE_URL}/places`, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Cache in localStorage for offline / fast access
        try {
          localStorage.setItem("admin_destinations", JSON.stringify(data));
        } catch (e) {
          console.warn("Could not cache destinations to localStorage", e);
        }
        return data;
      }
    }
  } catch (err) {
    console.info("Backend API offline or unreachable; using local storage/fallback:", err.message);
  }

  // Fallback 1: LocalStorage (e.g. if admin added places on this machine)
  try {
    const saved = localStorage.getItem("admin_destinations");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }

  // Fallback 2: Default static destinations
  return staticDestinations;
}

/**
 * Fetches a single tourist place by ID.
 */
export async function fetchPlaceById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/places/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.info("Backend offline; finding place locally:", err.message);
  }

  const all = await fetchTouristPlaces();
  return all.find((p) => String(p.id) === String(id)) || null;
}
