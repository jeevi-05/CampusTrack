import axios from "axios";

// In production (Railway), REACT_APP_API_URL is set as an env variable.
// In local dev, it falls back to localhost:8080.
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
