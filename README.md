# GreenMaps


![image](https://github.com/user-attachments/assets/f2b1d5a8-b670-4a5f-ad79-19a9c2d776e9)





GreenMaps is an app aimed to reduce CO2 in transportation

# Demo
[Project Link](https://guileless-naiad-978e7c.netlify.app/)

**NOTE: This is a dev version, which is why the CO2 score is random. The API used to calculate the score is limited and I am on a free trial. I also forgot to program the price calculator**

# Purpose

- GreenMaps is made to show pros and cons of different methods of transport
- GreenMaps shows prices, CO2 Emmsions, time and distance for several transportation methods
- Transportation methods include walking, biking, car, Uber, bus, and train
- It also gives directions for car routes

# Image Gallery
![image](https://github.com/user-attachments/assets/40ae47ee-3617-42fe-9e03-6c84dc30945e)


# Tech Stack and Tools
- JS/HTML/CSS
- Python
- ArcGIS
- ReactJS
- Leaflet
- Open Source Routing Machine
- Carbon Interface API
- Geocode API
- FastAPI
- Uvicorn


# Process

### Server
- The client is hosted on Netlify
- Client communicates with [server](https://greenmaps.vercel.app/), which is hosted on vercel
- Server communcates with geocode API and Carbon Interface API
- Server sends info to Client

  
### CO2 Score Calculation
- CO2 score is simple
- Retrieve all CO2 emmisions in grams using server
- normalize between 0 and 1 using min max normalization
- convert to percent (x100)
- hard set walking and biking to 100

### Time Calculation
- Times are calculated very simply right now, by multiplying the provided value for car with a ratio


