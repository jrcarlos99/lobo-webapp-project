import { apiClient } from "@/lib/apiClient";

import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";
import type { Occurrence, OccurrenceFilters } from "@/types/occurrence";
import { enforceRegionAccess } from "@/utils/enforceRegionAccess";

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

// Lista de regiões válidas (iguais ao backend)
const regioesValidas = ["RMR", "AGRE", "SERT", "ZDMT"] as const;

type RegiaoValida = (typeof regioesValidas)[number];

function isRegiaoValida(value: string): value is RegiaoValida {
  return (regioesValidas as readonly string[]).includes(value);
}

function clean(value?: string) {
  if (!value) return undefined;
  const v = value.trim();
  if (v.toLowerCase() === "all") return undefined;
  return v.toUpperCase();
}

export function buildOccurrenceParams(
  filters: OccurrenceFilters = {}
): QueryParams {
  const params: QueryParams = {};
  if (filters.dataInicio) params.dataHoraInicio = filters.dataInicio;
  if (filters.dataFim) params.dataHoraFim = filters.dataFim;

  if (typeof filters.page === "number") params.page = filters.page;
  if (typeof filters.size === "number") params.size = filters.size;
  if (filters.sort) params.sort = filters.sort;

  if (Array.isArray(filters.status)) {
    if (filters.status.length > 0) params.status = filters.status;
  } else if (filters.status) {
    params.status = filters.status;
  }

  const tipo = clean(filters.tipo as string);
  const cidade = clean(filters.cidade);
  const regiao = clean(filters.regiao);

  if (tipo) params.tipo = tipo;
  if (cidade) params.cidade = cidade;
  if (regiao) params.regiao = regiao;

  return params;
}

// Busca ocorrências com filtros
export const getOccurrencesFor = async (
  currentUser?: AuthUser,
  filters?: OccurrenceFilters
): Promise<Occurrence[]> => {
  if (!currentUser) return [];

  const f: OccurrenceFilters = { ...(filters ?? {}) };

  // Defaults
  const hoje = new Date();
  const seisMesesAtras = new Date();
  seisMesesAtras.setMonth(hoje.getMonth() - 6);

  const toLocalIso = (date: Date, endOfDay = false) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const hh = endOfDay ? "23" : "00";
    const mm = endOfDay ? "59" : "00";
    const ss = endOfDay ? "59" : "00";
    return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
  };

  f.dataInicio = f.dataInicio ?? toLocalIso(seisMesesAtras);
  f.dataFim = f.dataFim ?? toLocalIso(hoje, true);
  f.page = typeof f.page === "number" ? f.page : 0;
  f.size = typeof f.size === "number" ? f.size : 10;
  f.sort = "dataHoraAbertura,desc";

  if (currentUser.cargo !== "ADMIN" && currentUser.regiaoAutorizada) {
    if (isRegiaoValida(currentUser.regiaoAutorizada)) {
      f.regiao = currentUser.regiaoAutorizada;
    }
  }

  const filtrosComRegiao = enforceRegionAccess(f, currentUser);

  const params = { ...buildOccurrenceParams(filtrosComRegiao) };
  if (filtrosComRegiao.regiao === "all") {
    delete (params as Record<string, unknown>).regiao;
  }
  console.log("Chamando backend com filtros:", params);

  const res = await apiClient.get<PageableResponse<Occurrence> | Occurrence[]>(
    "/api/ocorrencias",
    { params }
  );

  if (Array.isArray(res.data)) return res.data;
  const paginada = res.data as PageableResponse<Occurrence>;
  return paginada?.content ?? [];
};
