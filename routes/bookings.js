import express from "express";
import { readData, writeData } from "../data/storage.js";

const router = express.Router();
const BOOKINGS_FILE = "bookings.json";

// GET all bookings
router.get("/", (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
});

// POST new booking
router.post("/", (req, res) => {
  try {
    const {
      customer,
      name,
      email,
      phone,
      tour,
      title,
      destination,
      travelDate,
      date,
      guests,
      travelers,
      amount,
      price,
      paymentMethod,
      payment,
      message,
    } = req.body;

    const customerName = customer || name;
    if (!customerName || !email) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required.",
      });
    }

    const bookings = readData(BOOKINGS_FILE);
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customerName,
      name: customerName,
      email,
      phone: phone || "",
      tour: tour || title || destination || "Custom Tour",
      title: tour || title || destination || "Custom Tour",
      destination: destination || tour || "",
      travelDate: travelDate || date || new Date().toISOString().split("T")[0],
      date: travelDate || date || new Date().toISOString().split("T")[0],
      guests: Number(guests || travelers || 1),
      travelers: Number(guests || travelers || 1),
      amount: amount || price || "$799",
      price: amount || price || "$799",
      paymentMethod: paymentMethod || payment || "Credit Card",
      payment: paymentMethod || payment || "Credit Card",
      message: message || "",
      status: "Pending",
      bookedOn: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    writeData(BOOKINGS_FILE, bookings);

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully!",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving booking" });
  }
});

// PATCH / PUT update status
router.patch("/:id/status", (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required." });
    }

    const bookings = readData(BOOKINGS_FILE);
    const index = bookings.findIndex((b) => String(b.id) === String(req.params.id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    bookings[index].status = status;
    bookings[index].updatedAt = new Date().toISOString();
    writeData(BOOKINGS_FILE, bookings);

    res.json({
      success: true,
      message: `Booking status updated to ${status}!`,
      data: bookings[index],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating booking status" });
  }
});

// DELETE booking
router.delete("/:id", (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    const filtered = bookings.filter((b) => String(b.id) !== String(req.params.id));
    writeData(BOOKINGS_FILE, filtered);
    res.json({ success: true, message: "Booking deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting booking" });
  }
});

export default router;
