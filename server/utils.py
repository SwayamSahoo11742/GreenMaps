import requests
GEOCODE_KEY = "672664352ffbc257654092exs87e776"
def geocode(location:str):
    url = f"https://geocode.maps.co/search?q={location}&api_key={GEOCODE_KEY}"
    res = requests.post(url)
    meta = res.json()[0]
    long, lat = meta["lon"], meta["lat"]
    return {"lat": lat, "lon": long}

