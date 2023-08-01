import { v4 as uuid } from "uuid";

const getCurrentTime = new Date().toLocaleString(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour12: true,
});

const getLocalHostURL = "http://localhost:5000";

export { getCurrentTime, getLocalHostURL, uuid };
