import { apiClient } from "@/lib/apiClient";

import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";
import type { Occurrence, OccurrenceFilters } from "@/types/occurrence";
import type { DashboardData } from "@/types/dashboard";
import { getPreviousRange } from "@/utils/dateRanges";

type PageableResponse<T> = {
  content: T[];
  pageable: unknown;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: unknown;
  numberOfElements: number;
  empty: boolean;
};

export function buildOccurrenceParams(
  filters: OccurrenceFilters = {}
): QueryParams {
  const params: QueryParams = {};

  if (filters.status) params.status = filters.status;
  if (filters.tipo) params.tipo = filters.tipo;
  if (filters.cidade) params.cidade = filters.cidade;
  if (filters.regiao) params.regiao = filters.regiao;
  if (filters.dataInicio) params.dataInicio = filters.dataInicio;
  if (filters.dataFim) params.dataFim = filters.dataFim;
  if (typeof filters.page === "number") params.page = filters.page;
  if (typeof filters.size === "number") params.size = filters.size;
  if (filters.sort) params.sort = filters.sort;

  return params;
}
const dataInicio = "2025-01-01T00:00:00";
const dataFim = "2025-12-31T23:59:59";

export const getOccurrencesFor = async (
  currentUser?: AuthUser,
  filters?: OccurrenceFilters
): Promise<Occurrence[]> => {
  if (!currentUser) return [];

  const params = buildOccurrenceParams(filters ?? {});
  const res = await apiClient.get<PageableResponse<Occurrence> | Occurrence[]>(
    "/api/ocorrencias",
    {
      params,
    }
  );

  console.log("Resposta bruta de /api/ocorrencias:", res.data);

  if (Array.isArray(res.data)) {
    return res.data;
  }
  if (
    res.data &&
    Array.isArray((res.data as PageableResponse<Occurrence>).content)
  ) {
    return (res.data as PageableResponse<Occurrence>).content;
  }
  return [];
};

export async function getDashboardData(
  currentUser: AuthUser
): Promise<DashboardData> {
  const occurrences = await getOccurrencesFor(currentUser, {
    dataInicio,
    dataFim,
    size: 1000,
  });

  const totalAtual = occurrences.length;

  // 3) Calcule período anterior (mesma duração imediatamente anterior)
  const { dataInicioAnterior, dataFimAnterior } = getPreviousRange(
    dataInicio,
    dataFim
  );

  const occurrencesAnterior = await getOccurrencesFor(currentUser, {
    dataInicio: dataInicioAnterior,
    dataFim: dataFimAnterior,
    size: 1000,
  });

  const totalAnterior = occurrencesAnterior.length;

  // 4) Cálculo da variação (%)
  // regra: se totalAnterior = 0 e totalAtual > 0 → 100%; se ambos 0 → 0%
  let porcentagemComparacaoPeriodo = 0;
  if (totalAnterior === 0) {
    porcentagemComparacaoPeriodo = totalAtual > 0 ? 100 : 0;
  } else {
    porcentagemComparacaoPeriodo =
      ((totalAtual - totalAnterior) / totalAnterior) * 100;
  }

  // Agrupar por região
  const graficoRegiao = Object.entries(
    occurrences.reduce<Record<string, number>>((acc, o) => {
      acc[o.regiao] = (acc[o.regiao] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value }));

  // Agrupar por tipo
  const graficoTipo = Object.entries(
    occurrences.reduce<Record<string, number>>((acc, o) => {
      acc[o.tipo] = (acc[o.tipo] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value }));

  // Agrupar por turno
  const graficoTurno = Object.entries(
    occurrences.reduce<Record<string, number>>((acc, o) => {
      const hora = new Date(o.dataHoraAbertura).getHours();
      let turno = "Noite";
      if (hora >= 6 && hora < 12) turno = "Manhã";
      else if (hora >= 12 && hora < 18) turno = "Tarde";
      acc[turno] = (acc[turno] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value }));

  return {
    kpis: { totalOcorrencias: totalAtual, porcentagemComparacaoPeriodo },
    graficoRegiao,
    graficoTipo,
    graficoTurno,
  };
}

// Busca ocorrência por ID
export const getOccurrenceById = async (id: number) => {
  const res = await apiClient.get(`/api/ocorrencias/${id}`);
  return res.data;
};

// Cria nova ocorrência
export const createOccurrence = async (data: Partial<Occurrence>) => {
  const res = await apiClient.post("/api/ocorrencias", data);
  return res.data;
};

// Atualiza ocorrência existente
export const updateOccurrence = async (
  id: number,
  data: Partial<Occurrence>
) => {
  const res = await apiClient.put(`/api/ocorrencias/${id}`, data);
  return res.data;
};

// Deleta ocorrência
export const deleteOccurrence = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/ocorrencias/${id}`);
};
