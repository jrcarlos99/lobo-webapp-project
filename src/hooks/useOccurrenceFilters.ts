"use client";
import { useMemo } from "react";
import { OccurrenceFilters, OccurrenceStatus } from "@/types/occurrence";

const DEFAULT_STATUS: OccurrenceStatus[] = [
  "EM_ANDAMENTO",
  "ABERTA",
  "PENDENTE",
  "CANCELADO",
];

function toIsoDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function useOccurrenceFilters(
  filtros: OccurrenceFilters = {}
): OccurrenceFilters {
  return useMemo(() => {
    const hoje = new Date();
    const seisMesesAtras = new Date();
    seisMesesAtras.setMonth(hoje.getMonth() - 6);

    return {
      dataInicio: filtros.dataInicio
        ? filtros.dataInicio.split("T")[0]
        : toIsoDate(seisMesesAtras),

      dataFim: filtros.dataFim
        ? filtros.dataFim.split("T")[0]
        : toIsoDate(hoje),

      page: filtros.page ?? 0,
      size: filtros.size ?? 10,
      sort: filtros.sort ?? "id,desc",

      status: filtros.status ?? DEFAULT_STATUS,
      tipo: filtros.tipo ?? undefined,
      cidade: filtros.cidade ?? undefined,
      regiao: filtros.regiao ?? undefined,
    };
  }, [filtros]);
}
