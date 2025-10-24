import { apiClient } from "@/lib/apiClient";
import type { DashboardData } from "@/types/dashboard";

function toIsoDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function getDashboardData(
  dataInicio?: string,
  dataFim?: string
): Promise<DashboardData> {
  const hoje = new Date();
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(hoje.getDate() - 30);

  const inicio = dataInicio ?? toIsoDate(trintaDiasAtras);
  const fim = dataFim ?? toIsoDate(hoje);

  const response = await apiClient.get<DashboardData>(
    "/api/ocorrencias/dashboard",
    { params: { dataInicio: inicio, dataFim: fim } }
  );
  return response.data;
}
