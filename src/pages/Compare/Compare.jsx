import "./Compare.css";

import { useState, useEffect } from "react";
import { FaStar, FaHotel, FaListUl, FaTag, FaCloudSun } from "react-icons/fa";

import destinations from "../../data/destinations";
import destinationDetails from "../../data/destinationDetails";
import { getWeatherIcon } from "../../utils/weatherIcons";

async function fetchWeather(place) {

  try {

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1`
    );

    const geoData = await geoRes.json();

    const location = geoData.results?.[0];

    if (!location) return null;

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code`
    );

    const weatherData = await weatherRes.json();

    return {
      temp: Math.round(weatherData.current.temperature_2m),
      code: weatherData.current.weather_code
    };

  } catch {

    return null;

  }

}

function Compare() {

  const [leftId, setLeftId] = useState(destinations[0].id);
  const [rightId, setRightId] = useState(destinations[2].id);

  const [leftWeather, setLeftWeather] = useState(null);
  const [rightWeather, setRightWeather] = useState(null);

  const left = destinations.find((d) => d.id === Number(leftId));
  const right = destinations.find((d) => d.id === Number(rightId));

  const leftDetails = destinationDetails[leftId];
  const rightDetails = destinationDetails[rightId];

  useEffect(() => {

    setLeftWeather(null);

    fetchWeather(`${left.name}, ${left.country}`).then(setLeftWeather);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftId]);

  useEffect(() => {

    setRightWeather(null);

    fetchWeather(`${right.name}, ${right.country}`).then(setRightWeather);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightId]);

  const avgHotelPrice = (hotels) => {

    const prices = hotels.map((h) => Number(h.price.replace(/[^0-9]/g, "")));

    return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  };

  return (

    <section className="compare-page">

      <div className="compare-container">

        <div className="compare-intro">

          <h1>Compare Destinations</h1>

          <p>Pick two destinations to compare price, weather, hotels, and more.</p>

        </div>

        <div className="compare-selectors">

          <select value={leftId} onChange={(e) => setLeftId(e.target.value)}>

            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}

          </select>

          <span className="vs">VS</span>

          <select value={rightId} onChange={(e) => setRightId(e.target.value)}>

            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}

          </select>

        </div>

        <div className="compare-table">

          {/* HEADER ROW */}

          <div className="compare-row header-row">

            <div className="row-label"></div>

            <div className="col-name">

              <img src={left.image} alt={left.name} />

              <h3>{left.name}</h3>

            </div>

            <div className="col-name">

              <img src={right.image} alt={right.name} />

              <h3>{right.name}</h3>

            </div>

          </div>

          {/* PRICE */}

          <div className="compare-row">

            <div className="row-label"><FaTag /> Price</div>

            <div className="col-value">{left.price}</div>

            <div className="col-value">{right.price}</div>

          </div>

          {/* WEATHER */}

          <div className="compare-row">

            <div className="row-label"><FaCloudSun /> Weather</div>

            <div className="col-value">

              {leftWeather ? (
                `${getWeatherIcon(leftWeather.code).icon} ${leftWeather.temp}°C`
              ) : (
                "Loading..."
              )}

            </div>

            <div className="col-value">

              {rightWeather ? (
                `${getWeatherIcon(rightWeather.code).icon} ${rightWeather.temp}°C`
              ) : (
                "Loading..."
              )}

            </div>

          </div>

          {/* HOTELS */}

          <div className="compare-row">

            <div className="row-label"><FaHotel /> Avg. Hotel Price</div>

            <div className="col-value">
              ${avgHotelPrice(leftDetails.hotels)}/night
            </div>

            <div className="col-value">
              ${avgHotelPrice(rightDetails.hotels)}/night
            </div>

          </div>

          {/* ACTIVITIES */}

          <div className="compare-row">

            <div className="row-label"><FaListUl /> Activities</div>

            <div className="col-value">
              {leftDetails.thingsToDo.length} things to do
            </div>

            <div className="col-value">
              {rightDetails.thingsToDo.length} things to do
            </div>

          </div>

          {/* RATING */}

          <div className="compare-row">

            <div className="row-label"><FaStar /> Rating</div>

            <div className="col-value">⭐ {left.rating}</div>

            <div className="col-value">⭐ {right.rating}</div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Compare;
