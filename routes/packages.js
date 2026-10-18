import express from "express";
import { upload } from "../middleware/upload.js";
import { readData, writeData } from "../data/storage.js";

const router = express.Router();
const PACKAGES_FILE = "packages.json";

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

// GET all packages
router.get("/", (req, res) => {
  try {
    const packages = readData(PACKAGES_FILE);
    const enhanced = packages.map((pkg) => ({
      ...pkg,
      image: getFullImageUrl(req, pkg.image),
    }));
    res.json({ success: true, count: enhanced.length, data: enhanced });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching packages" });
  }
});

// POST package
router.post("/", upload.single("image"), (req, res) => {
  try {
    const { title, location, days, people, price, rating, imageUrl, featured } = req.body;

    if (!title || !location) {
      return res.status(400).json({ success: false, message: "Title and location are required." });
    }

    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      image = imageUrl;
    } else {
      image = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80";
    }

    const packages = readData(PACKAGES_FILE);
    const newPkg = {
      id: Date.now(),
      title: title.trim(),
      location: location.trim(),
      days: days || "5 Days",
      people: people || "2-8",
      price: price ? (price.startsWith("$") ? price : `$${price}`) : "$799",
      rating: rating || "4.9",
      image,
      featured: featured === "true" || featured === true,
      createdAt: new Date().toISOString(),
    };

    packages.unshift(newPkg);
    writeData(PACKAGES_FILE, packages);

    res.status(201).json({
      success: true,
      message: "Package created successfully!",
      data: { ...newPkg, image: getFullImageUrl(req, newPkg.image) },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating package" });
  }
});

// DELETE package
router.delete("/:id", (req, res) => {
  try {
    const packages = readData(PACKAGES_FILE);
    const filtered = packages.filter((p) => String(p.id) !== String(req.params.id));
    writeData(PACKAGES_FILE, filtered);
    res.json({ success: true, message: "Package deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting package" });
  }
});

export default router;
