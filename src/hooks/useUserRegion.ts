import { useQuery } from "@tanstack/react-query";

type Cargo = "ADMIN" | "CHEFE" | "ANALISTA";
type Regiao = "RMR" | "AGRE" | "SERT" | "ZDMT";

type UserRegion = { id: string; cargo: Cargo; regiao: Regiao };

async function fetchUserRegion(userId: string): Promise<UserRegion> {
  const res = await fetch(`/usuarios/${userId}`, { credentials: "include" });
  if (!res.ok) throw new Error("Falha ao carregar usuário");
  return res.json();
}

export function useUserRegion(userId?: string) {
  // userId vem do token/sessão; se não houver, não faz consulta
  return useQuery({
    queryKey: ["user-region", userId],
    queryFn: () => fetchUserRegion(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}
