import './App.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { useState, useEffect } from 'react';



function Routing({ origin, end, setTime, setDist, getCO2 }) {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);
  const typeList = ["walk", "bike", "car", "uber", "bus", "train" ]
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
      setTime(route.summary.totalTime); // Time in second
      typeList.forEach(type => {
        getCO2(type)
      });
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
  const [co2, setCO2] = useState({
    "walk": 0,
    "bike": 0,
    "car": 0,
    "uber": 0,
    "bus": 0,
    "train": 0
  });


  const getCO2 = (type) => {
    const url = `http://localhost:8000/emmisions?distance=${dist / 1000}&type=${type}`;
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'value' })
    })
      .then(response => response.json())
      .then(data => {
        setCO2(prevCO2 => ({
          ...prevCO2,
          [type]: data
        }));
        console.log(co2);
      })
      .catch(error => console.error('Error: ', error));
  }
  
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
        <a href="#" onClick={() => getCO2("walk")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Walking</h5>
          <hr></hr>
          <ul className='list-none text-white text-left'>
            <li><span className='font-bold text-xl'>Distance:</span> 100km</li>
            <li><span className='font-bold text-xl'>Time:</span> {Math.floor((dist / 1609.34 / 4))}hr {Math.floor(((dist / 1609.34 / 3) % 1) * 60)}min</li>
            <li><span className='font-bold text-xl'>Cost:</span> $54</li>
            <li><span className='font-bold text-xl'>CO2 Score:</span>  {((1-((co2["walk"] - Math.min(...Object.values(co2))) / (Math.max(...Object.values(co2)) - Math.min(...Object.values(co2)))))*100).toFixed(2) } </li>
          </ul>
        </a>
      </div>

      {/* Bike */}
      <div className="card-overlay left-5 bottom-5" id='bike'>
        <a href="#" onClick={() => getCO2("bike")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Biking</h5>
          <hr></hr>
          <ul className='list-none text-white text-left'>
            <li><span className='font-bold text-xl'>Distance:</span> 100km</li>
            <li><span className='font-bold text-xl'>Time:</span>  {Math.floor(((dist/1.609)/14.1)/3600)}hr {Math.floor((((dist/1.609)/14.1)%3600)/60)}min</li>
            <li><span className='font-bold text-xl'>Cost:</span> $54</li>
            <li><span className='font-bold text-xl'>CO2 Score:</span>   {((1-((co2["bike"] - Math.min(...Object.values(co2))) / (Math.max(...Object.values(co2)) - Math.min(...Object.values(co2)))))*100).toFixed(2) }</li>
          </ul>
        </a>
      </div>


      {/* Train */}
      <div className="card-overlay left-5 bottom-5" id='train'>
        <a href="#" onClick={() => getCO2("train")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Train</h5>
          <hr></hr>
          <ul className='list-none text-white text-left'>
            <li><span className='font-bold text-xl'>Distance:</span> 100km</li>
            <li><span className='font-bold text-xl'>Time:</span>   {Math.floor(time*(1/2) / 3600)}hr {Math.floor((time*(1/2) % 3600) / 60)}min</li>
            <li><span className='font-bold text-xl'>Cost:</span> $54</li>
            <li><span className='font-bold text-xl'>CO2 Score:</span>  {((1-((co2["train"] - Math.min(...Object.values(co2))) / (Math.max(...Object.values(co2)) - Math.min(...Object.values(co2)))))*100).toFixed(2) }  </li>
          </ul>
        </a>
      </div>
      
      {/* Bus */}
      <div className="card-overlay left-5 bottom-5" id='bus'>
        <a href="#" onClick={() => getCO2("bus")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bus</h5>
          <hr></hr>
          <ul className='list-none text-white text-left'>
            <li><span className='font-bold text-xl'>Distance:</span> 100km</li>
            <li><span className='font-bold text-xl'>Time:</span>  {Math.floor(time*2 / 3600)}hr {Math.floor((time*2 % 3600) / 60)}min</li>
            <li><span className='font-bold text-xl'>Cost:</span> $54</li>
            <li><span className='font-bold text-xl'>CO2 Score:</span>   {((1-((co2["bus"] - Math.min(...Object.values(co2))) / (Math.max(...Object.values(co2)) - Math.min(...Object.values(co2)))))*100).toFixed(2) }  </li>
          </ul>
        </a>
      </div>

      {/* Uber */}
      <div className="card-overlay left-5 bottom-5" id='uber'>
        <a href="#" onClick={() => getCO2("uber")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Uber</h5>
          <hr></hr>
          <ul className='list-none text-white text-left'>
            <li><span className='font-bold text-xl'>Distance:</span> 100km</li>
            <li><span className='font-bold text-xl'>Time:</span>   {Math.floor(time / 3600)}hr {Math.floor((time % 3600) / 60)}min</li>
            <li><span className='font-bold text-xl'>Cost:</span> $54</li>
            <li><span className='font-bold text-xl'>CO2 Score:</span>   {((1-((co2["uber"] - Math.min(...Object.values(co2))) / (Math.max(...Object.values(co2)) - Math.min(...Object.values(co2)))))*100).toFixed(2) } </li>
          </ul>
        </a>
      </div>

      {/* Car */}
            <div className="card-overlay left-5 bottom-5" id='car'>
        <a href="#" onClick={() => getCO2("car")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Car</h5>
          <hr></hr>
          <ul className='list-none text-white text-left'>
            <li><span className='font-bold text-xl'>Distance:</span> 100km</li>
            <li><span className='font-bold text-xl'>Time:</span> {Math.floor(time / 3600)}hr {Math.floor((time % 3600) / 60)}min</li>
            <li><span className='font-bold text-xl'>Cost:</span> $54</li>
            <li><span className='font-bold text-xl'>CO2 Score:</span>  {((1-((co2["car"] - Math.min(...Object.values(co2))) / (Math.max(...Object.values(co2)) - Math.min(...Object.values(co2)))))*100).toFixed(2) }  </li>
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
        <Routing origin={origin} end={end} setTime={setTime} setDist={setDist} getCO2={getCO2} />
      </MapContainer>
      
    </div>
  );
}

export default App;
