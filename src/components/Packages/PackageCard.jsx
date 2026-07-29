import "./Packages.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaStar,
  FaCloudSun
} from "react-icons/fa";

import WeatherModal from "../WeatherModal/WeatherModal";

function PackageCard({
  id,
  image,
  title,
  location,
  days,
  people,
  price,
  rating
}) {

  const [isSaved, setIsSaved] = useState(() => {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    return wishlist.includes(id);

  });

  const [showWeather, setShowWeather] = useState(false);

  const toggleWishlist = () => {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const next = isSaved
      ? wishlist.filter((itemId) => itemId !== id)
      : [...wishlist, id];

    localStorage.setItem("wishlist", JSON.stringify(next));

    setIsSaved(!isSaved);

  };

  return (

    <div className="package-card">

      <div className="package-image">

        <img src={image} alt={title} />

        <div
          className={`wishlist ${isSaved ? "active" : ""}`}
          onClick={toggleWishlist}
        >
          <FaHeart />
        </div>

        <button
          className="package-weather-btn"
          onClick={() => setShowWeather(true)}
          title="Check weather"
        >
          <FaCloudSun />
          Weather
        </button>

      </div>

      <div className="package-content">

        <div className="top-row">

          <span>
            <FaStar />
            {rating}
          </span>

          <span>
            <FaMapMarkerAlt />
            {location}
          </span>

        </div>

        <h3>{title}</h3>

        <div className="info">

          <span>
            <FaClock />
            {days}
          </span>

          <span>
            <FaUsers />
            {people}
          </span>

        </div>

        <div className="bottom">

          <h2>{price}</h2>

          <Link
            to="/booking"
            state={{
              packageData: {
                image,
                title,
                location,
                days,
                people,
                price
              }
            }}
          >
            <button className="book-btn">
              Book Now
            </button>
          </Link>

        </div>

      </div>

      {showWeather && (

        <WeatherModal
          place={location}
          onClose={() => setShowWeather(false)}
        />

      )}

    </div>

  );

}

export default PackageCard;
