"use client";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useAuth";
import { useDashboardData } from "@/hooks/useDashboardData";
import { getOccurrencesFor } from "@/services/ocorrencies.service";
import { Occurrence, OccurrenceFilters } from "@/types/occurrence";

import DashboardFilters from "@/components/DashboardFilters";
import dynamic from "next/dynamic";
import { enforceRegionAccess } from "@/utils/enforceRegionAccess";
import { can } from "@/policies/permissions";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const DashboardMap = dynamic(() => import("@/components/DashboardMap"), {
  ssr: false,
});
const DashboardCharts = dynamic(() => import("@/components/DashboardCharts"), {
  ssr: false,
});

const HEADER_HEIGHT = 69;

export default function DashboardPage() {
  const { data: currentUser } = useCurrentUser();
  const [filtros, setFiltros] = useState<OccurrenceFilters>({});

  // Aplica regra de acesso
  const effectiveFilters = enforceRegionAccess(filtros, currentUser);

  //  Hook centralizado para dashboard
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useDashboardData(effectiveFilters);

  // Ocorrências para mapa e select
  const { data: occurrences = [], isLoading: isOccurrencesLoading } = useQuery<
    Occurrence[]
  >({
    queryKey: [
      "ocorrencias-dashboard",
      currentUser?.id_usuario,
      effectiveFilters,
    ],
    queryFn: () =>
      currentUser
        ? getOccurrencesFor(currentUser, effectiveFilters)
        : Promise.resolve([]),
    enabled: !!currentUser,
    placeholderData: keepPreviousData,
  });

  const isLoading = isDashboardLoading || isOccurrencesLoading;
  if (isLoading) return <div className="p-4">Carregando Dashboard...</div>;

  return (
    <div
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      className="min-h-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 h-full">
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
        <DashboardMap occurrences={occurrences} />
        <DashboardCharts
          dashboardData={dashboardData}
          isLoading={isDashboardLoading}
        />
      </div>
    </div>
  );
}
