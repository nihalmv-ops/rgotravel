import "./Destinations.css";

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

        <button>Book Now</button>

      </div>

    </div>
  );
}

export default DestinationCard;