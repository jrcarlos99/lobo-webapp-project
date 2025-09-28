"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useAuth";
import { getOccurrencesFor, Occurrence } from "@/services/ocorrencies.service";

import { AppDatePicker } from "@/components/AppDatePicker";
import { AppFilter } from "@/components/AppFilter";
import { AppTable } from "@/components/AppTable";

import { Button } from "@/components/ui/button";

export default function RelatorioPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const [filtrosDeTela, setFiltrosDeTela] = useState({});

  const { data: occurrences, isLoading: isOccurrencesLoading } = useQuery<
    Occurrence[]
  >({
    queryKey: ["ocorrencias", currentUser, filtrosDeTela],
    queryFn: () => {
      if (currentUser) {
        return getOccurrencesFor(currentUser, filtrosDeTela);
      }
      return Promise.resolve([]);
    },
    enabled: !!currentUser,
    staleTime: 1000 * 60,
  });

  const isLoading = isUserLoading || isOccurrencesLoading;

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
        <AppTable data={occurrences} />
      </div>
    </div>
  );
}
