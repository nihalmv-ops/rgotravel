export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper for handling JSON or FormData requests
async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

// ===================================
// TOURIST PLACES (DESTINATIONS)
// ===================================
export async function getPlaces(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/places${query ? `?${query}` : ""}`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function getPlaceById(id) {
  const res = await fetch(`${API_BASE_URL}/places/${id}`);
  return handleResponse(res);
}

export async function createPlace(formData) {
  const res = await fetch(`${API_BASE_URL}/places`, {
    method: "POST",
    body: formData, // FormData automatically sets multipart/form-data boundary
  });
  return handleResponse(res);
}

export async function updatePlace(id, formData) {
  const res = await fetch(`${API_BASE_URL}/places/${id}`, {
    method: "PUT",
    body: formData,
  });
  return handleResponse(res);
}

export async function deletePlace(id) {
  const res = await fetch(`${API_BASE_URL}/places/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

// ===================================
// IMAGE UPLOAD (STANDALONE)
// ===================================
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  return handleResponse(res);
}

// ===================================
// TOUR PACKAGES
// ===================================
export async function getPackages() {
  const res = await fetch(`${API_BASE_URL}/packages`);
  return handleResponse(res);
}

export async function createPackage(formData) {
  const res = await fetch(`${API_BASE_URL}/packages`, {
    method: "POST",
    body: formData,
  });
  return handleResponse(res);
}

export async function deletePackage(id) {
  const res = await fetch(`${API_BASE_URL}/packages/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

// ===================================
// BOOKINGS
// ===================================
export async function getBookings() {
  const res = await fetch(`${API_BASE_URL}/bookings`);
  return handleResponse(res);
}

export async function updateBookingStatus(id, status) {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}

export async function deleteBooking(id) {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

// ===================================
// IMAGE URL HELPER
// ===================================
export function getImageUrl(image) {
  if (!image) {
    return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
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
