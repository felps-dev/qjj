import axios from "axios";

export const api_url =
  process.env.NODE_ENV === "production"
    ? "http://qualjogojogar.online:8005/api/"
    : "http://localhost:8000/api/";

export default function api() {
  let axiosInstance = axios.create({
    baseURL: api_url,
  });

  return axiosInstance;
}
