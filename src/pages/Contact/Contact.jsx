import "./Contact.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";

function Contact() {

  return (

    <section className="contact-page" id="contact">

      {/* Hero */}

      <div className="contact-hero">

        <h1>Contact Us</h1>

        <p>

          We'd love to hear from you.
          Let's plan your next adventure together.

        </p>

      </div>

      {/* Contact Container */}

      <div className="contact-container">

        {/* Left */}

        <div className="contact-info">

          <div className="info-card">

            <FaMapMarkerAlt />

            <h3>Location</h3>

            <p>
              Malappuram, Kerala, India
            </p>

          </div>

          <div className="info-card">

            <FaPhoneAlt />

            <h3>Phone</h3>

            <p>
              +91 98765 43210
            </p>

          </div>

          <div className="info-card">

            <FaEnvelope />

            <h3>Email</h3>

            <p>
              info@gotravel.com
            </p>

          </div>

          <div className="info-card">

            <FaClock />

            <h3>Working Hours</h3>

            <p>
              Mon - Sat
              <br />
              9:00 AM - 6:00 PM
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="contact-form">

          <h2>Send Message</h2>

          <form>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
            ></textarea>

            <button>

              Send Message

            </button>

          </form>

        </div>

      </div>

      {/* Map */}

      <div className="map-section">

        <iframe
          title="GoTravel Location"
          src="https://www.google.com/maps?q=Kerala,India&output=embed"
          loading="lazy"
        ></iframe>

      </div>

    </section>

  );

}

export default Contact;