import { useQuery } from "@tanstack/react-query";
import { AuthUser } from "@/types/auth";
// import { apiClient } from "@/lib/apiClient";
import { me } from "@/services/auth.services";

// async function fetchUserById(userId: number): Promise<AuthUser> {
//   const res = await apiClient.get<AuthUser>(`/usuarios/${userId}`);
//   return res.data;
// }
//
export function useCurrentUser() {
  return useQuery<AuthUser | null>({
    queryKey: ["me"],
    queryFn: me,
    staleTime: 1000 * 60 * 5,
  });
}
