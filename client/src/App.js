import './App.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { useState, useEffect } from 'react';

function Routing({ origin, end }) {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    if (!map || !origin || !end) return;

    // Remove existing routing control if it exists
    if (routingControl) {
      routingControl.remove();
    }

    // Create a new routing control instance and add it to the map
    const control = L.Routing.control({
      waypoints: [
        L.latLng(origin.lat, origin.lon),
        L.latLng(end.lat, end.lon)
      ],
      routeWhileDragging: true
    }).addTo(map);


    setRoutingControl(control);


    return () => {
      if (control) {
        control.remove();
      }
    };
  }, [map, origin, end]);  

  return null;
}

function App() {
  const [origin, setOrigin] = useState({ lat: 42.592026, lon: -71.37071483211594 });
  const [end, setEnd] = useState({ lat: 42.592026, lon: -101.37071483211594 });

  // Set origin on map click
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setOrigin({ lat: e.latlng.lat, lon: e.latlng.lng });
      }
    });
    return null;
  };

  return (
    <div className="App">
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


        <MapClickHandler />


        <Routing origin={origin} end={end} />
      </MapContainer>
    </div>
  );
}

export default App;
