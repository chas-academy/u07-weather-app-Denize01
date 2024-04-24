import { useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";

const GeolocationComponent = () => {
  //   const [userPosition, setUserPosition] = useState<{
  //     latitude: number;
  //     longitude: number;
  //   } | null>(null);

  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const [status, setStatus]: any = useState(null);

  //om vi har ett navigatorobjekt i vår browser så funkar funktionen. man kommer åt browserns API (pop up, vill du tillåta dela din position. om ja, då får man utfall nummer 1.)
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Loading");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  return (
    <>
      <button onClick={() => getLocation()}>Get location</button>
      <h2>Coordinates</h2>
      {status && <p>{status}</p>}
      {userPosition?.latitude && <p>Latitude:{userPosition?.latitude}</p>}
      {userPosition?.longitude && <p>Longitude:{userPosition?.longitude}</p>}
    </>
  );
};

export default GeolocationComponent;
