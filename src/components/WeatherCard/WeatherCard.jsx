import "./WeatherCard.css";

import { useState, useEffect } from "react";
import { FaTint, FaWind, FaSyncAlt } from "react-icons/fa";

import { getWeatherIcon } from "../../utils/weatherIcons";

function WeatherCard({ place }) {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {

    setLoading(true);
    setError(false);

    try {

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1`
      );

      const geoData = await geoRes.json();

      const location = geoData.results?.[0];

      if (!location) {

        setError(true);
        setLoading(false);

        return;

      }

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );

      const weatherData = await weatherRes.json();

      setWeather({
        temp: Math.round(weatherData.current.temperature_2m),
        humidity: weatherData.current.relative_humidity_2m,
        wind: Math.round(weatherData.current.wind_speed_10m),
        code: weatherData.current.weather_code,
        resolvedName: location.name,
        country: location.country
      });

      setLoading(false);

    } catch {

      setError(true);
      setLoading(false);

    }

  };

  useEffect(() => {

    fetchWeather();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  if (loading) {

    return (

      <div className="weather-card loading">
        <p>Loading weather for {place}...</p>
      </div>

    );

  }

  if (error || !weather) {

    return (

      <div className="weather-card error">

        <p>Couldn't load weather for "{place}".</p>

        <button onClick={fetchWeather}>
          <FaSyncAlt />
          Retry
        </button>

      </div>

    );

  }

  const { icon, label } = getWeatherIcon(weather.code);

  return (

    <div className="weather-card">

      <div className="weather-top">

        <h3>
          {icon} {weather.resolvedName}
        </h3>

        <button
          className="refresh-btn"
          onClick={fetchWeather}
          title="Refresh"
        >
          <FaSyncAlt />
        </button>

      </div>

      <p className="weather-country">{weather.country}</p>

      <div className="weather-temp">
        {weather.temp}°C
      </div>

      <p className="weather-condition">{label}</p>

      <div className="weather-stats">

        <span>
          <FaTint />
          Humidity {weather.humidity}%
        </span>

        <span>
          <FaWind />
          Wind {weather.wind} km/h
        </span>

      </div>

    </div>

  );

}

export default WeatherCard;
