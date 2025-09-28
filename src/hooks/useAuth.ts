import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "@/services/auth.services";
import type { AuthUser } from "@/types/auth";

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

  return useMutation<void, Error, void>({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      qc.setQueryData(["me"], null);
    },
  });
};
