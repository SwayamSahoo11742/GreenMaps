from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
import random
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
    "http://localhost:3000",  # Add other origins if needed
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


@app.post('/emmisions')
def dist(distance: float, type: str):
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
  

