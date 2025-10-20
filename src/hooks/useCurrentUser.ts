import { useQuery } from "@tanstack/react-query";
import { AuthUser } from "@/types/auth";
import { apiClient } from "@/lib/apiClient";

async function fetchUserById(userId: number): Promise<AuthUser> {
  const res = await apiClient.get<AuthUser>(`/usuarios/${userId}`);
  return res.data;
}
// const mapUsuarioToAuthUser = (u: any): AuthUser => ({
//   id_usuario: u.id,
//   email: u.email,
//   nome: u.nomeCompleto,
//   cargo: u.perfil, // ou converta caso queira
//   regiaoAutorizada: u.regiao,
//   cidadesAutorizadas: u.cidadesAutorizadas ?? [],
//   avatarUrl: u.avatarUrl,
// });

export function useCurrentUser(userId?: number) {
  return useQuery<AuthUser>({
    queryKey: ["currentUser", userId],
    queryFn: () => fetchUserById(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
