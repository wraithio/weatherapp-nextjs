import { getDayOfWeek, kelvinToFahrenheit } from "@/lib/services";
import React from "react";
import { WeatherForecast, WeatherProps } from "../../interface/interfaces";

const ForecastComponent = ({ forecast }:WeatherProps) => {

  return (
    <div className="flex flex-col gap-3 justify-center text-center text-xl font-extralight my-4 border-x border-l-gray-900">
      <h3>{getDayOfWeek(forecast.dt_txt)}</h3>
      <div className="flex justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="m-[-1em] w-[50%]"
        />
      </div>
      <h3>{forecast.main.temp}°</h3>
    </div>
  );
};

export default ForecastComponent;
