import "./Navbar.css";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaCog,
  FaSuitcase,
  FaUser,
  FaHeart,
  FaStar,
  FaCreditCard,
  FaBell,
  FaQuestionCircle
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="container">

        {/* Logo */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          GoTravel
        </Link>

        {/* Navigation */}
        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <a href="/#destinations" onClick={closeMenu}>
            Destinations
          </a>

          <a href="/#packages" onClick={closeMenu}>
            Packages
          </a>

          <a href="/#about" onClick={closeMenu}>
            About
          </a>

          <NavLink to="/gallery" onClick={closeMenu}>
            Gallery
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          {user ? (

            <div className="profile-menu">

              <button
                className="profile-btn"
                onClick={() => setShowProfile(!showProfile)}
              >
                <FaUserCircle className="avatar" />

                <span>Nihal</span>

                <FaChevronDown />
              </button>

              {showProfile && (

         <div className="dropdown">

  <Link
    to="/profile"
    onClick={closeMenu}
  >
    <FaUser />
    Profile
  </Link>

  <Link
    to="/my-bookings"
    onClick={closeMenu}
  >
    <FaSuitcase />
    My Bookings
  </Link>

  <Link
    to="/wishlist"
    onClick={closeMenu}
  >
    <FaHeart />
    Wishlist
  </Link>

  <Link
    to="/reviews"
    onClick={closeMenu}
  >
    <FaStar />
    Reviews
  </Link>

  <Link
    to="/payments"
    onClick={closeMenu}
  >
    <FaCreditCard />
    Payments
  </Link>

  <Link
    to="/notifications"
    onClick={closeMenu}
  >
    <FaBell />
    Notifications
  </Link>

  <Link
    to="/settings"
    onClick={closeMenu}
  >
    <FaCog />
    Settings
  </Link>

  <Link
    to="/contact"
    onClick={closeMenu}
  >
    <FaQuestionCircle />
    Help Center
  </Link>

  <button onClick={handleLogout}>
    <FaSignOutAlt />
    Logout
  </button>

</div>

              )}

            </div>

          ) : (

            <Link
              to="/login"
              className="login-btn"
              onClick={closeMenu}
            >
              Login
            </Link>

          )}

        </nav>

        {/* Mobile Menu Icon */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </header>
  );
}

export default Navbar;