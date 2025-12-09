import axios from "axios";

export const apiUsuarios = axios.create({
  baseURL: "https://usuarios-service-2e2t.onrender.com",
});

apiUsuarios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
