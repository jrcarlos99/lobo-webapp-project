import { apiClient } from "@/lib/apiClient";
import { scopeFiltersFor } from "@/policies/scope";
import type { AuthUser } from "@/types/auth";
import type { QueryParams } from "@/types/query";

import { mockOcorrencias } from "@/data/mockOcurrences";

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

  await new Promise((resolve) => setTimeout(resolve, 300));

  let results = mockOcorrencias;
  const filtroCidades = params.cidades as string | undefined;

  if (filtroCidades) {
    const cidadesAutorizadas = filtroCidades.split(",");

    results = results.filter((ocorrencia) =>
      cidadesAutorizadas.includes(ocorrencia.cidade)
    );
  }
  return results;
  // const res = await apiClient.get<Occurrence[]>("/ocorrencia", { params });
  // return res.data as Occurrence[];
};
