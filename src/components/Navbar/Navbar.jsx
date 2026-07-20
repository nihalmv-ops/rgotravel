import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">

      <div className="container">

        {/* Logo */}
        <div className="logo">
          GoTravel
        </div>

        {/* Desktop Menu */}
     <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>

  <Link to="/" onClick={() => setMenuOpen(false)}>
    Home
  </Link>

  <a href="/#destinations" onClick={() => setMenuOpen(false)}>
    Destinations
  </a>

  <a href="/#packages" onClick={() => setMenuOpen(false)}>
    Packages
  </a>

  <a href="/#about" onClick={() => setMenuOpen(false)}>
    About
  </a>

  <Link to="/gallery" onClick={() => setMenuOpen(false)}>
    Gallery
  </Link>

  <Link to="/contact" onClick={() => setMenuOpen(false)}>
    Contact
  </Link>

</nav>

        {/* Mobile Icon */}
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