import axios from "axios";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  withCredentials: true, // 🔥 REQUIRED for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default backend;
