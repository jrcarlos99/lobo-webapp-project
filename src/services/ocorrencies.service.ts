import { apiClient } from "@/lib/apiClient";
import { scopeFiltersFor } from "@/policies/scope";
import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";

export type Occurrence = {
  id_ocorrencia: number;
  status: string;
  tipo: string;
  tipo_ocorrencia: string;
  descricao?: string;
  regiao?: string;
  latitude?: number;
  longitude?: number;
  data_hora?: string;
};

export const getOccurrencesFor = async (
  users?: AuthUser,
  extraParams?: QueryParams
): Promise<Occurrence[]> => {
  const scope: QueryParams = scopeFiltersFor(users);

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

  const res = await apiClient.get<Occurrence[]>("/ocorrencia", { params });
  return res.data as Occurrence[];
};
