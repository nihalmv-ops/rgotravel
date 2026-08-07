import "./MyBookings.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEdit,
  FaBan,
  FaDownload,
  FaTrash
} from "react-icons/fa";

import { generateReceipt } from "../../utils/generateReceipt";

function MyBookings() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState(
    () => JSON.parse(localStorage.getItem("bookings")) || []
  );

  const updateBookings = (next) => {

    setBookings(next);

    localStorage.setItem("bookings", JSON.stringify(next));

  };

  const handleCancel = (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    const next = bookings.map((b) =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );

    updateBookings(next);

  };

  const handleRemove = (id) => {

    const confirmed = window.confirm(
      "Remove this booking permanently? This can't be undone."
    );

    if (!confirmed) return;

    const next = bookings.filter((b) => b.id !== id);

    updateBookings(next);

  };

  const handleEdit = (booking) => {

    navigate("/booking", { state: { editBooking: booking } });

  };

  

  const renderStatus = (status) => {

    if (status === "Cancelled") {

      return (
        <span className="cancelled">
          <FaTimesCircle />
          Cancelled
        </span>
      );

    }

    if (status === "Confirmed") {

      return (
        <span className="confirmed">
          <FaCheckCircle />
          Confirmed
        </span>
      );

    }

    return (
      <span className="pending">
        <FaClock />
        Pending
      </span>
    );

  };

  return (

    <section className="bookings-page">

      <div className="bookings-container">

        <h1>My Bookings</h1>

        <p>
          View all your upcoming travel bookings.
        </p>

        {bookings.length === 0 && (

          <p className="no-bookings">
            You have no bookings yet. Go book your next adventure!
          </p>

        )}

        <div className="bookings-grid">

          {bookings.map((trip) => (

            <div
              className="booking-card"
              key={trip.id}
            >

              <img
                src={trip.image}
                alt={trip.title}
              />

              <div className="booking-content">

                <h2>{trip.title}</h2>

                <p>

                  <FaMapMarkerAlt />

                  {trip.location || trip.title}

                </p>

                <p>

                  <FaCalendarAlt />

                  {trip.date}

                </p>

                <p>

                  <FaUsers />

                  {trip.travelers || trip.people}

                </p>

                <div className="booking-bottom">

                  <h3>{trip.price}</h3>

                  {renderStatus(trip.status)}

                </div>

                <div className="booking-actions">

                  <button
                    className="action-btn"
                    onClick={() => generateReceipt(trip)}
                  >
                    <FaDownload />
                    Receipt
                  </button>

                  {trip.status !== "Cancelled" && (

                    <>

                      <button
                        className="action-btn"
                        onClick={() => handleEdit(trip)}
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        className="action-btn danger"
                        onClick={() => handleCancel(trip.id)}
                      >
                        <FaBan />
                        Cancel
                      </button>

                    </>

                  )}

                  <button
                    className="action-btn danger"
                    onClick={() => handleRemove(trip.id)}
                  >
                    <FaTrash />
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default MyBookings;