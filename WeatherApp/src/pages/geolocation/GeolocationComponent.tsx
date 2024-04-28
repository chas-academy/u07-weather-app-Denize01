import { useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";

const GeolocationComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const [status, setStatus] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  const fetchLocationName = async (latitude: number, longitude: number) => {
    const apiKey = "c7337c8c72836fe55ef8e53f3e04cbef"; // OpenWeatherMap API key
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        setLocationName(`${data[0].name}, ${data[0].country}`);
      } else {
        setLocationName("No location found");
      }
    } catch (error) {
      console.error("Failed to fetch location name", error);
      setLocationName("Failed to fetch location");
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchLocationName(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <>
      <button onClick={getLocation}>Get Your Location</button>
      <h2> </h2>
      {status && <p>{status}</p>}
      {locationName && <p>Your location 📍: {locationName}</p>}
      {userPosition?.latitude && <p>Latitude: {userPosition?.latitude}</p>}
      {userPosition?.longitude && <p>Longitude: {userPosition?.longitude}</p>}
    </>
  );
};

export default GeolocationComponent;
