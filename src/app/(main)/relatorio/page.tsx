"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useAuth";
import { getOccurrencesFor } from "@/services/ocorrencies.service";
import type { Occurrence, OccurrenceFilters } from "@/types/occurrence";

import { AppDatePicker } from "@/components/AppDatePicker";
import { AppFilter } from "@/components/AppFilter";
import { AppTable } from "@/components/AppTable";
import { Button } from "@/components/ui/button";

export default function RelatorioPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const [filtrosDeTela, setFiltrosDeTela] = useState<OccurrenceFilters>({});

  const { data: occurrences, isLoading: isOccurrencesLoading } = useQuery<
    Occurrence[]
  >({
    queryKey: ["ocorrencias", currentUser?.id_usuario, filtrosDeTela],
    queryFn: () => {
      if (!currentUser) return Promise.resolve([]);

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

      const filtrosComDefaults: OccurrenceFilters = {
        dataInicio: filtrosDeTela.dataInicio ?? toLocalIso(trintaDiasAtras),
        dataFim: filtrosDeTela.dataFim ?? toLocalIso(hoje, true),
        page: filtrosDeTela.page ?? 0,
        size: filtrosDeTela.size ?? 10,
        sort: filtrosDeTela.sort ?? "id,desc",
        status: filtrosDeTela.status,
        tipo: filtrosDeTela.tipo,
        cidade: filtrosDeTela.cidade,
        regiao: filtrosDeTela.regiao,
      };

      console.log("Filtros finais enviados:", filtrosComDefaults);
      return getOccurrencesFor(currentUser, filtrosComDefaults);
    },
    enabled: !!currentUser,
    staleTime: 1000 * 60,
  });

  const isLoading = isUserLoading || isOccurrencesLoading;

  useEffect(() => {
    console.log("Filtros de tela:", filtrosDeTela);
  }, [filtrosDeTela]);

  useEffect(() => {
    if (occurrences) {
      console.log(
        "Tipo de occurrences:",
        Array.isArray(occurrences) ? "array" : typeof occurrences
      );
      console.log(
        "Tamanho:",
        Array.isArray(occurrences) ? occurrences.length : "n/a"
      );
      console.log(
        "Primeiro item:",
        Array.isArray(occurrences) ? occurrences[0] : occurrences
      );
    }
  }, [occurrences]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppDatePicker />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Relatórios
        </span>
      </div>

      <div className="flex flex-row-reverse bg-primary-foreground p-4 rounded-2xl ">
        <Button className="bg-[var(--color-button)] hover:bg-[var(--color-secondary-lobo)] w-full sm:w-auto px-6 h-12">
          <a href="">Gerar Relatório</a>
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-col items center gap-4 col-span-2">
        <AppFilter
          cidadesAutorizadas={currentUser?.cidadesAutorizadas || []}
          onFilterChange={setFiltrosDeTela}
        />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg col-span-2">
        <AppTable data={occurrences ?? []} />
      </div>
    </div>
  );
}
