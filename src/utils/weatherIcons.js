// Open-Meteo WMO weather codes -> emoji + short label
// https://open-meteo.com/en/docs (weather_code field)

export function getWeatherIcon(code) {

  if (code === 0) return { icon: "☀️", label: "Clear Sky" };

  if (code >= 1 && code <= 3) return { icon: "🌤", label: "Partly Cloudy" };

  if (code === 45 || code === 48) return { icon: "🌫", label: "Foggy" };

  if (code >= 51 && code <= 57) return { icon: "🌦", label: "Drizzle" };

  if (code >= 61 && code <= 67) return { icon: "🌧", label: "Rainy" };

  if (code >= 71 && code <= 77) return { icon: "❄️", label: "Snowy" };

  if (code >= 80 && code <= 82) return { icon: "🌦", label: "Rain Showers" };

  if (code >= 95 && code <= 99) return { icon: "⛈", label: "Thunderstorm" };

  return { icon: "🌍", label: "Unknown" };

}
