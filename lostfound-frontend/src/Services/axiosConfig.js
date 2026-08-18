import axios from "axios";

// Use the env override when provided. Otherwise default to localhost during
// development and the hosted backend in production.
const DEFAULT_PROD = "https://campustrack-backend.onrender.com";
const DEFAULT_DEV = "http://localhost:8080";

// If running in the browser on localhost, prefer the dev backend to avoid CORS
// issues when `REACT_APP_API_URL` is set to a remote host that doesn't allow
// requests from http://localhost:3000.
let BASE_URL = process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development" ? DEFAULT_DEV : DEFAULT_PROD);

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  BASE_URL = DEFAULT_DEV;
}

// Helpful debug output for local development to confirm which backend is used
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.debug("AXIOS BASE_URL:", BASE_URL);
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
