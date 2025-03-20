import { APIKEY } from "./environmentAPI";

// navigator.geolocation.getCurrentPosition(success, error);

// function getCurrentLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success, error);
//   } else {
//     console.log("Geolocation is loading...");
//   }
// }
// navigator.geolocation.getCurrentPosition(success, error);

const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
const currentTime = `${hours}:${formattedMinutes} ${ampm}`;

async function nameFetch(place: string) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${APIKEY}`,
    {
      cache: "force-cache",
    }
  );
  const data = await response.json();
  console.log(data);
}

async function gridFetch(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`,
    {
      cache: "force-cache",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

const findCurrentInfo = async (place: string) => {
  const data = await nameFetch(place);
//   console.log(`${place}+${data}`)
};

const findCurrentCity = async (lat: number, lon: number) => {
  const data = await gridFetch(lat, lon);
//   console.log(data);
  return data;
};



export { findCurrentCity, findCurrentInfo, currentTime };
