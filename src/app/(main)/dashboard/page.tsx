"use client";
import { useMemo, useState } from "react";
import { useCurrentUser } from "@/hooks/useAuth";
import { useDashboardData } from "@/hooks/useDashboardData";
import { getOccurrencesFor } from "@/services/ocorrencies.service";
import { Occurrence, OccurrenceFilters } from "@/types/occurrence";

import DashboardFilters from "@/components/DashboardFilters";
import dynamic from "next/dynamic";
import { enforceRegionAccess } from "@/utils/enforceRegionAccess";
import { can } from "@/policies/permissions";
import { useQuery } from "@tanstack/react-query";

const DashboardMapComponent = dynamic(
  () => import("@/components/DashboardMap"),
  {
    ssr: false,
  }
);
const DashboardCharts = dynamic(() => import("@/components/DashboardCharts"), {
  ssr: false,
});

const HEADER_HEIGHT = 69;

export default function DashboardPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  //  filtros iniciais já válidos
  const hoje = new Date().toISOString().split("T")[0];
  const seisMesesAtras = new Date();
  seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
  const seisMesesStr = seisMesesAtras.toISOString().split("T")[0];

  const [filtros, setFiltros] = useState<OccurrenceFilters>({
    dataInicio: seisMesesStr,
    dataFim: hoje,
  });

  //  memoiza para não recriar objeto a cada render
  const effectiveFilters = useMemo(
    () => enforceRegionAccess(filtros, currentUser),
    [filtros, currentUser]
  );

  // dados agregados do dashboard
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useDashboardData(effectiveFilters);

  // lista simples de ocorrências
  const { data: occurrences = [], isLoading: isOccurrencesLoading } = useQuery<
    Occurrence[]
  >({
    queryKey: [
      "ocorrencias-dashboard",
      currentUser?.id_usuario,
      effectiveFilters.dataInicio,
      effectiveFilters.dataFim,
      effectiveFilters.regiao,
      effectiveFilters.cidade,
      effectiveFilters.tipo,
      effectiveFilters.status,
    ],
    queryFn: () =>
      currentUser
        ? getOccurrencesFor(currentUser, effectiveFilters)
        : Promise.resolve([] as Occurrence[]),
    enabled: !!currentUser,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const isLoading = isUserLoading || isDashboardLoading || isOccurrencesLoading;

  if (isLoading) return <div className="p-4">Carregando Dashboard...</div>;

  return (
    <div
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      className="min-h-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {/* Linha 1: filtros (1/3) + mapa (2/3) */}
        <div className="lg:col-span-1">
          <DashboardFilters
            filtros={filtros}
            setFiltros={setFiltros}
            occurrences={occurrences}
            dashboardData={dashboardData}
            isLoading={isDashboardLoading}
            currentUser={currentUser}
            regionDisabled={!can(currentUser?.cargo, "region:all")}
            fixedRegionLabel={currentUser?.regiaoAutorizada}
          />
        </div>

        <div className="lg:col-span-2">
          <DashboardMapComponent occurrences={occurrences} />
        </div>

        {/* Linha 2: gráficos ocupando as 3 colunas */}
        <div className="lg:col-span-3">
          <DashboardCharts
            dashboardData={dashboardData}
            isLoading={isDashboardLoading}
          />
        </div>
      </div>
    </div>
  );
}
