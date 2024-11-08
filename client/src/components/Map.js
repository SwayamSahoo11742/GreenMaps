import '../App.css';
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

export function GreenMaps() {
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
    <div className="" style={{ position: 'relative' }}>

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


