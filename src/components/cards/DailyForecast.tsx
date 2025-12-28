import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api';
import Card from './Card';
import { getWeatherIcon } from '../../utils/weatherIcons';
import WeatherIcon from '../WeatherIcon';

type Props = {};

export default function DailyForecast({}: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ['weather'],
        queryFn: () => getWeather({ lat: 10.3157, lon: 123.8854 }),
    });

    if (!data) return null;

    const daily = data?.daily;

    return (
        <Card 
            title="Daily Forecast" 
            childrenClassName="flex flex-col gap-4"
        >
            {daily?.time.map((date, index) => (
                <div
                    key={date}
                    className="flex justify-between items-center p-2 border rounded-md"
                >
                    <p className="w-9">
                        {new Date(date).toLocaleDateString(undefined, { 
                            weekday: 'short' 
                        })}
                    </p>

                    <WeatherIcon src={getWeatherIcon(daily.weathercode[index]).icon} />

                    <p className="w-12 text-center">
                        {Math.round((daily.temperature_2m_max[index] + daily.temperature_2m_min[index]) / 2)}°F
                    </p>
                    <p className="text-red-500/75">
                        {Math.round(daily.temperature_2m_max[index])}°F
                    </p>
                    <p className="text-blue-500/75">
                        {Math.round(daily.temperature_2m_min[index])}°F
                    </p>
                </div>
            ))}
        </Card>
    );
}
