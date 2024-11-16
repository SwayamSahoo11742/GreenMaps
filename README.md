# GreenMaps







GreenMaps is an app aimed to visualize and access coral bleaching

This project was made for the [HorizonHacks 2024](https://horizonhacks-2024.devpost.com/) Hackathon. (We won!)

# Demo
[Project Link](https://peaceful-panda-d2cfcc.netlify.app/)

**NOTE: The future bleaching pediction does not work as I cannot pay for the API. I was on a free trial during the hackathon**

# Purpose

- GreenMaps is made to shine light on the vastly underlooked issue of coral bleaching
- It also aims to provide a method of quantifying the severity and likeliness of future bleaching for a selected reefs
- This is important as we are going through the 4th global bleaching event right now, which started back in 2023
- By 2050, 90% of global coral reefs are projected to experience coral bleaching every year

# Image Gallery



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

### Mapping
- To map the coral reefs and their bleaching level currently we utilized public data given by the NOAA
- We then mapped the data into GeoJSON 
- The GeoJSON was fed into Leaflet to be graphed

### Future Bleaching Predictions
- To create predictions, we identified two variables that are primary causes of bleaching: UV radiation and temperature
- We used Mateomatics API to see past trends in both factors and made a weighted score
- This score represents whether the area will bleach or heal, and its severity
- Score < 0, it will bleach
- Score > 0, it will heal
- |Score| = severity


