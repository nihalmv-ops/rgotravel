import "./Booking.css";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Booking() {

  const location = useLocation();
  const navigate = useNavigate();

  // If we came here from "Edit Booking" on My Bookings, this will be set
  const editBooking = location.state?.editBooking || null;

  const isEditing = Boolean(editBooking);

  const packageData = isEditing
    ? {
        image: editBooking.image,
        title: editBooking.title,
        location: editBooking.location,
        price: editBooking.price
      }
    : location.state?.packageData || {};

  const [form, setForm] = useState({
    name: editBooking?.name || "",
    email: editBooking?.email || "",
    phone: editBooking?.phone || "",
    date: editBooking?.date || "",
    travelers: editBooking?.travelers || 1,
    payment: editBooking?.payment || "Card",
    message: editBooking?.message || ""
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

    if (isEditing) {

      // Update the existing booking in place, no payment step needed

      const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      const updated = bookings.map((b) =>
        b.id === editBooking.id
          ? {
              ...b,
              name: form.name,
              email: form.email,
              phone: form.phone,
              date: form.date,
              travelers: form.travelers,
              payment: form.payment,
              message: form.message,
              price: `$${totalPrice}`
            }
          : b
      );

      localStorage.setItem("bookings", JSON.stringify(updated));

      navigate("/my-bookings");

      return;

    }

    // New booking: go to payment confirmation before saving anything

    navigate("/payment-confirmation", {
      state: {
        packageData,
        form,
        totalPrice
      }
    });

  };

  return (

    <section className="booking-page">

      <div className="booking-container">

        <h1>
          {isEditing ? "Edit Your Booking" : "Book Your Dream Trip"}
        </h1>

        <p>
          {isEditing
            ? "Update your travel details below."
            : "Complete the form below to reserve your unforgettable journey."}
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

            {isEditing ? "Save Changes" : "Continue to Payment"}

          </button>

        </form>

      </div>

    </section>

  );

}

export default Booking;