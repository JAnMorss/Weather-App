import WeatherSchema from "./schemas/weatherSchema";

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,weathercode` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,weathercode` +
    `&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  const weather = WeatherSchema.parse(data);

  return weather;
}
