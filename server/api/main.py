from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import random
import requests
GEOCODE_KEY = "672664352ffbc257654092exs87e776"
def geocode(location:str):
    url = f"https://geocode.maps.co/search?q={location}&api_key={GEOCODE_KEY}"
    res = requests.post(url)
    meta = res.json()[0]
    long, lat = meta["lon"], meta["lat"]
    return {"lat": lat, "lon": long}

def uberPrice():
    url =  'https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075'
    headers = {
        "Authorization": "Bearer A7O-K2jRrhb07sCiNKztA7r57y-t_Obr",
        "Content-Type": "application/json",
        "Accept-Language": "en_US"
    }
    res = requests.get(url=url, headers=headers)
    print(res.text)

uberPrice()
AVGWEIGHT = {
  "train" : 16000,
  "bus" : 13834.567
}
TYPE2ID = {
  "car": "7268a9b7-17e8-4c8d-acca-57059252afe9",
  "uber": "7268a9b7-17e8-4c8d-acca-57059252afe9",
  "walking": "-1",
  "biking": "-1",
  "bus": None,
  "train" : None,
}

EGRES = {
  "data": {
    "id": "9355da12-7ed7-440f-ae49-e3a45172fede",
    "type": "estimate",
    "attributes": {
      "distance_value": 100,
      "vehicle_make": "Toyota",
      "vehicle_model": "Corolla",
      "vehicle_year": 1993,
      "vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9",
      "distance_unit": "mi",
      "estimated_at": "2024-11-04T21:00:50.473Z",
      "carbon_g": 37029,
      "carbon_lb": 81.64,
      "carbon_kg": 37.03,
      "carbon_mt": 0.04
    }
  }
}
CI_KEY = "WIr4QZDUPYCPzk2QeSw"

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "https://guileless-naiad-978e7c.netlify.app", # Add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow specific methods if needed
    allow_headers=["*"],
)

@app.get('/')
def root():
    return {"This is the testing page for the GreenMaps API":"If you see this, why? "}

@app.post('/geolocate')
def geolocate(location: str):
    coords = geocode(location=location)
    return coords
  
  
@app.post('/emmisions')
def emmisions(distance: float, type: str):
    carbon_g = None

    if type == "bus" or type == "train":
        url = "https://www.carboninterface.com/api/v1/estimates"
        headers = {
            "Authorization": f"Bearer {CI_KEY}",
            "Content-Type": "application/json"
        }
        
        # Update `data` with weight information (adjust as needed)
        data = {
          "type": "shipping",
          "weight_value": AVGWEIGHT[type],
          "weight_unit": "kg",
          "distance_value": distance,
          "distance_unit": "km",
          "transport_method": (type if type == "train" else "truck")
        }
        
        # Send the request
        
        # res = requests.post(url=url, headers=headers, data=json.dumps(data))
        # carbon_g = res.json()["data"]["attributes"]["carbon_g"]
        carbon_g =EGRES["data"]["attributes"]["carbon_g"]

    elif type == "car" or type == "uber":
      url = "https://www.carboninterface.com/api/v1/estimates"
      headers = {
          "Authorization": f"Bearer {CI_KEY}",
          "Content-Type": "application/json"
      }
      
      data = {
          "type": "vehicle",
          "distance_unit" : "km",
          "distance_value" : distance,
          "vehicle_model_id": TYPE2ID[type] 
      }
      # res = requests.post(url=url, headers=headers, data=json.dumps(data))
      # carbon_g = res.json()["data"]["attributes"]["carbon_g"]
      carbon_g = EGRES["data"]["attributes"]["carbon_g"]
    
    elif type == "walk" or type == "bike":
        carbon_g = 0
      

    return carbon_g + (1 if random.randint(0,100)%2 else -1) * (random.randint(round(1/2 * carbon_g), round(3/4 * carbon_g)))
  

