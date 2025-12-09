import axios from "axios";

export const apiOcorrencias = axios.create({
  baseURL: "https://webapp-ocorrencias.onrender.com",
});

apiOcorrencias.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
