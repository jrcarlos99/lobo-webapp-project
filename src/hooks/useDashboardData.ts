import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./useAuth";
import { getDashboardData } from "@/services/ocorrencies.service";
import { DashboardData } from "@/types/dashboard";

interface UseDashboardDataResult {
  data: DashboardData | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function useDashboardData(): UseDashboardDataResult {
  const { data: currentUser } = useCurrentUser();

  const { data, isLoading, isError } = useQuery<DashboardData>({
    queryKey: [
      "dashboard",
      currentUser?.cargo,
      currentUser?.cidadesAutorizadas,
    ],
    queryFn: () => {
      return getDashboardData(currentUser!);
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
