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
  date: "",
  travelers: 1,
  payment: "Card",
  message: ""
});


const price =
  Number(String(packageData.price || "$0").replace("$", ""));

const totalPrice = price * Number(form.travelers);

  

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const booking = {

      id: Date.now(),

      image: packageData.image,

      title: packageData.title,

      location: packageData.location,

      days: packageData.days,

      people: packageData.people,

      price: packageData.price,

      name: form.name,

      email: form.email,

      phone: form.phone,

      date: form.date,

      travelers: form.travelers,

      message: form.message,

      status: "Confirmed"

    };

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);

    localStorage.setItem(
      "bookings",
      JSON.stringify(bookings)
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

        {/* Selected Package */}

        <div className="booking-top">

  <img
    src={packageData.image}
    alt={packageData.title}
  />

  <div className="booking-summary">

    <h2>{packageData.title}</h2>

    <p>📍 {packageData.location}</p>

    <p>🗓 {packageData.days}</p>

    <h3>{packageData.price}</h3>

  </div>

</div>



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
            min="1"
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

          <div className="payment-box">

  <h3>Select Payment</h3>

  <label>

    <input
      type="radio"
      name="payment"
      value="Card"
      checked={form.payment === "Card"}
      onChange={handleChange}
    />

    Credit Card

  </label>

  <label>

    <input
      type="radio"
      name="payment"
      value="UPI"
      checked={form.payment === "UPI"}
      onChange={handleChange}
    />

    UPI

  </label>

  <label>

    <input
      type="radio"
      name="payment"
      value="PayPal"
      checked={form.payment === "PayPal"}
      onChange={handleChange}
    />

    PayPal

  </label>

</div>

<div className="total-price">

  <h2>

    Total: ${totalPrice}

  </h2>

</div>

          <button type="submit">

            Confirm Booking

          </button>

        </form>

      </div>

    </section>

  );

}

export default Booking;