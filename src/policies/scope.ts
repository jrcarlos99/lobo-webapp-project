import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";

export const isAdmin = (u?: AuthUser) => u?.cargo === "ADMIN";
export const isChefe = (u?: AuthUser) => u?.cargo === "CHEFE";
export const isAnalista = (u?: AuthUser) => u?.cargo === "ANALISTA";

// Retorna filtros que o frontend deve aplicar em queries (mas backend deve re-checar)

export function scopeFiltersFor(user?: AuthUser): QueryParams {
  if (!user) return {};
  if (isAdmin(user)) return {}; // sem filtros
  if (isChefe(user)) {
    return {
      ...(user.regiao ? { regiao: user.regiao } : {}),
    };
  }
  if (isAnalista(user)) {
    return {
      ...(user?.regiao ? { regiao: user.regiao } : {}),
      ...(user.id_bombeiro ? { id_bombeiro: user.id_bombeiro } : {}),
    };
  }
  return {};
}
