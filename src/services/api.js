import axios from "axios";

// Shared Axios instance for all API calls.
// This allows centralized configuration (base URL, timeouts, headers),
// making it easy to swap the backend or add interceptors later.
const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
