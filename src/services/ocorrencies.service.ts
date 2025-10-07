import { apiClient } from "@/lib/apiClient";
import { scopeFiltersFor } from "@/policies/scope";
import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";

export interface KPIData {
  totalOcorrencias: number;
  porcentagemComparacaoPeriodo: number;
}

export interface ChartDataItem {
  label: string;
  value: number;
}

export interface DashboardData {
  kpis: KPIData;
  graficoRegiao: ChartDataItem[];
  graficoTipo: ChartDataItem[];
  graficoTurno: ChartDataItem[];
}

export type Occurrence = {
  id_ocorrencia: number;
  cidade: string;
  regiao: string;
  status: string;
  tipo: string;
  tipo_ocorrencia: string;
  descricao?: string;
  latitude?: number;
  longitude?: number;
  data_hora?: string;
};

export const getOccurrencesFor = async (
  currentUser?: AuthUser,
  extraParams?: QueryParams
): Promise<Occurrence[]> => {
  const scope: QueryParams = scopeFiltersFor(currentUser);

  // Unifica scope + params
  const params: QueryParams = {
    ...scope,
    ...(extraParams ?? {}),
  };

  // remove keys com valor vazio (''), undefined ou null
  Object.keys(params).forEach((k) => {
    const v = (params as Record<string, unknown>)[k];
    if (
      v === undefined ||
      v === null ||
      (typeof v === "string" && v.trim() === "")
    ) {
      delete params[k];
    }
  });

  try {
    const res = await apiClient.get<Occurrence[]>("/api/ocorrencias", {
      params,
    });
    return res.data as Occurrence[];
  } catch (error) {
    console.error("Erro ao buscar ocorrências:", error);
    throw error;
  }
};

export const getDashboardData = async (
  currentUser?: AuthUser,
  extraParams?: QueryParams
): Promise<DashboardData> => {
  const scope: QueryParams = scopeFiltersFor(currentUser);

  const userFilters: QueryParams = extraParams ?? {};

  const finalCityFilter = scope.cidadeFiltro || userFilters.cidadeFiltro;

  const params: QueryParams = {
    ...scope,
    ...userFilters,
  };

  if (finalCityFilter) {
    params.cidadeFiltro = finalCityFilter;
  }
  delete params.cidades;

  // remove keys com valores vázios ("", undefined ou null)

  Object.keys(params).forEach((k) => {
    const v = (params as Record<string, unknown>)[k];
    if (
      v === undefined ||
      v === null ||
      (typeof v === "string" && v.trim() === "")
    ) {
      delete params[k];
    }
  });

  try {
    const res = await apiClient.get("/ocorrencias/dashboard", { params });
    return res.data as DashboardData;
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    throw error;
  }
};
