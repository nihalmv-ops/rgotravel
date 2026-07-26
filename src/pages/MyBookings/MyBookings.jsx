import "./MyBookings.css";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

function MyBookings() {

  const bookings =
JSON.parse(
localStorage.getItem("bookings")
) || [];
  return (

    <section className="bookings-page">

      <div className="bookings-container">

        <h1>My Bookings</h1>

        <p>
          View all your upcoming travel bookings.
        </p>

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

                  {trip.title}

                </p>

                <p>

                  <FaCalendarAlt />

                  {trip.date}

                </p>

                <p>

                  <FaUsers />

                  {trip.people}

                </p>

                <div className="booking-bottom">

                  <h3>{trip.price}</h3>

                  {trip.status === "Confirmed" ? (

                    <span className="confirmed">

                      <FaCheckCircle />

                      Confirmed

                    </span>

                  ) : (

                    <span className="pending">

                      <FaClock />

                      Pending

                    </span>

                  )}

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