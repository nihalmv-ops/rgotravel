import "./Booking.css";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Booking() {

  const location = useLocation();
  const navigate = useNavigate();

  const packageData = location.state?.packageData || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: packageData.title || "",
    date: "",
    travelers: 1,
    message: ""
  });

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  // Submit Booking
  const handleSubmit = (e) => {

    e.preventDefault();

    const booking = {

      id: Date.now(),

      ...packageData,

      ...form,

      status: "Confirmed"

    };

    const oldBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    oldBookings.push(booking);

    localStorage.setItem(
      "bookings",
      JSON.stringify(oldBookings)
    );

    alert("Booking Confirmed Successfully!");

    navigate("/my-bookings");

  };

  return (

    <section className="booking-page">

      <div className="booking-container">

        <h1>Book Your Dream Trip</h1>

        <p>
          Complete the form below to reserve your unforgettable journey.
        </p>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <select
            name="destination"
            value={form.destination}
            onChange={handleChange}
            required
          >

            <option value="">Select Destination</option>

            <option>Bali</option>
            <option>Dubai</option>
            <option>Maldives</option>
            <option>Paris</option>
            <option>Switzerland</option>

          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="travelers"
            placeholder="Number of Travelers"
            value={form.travelers}
            onChange={handleChange}
            required
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Special Request..."
            value={form.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">

            Confirm Booking

          </button>

        </form>

      </div>

    </section>

  );

}

export default Booking;