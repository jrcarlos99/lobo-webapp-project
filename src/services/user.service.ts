import { apiUsuarios } from "@/lib/apiClientUsuarios";

import { scopeFiltersFor } from "@/policies/scope";
import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";

export const userService = {
  async getCurrentUser(): Promise<AuthUser> {
    const res = await apiUsuarios.get("/usuarios/me");
    const data = res.data;
    return {
      id_usuario: data.id,
      email: data.email,
      nome: data.nomeCompleto,
      cargo: data.perfil,
      regiaoAutorizada: data.regiaoAutorizada ?? data.regiao ?? "",
      cidadesAutorizadas: data.cidadesAutorizadas ?? [],
    } as AuthUser;
  },
};

export type UserListItem = {
  id_usuario: number;
  nome: string;
  email: string;
  cargo: string;
  regiao?: string;
  ultimo_login?: string;
  ativo?: boolean;
};

export const getUsersFor = async (
  user?: AuthUser,
  extraParams?: QueryParams
): Promise<UserListItem[]> => {
  const scope: QueryParams = scopeFiltersFor(user);
  const params: QueryParams = { ...scope, ...(extraParams ?? {}) };

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

  const res = await apiUsuarios.get<UserListItem[]>("/usuarios", { params });
  return res.data;
};
