import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";
// import { mockData } from "./weatherMock";

const Weather = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const [weather, setWeather]: any = useState(null);

  const getWeather = async () => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=c7337c8c72836fe55ef8e53f3e04cbef&units=metric`;
    const respons = await fetch(url);
    const result = await respons.json();
    console.log(result);
    setWeather(result);

    return weather;
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <button onClick={() => getWeather()}>Get weather</button>
      {weather && (
        <>
          <h2>
            {weather.city.name} -- {weather.city.country}{" "}
          </h2>
          {weather.list.map((element: any) => {
            const date = new Date((element.dt + weather.city.timezone) * 1000);
            return (
              <p>
                Date {date.toUTCString()}
                <br></br>Temp: {element.main.temp}
                <br></br>
                {element.weather[0].description}
              </p>
            );
          })}
        </>
      )}
    </>
  );
};

export default Weather;
