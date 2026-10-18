import express from "express";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file provided." });
  }

  const protocol = req.protocol;
  const host = req.get("host");
  const fullUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

  res.json({
    success: true,
    message: "Image uploaded successfully!",
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    url: fullUrl,
  });
});

export default router;
