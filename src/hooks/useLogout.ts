"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    // Limpa o token de autenticação do armazenamento local
    localStorage.removeItem("authToken");
    // Limpa o cache do React Query
    queryClient.clear();
    // Redireciona para a página de login
    router.push("/login");
  };
  return handleLogout;
};
