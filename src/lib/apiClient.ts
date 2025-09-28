import axios from "axios";

export const apiClient = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const errObj = {
      status: err.response?.status,
      message: err.response?.data?.message ?? err.message,
      data: err.response?.data,
    };
    return Promise.reject(errObj);
  }
);
