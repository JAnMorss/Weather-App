import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api';
import Card from './Card';
import { getWeatherIcon } from '../../utils/weatherIcons';
import WeatherIcon from '../WeatherIcon';
import type { Coords } from '../../types';

type Props = {
    coords: Coords;
};

export default function HourlyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  if (!data) return null;

  const hourly = data.hourly;

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex gap-6 overflow-x-scroll px-2"
    >
        {hourly.time.map((hour, index) => {
            const date = new Date(hour);
            const hourOfDay = date.getHours();

            const isDay = hourOfDay >= 6 && hourOfDay < 18;

            const weatherInfo = getWeatherIcon(
                hourly.weathercode[index],
                isDay
            );

            return (
                <div key={hour} className="flex flex-col gap-2 items-center p-2">
                    <p className="whitespace-nowrap text-sm">
                        {date.toLocaleTimeString(undefined, {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </p>
                    <WeatherIcon src={weatherInfo.icon} />
                    <p className="text-sm font-medium">
                        {Math.round(hourly.temperature_2m[index])}°F
                    </p>
                </div>
            );
        })}
    </Card>
  );
}
