"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import { getOccurrencesFor } from "@/services/ocorrencies.service";
import { useCurrentUser } from "@/hooks/useAuth";
import type { Occurrence, OccurrenceFilters } from "@/types/occurrence";

import { AppTable } from "@/components/AppTable";
import { OccurrenceDetailsModal } from "@/components/OccurrenceDetailsModal";
import { AppDatePicker } from "@/components/AppDatePicker";
import { AppFilter } from "@/components/AppFilter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function OcorrenciaPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const [selected, setSelected] = useState<Occurrence | null>(null);
  const [open, setOpen] = useState(false);
  const [filtrosDeTela, setFiltrosDeTela] = useState<OccurrenceFilters>({});

  const filtrosComDefaults = useMemo<OccurrenceFilters>(() => {
    const hoje = new Date();
    const seisMesesAtras = new Date();
    seisMesesAtras.setMonth(hoje.getMonth() - 6);

    const toLocalIso = (date: Date, endOfDay = false) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const hh = endOfDay ? "23" : "00";
      const mm = endOfDay ? "59" : "00";
      const ss = endOfDay ? "59" : "00";
      return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
    };
    const base: OccurrenceFilters = {
      dataInicio: filtrosDeTela.dataInicio ?? toLocalIso(seisMesesAtras),
      dataFim: filtrosDeTela.dataFim ?? toLocalIso(hoje, true),
      page: filtrosDeTela.page ?? 0,
      size: filtrosDeTela.size ?? 10,
      sort: filtrosDeTela.sort ?? "id,desc",
      status: Array.isArray(filtrosDeTela.status)
        ? filtrosDeTela.status.length > 0
          ? filtrosDeTela.status
          : ["EM_ANDAMENTO", "CANCELADO", "ABERTA", "PENDENTE", "CONCLUIDO"]
        : filtrosDeTela.status ?? [
            "EM_ANDAMENTO",
            "ABERTA",
            "CANCELADO",
            "PENDENTE",
            "CONCLUIDO",
          ],
      tipo: filtrosDeTela.tipo,
      cidade: filtrosDeTela.cidade,
      regiao:
        filtrosDeTela.regiao && filtrosDeTela.regiao !== "all"
          ? filtrosDeTela.regiao
          : undefined,
    };
    if (currentUser?.cargo !== "ADMIN" && currentUser?.regiaoAutorizada) {
      base.regiao = currentUser.regiaoAutorizada as OccurrenceFilters["regiao"];
    }

    return base;
  }, [filtrosDeTela, currentUser]);

  const { data: occurrences = [], isLoading: isOccurrencesLoading } = useQuery<
    Occurrence[]
  >({
    queryKey: ["ocorrencias", currentUser?.id_usuario, filtrosComDefaults],
    queryFn: () => {
      if (!currentUser) return Promise.resolve([]);
      return getOccurrencesFor(currentUser, {});
    },
    enabled: !!currentUser,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const isLoading = isUserLoading || isOccurrencesLoading;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppDatePicker
          onChange={(value) =>
            setFiltrosDeTela((prev) => ({
              ...prev,
              dataInicio: value.dataInicio,
              dataFim: value.dataFim,
            }))
          }
        />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Ocorrências
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-col items-center gap-4 col-span-2">
        <AppFilter
          cidadesAutorizadas={currentUser?.cidadesAutorizadas || []}
          onFilterChange={setFiltrosDeTela}
        />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg col-span-2">
        {isLoading ? (
          <div className="text-center text-gray-500">Carregando...</div>
        ) : (
          <>
            <AppTable
              data={occurrences}
              onRowClick={(occurrence) => {
                setSelected(occurrence);
                setOpen(true);
              }}
            />
            {/* Paginação */}
            <div className="flex justify-center mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if ((filtrosDeTela.page ?? 0) > 0) {
                          setFiltrosDeTela((prev) => ({
                            ...prev,
                            page: (prev.page ?? 0) - 1,
                          }));
                        }
                      }}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <span className="px-4 py-2 text-sm">
                      Página {(filtrosDeTela.page ?? 0) + 1}
                    </span>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setFiltrosDeTela((prev) => ({
                          ...prev,
                          page: (prev.page ?? 0) + 1,
                        }));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}

        <OccurrenceDetailsModal
          occurrence={selected}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    </div>
  );
}
