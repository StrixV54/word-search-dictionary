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

const axiosLocal = axios.create({
  baseURL: "http://localhost:5000/api",
});

export { getCurrentTime, axiosLocal, uuid };
