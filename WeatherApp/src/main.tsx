import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import GeolocationComponent from "./pages/geolocation/GeolocationComponent.tsx";
import Weather from "./pages/weather/weather.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <>
        <div>
          <h1>Weather ya at? 😎</h1>
          <Link to="about">About</Link> | <Link to="app">App</Link> |{" "}
          <Link to="geolocation">Here you are! 😃 </Link> |{" "}
          <Link to="weather">Or you could be here! 😏</Link>
        </div>
        <Outlet></Outlet>
      </>
    ),
    children: [
      { path: "app", element: <App></App> },
      {
        path: "geolocation",
        element: <GeolocationComponent></GeolocationComponent>,
      },
      {
        path: "weather",
        element: <Weather></Weather>,
      },
      {
        path: "about",
        element: (
          <div>
            About Us <Link to="crew">Crew</Link> | <Link to="app">App</Link>
            <Outlet></Outlet>
          </div>
        ),
        children: [
          { path: "app", element: <p>More info about the app</p> },
          { path: "crew", element: <p>More info about the crew</p> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
