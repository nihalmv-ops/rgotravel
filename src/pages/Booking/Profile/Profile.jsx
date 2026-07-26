import "./Profile.css";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSuitcase,
  FaHeart,
  FaCog,
  FaLock,
  FaSignOutAlt,
  FaEdit
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Profile() {

  const { logout } = useAuth();

  return (

    <section className="profile-page">

      <div className="profile-card">

        <div className="profile-top">

          <FaUserCircle className="profile-avatar" />

          <h2>Nihal MV</h2>

          <p>nihal@example.com</p>

          <span className="premium">
            Premium Traveler
          </span>

        </div>

        <div className="profile-info">

          <div>

            <FaPhone />

            <span>+91 9876543210</span>

          </div>

          <div>

            <FaEnvelope />

            <span>nihal@example.com</span>

          </div>

          <div>

            <FaMapMarkerAlt />

            <span>Kerala, India</span>

          </div>

        </div>

        <Link
          to="/edit-profile"
          className="edit-btn"
        >
          <FaEdit />
          Edit Profile
        </Link>

        <div className="profile-links">

          <Link to="/my-bookings">

            <FaSuitcase />

            My Bookings

          </Link>

          <Link to="/wishlist">

            <FaHeart />

            Wishlist

          </Link>

          <Link to="/settings">

            <FaCog />

            Settings

          </Link>

          <Link to="/change-password">

            <FaLock />

            Change Password

          </Link>

          <button
            onClick={logout}
            className="logout-btn"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </section>

  );

}

export default Profile;