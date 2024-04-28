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
        <nav className="pb-8 border border-gray-300 rounded p-2">
          <h1>Weather ya at? 😎🌍</h1>
        </nav>
        <div className="pb-6">
          <br></br>
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
