import { apiClient } from "@/lib/apiClient";

import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";
import type { Occurrence, OccurrenceFilters } from "@/types/occurrence";
import type { DashboardData } from "@/types/dashboard";
import { getPreviousRange } from "@/utils/dateRanges";
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
  if (filters.dataInicio) params.dataInicio = filters.dataInicio;
  if (filters.dataFim) params.dataFim = filters.dataFim;
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

  // // não precisa mais do destructuring que gerava warning
  // if (f.regiao === "all") {
  //   delete (params as Record<string, unknown>).regiao;
  // }

  const res = await apiClient.get<PageableResponse<Occurrence> | Occurrence[]>(
    "/api/ocorrencias",
    { params }
  );

  if (Array.isArray(res.data)) return res.data;
  const paginada = res.data as PageableResponse<Occurrence>;
  return paginada?.content ?? [];
};

function normalizedRegions(regiao: string): "RMR" | "AGRE" | "SERT" | "ZDMT" {
  const mapa: Record<string, "RMR" | "AGRE" | "SERT" | "ZDMT"> = {
    RMR: "RMR",
    "REGIÃO METROPOLITANA": "RMR",
    "REGIAO METROPOLITANA": "RMR",

    AGRE: "AGRE",
    AGRESTE: "AGRE",

    SERT: "SERT",
    SERTAO: "SERT",
    SERTÃO: "SERT",

    ZDMT: "ZDMT",
    "ZONA DA MATA": "ZDMT",
  };

  return (
    mapa[regiao.toUpperCase()] ?? (regiao as "RMR" | "AGRE" | "SERT" | "ZDMT")
  );
}

// Dashboard
export async function getDashboardData(
  currentUser: AuthUser,
  filtrosExtras?: OccurrenceFilters
): Promise<DashboardData> {
  const hoje = new Date();
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(hoje.getDate() - 30);

  const toLocalIso = (date: Date, endOfDay = false) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const hh = endOfDay ? "23" : "00";
    const mm = endOfDay ? "59" : "00";
    const ss = endOfDay ? "59" : "00";
    return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
  };

  const dataInicio = filtrosExtras?.dataInicio ?? toLocalIso(trintaDiasAtras);
  const dataFim = filtrosExtras?.dataFim ?? toLocalIso(hoje, true);

  const filtrosAtuais: OccurrenceFilters = {
    dataInicio,
    dataFim,
    size: 1000,
    ...filtrosExtras,
  };
  const filtrosAtuaisComRegiao = enforceRegionAccess(
    filtrosAtuais,
    currentUser
  );
  const occurrences = await getOccurrencesFor(
    currentUser,
    filtrosAtuaisComRegiao
  );

  if (currentUser.cargo !== "ADMIN" && currentUser.regiaoAutorizada) {
    filtrosAtuais.regiao =
      currentUser.regiaoAutorizada as OccurrenceFilters["regiao"];
  }

  const totalAtual = occurrences.length;

  const { dataInicioAnterior, dataFimAnterior } = getPreviousRange(
    dataInicio,
    dataFim
  );

  let filtrosAnteriores: OccurrenceFilters = {
    dataInicio: dataInicioAnterior,
    dataFim: dataFimAnterior,
    size: 1000,
  };

  if (currentUser.cargo !== "ADMIN" && currentUser.regiaoAutorizada) {
    filtrosAnteriores = {
      ...filtrosAnteriores,
      regiao: currentUser.regiaoAutorizada as OccurrenceFilters["regiao"],
    };
  }

  const occurrencesAnterior = await getOccurrencesFor(
    currentUser,
    filtrosAnteriores
  );
  const totalAnterior = occurrencesAnterior.length;

  let porcentagemComparacaoPeriodo = 0;
  if (totalAnterior === 0) {
    porcentagemComparacaoPeriodo = totalAtual > 0 ? 100 : 0;
  } else {
    porcentagemComparacaoPeriodo =
      ((totalAtual - totalAnterior) / totalAnterior) * 100;
  }

  // Monta o objeto no formato do tipo DashboardData
  const totalOcorrencias = totalAtual;

  const porStatus = occurrences.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const porTipo = occurrences.reduce<Record<string, number>>((acc, o) => {
    acc[o.tipo] = (acc[o.tipo] || 0) + 1;
    return acc;
  }, {});

  const porTurno = occurrences.reduce<Record<string, number>>((acc, o) => {
    const hora = new Date(o.dataHoraAbertura).getHours();
    let turno = "Noite";
    if (hora >= 6 && hora < 12) turno = "Manhã";
    else if (hora >= 12 && hora < 18) turno = "Tarde";
    acc[turno] = (acc[turno] || 0) + 1;
    return acc;
  }, {});

  const porRegiao = occurrences.reduce<Record<string, number>>((acc, o) => {
    const reg = normalizedRegions(o.regiao);
    acc[reg] = (acc[reg] || 0) + 1;
    return acc;
  }, {});

  return {
    totalOcorrencias,
    porcentagemComparacaoPeriodo,
    porStatus,
    porTipo,
    porTurno,
    porRegiao,
  };
}
