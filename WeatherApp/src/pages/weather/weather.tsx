import React, { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";

const Weather = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const [weather, setWeather] = useState<any>(null);
  const [unit, setUnit] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [city, setCity] = useState(""); // For search query
  const [error, setError] = useState("");

  // Function to fetch weather data
  const getWeather = async () => {
    const apiKey = "c7337c8c72836fe55ef8e53f3e04cbef";
    let url = `https://api.openweathermap.org/data/2.5/forecast?`;
    url += city
      ? `q=${city}`
      : `lat=${userPosition.latitude}&lon=${userPosition.longitude}`;
    url += `&units=${unit}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "200") {
        setWeather(data);
        setError("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch weather data", error);
      setError("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    if (userPosition.latitude && userPosition.longitude) {
      getWeather(); // Fetch weather when component mounts or unit/city changes
    }
  }, [unit, city, userPosition.latitude, userPosition.longitude]);

  const handleSearch = () => {
    getWeather();
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div
      className="container bg-grey-lightest mx-auto shadow rounded pb-4 bg-cover"
      style={{
        color: "#3887c7",
        backgroundColor: "#000000",
        backgroundImage:
          "url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTZlNmFicTl2NDgxc2oxcWZrdjhxN202Mm9tcjh1dWtkc3A5N3o5bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHGZkrolm9UgvM4/giphy.gif')",
      }}
    >
      <div className="grid grid-cols-3 gap-3">
        <input
          className="border-solid border-2 border-gray-600 rounded-md"
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch} className="">
          Search
        </button>
        <button onClick={toggleUnit}>
          Switch to {unit === "metric" ? "°Fahrenheit" : "°Celsius"}
        </button>
      </div>
      <br></br>
      <br></br>
      {error && <p>Error: {error}</p>}
      {weather && (
        <div>
          <h2>
            You are here 📍: {weather.city.name}, {weather.city.country}
          </h2>
          <p>
            Sunrise: 🌞{" "}
            {new Date(weather.city.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            Sunset: 🌄
            {new Date(weather.city.sunset * 1000).toLocaleTimeString()}
          </p>
          <br></br>
          <br></br>
          <div className="grid grid-cols-5 gap-4">
            {weather.list.slice(0, 5).map((entry: any) => (
              <div key={entry.dt}>
                <p>Date: {new Date(entry.dt * 1000).toLocaleString()}</p>
                <p>
                  Temperature 🌡:{entry.main.temp}{" "}
                  {unit === "metric" ? "°C" : "°F"}
                </p>
                <p>Wind 💨: {entry.wind.speed} m/s</p>
                <p>Humidity 💧 : {entry.main.humidity}%</p>
                <p>Description: {entry.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
