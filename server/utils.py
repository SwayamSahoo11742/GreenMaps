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