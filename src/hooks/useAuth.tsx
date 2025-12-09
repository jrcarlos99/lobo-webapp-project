"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "@/services/auth.services";
import type { AuthUser } from "@/types/auth";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const user = await authService.login(email, senha);
      if (user) {
        const storedToken = localStorage.getItem("authToken");
        setToken(storedToken);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    authService.logout();
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<AuthUser | null>({
    queryKey: ["me"],
    queryFn: () => authService.me(),
    enabled: isAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, senha }: { email: string; senha: string }) => {
      const success = await login(email, senha);
      if (!success) throw new Error("Credenciais inválidas");
      return success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/dashboard");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
};
