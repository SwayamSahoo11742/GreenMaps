import './cards.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { useState, useEffect } from 'react';



function Cards() {


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
      <div className="card-overlay left-5 bottom-5" id='bus'>
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
      <div className="card-overlay left-5 bottom-5" id='uber'>
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
    </div>
  );
}

export default Cards;
