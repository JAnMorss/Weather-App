import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api';
import Card from './Card';
import WeatherIcon from '../WeatherIcon';
import { getWeatherIcon } from '../../utils/weatherIcons';
import type { Coords } from '../../types';

type Props = {
    coords: Coords;
};

export default function CurrentWeather({ coords }: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ['weather', coords],
        queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });

    if (!data) return null;

    const current = data.current_weather;
    const weatherInfo = getWeatherIcon(current.weathercode, current.is_day === 1);

    const localTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: data.timezone,
    }).format(new Date(current.time));

    const hourlyTimes = data.hourly.time.map(t => new Date(t));
    const currentTime = new Date(current.time);

    let closestIndex = 0;
    let minDiff = Infinity;

    hourlyTimes.forEach((t, i) => {
        const diff = Math.abs(t.getTime() - currentTime.getTime());
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        }
    });

    const humidity = data.hourly.relative_humidity_2m[closestIndex];

    return (
        <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-6">
            <div className="flex flex-col gap-2 items-center">
                <h2 className="text-6xl text-center">{Math.round(current.temperature)}°F</h2>
                <WeatherIcon src={weatherInfo.icon} className="size-14" />
                <h3 className="text-sm text-muted-foreground">{weatherInfo.description}</h3>
            </div>

            <div className="flex flex-col gap-2 text-center">
                <p className="text-xl">Local Time:</p>
                <h3 className="text-4xl font-semibold">{localTime}</h3>
            </div>

            <div className="flex justify-between w-full">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Feels Like</p>
                    <p>{Math.round(current.temperature)}°F</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Humidity</p>
                    <p>{humidity}%</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Wind Speed</p>
                    <p>{Math.round(current.windspeed)} mph</p>
                </div>
            </div>
        </Card>
    );
}
