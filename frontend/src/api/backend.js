import axios from "axios";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

backend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default backend;
