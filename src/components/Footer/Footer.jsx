import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* Company */}

        <div className="footer-col">

          <h2 className="footer-logo">

            GoTravel

          </h2>

          <p>

            Explore breathtaking destinations around the world with GoTravel.
            We make every journey memorable.

          </p>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-col">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>

        </div>

        {/* Contact */}

        <div className="footer-col">

          <h3>Contact</h3>

          <p>

            <FaMapMarkerAlt />

            Malappuram, Kerala

          </p>

          <p>

            <FaPhoneAlt />

            +91 98765 43210

          </p>

          <p>

            <FaEnvelope />

            info@gotravel.com

          </p>

        </div>

        {/* Newsletter */}

        <div className="footer-col">

          <h3>Newsletter</h3>

          <p>

            Subscribe for travel offers & updates.

          </p>

          <div className="newsletter">

            <input
              type="email"
              placeholder="Your Email"
            />

            <button>

              <FaPaperPlane />

            </button>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 GoTravel. All Rights Reserved.

      </div>

    </footer>

  );

}

export default Footer;