import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // Vite proxy -> backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cs_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
