import "./Destinations.css";
import DestinationCard from "./DestinationCard";
import destinations from "../../data/destinations";

function Destinations() {
  return (
    <section className="destinations" id="destinations">

      <div className="section-title">

        <p>POPULAR DESTINATIONS</p>

        <h2>Explore Amazing Places</h2>

      </div>

      <div className="destination-grid">

        {destinations.map((place) => (
          <DestinationCard
            key={place.id}
            {...place}
          />
        ))}

      </div>

    </section>
  );
}

export default Destinations;