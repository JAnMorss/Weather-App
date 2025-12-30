import GeocodeSchema from "./schemas/GeocodeSchema";
import WeatherSchema from "./schemas/weatherSchema";

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
