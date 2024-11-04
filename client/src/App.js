import './App.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { useState, useEffect } from 'react';

function Routing({ origin, end, setTime, setDist }) {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    if (!map || !origin || !end) return;

    if (routingControl) {
      routingControl.remove();
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(origin.lat, origin.lon),
        L.latLng(end.lat, end.lon)
      ],
      routeWhileDragging: true
    }).on('routesfound', function (e) {
      const route = e.routes[0];
      setDist(route.summary.totalDistance); // Distance in meters
      setTime(route.summary.totalTime); // Time in seconds
    }).addTo(map);

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
  const [origin, setOrigin] = useState({ lat: 42.592026, lon: -71.37071483211594 });
  const [end, setEnd] = useState({ lat: 42.592026, lon: -101.37071483211594 });
  const [mode, setMode] = useState(1);
  const [time, setTime] = useState(-1);
  const [dist, setDist] = useState(-1);

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
      }
    });
    return null;
  };

  return (
    <div className="App" style={{ position: 'relative' }}>
      {/* Card Component */}

      {/* Walking */}
      <div className="card-overlay left-5 bottom-5" id='walk'>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Walking</h5>
          <ul className='list-none text-white text-left'>
            <li>Distance: 100km</li>
            <li>Time: 24hr 13m</li>
            <li>Cost: $54</li>
            <li>CO2 Score: 4.5/100 </li>
          </ul>
        </a>
      </div>

      {/* Bike */}
      <div className="card-overlay left-5 bottom-5" id='bike'>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Walking</h5>
          <ul className='list-none text-white text-left'>
            <li>Distance: 100km</li>
            <li>Time: 24hr 13m</li>
            <li>Cost: $54</li>
            <li>CO2 Score: 4.5/100 </li>
          </ul>
        </a>
      </div>


      {/* Train */}
      <div className="card-overlay left-5 bottom-5" id='train'>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Walking</h5>
          <ul className='list-none text-white text-left'>
            <li>Distance: 100km</li>
            <li>Time: 24hr 13m</li>
            <li>Cost: $54</li>
            <li>CO2 Score: 4.5/100 </li>
          </ul>
        </a>
      </div>
      
      {/* Bus */}
      <div className="card-overlay left-5 bottom-5" id='walk'>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Walking</h5>
          <ul className='list-none text-white text-left'>
            <li>Distance: 100km</li>
            <li>Time: 24hr 13m</li>
            <li>Cost: $54</li>
            <li>CO2 Score: 4.5/100 </li>
          </ul>
        </a>
      </div>

      {/* Uber */}
      <div className="card-overlay left-5 bottom-5" id='walk'>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Walking</h5>
          <ul className='list-none text-white text-left'>
            <li>Distance: 100km</li>
            <li>Time: 24hr 13m</li>
            <li>Cost: $54</li>
            <li>CO2 Score: 4.5/100 </li>
          </ul>
        </a>
      </div>

      {/* Car */}
            <div className="card-overlay left-5 bottom-5" id='walk'>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Walking</h5>
          <ul className='list-none text-white text-left'>
            <li>Distance: 100km</li>
            <li>Time: 24hr 13m</li>
            <li>Cost: $54</li>
            <li>CO2 Score: 4.5/100 </li>
          </ul>
        </a>
      </div>

      {/* Map Container */}
      <MapContainer 
        center={[57.7, 11.95]}  
        zoom={10}               
        scrollWheelZoom={true} 
        minZoom={3} 
        worldCopyJump={true}
        maxBounds={[[-85, -Infinity], [85, Infinity]]}
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
        <Routing origin={origin} end={end} setTime={setTime} setDist={setDist} />
      </MapContainer>
      
    </div>
  );
}

export default App;