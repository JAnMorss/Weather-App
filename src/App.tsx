import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { Suspense, useState } from "react"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { useQuery } from "@tanstack/react-query"
import { getGeoCode } from "./api"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton"
import SidePanel from "./components/SidePanel"
import Hamburger from "/src/assets/hamburger.svg?react"
import MobileHeader from "./components/MobileHeader"
import LightDarkToggle from "./components/LightDarkToggle"
import { getWeatherIcon } from "./utils/weatherIcons"

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 50, lon: 45 })
  const [location, setLocation] = useState("Tokyo")
  const [mapType, setMapType] = useState("clouds_new")
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeoCode(location),
  })

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon })
    setLocation("custom")
  }

  const coords =
    location === "custom"
      ? coordinates
      : { lat: geocodeData?.lat ?? 0, lon: geocodeData?.lon ?? 0 }

  return (
    <>
      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />

      <div className="flex flex-col gap-8 pt-4 p-8 xs:pt-8 
        lg:w-[calc(100dvw-var(--sidebar-width))] 
        2xl:h-screen 2xl:min-h-[1120px]">
        <div
          className="flex flex-col gap-4 xs:flex-row xs:gap-8 
          backdrop-blur-md bg-background/80 
          rounded-xl p-4 shadow-sm border border-border/50"
        >
          <div className="hidden lg:flex items-center gap-3 shrink-0 mr-9">
            <div
              className="flex items-center justify-center size-10 rounded-xl 
              bg-gradient-to-br from-blue-500 to-sky-400 shadow-md"
            >
              <img
                src={`https://openweathermap.org/img/wn/${getWeatherIcon(1).icon}@2x.png`}
                alt={getWeatherIcon(0).description}
                className="w-7 h-7"
              />
            </div>
            <span className="text-xl md:text-2xl font-semibold tracking-tight">
              Weather<span className="text-blue-500">App</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-3 
            items-start md:items-center 
            bg-muted/40 rounded-lg px-3 py-2">
            <h1 className="text-lg font-medium text-muted-foreground">
              Location
            </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-3 
            items-start md:items-center 
            bg-muted/40 rounded-lg px-3 py-2">
            <h1 className="text-lg font-medium text-muted-foreground">
              Map Type
            </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>

          <div className="ml-auto flex gap-4 items-center">
            <div className="hidden xs:block hover:scale-105 transition-transform">
              <LightDarkToggle />
            </div>
            <button
              onClick={() => setIsSidePanelOpen(true)}
              className="hidden xs:block hover:opacity-80 transition-opacity"
            >
              <Hamburger className="size-6 lg:hidden" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 
          md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">

          <div className="relative h-120 2xl:h-auto 
            col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1
            rounded-xl overflow-hidden 
            border border-border shadow-sm">
            <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
            <MapLegend mapType={mapType} />
          </div>

          <div className="col-span-1 2xl:row-span-2 order-2 
            rounded-xl bg-background border border-border shadow-sm">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2 
            rounded-xl bg-background border border-border shadow-sm">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3 
            rounded-xl bg-background border border-border shadow-sm">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5 
            rounded-xl bg-background border border-border shadow-sm">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>

      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  )
}

export default App
