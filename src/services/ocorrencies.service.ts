import { apiOcorrencias } from "@/lib/apiClientOcorrencias";

import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";
import type {
  CreateOccurrenceDTO,
  Occurrence,
  OccurrenceFilters,
} from "@/types/occurrence";
import { enforceRegionAccess } from "@/utils/enforceRegionAccess";

export type PageableResponse<T> = {
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

  if (filters.dataInicio) params.dataHoraInicio = filters.dataInicio;
  if (filters.dataFim) params.dataHoraFim = filters.dataFim;

  if (typeof filters.page === "number") params.page = filters.page;
  if (typeof filters.size === "number") params.size = filters.size;
  if (filters.sort) params.sort = filters.sort;

  if (filters.status) params.status = filters.status;
  if (filters.tipo) params.tipo = filters.tipo;
  if (filters.cidade) params.cidade = filters.cidade;
  if (filters.regiao) params.regiao = filters.regiao;

  return params;
}

export const getOccurrencesPage = async (
  currentUser?: AuthUser,
  filters?: OccurrenceFilters
): Promise<PageableResponse<Occurrence>> => {
  if (!currentUser) {
    return {
      content: [],
      pageable: {},
      last: true,
      totalPages: 0,
      totalElements: 0,
      first: true,
      size: 0,
      number: 0,
      sort: {},
      numberOfElements: 0,
      empty: true,
    };
  }

  const f: OccurrenceFilters = { ...(filters ?? {}) };

  const hoje = new Date();
  const seisMesesAtras = new Date();
  seisMesesAtras.setMonth(hoje.getMonth() - 6);

  const toLocalDate = (date: Date): string =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  f.dataInicio = f.dataInicio ?? toLocalDate(seisMesesAtras);
  f.dataFim = f.dataFim ?? toLocalDate(hoje);
  f.page = f.page ?? 0;
  f.size = f.size ?? 10;
  f.sort = f.sort ?? "dataHoraAbertura,desc";

  // 🔎 log do usuário corrente
  console.log("👤 currentUser:", currentUser);

  // aplica regra por região
  const filtrosComRegiao = enforceRegionAccess(f, currentUser);

  // 🔎 log dos filtros finais
  console.log("🎯 filtrosComRegiao:", filtrosComRegiao);

  const params = buildOccurrenceParams(filtrosComRegiao);

  // 🔎 log dos parâmetros enviados pra API
  console.log("📤 params enviados para /api/ocorrencias:", params);

  const res = await apiOcorrencias.get<PageableResponse<Occurrence>>(
    "/api/ocorrencias",
    { params }
  );

  return res.data;
};

export const getOccurrencesFor = async (
  currentUser?: AuthUser,
  filters?: OccurrenceFilters
): Promise<Occurrence[]> => {
  const page = await getOccurrencesPage(currentUser, filters);
  return page.content;
};

export async function createOccurrence(data: CreateOccurrenceDTO) {
  const res = await apiOcorrencias.post("/api/ocorrencias", data);
  return res.data;
}
