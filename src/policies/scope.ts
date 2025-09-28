import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";

export const isAdmin = (u?: AuthUser) => u?.cargo === "ADMIN";
export const isChefe = (u?: AuthUser) => u?.cargo === "CHEFE";
export const isAnalista = (u?: AuthUser) => u?.cargo === "ANALISTA";

// Retorna filtros que o frontend deve aplicar em queries (mas backend deve re-checar)

export function scopeFiltersFor(user?: AuthUser): QueryParams {
  if (!user) return {};
  if (isAdmin(user)) return {}; // sem filtros para o admin

  const { regiaoAutorizada, cidadesAutorizadas, id_bombeiro } = user;

  // Chefes e Analistas
  const filters: QueryParams = {};

  // Cidades autorizadas
  if (cidadesAutorizadas && cidadesAutorizadas.length > 0) {
    filters.cidades = cidadesAutorizadas.join(",");
  }

  if (isChefe(user)) {
    if (regiaoAutorizada) {
      filters.regiao = regiaoAutorizada;
    }
  }

  if (isAnalista(user)) {
    if (regiaoAutorizada) {
      filters.regiao = regiaoAutorizada;
    }
    if (id_bombeiro) {
      filters.id_bombeiro = id_bombeiro;
    }
  }
  return filters;
}
