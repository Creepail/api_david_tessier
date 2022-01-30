
<p align="center">
  <img width="600" src="img/terraweather.png" alt="Material Bread logo">
</p>


Terraweather is a fun and easy to use weather information site that give you your current weather, time, air pollution all in a Terraria theme ! Each weather condition bringing with it it's own Terraria music and image.

---

<h3 align="center">How it work</h3> 

TerraWeather use two API to work, the first one being the IP Geolocation API from [Abstract](https://www.abstractapi.com/ip-geolocation-api). This simple to use and free API locate the user device using their IP. It giving various information about the user location such as : country, city, time and more. But more importantly it gise use an approximation of the user longituve and latitude. Using both of those data we can then use [Open Weather API](https://openweathermap.org). As the name suggest this API give out weather info to it's user. Using the longituve and latitude obtained from Abstract we can obtain info about the temperature, the current weathe, the air quality and the air components. Using these bits of data we then display them in a fun way on the website. The background and music changing depending on the weather. Currently we have a unique "theme" for the following condition : 
- Snow
- Rain
- Wind
- Fog
- Neutral (used when none of the other conditions are present)
- Corruption (used on the air quality section)

---

<h3 align="center">Extra info</h3>

Terraria is owned by a **Re-Logic** please check them out, this project wouldn't have existed without their creation. This project was made by David Tessier for a school project for [IIM](https://www.iim.fr). Also thanks to the [Terraria logo generator](https://terraria-logo-maker.darthmorf.co.uk), i wouldn't 
have been able to get such a cool logo without them.

If you want to check out the website you can do so at [This link](https://www.terraweather.tk). 