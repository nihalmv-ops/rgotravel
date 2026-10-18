import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { upload } from "../middleware/upload.js";
import { readData, writeData } from "../data/storage.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "uploads");

const PLACES_FILE = "places.json";

// Helper to construct full image URL
const getFullImageUrl = (req, imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  const protocol = req.protocol;
  const host = req.get("host");
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${protocol}://${host}${cleanPath}`;
};

// ==========================================
// 1. GET ALL TOURIST PLACES
// ==========================================
router.get("/", (req, res) => {
  try {
    let places = readData(PLACES_FILE);
    const { search, category, country } = req.query;

    if (search) {
      const term = search.toLowerCase();
      places = places.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.country.toLowerCase().includes(term) ||
          (p.category && p.category.toLowerCase().includes(term))
      );
    }

    if (category && category !== "All") {
      places = places.filter(
        (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (country && country !== "All") {
      places = places.filter(
        (p) => p.country.toLowerCase() === country.toLowerCase()
      );
    }

    // Attach full image URLs
    const enhancedPlaces = places.map((p) => ({
      ...p,
      image: getFullImageUrl(req, p.image),
      rawImage: p.image,
    }));

    res.json({
      success: true,
      count: enhancedPlaces.length,
      data: enhancedPlaces,
    });
  } catch (err) {
    console.error("Error fetching places:", err);
    res.status(500).json({ success: false, message: "Server error fetching places" });
  }
});

// ==========================================
// 2. GET SINGLE TOURIST PLACE
// ==========================================
router.get("/:id", (req, res) => {
  try {
    const places = readData(PLACES_FILE);
    const place = places.find((p) => String(p.id) === String(req.params.id));

    if (!place) {
      return res.status(404).json({ success: false, message: "Tourist place not found" });
    }

    res.json({
      success: true,
      data: {
        ...place,
        image: getFullImageUrl(req, place.image),
        rawImage: place.image,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching place details" });
  }
});

// ==========================================
// 3. CREATE TOURIST PLACE WITH IMAGE UPLOAD
// ==========================================
router.post("/", upload.single("image"), (req, res) => {
  try {
    const {
      name,
      country,
      price,
      rating,
      category,
      description,
      bestTimeToVisit,
      highlights,
      imageUrl,
    } = req.body;

    if (!name || !country) {
      return res.status(400).json({
        success: false,
        message: "Place name and country are required.",
      });
    }

    // Determine image: uploaded file takes priority, then imageUrl, then default
    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      image = imageUrl;
    } else {
      image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
    }

    // Parse highlights if sent as string or array
    let parsedHighlights = [];
    if (typeof highlights === "string") {
      try {
        parsedHighlights = JSON.parse(highlights);
      } catch (e) {
        parsedHighlights = highlights.split(",").map((h) => h.trim()).filter(Boolean);
      }
    } else if (Array.isArray(highlights)) {
      parsedHighlights = highlights;
    }

    const places = readData(PLACES_FILE);
    const newPlace = {
      id: Date.now(),
      name: name.trim(),
      country: country.trim(),
      price: price ? (price.startsWith("$") ? price : `$${price}`) : "$799",
      rating: parseFloat(rating) || 4.8,
      category: category || "General",
      description: description || "Explore this breathtaking destination with GoTravel curated packages.",
      bestTimeToVisit: bestTimeToVisit || "All year round",
      highlights: parsedHighlights,
      image,
      createdAt: new Date().toISOString(),
    };

    places.unshift(newPlace);
    writeData(PLACES_FILE, places);

    res.status(201).json({
      success: true,
      message: "Tourist place created successfully!",
      data: {
        ...newPlace,
        image: getFullImageUrl(req, newPlace.image),
      },
    });
  } catch (err) {
    console.error("Error creating tourist place:", err);
    res.status(500).json({ success: false, message: "Server error creating tourist place" });
  }
});

// ==========================================
// 4. UPDATE TOURIST PLACE
// ==========================================
router.put("/:id", upload.single("image"), (req, res) => {
  try {
    const places = readData(PLACES_FILE);
    const index = places.findIndex((p) => String(p.id) === String(req.params.id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Tourist place not found" });
    }

    const current = places[index];
    const {
      name,
      country,
      price,
      rating,
      category,
      description,
      bestTimeToVisit,
      highlights,
      imageUrl,
    } = req.body;

    let image = current.image;
    if (req.file) {
      // Remove old local file if it exists
      if (current.image && current.image.startsWith("/uploads/")) {
        const oldFile = path.join(uploadDir, path.basename(current.image));
        if (fs.existsSync(oldFile)) {
          fs.unlinkSync(oldFile);
        }
      }
      image = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      image = imageUrl;
    }

    let parsedHighlights = current.highlights;
    if (highlights) {
      if (typeof highlights === "string") {
        try {
          parsedHighlights = JSON.parse(highlights);
        } catch (e) {
          parsedHighlights = highlights.split(",").map((h) => h.trim()).filter(Boolean);
        }
      } else if (Array.isArray(highlights)) {
        parsedHighlights = highlights;
      }
    }

    const updatedPlace = {
      ...current,
      name: name ? name.trim() : current.name,
      country: country ? country.trim() : current.country,
      price: price ? (price.startsWith("$") ? price : `$${price}`) : current.price,
      rating: rating ? parseFloat(rating) : current.rating,
      category: category || current.category,
      description: description || current.description,
      bestTimeToVisit: bestTimeToVisit || current.bestTimeToVisit,
      highlights: parsedHighlights,
      image,
      updatedAt: new Date().toISOString(),
    };

    places[index] = updatedPlace;
    writeData(PLACES_FILE, places);

    res.json({
      success: true,
      message: "Tourist place updated successfully!",
      data: {
        ...updatedPlace,
        image: getFullImageUrl(req, updatedPlace.image),
      },
    });
  } catch (err) {
    console.error("Error updating place:", err);
    res.status(500).json({ success: false, message: "Server error updating place" });
  }
});

// ==========================================
// 5. DELETE TOURIST PLACE
// ==========================================
router.delete("/:id", (req, res) => {
  try {
    const places = readData(PLACES_FILE);
    const place = places.find((p) => String(p.id) === String(req.params.id));

    if (!place) {
      return res.status(404).json({ success: false, message: "Tourist place not found" });
    }

    // Unlink local image file if present
    if (place.image && place.image.startsWith("/uploads/")) {
      const filePath = path.join(uploadDir, path.basename(place.image));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const filtered = places.filter((p) => String(p.id) !== String(req.params.id));
    writeData(PLACES_FILE, filtered);

    res.json({
      success: true,
      message: "Tourist place deleted successfully!",
    });
  } catch (err) {
    console.error("Error deleting place:", err);
    res.status(500).json({ success: false, message: "Server error deleting place" });
  }
});

export default router;
