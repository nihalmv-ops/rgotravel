import "./BookingSuccess.css";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

import { FaDownload, FaSuitcase } from "react-icons/fa";

import { generateReceipt } from "../../utils/generateReceipt";

function BookingSuccess() {

  const location = useLocation();

  const booking = location.state?.booking;

  useEffect(() => {

    if (!booking) return;

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift({

      id: Date.now(),

      type: "booking",

      title: "Booking Confirmed",

      message: `Your trip to ${booking.title} has been confirmed.`,

      date: new Date().toLocaleString()

    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

  }, [booking]);

  if (!booking) {

    return (

      <section className="success-page">

        <div className="success-card">

          <h1>No recent booking found</h1>

          <Link
            to="/"
            className="success-btn primary"
          >
            Back to Home
          </Link>

        </div>

      </section>

    );

  }

  return (

    <section className="success-page">

      <div className="success-card">

        <motion.div
          className="success-icon"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18
          }}
        >

          <motion.svg
            viewBox="0 0 52 52"
            className="checkmark"
          >

            <motion.circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              className="checkmark-circle"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />

            <motion.path
              fill="none"
              d="M14 27l7 7 16-16"
              className="checkmark-check"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5
              }}
            />

          </motion.svg>

        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Booking Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          Your trip to {booking.location || booking.title} is booked.
          A confirmation has been saved to your account.
        </motion.p>

        <motion.div
          className="success-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >

          <div>

            <span>Booking ID</span>

            <strong>{booking.id}</strong>

          </div>

          <div>

            <span>Trip</span>

            <strong>{booking.title}</strong>

          </div>

          <div>

            <span>Total Paid</span>

            <strong>{booking.price}</strong>

          </div>

        </motion.div>

        <motion.div
          className="success-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15 }}
        >

          <button
            className="success-btn"
            onClick={() => generateReceipt(booking)}
          >

            <FaDownload />

            Download Receipt

          </button>

          <Link
            to="/my-bookings"
            className="success-btn primary"
          >

            <FaSuitcase />

            View My Bookings

          </Link>

        </motion.div>

      </div>

    </section>

  );

}

export default BookingSuccess;