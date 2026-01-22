import type { Dispatch, SetStateAction } from "react"
import Hamburger from "/src/assets/hamburger.svg?react"
import LightDarkToggle from "./LightDarkToggle"

type Props = {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
  return (
  <div
    className="w-full h-16 px-4 
    bg-background/80 backdrop-blur-md 
    sticky top-0 xs:hidden 
    flex items-center justify-between 
    border-b border-border 
    shadow-sm z-1001"
  >
    <div className="flex items-center gap-2">
      <div
        className="flex items-center justify-center size-9 rounded-lg 
        bg-gradient-to-br from-blue-500 to-sky-400 shadow-sm"
      >
        <img
          src={`https://openweathermap.org/img/wn/02d@2x.png`}
          alt="Weather icon"
          className="w-6 h-6"
        />
      </div>
      <span className="text-lg font-semibold tracking-tight">
        Weather<span className="text-blue-500">App</span>
      </span>
    </div>

    <div className="flex items-center gap-4">
      <div className="hover:scale-105 transition-transform">
        <LightDarkToggle />
      </div>
      <button
        onClick={() => setIsSidePanelOpen(true)}
        className="hover:opacity-80 transition-opacity"
      >
        <Hamburger className="size-6" />
      </button>
    </div>
  </div>
)

}
