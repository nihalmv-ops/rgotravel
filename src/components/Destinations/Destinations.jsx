import "./Destinations.css";
import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";

import DestinationCard from "./DestinationCard";
import destinations from "../../data/destinations";

function Destinations() {

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("None");

  const countries = useMemo(() => {

    const unique = [...new Set(destinations.map((d) => d.country))];

    return unique;

  }, []);

  const getPrice = (price) => Number(String(price).replace("$", ""));

  const filteredDestinations = useMemo(() => {

    let result = destinations.filter((place) => {

      const matchesSearch =
        place.name.toLowerCase().includes(search.toLowerCase()) ||
        place.country.toLowerCase().includes(search.toLowerCase());

      const matchesCountry =
        country === "All" || place.country === country;

      const price = getPrice(place.price);

      const matchesPrice =
        priceRange === "All" ||
        (priceRange === "under800" && price < 800) ||
        (priceRange === "800to1200" && price >= 800 && price <= 1200) ||
        (priceRange === "above1200" && price > 1200);

      return matchesSearch && matchesCountry && matchesPrice;

    });

    if (sortBy === "ratingHigh") {

      result = [...result].sort((a, b) => b.rating - a.rating);

    } else if (sortBy === "priceLow") {

      result = [...result].sort(
        (a, b) => getPrice(a.price) - getPrice(b.price)
      );

    } else if (sortBy === "priceHigh") {

      result = [...result].sort(
        (a, b) => getPrice(b.price) - getPrice(a.price)
      );

    }

    return result;

  }, [search, country, priceRange, sortBy]);

  return (
    <section className="destinations" id="destinations">

      <div className="section-title">

        <p>POPULAR DESTINATIONS</p>

        <h2>Explore Amazing Places</h2>

      </div>

      <div className="destination-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >

          <option value="All">All Countries</option>

          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}

        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >

          <option value="All">All Prices</option>
          <option value="under800">Under $800</option>
          <option value="800to1200">$800 - $1200</option>
          <option value="above1200">Above $1200</option>

        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >

          <option value="None">Sort By</option>
          <option value="ratingHigh">Rating: High to Low</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>

        </select>

      </div>

      {filteredDestinations.length === 0 ? (

        <p className="no-results">
          No destinations match your search or filters.
        </p>

      ) : (

        <div className="destination-grid">

          {filteredDestinations.map((place) => (
            <DestinationCard
              key={place.id}
              {...place}
            />
          ))}

        </div>

      )}

    </section>
  );
}

export default Destinations;
