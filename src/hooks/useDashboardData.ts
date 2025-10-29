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

  const { data, isLoading, isError } = useQuery<
    DashboardData,
    Error,
    DashboardData,
    unknown[]
  >({
    queryKey: [
      "dashboard",
      currentUser?.id_usuario,
      filtros?.dataInicio,
      filtros?.dataFim,
      filtros?.regiao,
      filtros?.cidade,
      filtros?.tipo,
      filtros?.status,
    ],
    queryFn: async () => {
      console.log("➡️ Entrou no queryFn do useDashboardData");

      if (!currentUser) {
        console.warn("⚠️ currentUser ainda não carregado");
        throw new Error("Usuário não autenticado");
      }

      const appliedFilters: OccurrenceFilters = { ...filtros };

      if (currentUser.cargo !== "ADMIN" && currentUser.regiaoAutorizada) {
        appliedFilters.regiao =
          currentUser.regiaoAutorizada as OccurrenceFilters["regiao"];
      }

      console.log("📌 Filtros aplicados:", appliedFilters);

      const res = await getDashboardData(
        appliedFilters.dataInicio,
        appliedFilters.dataFim
      );
      console.log("✅ Resposta do getDashboardData:", res);
      return res;
    },
    enabled: !!currentUser,
    gcTime: 0, // substitui cacheTime
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
  };
}
