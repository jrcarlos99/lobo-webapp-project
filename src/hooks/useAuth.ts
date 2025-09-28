"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "@/services/auth.services";
import type { AuthUser } from "@/types/auth";
import { useRouter } from "next/navigation";

type loginParams = {
  email: string;
  senha: string;
};

export const useCurrentUser = () =>
  useQuery<AuthUser | null>({
    queryKey: ["me"],
    queryFn: authService.me,
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

export const useLogin = () => {
  const qc = useQueryClient();

  return useMutation<AuthUser, Error, loginParams>({
    mutationFn: ({ email, senha }) => authService.login(email, senha),

    onSuccess: async (user: AuthUser) => {
      qc.setQueryData(["me"], user);
    },
  });
};

export const useLogout = () => {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: () => {
      return authService.logout();
    },

    onSuccess: () => {
      localStorage.removeItem("authToken");

      qc.clear();

      router.push("/auth/login");
    },

    onError: () => {
      localStorage.removeItem("authToken");
      qc.clear();
      router.push("/auth/login");
    },
  });
};
