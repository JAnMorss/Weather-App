export type WeatherIconInfo = {
  icon: string;
  description: string;
};

export function getWeatherIcon(
  weathercode: number,
  isDay: boolean = true
): WeatherIconInfo {
  const suffix = isDay ? 'd' : 'n';

  switch (weathercode) {
    case 0:
      return { icon: `01${suffix}`, description: 'Clear sky' };

    case 1:
      return { icon: `02${suffix}`, description: 'Few clouds' };

    case 2:
      return { icon: `03${suffix}`, description: 'Scattered clouds' };

    case 3:
      return { icon: `04${suffix}`, description: 'Broken clouds' };

    case 45:
    case 48:
      return { icon: `50${suffix}`, description: 'Mist' };

    case 51:
    case 53:
    case 55:
      return { icon: `09${suffix}`, description: 'Shower rain' };

    case 61:
    case 63:
    case 65:
      return { icon: `10${suffix}`, description: 'Rain' };

    case 71:
    case 73:
    case 75:
      return { icon: `13${suffix}`, description: 'Snow' };

    case 95:
      return { icon: `11${suffix}`, description: 'Thunderstorm' };

    default:
      return { icon: `01${suffix}`, description: 'Clear sky' };
  }
}
