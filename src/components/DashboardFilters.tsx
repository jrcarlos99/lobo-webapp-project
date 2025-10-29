"use client";
import { AppDatePicker } from "@/components/AppDatePicker";
import { AppSelect } from "@/components/AppSelect";
import { AppOcorrenciaChart } from "@/components/AppOcorrenciaChart";
import { Occurrence, OccurrenceFilters } from "@/types/occurrence";
import { AuthUser } from "@/types/auth";
import { DashboardData } from "@/types/dashboard";

type Props = {
  filtros: OccurrenceFilters;
  setFiltros: React.Dispatch<React.SetStateAction<OccurrenceFilters>>;
  occurrences: Occurrence[];
  dashboardData?: DashboardData;
  isLoading: boolean;
  currentUser?: AuthUser | null;
  regionDisabled?: boolean;
  fixedRegionLabel?: string;
};

export default function DashboardFilters({
  setFiltros,
  occurrences,
  dashboardData,
  isLoading,
  regionDisabled,
  fixedRegionLabel,
}: Props) {
  return (
    <div className="w-full bg-primary-foreground p-4 rounded-lg flex flex-col gap-3">
      <AppDatePicker
        onChange={(value) =>
          setFiltros((prev) => ({
            ...prev,
            dataInicio: value.dataInicio,
            dataFim: value.dataFim,
          }))
        }
      />
      <span className="font-inter text-2xl font-medium text-[var(--color-text)]">
        Hoje
      </span>
      <AppSelect
        size="sm"
        occurrences={occurrences}
        onFilterChange={(newFilters) =>
          setFiltros((prev) => ({
            ...prev,
            ...newFilters,
          }))
        }
        disabled={regionDisabled}
        fixedRegionLabel={fixedRegionLabel}
      />

      <div className="mt-2 h-[120px]">
        <AppOcorrenciaChart data={dashboardData} isLoading={isLoading} />
      </div>
    </div>
  );
}
