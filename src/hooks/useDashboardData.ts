import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./useAuth";
import { getDashboardData } from "@/services/dashboardService";
import { DashboardData } from "@/types/dashboard";
import { OccurrenceFilters } from "@/types/occurrence";

interface UseDashboardDataResult {
  data: DashboardData | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function useDashboardData(
  filtros?: OccurrenceFilters
): UseDashboardDataResult {
  const { data: currentUser } = useCurrentUser();

  const { data, isLoading, isError } = useQuery<DashboardData>({
    queryKey: [
      "dashboard",
      currentUser?.cargo,
      currentUser?.regiaoAutorizada,
      filtros,
    ],
    queryFn: () => {
      if (!currentUser) {
        throw new Error("Usuário não autenticado");
      }

      const appliedFilters: OccurrenceFilters = { ...filtros };

      if (currentUser.cargo !== "ADMIN" && currentUser.regiaoAutorizada) {
        appliedFilters.regiao =
          currentUser.regiaoAutorizada as OccurrenceFilters["regiao"];
      }

      return getDashboardData(
        appliedFilters.dataInicio,
        appliedFilters.dataFim
      );
    },
    enabled: !!currentUser,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    isLoading,
    isError,
  };
}
