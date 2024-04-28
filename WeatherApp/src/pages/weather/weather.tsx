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
      getWeather(); // Hämtar väder när komponent mountas/en stad ändras
    }
  }, [unit, city, userPosition.latitude, userPosition.longitude]);

  const handleSearch = () => {
    getWeather();
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const toggleUnit = () => {
    //utseendet ändras när man togglar så att man kan välja mellan celsius och fahrenheit
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  // 5-dagars väderlek
  const getUniqueDaysForecast = (weatherData: any) => {
    const forecasts = weatherData.list;
    const uniqueDays: any[] = [];

    forecasts.forEach((forecast: any) => {
      const forecastDate = new Date(forecast.dt * 1000).toDateString();
      if (
        !uniqueDays.find(
          (day: any) => new Date(day.dt * 1000).toDateString() === forecastDate
        )
      ) {
        uniqueDays.push(forecast);
      }
    });

    return uniqueDays.slice(0, 5); // returnerar 5 första dagarna i arrayen
  };

  return (
    <div
      className="container bg-grey-lightest mx-auto shadow rounded pb-4 bg-contain"
      style={{
        color: "black",
        backgroundColor: "white",
      }}
    >
      <div className="grid grid-cols-3 gap-6">
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

        <button onClick={toggleUnit} className="">
          Switch to {unit === "metric" ? "°Fahrenheit" : "°Celsius"}
        </button>
      </div>
      <br></br>
      <br></br>

      {error && <p>Error: {error}</p>}
      {weather && (
        <>
          <div>
            <p>
              Location📍: {weather.city.name}, {weather.city.country}
            </p>
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
            <p className="pb-4">Current forecast ⛅ </p>
            <div className="grid grid-cols-1 gap-4">
              {weather.list.slice(0, 5).map((entry: any) => (
                <div
                  key={entry.dt}
                  className="border border-gray-300 rounded p-2 shadow hover:shadow-md transition-shadow duration-300 hover:bg-gray-100"
                >
                  <div className="flex flex-row justify-between items-center space-x-4">
                    <p>Date: {new Date(entry.dt * 1000).toLocaleString()}</p>
                    <p>
                      Temperature🌡: {entry.main.temp}
                      {unit === "metric" ? "°C" : "°F"}
                    </p>
                    <p>Wind 💨: {entry.wind.speed} m/s</p>
                    <p>Humidity 💧: {entry.main.humidity}%</p>
                    {/* <p>Description: {entry.weather[0].description}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <br></br>
          <br></br>
          <div>
            <p className="pb-4">5-Day Forecast: 📅</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {getUniqueDaysForecast(weather).map((entry: any) => (
                <div
                  key={entry.dt}
                  className="border border-gray-300 rounded p-2 shadow hover:shadow-md transition-shadow duration-300 hover:bg-gray-100"
                >
                  <p>Date: {new Date(entry.dt * 1000).toLocaleString()}</p>
                  <p>
                    Temperature🌡: {entry.main.temp}
                    {unit === "metric" ? "°C" : "°F"}
                  </p>
                  <p>Wind 💨: {entry.wind.speed} m/s</p>
                  <p>Humidity 💧: {entry.main.humidity}%</p>
                  <p>Description: {entry.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
