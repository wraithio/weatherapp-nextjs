"use client";
import ForecastComponent from "@/components/ForecastComponent";
import { findCurrentCity, findCurrentInfo, currentTime } from "../lib/services";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppContext } from "../../context/context";

// interface City {
//   name: string;
//   currentTemp: number;
//   highTemp: number;
//   lowTemp: number;
//   icon: string;
// }

// interface CurrentLoc {
//   name: string;
//   time: string;
//   date: string;
// }

export default function Home() {
  const [currentCity, setCurrentCity] = useState<string>("");
  const { search, setSearch } = useAppContext();
  const [time, setTime] = useState<string>("");
  const [currentData, setCurrentData] = useState({});
  const [data, setData] = useState({});

  // current location display on Load
  useEffect(() => {
    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation is loading...");
      }
    }
    async function success(position: GeolocationPosition) {
      const city = await findCurrentCity(
        position.coords.latitude,
        position.coords.longitude
      );
      setCurrentCity(city.name);
    }
    function error(error: any) {
      console.log(error.message);
    }
    getCurrentLocation();
    setTime(currentTime);
  }, [navigator.geolocation]);

  const handleSearch = () => {
    console.log(search)
  }

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event.target.value);
  // };

  return (
    <div className="font-[family-name:var(--font-georama-sans)] text-white flex flex-col  justify-center h-screen gap-3 mt-8">
      <div className="flex justify-center">
        <div className="w-fit flex flex-row gap-2">
          <Input
            type="text"
            id="search"
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="flex place-items-center">
            <button onClick={handleSearch}>
              <img
                src="/search.png"
                alt="search icon"
                className="w-6 h-6 hover:cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-[90vw] px-4 mt-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl">Current City</h2>
          <div className="flex flex-row gap-2">
            <h1 className="text-8xl">88</h1>
            <div className="flex place-items-end gap-2">
              <img
                src="#"
                alt="current weather icon"
                className="h-[50%] w-[50%]"
              />
              <h4 className="text-sm">High 88° - Low 88°</h4>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <h4 className="text-sm font-thin">add to favorites</h4>
            <i className="bx bxs-star"></i>
          </div>
          <h3 className="text-xl font-extralight">Current Date</h3>
        </div>
        <div className="flex flex-col gap-2 justify-center text-center text-xl font-extralight">
          <img src="/whitepin.png" alt="pin icon" className="w-22" />
          <h3>{currentCity}</h3>
          <h3 className="tracking-[.1em]">{currentTime}</h3>
        </div>
      </div>
      <div className="grid grid-rows-1 grid-cols-5 w-full backdrop-blur-xs h-full">
        <ForecastComponent />
        <ForecastComponent />
        <ForecastComponent />
        <ForecastComponent />
        <ForecastComponent />
      </div>
    </div>
  );
}
