import { apiClient } from "@/lib/apiClient";
import type { QueryParams } from "@/types/query";

export const getDashboardStats = async (params?: QueryParams) => {
  const res = await apiClient.get("/reports/dashboard", { params });
  return res.data;
};

export const generateDashboardStats = async (body: unknown) => {
  const res = await apiClient.post("/reports/generate", body);
  return res.data;
};
