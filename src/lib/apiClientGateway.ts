import axios from "axios";

export const apiGateway = axios.create({
  baseURL: "https://api-gateway-60vv.onrender.com",
});

apiGateway.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
