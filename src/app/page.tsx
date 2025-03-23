"use client";
import {
  findCitybyLine,
  findCitybyName,
  currentTime,
  currentDate,
  kelvinToFahrenheit,
  fiveDayCall,
} from "../lib/services";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { WeatherData, WeatherForecast } from "../../interface/interfaces";
import ForecastComponent from "@/components/ForecastComponent";
import FavoriteComponent from "@/components/FavoriteComponent";
import { saveToLocalStorage } from "@/lib/localstorage";

export default function Home() {
  const [currentCity, setCurrentCity] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  // type any smh
  const [forecastData, setForecastData] = useState<WeatherForecast[]>([]);
  const [search, setSearch] = useState<string>("");
  const [renderFavs, setRenderFavs] = useState<boolean>(false);
  const [data, setData] = useState<WeatherData>({
    coord: {
      lon: 88,
      lat: 88,
    },
    weather: [
      {
        id: 88,
        main: "",
        description: "",
        icon: "",
      },
    ],
    base: "",
    main: {
      temp: 304.261,
      feels_like: 88,
      temp_min: 304.261,
      temp_max: 304.261,
      pressure: 88,
      humidity: 88,
      sea_level: 88,
      grnd_level: 88,
    },
    visibility: 88,
    wind: {
      speed: 88,
      deg: 88,
    },
    clouds: {
      all: 88,
    },
    dt: 88,
    dt_txt: "string",
    sys: {
      type: 88,
      id: 88,
      country: "",
      sunrise: 88,
      sunset: 88,
    },
    timezone: 88,
    id: 88,
    name: "",
    cod: 88,
  });
 
  //   weather: [
  //     {
  //       id: 88,
  //       main: "",
  //       description: "",
  //       icon: "",
  //     },
  //   ],
  //   base: "",
  //   main: {
  //     temp: 304.261,
  //     feels_like: 88,
  //     temp_min: 304.261,
  //     temp_max: 304.261,
  //     pressure: 88,
  //     humidity: 88,
  //     sea_level: 88,
  //     grnd_level: 88,
  //   },
  //   visibility: 88,
  //   wind: {
  //     speed: 88,
  //     deg: 88,
  //   },
  //   clouds: {
  //     all: 88,
  //   },
  //   dt: 88,
  //   sys: {
  //     type: 88,
  //     id: 88,
  //     country: "",
  //     sunrise: 88,
  //     sunset: 88,
  //   },
  //   timezone: 88,
  //   id: 88,
  //   name: "",
  //   cod: 88,
  // });

  // current location display on Load
  useEffect(() => {
    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
      } else {
        console.log("Geolocation is loading...");
      }
    }
    async function success(position: GeolocationPosition) {
      const city = await findCitybyLine(
        position.coords.latitude,
        position.coords.longitude
      );
      setCurrentCity(city.name);
      fetchData(city.name);
    }

    getCurrentLocation();
  }, []);

  const fetchData = async (city: string) => {
    const cityLats = await findCitybyName(city);
    setData(cityLats);
    const cityForecast = await fiveDayCall(
      cityLats.coord.lat,
      cityLats.coord.lon
    );
    setForecastData(cityForecast);
    // console.log(cityForecast);
    setVisible(false);
  };

  const saveToFavs = async () => {
    // console.log(search);
    saveToLocalStorage(search);
    setVisible(false);
    setRenderFavs(true);
    alert(`${search} saved to favorites!`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearch(newValue);
  };

  const handleSearch = async () => {
    // console.log(search);
    fetchData(search);
  };

  return (
    <div className="font-[family-name:var(--font-georama-sans)] text-white flex flex-col  justify-center h-screen gap-3 pt-8">
      <div className="flex justify-center">
        <div className="w-fit flex flex-row gap-2">
          <div className="relative">
            <Input
              type="text"
              id="search"
              onChange={handleInputChange}
              onFocus={() => setVisible(true)}
              onClick={() => setRenderFavs(false)}
            />
            {renderFavs ? (
              <div></div>
            ) : (
              <div
                className={
                  visible ? "absolute backdrop-blur-xs w-full px-2" : "hidden"
                }
              >
                <h2 className="text-sm font-thin">favorites</h2>
                <hr></hr>
                <FavoriteComponent fetchData={fetchData} />
              </div>
            )}
          </div>
          <div className="flex place-items-center">
            <button onClick={handleSearch}>
              <img
                src="/search.png"
                alt="search icon"
                className="w-7 h-6 hover:cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex sm:justify-between justify-center w-full max-w-[90vw] px-4 mt-4">
        <div className="flex flex-col gap-4 w-[70%]">
          <h2 className="text-5xl">{data.name}</h2>
          <div className="flex sm:flex-row flex-col gap-2">
            <h1 className="sm:text-8xl text-9xl">
              {kelvinToFahrenheit(data.main.temp)}°
            </h1>
            <div className="flex sm:flex-row flex-col sm:place-items-end gap-2 w-full">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="current weather icon"
                className="sm:w-[50%] md:m-0 m-[-1em] w-[50%] "
              />
              <div className="sm:w-full">
                <h4 className="text-sm">
                  High {kelvinToFahrenheit(data.main.temp_max)}° - Low{" "}
                  {kelvinToFahrenheit(data.main.temp_min)}°
                </h4>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <h4 className="text-sm font-thin" id="favText">
              add to favorites
            </h4>
            <button className="hover:cursor-pointer" onClick={saveToFavs}>
              <img
                id="starIcon"
                src="/staroutline.png"
                alt="star icon"
                className="w-4"
              />
            </button>
          </div>
          <h3 className="text-xl font-extralight">{currentDate}</h3>
        </div>
        <div className="flex flex-col gap-2 justify-center text-center text-xl font-extralight">
          <img src="/whitepin.png" alt="pin icon" className="w-22" />
          <h3>{currentCity}</h3>
          <h3 className="tracking-[.1em]">{currentTime}</h3>
        </div>
      </div>
      {forecastData && forecastData.length > 0 && (
        <div className="grid grid-rows-1 grid-cols-5 w-full backdrop-blur-xs h-full">
          <ForecastComponent forecast={forecastData[0]} />
          <ForecastComponent forecast={forecastData[1]} />
          <ForecastComponent forecast={forecastData[2]} />
          <ForecastComponent forecast={forecastData[3]} />
          <ForecastComponent forecast={forecastData[4]} />
        </div>
      )}
    </div>
  );
}
