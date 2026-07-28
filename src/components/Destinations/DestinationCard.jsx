import "./Destinations.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function DestinationCard({ id, image, name, country, rating, price }) {

  const [isFavorite, setIsFavorite] = useState(() => {

    const favorites =
      JSON.parse(localStorage.getItem("favoriteDestinations")) || [];

    return favorites.includes(id);

  });

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

      <img src={image} alt={name} />

      <div
        className={`destination-favorite ${isFavorite ? "active" : ""}`}
        onClick={toggleFavorite}
      >
        <FaHeart />
      </div>

      <div className="card-content">

        <div>
          <h3>{name}</h3>
          <p>{country}</p>
        </div>

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

    </div>
  );
}

export default DestinationCard;
