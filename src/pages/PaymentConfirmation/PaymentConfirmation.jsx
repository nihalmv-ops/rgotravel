import "./PaymentConfirmation.css";

import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCreditCard,
  FaShieldAlt
} from "react-icons/fa";

function PaymentConfirmation() {

  const location = useLocation();
  const navigate = useNavigate();

  const { packageData, form, totalPrice } = location.state || {};

  const [processing, setProcessing] = useState(false);

  // If someone lands here directly without going through Booking, send them back
  if (!packageData || !form) {

    return (

      <section className="payment-page">

        <div className="payment-card">

          <h1>No booking in progress</h1>

          <p>Please select a trip and fill out the booking form first.</p>

          <Link to="/" className="pay-btn">
            Back to Home
          </Link>

        </div>

      </section>

    );

  }

  const handleConfirmPayment = () => {

    setProcessing(true);

    // Simulate a short payment-processing delay

    setTimeout(() => {

      const booking = {
        id: Date.now(),
        image: packageData.image,
        title: packageData.title,
        location: packageData.location,
        days: packageData.days,
        people: packageData.people,
        price: `$${totalPrice}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        travelers: form.travelers,
        payment: form.payment,
        message: form.message,
        status: "Confirmed"
      };

      const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      bookings.push(booking);

      localStorage.setItem("bookings", JSON.stringify(bookings));

      navigate("/booking-success", { state: { booking } });

    }, 1400);

  };

  return (

    <section className="payment-page">

      <div className="payment-card">

        <h1>Confirm & Pay</h1>

        <p>Review your trip details before completing payment.</p>

        <div className="payment-trip">

          <img src={packageData.image} alt={packageData.title} />

          <div>

            <h2>{packageData.title}</h2>

            <p>
              <FaMapMarkerAlt />
              {packageData.location}
            </p>

          </div>

        </div>

        <div className="payment-details">

          <div>
            <FaCalendarAlt />
            <span>{form.date}</span>
          </div>

          <div>
            <FaUsers />
            <span>{form.travelers} Traveler(s)</span>
          </div>

          <div>
            <FaCreditCard />
            <span>{form.payment}</span>
          </div>

        </div>

        <div className="payment-total">

          <span>Total Amount</span>

          <h2>${totalPrice}</h2>

        </div>

        <button
          className="pay-btn"
          onClick={handleConfirmPayment}
          disabled={processing}
        >

          {processing ? "Processing Payment..." : `Pay $${totalPrice} Now`}

        </button>

        <p className="secure-note">
          <FaShieldAlt />
          This is a demo checkout — no real payment is processed.
        </p>

      </div>

    </section>

  );

}

export default PaymentConfirmation;