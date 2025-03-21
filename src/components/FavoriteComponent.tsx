"use client";
import { getFromLocalStorage, removeFromLocalStorage } from "@/lib/localstorage";
import React, { useEffect, useState } from "react";
import { FavoriteComponentProps } from "../../interface/interfaces";

const FavoriteComponent = ({ fetchData }: FavoriteComponentProps) => {
  const [nameArr, setArr] = useState<string[]>([]);

  useEffect(() => {
    setArr(getFromLocalStorage());
  }, []);


  const removeFav = (name: string) => {
    removeFromLocalStorage(name);
    setArr((prevArr) => prevArr.filter((item) => item !== name));
  };

  return (
    <>
      {nameArr.map((name: string) => (
        <div className="flex justify-between" key={name}>
          <h2 className="text-sm font-thin hover:cursor-pointer hover:text-slate-500" onClick={() => fetchData(name)}>{name}</h2>
          <button
            className="hover:cursor-pointer hover:text-red-500"
            onClick={() => removeFav(name)}
          >
            X
          </button>
        </div>
      ))}
    </>
  );
};

export default FavoriteComponent;
