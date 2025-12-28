import { z } from "zod";

const WeatherUnitsSchema = z.object({
  time: z.string(),
  interval: z.string().optional(),
  temperature: z.string(),
  windspeed: z.string(),
  winddirection: z.string(),
  is_day: z.string().optional(),
  weathercode: z.string(),
});

const CurrentWeatherSchema = z.object({
  time: z.string(),
  interval: z.number(),
  temperature: z.number(),
  windspeed: z.number(),
  winddirection: z.number(),
  is_day: z.number(),
  weathercode: z.number(),
});

const HourlyUnitsSchema = z.object({
  time: z.string(),
  temperature_2m: z.string(),
  relative_humidity_2m: z.string(),
  precipitation: z.string(),
  windspeed_10m: z.string(),
  weathercode: z.string(),
});

const DailyUnitsSchema = z.object({
  time: z.string(),
  temperature_2m_max: z.string(),
  temperature_2m_min: z.string(),
  precipitation_sum: z.string(),
  sunrise: z.string(),
  sunset: z.string(),
  weathercode: z.string(),
});

const WeatherSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_weather_units: WeatherUnitsSchema,
  current_weather: CurrentWeatherSchema,
  hourly_units: HourlyUnitsSchema,
  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    relative_humidity_2m: z.array(z.number()),
    precipitation: z.array(z.number()),
    windspeed_10m: z.array(z.number()),
    weathercode: z.array(z.number()),
  }),
  daily_units: DailyUnitsSchema,
  daily: z.object({
    time: z.array(z.string()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    precipitation_sum: z.array(z.number()),
    sunrise: z.array(z.string()),
    sunset: z.array(z.string()),
    weathercode: z.array(z.number()),
  }),
});

export default WeatherSchema;
