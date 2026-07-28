import "./Wishlist.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import packages from "../../data/packages";

import { FaHeartBroken, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Wishlist() {

  const [wishlistIds, setWishlistIds] = useState(
    () => JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {

    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));

  }, [wishlistIds]);

  const removeFromWishlist = (id) => {

    setWishlistIds((prev) => prev.filter((itemId) => itemId !== id));

  };

  const savedPackages = packages.filter((pkg) =>
    wishlistIds.includes(pkg.id)
  );

  return (

    <section className="wishlist-page">

      <div className="wishlist-container">

        <h1>My Wishlist</h1>

        <p>Trips you've saved for later.</p>

        {savedPackages.length === 0 ? (

          <div className="wishlist-empty">

            <FaHeartBroken />

            <p>Your wishlist is empty.</p>

            <Link to="/#packages" className="wishlist-btn">
              Explore Packages
            </Link>

          </div>

        ) : (

          <div className="wishlist-grid">

            {savedPackages.map((pkg) => (

              <div className="wishlist-card" key={pkg.id}>

                <img src={pkg.image} alt={pkg.title} />

                <div className="wishlist-content">

                  <h3>{pkg.title}</h3>

                  <p>
                    <FaMapMarkerAlt />
                    {pkg.location}
                  </p>

                  <p>
                    <FaClock />
                    {pkg.days}
                  </p>

                  <div className="wishlist-bottom">

                    <h4>{pkg.price}</h4>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(pkg.id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}

export default Wishlist;