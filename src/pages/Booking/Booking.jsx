import "./Booking.css";
import { useState } from "react";

function Booking() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    travelers: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`
Booking Successful!

Name: ${form.name}
Destination: ${form.destination}
Travel Date: ${form.date}
Travelers: ${form.travelers}
    `);

    setForm({
      name: "",
      email: "",
      phone: "",
      destination: "",
      date: "",
      travelers: "",
      message: "",
    });
  };

  return (
    <section className="booking-page">

      <div className="booking-container">

        <h1>Book Your Dream Trip</h1>

        <p>
          Complete the form below to reserve your unforgettable journey.
        </p>

        <form className="booking-form" onSubmit={handleSubmit}>

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
            <option>Maldives</option>
            <option>Bali</option>
            <option>Dubai</option>
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
          />

          <button type="submit">
            Confirm Booking
          </button>

        </form>

      </div>

    </section>
  );
}

export default Booking;