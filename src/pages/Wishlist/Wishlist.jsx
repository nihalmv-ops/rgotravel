import "./Wishlist.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  FaHeartBroken,
  FaMapMarkerAlt,
  FaStar
} from "react-icons/fa";

function Wishlist() {

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);

  const removeFromWishlist = (id) => {

    const updated = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updated);

  };

  return (

    <section className="wishlist-page">

      <div className="wishlist-container">

        <h1>My Wishlist ❤️</h1>

        <p>Your favorite destinations.</p>

        {wishlist.length === 0 ? (

          <div className="wishlist-empty">

            <FaHeartBroken size={70} />

            <h2>No destinations saved</h2>

            <p>
              Start exploring and save your favorite places.
            </p>

            <Link
              to="/#destinations"
              className="wishlist-btn"
            >
              Explore Destinations
            </Link>

          </div>

        ) : (

          <div className="wishlist-grid">

            {wishlist.map((item) => (

              <div
                className="wishlist-card"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="wishlist-content">

                  <h3>{item.name}</h3>

                  <p>
                    <FaMapMarkerAlt />
                    {item.country}
                  </p>

                  <p>
                    <FaStar />
                    {item.rating}
                  </p>

                  <div className="wishlist-bottom">

                    <h4>{item.price}</h4>

                    <div className="wishlist-actions">

                      <Link
                        to={`/destination/${item.id}`}
                        className="details-btn"
                      >
                        View
                      </Link>

                      <Link
                        to="/booking"
                        state={{
                          packageData: {
                            image: item.image,
                            title: item.name,
                            location: item.country,
                            price: item.price
                          }
                        }}
                        className="book-btn"
                      >
                        Book
                      </Link>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeFromWishlist(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

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