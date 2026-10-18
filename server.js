import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import placesRouter from "./routes/places.js";
import packagesRouter from "./routes/packages.js";
import bookingsRouter from "./routes/bookings.js";
import uploadRouter from "./routes/upload.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Vercel production frontend and local development
app.use(
  cors({
    origin: "*", // Allows https://rgotravel.vercel.app, localhost:5173, localhost:5174
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount API routes
app.use("/api/places", placesRouter);
app.use("/api/destinations", placesRouter); // Alias so both work identically
app.use("/api/packages", packagesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/upload", uploadRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "GoTravel Backend API",
    time: new Date().toISOString(),
    endpoints: [
      "/api/places",
      "/api/destinations",
      "/api/packages",
      "/api/bookings",
      "/api/upload",
    ],
  });
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>GoTravel Backend API</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; }
          .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; max-width: 600px; }
          a { color: #38bdf8; text-decoration: none; font-weight: bold; }
          code { background: #0f172a; padding: 2px 8px; border-radius: 6px; color: #38bdf8; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>✈️ GoTravel REST API Server is Running</h2>
          <p>Connected to GoTravel Client (<a href="https://rgotravel.vercel.app" target="_blank">rgotravel.vercel.app</a>) and GoTravel Admin.</p>
          <ul>
            <li>Tourist Places API: <a href="/api/places" target="_blank"><code>/api/places</code></a></li>
            <li>Tour Packages API: <a href="/api/packages" target="_blank"><code>/api/packages</code></a></li>
            <li>Bookings API: <a href="/api/bookings" target="_blank"><code>/api/bookings</code></a></li>
            <li>Health Check: <a href="/api/health" target="_blank"><code>/api/health</code></a></li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

// Multer and general error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum image size is 10MB.",
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err) {
    console.error("Unhandled server error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }

  next();
});

const server = app.listen(PORT, () => {
  console.log(`🚀 GoTravel Backend API running on port ${PORT}`);
  console.log(`🔗 Local API: http://localhost:${PORT}/api/places`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error(`💡 Tip: Run 'Stop-Process -Name node -Force' or change PORT in .env.`);
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});
