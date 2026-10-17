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

  const photo = localStorage.getItem("profilePicture");
  const name = localStorage.getItem("profileName") || "Nihal MV";
  const email = localStorage.getItem("profileEmail") || "nihal@example.com";
  const phone = localStorage.getItem("profilePhone") || "+91 9876543210";
  const location = localStorage.getItem("profileLocation") || "Kerala, India";

  return (

    <section className="profile-page">

      <div className="profile-card">

        <div className="profile-top">

          {photo ? (

            <img
              src={photo}
              alt="Profile"
              className="profile-avatar-img"
            />

          ) : (

            <FaUserCircle className="profile-avatar" />

          )}

          <h2>{name}</h2>

          <p>{email}</p>

          <span className="premium">
            Premium Traveler
          </span>

        </div>

        <div className="profile-info">

          <div>

            <FaPhone />

            <span>{phone}</span>

          </div>

          <div>

            <FaEnvelope />

            <span>{email}</span>

          </div>

          <div>

            <FaMapMarkerAlt />

            <span>{location}</span>

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