"use client";

import { WeatherForecast } from "../../interface/interfaces";

const APIKEY = process.env.NEXT_PUBLIC_API_KEY

const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
const currentTime = `${hours}:${formattedMinutes} ${ampm}`;
const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
const currentDate: string = new Date().toLocaleDateString('en-US', options);

async function nameFetch(place: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${APIKEY}`,
    {
      cache: "force-cache",
    }
  );
  if(!response.ok)
  {
    alert("City Not Found!...")
    return null
  }
  const data = await response.json();
  return data
  // console.log(data);
}

async function gridFetch(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`,
    {
      cache: "force-cache",
    }
  );
  if(!response.ok)
    {
      alert("City Not Found!...")
      return null
    }
  const data = await response.json();
  // console.log(data);
  return data;
}

const findCitybyName = async (place: string) => {
  const data = await nameFetch(place);
  return data
};

const findCitybyLine = async (lat: number, lon: number) => {
  const data = await gridFetch(lat, lon);
//   console.log(data);
  return data;
};

const fiveDayCall = async(lat:number,lon:number) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
  const data = await response.json();
  // console.log(data.list[0])
  const fiveDayArray:WeatherForecast[] = [data.list[0],data.list[8],data.list[16],data.list[24],data.list[32]]
  console.log(fiveDayArray)
  return fiveDayArray
}

function kelvinToFahrenheit(kelvin: number): number {
  const fahrenheit = (kelvin - 273.15) * 9/5 + 32;
  return Math.round(fahrenheit);
}

function getDayOfWeek(dateString: string): string {
  // Parse the date string into a JavaScript Date object
  const date = new Date(dateString);

  // Array of days of the week
  const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
  ];

  // Get the day of the week as a number (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayIndex = date.getDay();

  // Return the name of the day
  return daysOfWeek[dayIndex];
}

export { findCitybyLine, findCitybyName,kelvinToFahrenheit, fiveDayCall, getDayOfWeek, currentTime,currentDate };
