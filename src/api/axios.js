import axios from "axios";

// Load from your .env file (Vite uses import.meta.env)
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Example: VITE_API_BASE_URL=https://api.hangergarments.com/api

const api = axios.create({
  baseURL: BASE_URL, // 👈 This is where base URL goes
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Automatically add token for logged-in users
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
