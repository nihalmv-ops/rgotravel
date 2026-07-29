import "./RecentlyViewed.css";

import { Link } from "react-router-dom";
import destinations from "../../data/destinations";

const STORAGE_KEY = "recentlyViewed";
const MAX_ITEMS = 5;

// Call this from a destination details page on mount to record a view.
export function recordRecentlyViewed(id) {

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const next = [id, ...existing.filter((itemId) => itemId !== id)].slice(
    0,
    MAX_ITEMS
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

}

function RecentlyViewed() {

  const ids = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const viewed = ids
    .map((id) => destinations.find((d) => d.id === id))
    .filter(Boolean);

  if (viewed.length === 0) return null;

  return (

    <section className="recently-viewed">

      <h2>Recently Viewed</h2>

      <div className="recently-viewed-grid">

        {viewed.map((place) => (

          <Link
            to={`/destination/${place.id}`}
            className="recently-viewed-card"
            key={place.id}
          >

            <img src={place.image} alt={place.name} />

            <span>{place.name}</span>

          </Link>

        ))}

      </div>

    </section>

  );

}

export default RecentlyViewed;
