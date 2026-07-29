import "./Destinations.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaCloudSun } from "react-icons/fa";

import WeatherModal from "../WeatherModal/WeatherModal";

function DestinationCard({ id, image, name, country, rating, price }) {

  const [isFavorite, setIsFavorite] = useState(() => {

    const favorites =
      JSON.parse(localStorage.getItem("favoriteDestinations")) || [];

    return favorites.includes(id);

  });

  const [showWeather, setShowWeather] = useState(false);

  const toggleFavorite = () => {

    const favorites =
      JSON.parse(localStorage.getItem("favoriteDestinations")) || [];

    const next = isFavorite
      ? favorites.filter((itemId) => itemId !== id)
      : [...favorites, id];

    localStorage.setItem("favoriteDestinations", JSON.stringify(next));

    setIsFavorite(!isFavorite);

  };

  return (
    <div className="destination-card">

      <Link to={`/destination/${id}`}>
        <img src={image} alt={name} />
      </Link>

      <div
        className={`destination-favorite ${isFavorite ? "active" : ""}`}
        onClick={toggleFavorite}
      >
        <FaHeart />
      </div>

      <button
        className="destination-weather-btn"
        onClick={() => setShowWeather(true)}
        title="Check weather"
      >
        <FaCloudSun />
        Weather
      </button>

      <div className="card-content">

        <Link to={`/destination/${id}`} className="card-title-link">

          <h3>{name}</h3>
          <p>{country}</p>

        </Link>

        <span className="rating">⭐ {rating}</span>

      </div>

      <div className="card-footer">

        <h4>{price}</h4>

       <Link
        to="/booking"
        state={{
          packageData: {
            image,
            title: name,
            location: country,
            price
          }
        }}
       >
  <button className="book-btn">
    Book Now
  </button>
</Link>

      </div>

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
