import "./App.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { useState, useEffect } from "react";
import { Directions } from "./directions";
import { Cards } from "./cards";
import { LocationInput } from "./location";

function Routing({ origin, end, setTime, setDist, getCO2, setDirections }) {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);
  const typeList = ["walk", "bike", "car", "uber", "bus", "train"];
  useEffect(() => {
    if (!map || !origin || !end) return;

    if (routingControl) {
      routingControl.remove();
    }

    const control = L.Routing.control({
      waypoints: [L.latLng(origin.lat, origin.lon), L.latLng(end.lat, end.lon)],
      routeWhileDragging: true,
      fitSelectedRoutes: false,
    })
      .on("routesfound", function (e) {
        const route = e.routes[0];
        setDist(route.summary.totalDistance); // Distance in meters
        setTime(route.summary.totalTime); // Time in second
        setDirections(route.instructions);
        typeList.forEach((type) => {
          getCO2(type);
        });
      })
      .addTo(map);

    setRoutingControl(control);

    return () => {
      if (control) {
        control.remove();
      }
    };
  }, [map, origin, end, setTime, setDist]);

  return null;
}

function App() {
  const [origin, setOrigin] = useState({
    lat: 42.592026,
    lon: -71.37071483211594,
  });
  const [end, setEnd] = useState({ lat: 42.592026, lon: -101.37071483211594 });
  const [mode, setMode] = useState(1);
  const [time, setTime] = useState(-1);
  const [dist, setDist] = useState(-1);
  const [directions, setDirections] = useState([]);
  const [co2, setCO2] = useState({
    walk: 0,
    bike: 0,
    car: 0,
    uber: 0,
    bus: 0,
    train: 0,
  });
  const [showModal, setShowModal] = useState(true);

  const getCO2 = (type) => {
    const url = `https://greenmaps.vercel.app/emmisions?distance=${
      dist / 1000
    }&type=${type}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: "value" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCO2((prevCO2) => ({
          ...prevCO2,
          [type]: data,
        }));
        console.log(co2);
      })
      .catch((error) => console.error("Error: ", error));
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (mode) {
          setOrigin({ lat: e.latlng.lat, lon: e.latlng.lng });
          setMode(!mode);
        } else {
          setEnd({ lat: e.latlng.lat, lon: e.latlng.lng });
          setMode(!mode);
        }
      },
    });
    return null;
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 mod bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">This is a dev version, which is why the CO2 score is random. The API used to calculate the score is limited and I am on a free trial</h2>
            <h2 className="text-xl font-semibold mb-4">I also forgot to program the price calculator</h2>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Main App Content */}
      <Cards dist={dist} time={time} co2={co2} getCO2={getCO2}/>
      <LocationInput setOrigin={setOrigin} setEnd={setEnd} origin={origin}/>
      {/* Map Container */}
      <MapContainer
        center={[57.7, 11.95]}
        zoom={10}
        scrollWheelZoom={true}
        minZoom={3}
        worldCopyJump={true}
        maxBounds={[
          [-85, -Infinity],
          [85, Infinity],
        ]}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {origin && (
          <Marker position={[origin.lat, origin.lon]}>
            <Popup>Origin</Popup>
          </Marker>
        )}

        {end && (
          <Marker position={[end.lat, end.lon]}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        <MapClickHandler />
        <Routing
          origin={origin}
          end={end}
          setTime={setTime}
          setDist={setDist}
          getCO2={getCO2}
          setDirections={setDirections}
        />
      </MapContainer>
      {/* <Directions directions={directions} /> */}
    </div>
  );
}

export default App;
