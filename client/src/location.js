import React, { useRef } from "react";
import "./location.css";

export const LocationInput = ({ setOrigin, setEnd, origin }) => {
    const originRef = useRef(null);
    const endRef = useRef(null);

    const getCoords = (loc, mode) => {
        console.log(loc);
        const url = `https://greenmaps.vercel.app/geolocate?location=${loc}`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ key: "value" }),
        })
        .then((res) => res.json())
        .then((data) => {

            if(mode){
                setOrigin(data);
            }else{
                console.log("END")
                setEnd(data);
            }
            return data;
        })
        .catch((error) => console.log(error));
    };

    return (
        <div className="location-input-container">
            <div className="input-group">
                <input 
                    ref={originRef}
                    id="origin-input" 
                    className="absolute origin-input w-half z-50 inp p-0.5"
                    placeholder="Enter origin"
                />
                <button 
                    className="origin-input bg-black text-white p-1 origin-button z-50 absolute"
                    onClick={() => getCoords(originRef.current.value, 1)}
                >
                    Set Origin
                </button>
            </div>

            <div className="input-group">
                <input 
                    ref={endRef}
                    id="end-input" 
                    className="absolute end-input w-half z-50 inp p-0.5"
                    placeholder="Enter destination"
                />
                <button 
                    className="end-button z-50 absolute end-input bg-black p-1 text-white"
                    onClick={() => getCoords(endRef.current.value, 0)}
                >
                    Set Destination
                </button>
            </div>
        </div>
    );
};
