import { v4 as uuid } from "uuid";
import axios from "axios";

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

const axiosLocal = axios.create({
  baseURL: "https://word-search-dictionary-dhgx0zx7s-strixv54.vercel.app/api",
});

export { getCurrentTime, axiosLocal, uuid };
