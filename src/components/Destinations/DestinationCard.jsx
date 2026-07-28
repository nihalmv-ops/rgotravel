import "./Destinations.css";
import { Link } from "react-router-dom";

function DestinationCard({ image, name, country, rating, price }) {
  return (
    <div className="destination-card">

      <img src={image} alt={name} />

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