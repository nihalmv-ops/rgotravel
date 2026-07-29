import "./Weather.css";

import { useState } from "react";
import { FaSearch, FaCloudSun } from "react-icons/fa";

import WeatherCard from "../../components/WeatherCard/WeatherCard";
import destinations from "../../data/destinations";

function Weather() {

  const [searchInput, setSearchInput] = useState("");
  const [customPlaces, setCustomPlaces] = useState([]);

  const handleSearch = (e) => {

    e.preventDefault();

    const trimmed = searchInput.trim();

    if (!trimmed) return;

    setCustomPlaces((prev) => [trimmed, ...prev]);

    setSearchInput("");

  };

  return (

    <section className="weather-page">

      <div className="weather-container">

        <div className="weather-intro">

          <FaCloudSun className="weather-page-icon" />

          <h1>Live Weather</h1>

          <p>Current conditions for our top destinations, updated in real time.</p>

        </div>

        <form className="weather-search" onSubmit={handleSearch}>

          <FaSearch />

          <input
            type="text"
            placeholder="Check weather for any city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button type="submit">Check</button>

        </form>

        {customPlaces.length > 0 && (

          <div className="weather-grid">

            {customPlaces.map((place, index) => (
              <WeatherCard key={`${place}-${index}`} place={place} />
            ))}

          </div>

        )}

        <h2 className="section-label">Our Destinations</h2>

        <div className="weather-grid">

          {destinations.map((place) => (
            <WeatherCard
              key={place.id}
              place={`${place.name}, ${place.country}`}
            />
          ))}

        </div>

      </div>

    </section>

  );

}

export default Weather;
