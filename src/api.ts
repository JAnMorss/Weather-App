import { AirPollutionSchema } from "./schemas/airPollutionSchema";
import GeocodeSchema from "./schemas/geocodeSchema";
import WeatherSchema from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,weathercode,winddirection_10m,cloudcover,pressure_msl` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,weathercode,uv_index_max` +
    `&temperature_unit=fahrenheit` +     
    `&windspeed_unit=mph` +               
    `&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  return WeatherSchema.parse(data);
}


export async function getGeoCode(location: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;

  const res = await fetch(url);
  const data = await res.json();

  const [geocode] = GeocodeSchema.parse(data);

  return geocode;
}




export async function getAirPollution({ lat, lon }: { lat: number; lon: number }) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;


  const res = await fetch(url);
  const data = await res.json();

  return AirPollutionSchema.parse(data);
}

