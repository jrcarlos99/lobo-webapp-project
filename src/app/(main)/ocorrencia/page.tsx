"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOccurrencesPage } from "@/services/ocorrencies.service";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OcorrenciaPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const [selected, setSelected] = useState<Occurrence | null>(null);
  const [open, setOpen] = useState(false);

  //  Inicializa filtros já com datas válidas
  const hoje = new Date().toISOString().split("T")[0];
  const seisMesesAtras = new Date();
  seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
  const seisMesesStr = seisMesesAtras.toISOString().split("T")[0];

  const [filtrosDeTela, setFiltrosDeTela] = useState<OccurrenceFilters>({
    page: 0,
    size: 10,
    sort: "id,desc",
    dataInicio: seisMesesStr,
    dataFim: hoje,
  });

  //  Query só dispara quando currentUser existe
  const { data: occurrencesPage, isLoading: isOccurrencesLoading } = useQuery({
    queryKey: ["ocorrencias", currentUser?.id_usuario, filtrosDeTela],
    queryFn: () => getOccurrencesPage(currentUser!, filtrosDeTela),
    enabled: !!currentUser,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  const occurrences = occurrencesPage?.content ?? [];
  const totalPages = occurrencesPage?.totalPages ?? 1;
  const currentPage = occurrencesPage?.number ?? 0;
  const totalElements = occurrencesPage?.totalElements ?? 0;

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
              page: 0, //  sempre volta para a primeira página
            }))
          }
        />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Ocorrências
        </span>
        <div className="mt-4">
          <Button
            asChild
            className="btn-ocorrencia text-white font-semibold px-5 py-2.5 rounded-lg shadow-md"
          >
            <Link href="/ocorrencia/new" className="flex items-center gap-2">
              Criar Ocorrência
            </Link>
          </Button>
        </div>
      </div>

      <div className="col-span-2">
        <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md mb-4">
          <AppFilter
            cidadesAutorizadas={currentUser?.cidadesAutorizadas || []}
            onFilterChange={(updates) =>
              setFiltrosDeTela((prev) => ({
                ...prev,
                ...updates,
                page: 0,
              }))
            }
          />
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          {isLoading ? (
            <div className="text-center text-gray-500">Carregando...</div>
          ) : (
            <>
              <AppTable
                data={occurrences}
                page={currentPage}
                size={filtrosDeTela.size}
                totalElements={totalElements}
                onRowClick={(occurrence) => {
                  setSelected(occurrence);
                  setOpen(true);
                }}
              />
              <div className="flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 0) {
                            setFiltrosDeTela((prev) => ({
                              ...prev,
                              page: currentPage - 1,
                            }));
                          }
                        }}
                      />
                    </PaginationItem>

                    <PaginationItem>
                      <span className="px-4 py-2 text-sm">
                        Página {currentPage + 1} de {totalPages} —{" "}
                        {totalElements} registros
                      </span>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages - 1) {
                            setFiltrosDeTela((prev) => ({
                              ...prev,
                              page: currentPage + 1,
                            }));
                          }
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
    </div>
  );
}
