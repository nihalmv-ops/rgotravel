import "./Destinations.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaCloudSun,
} from "react-icons/fa";

import WeatherModal from "../WeatherModal/WeatherModal";
import { addNotification } from "../../utils/notifications";
import { getImageUrl } from "../../services/api";

function DestinationCard({
  id,
  image,
  name,
  country,
  rating,
  price,
}) {
  const displayImage = getImageUrl(image);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favoriteDestinations")) || [];

    return favorites.includes(id);
  });

  const [showWeather, setShowWeather] = useState(false);

  const toggleFavorite = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favoriteDestinations")) || [];

    if (isFavorite) {
      const updated = favorites.filter(
        (itemId) => itemId !== id
      );

      localStorage.setItem(
        "favoriteDestinations",
        JSON.stringify(updated)
      );

      setIsFavorite(false);

      return;
    }

    const updated = [...favorites, id];

    localStorage.setItem(
      "favoriteDestinations",
      JSON.stringify(updated)
    );

    setIsFavorite(true);

    // Add notification
    addNotification({
      type: "wishlist",
      title: "❤️ Added to Wishlist",
      message: `${name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="destination-card">

      {/* Image */}
      <Link to={`/destination/${id}`}>
        <img
          src={displayImage}
          alt={name}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800";
          }}
        />
      </Link>

      {/* Favorite */}
      <button
        type="button"
        className={`destination-favorite ${
          isFavorite ? "active" : ""
        }`}
        onClick={toggleFavorite}
        aria-label={
          isFavorite
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        <FaHeart />
      </button>

      {/* Weather */}
      <button
        type="button"
        className="destination-weather-btn"
        onClick={() => setShowWeather(true)}
        title="Check weather"
      >
        <FaCloudSun />
        Weather
      </button>

      {/* Content */}
      <div className="card-content">

        <Link
          to={`/destination/${id}`}
          className="card-title-link"
        >
          <h3>{name}</h3>
          <p>{country}</p>
        </Link>

        <span className="rating">
          ⭐ {rating}
        </span>

      </div>

      {/* Footer */}
      <div className="card-footer">

        <h4>{price}</h4>

        <Link
          to="/booking"
          state={{
            packageData: {
              id,
              image: displayImage,
              title: name,
              location: country,
              price,
            },
          }}
        >
          <button
            type="button"
            className="book-btn"
          >
            Book Now
          </button>
        </Link>

      </div>

      {/* Weather Modal */}
      {showWeather && (
        <WeatherModal
          place={`${name}, ${country}`}
          onClose={() => setShowWeather(false)}
        />
      )}

    </div>
  );
}

export default DestinationCard;