"use client";
import { useMemo } from "react";
import { OccurrenceFilters, OccurrenceStatus } from "@/types/occurrence";

const DEFAULT_STATUS: OccurrenceStatus[] = [
  "EM_ANDAMENTO",
  "ABERTA",
  "PENDENTE",
  "CANCELADO",
];

export function useOccurrenceFilters(filtros: OccurrenceFilters) {
  return useMemo<OccurrenceFilters>(() => {
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

    return {
      dataInicio: filtros.dataInicio ?? toLocalIso(trintaDiasAtras),
      dataFim: filtros.dataFim ?? toLocalIso(hoje, true),
      page: filtros.page ?? 0,
      size: filtros.size ?? 100,
      sort: filtros.sort ?? "id,desc",
      status: filtros.status ?? DEFAULT_STATUS,
      tipo: filtros.tipo,
      cidade: filtros.cidade,
      regiao: filtros.regiao,
    };
  }, [filtros]);
}
