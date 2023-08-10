import { v4 as uuid } from "uuid";
import axios from "axios";
import { useEffect, useState } from "react";

const getCurrentTime = new Date().toLocaleString(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour12: true,
});
// https://word-search-dictionary-dhgx0zx7s-strixv54.vercel.app/api
// http://localhost:5000/api

const isEnvDev = process.env.NODE_ENV === "development";

const axiosLocal = axios.create({
  baseURL: isEnvDev
    ? "http://localhost:5000/api"
    : "https://word-search-dictionary-dhgx0zx7s-strixv54.vercel.app/api",
});

const useProgressiveImage = (src) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};

export { getCurrentTime, axiosLocal, uuid, useProgressiveImage };
