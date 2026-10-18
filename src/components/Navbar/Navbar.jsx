import "./Navbar.css";

import { useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();

  const closeMenu = () => {
    setMenuOpen(false);
    setShowProfile(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const profilePic = localStorage.getItem("profilePicture");
  const profileName = localStorage.getItem("profileName")?.trim().split(" ")[0] || "Nihal";

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
            <div className="profile-menu" ref={dropdownRef}>
              <button
                className="profile-btn"
                onClick={() => setShowProfile((prev) => !prev)}
                type="button"
                aria-expanded={showProfile}
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full object-cover border border-sky-400 shrink-0"
                  />
                ) : (
                  <FaUserCircle className="avatar" />
                )}

                <span>{profileName}</span>

                <FaChevronDown
                  className={`transition-transform duration-200 ${
                    showProfile ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProfile && (
                <div className="dropdown">
                  <Link to="/profile" onClick={closeMenu}>
                    <FaUser />
                    Profile
                  </Link>

                  <Link to="/my-bookings" onClick={closeMenu}>
                    <FaSuitcase />
                    My Bookings
                  </Link>

                  <Link to="/wishlist" onClick={closeMenu}>
                    <FaHeart />
                    Wishlist
                  </Link>

                  <a href="/#testimonials" onClick={closeMenu}>
                    <FaStar />
                    Reviews
                  </a>

                  <Link to="/payment-confirmation" onClick={closeMenu}>
                    <FaCreditCard />
                    Payments
                  </Link>

                  <Link to="/notifications" onClick={closeMenu}>
                    <FaBell />
                    Notifications
                  </Link>

                  <Link to="/settings" onClick={closeMenu}>
                    <FaCog />
                    Settings
                  </Link>

                  <Link to="/contact" onClick={closeMenu}>
                    <FaQuestionCircle />
                    Help Center
                  </Link>

                  <button onClick={handleLogout} type="button">
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
          role="button"
          tabIndex={0}
          aria-label="Toggle Navigation Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;