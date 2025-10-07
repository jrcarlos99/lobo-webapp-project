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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica autenticação ao inicializar
    const checkAuth = () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const user =
        typeof window !== "undefined"
          ? localStorage.getItem("lobo_current_user")
          : null;

      if (token && user) {
        setToken(token);
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const user = await authService.login(email, senha);
      if (user) {
        const token = localStorage.getItem("authToken");
        setToken(token);
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
    authService.logout();
  };

  const contextValue: AuthContextType = {
    token,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Tipos para as mutations
type LoginParams = {
  email: string;
  senha: string;
};

// Hook para usuário atual
export const useCurrentUser = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<AuthUser | null>({
    queryKey: ["me"],
    queryFn: authService.me,
    enabled: isAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

// Hook para login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const router = useRouter();

  return useMutation<AuthUser, Error, LoginParams>({
    mutationFn: async ({ email, senha }) => {
      // Chama o login diretamente
      const user = await authService.login(email, senha);

      if (!user) {
        throw new Error("Credenciais inválidas");
      }

      return user;
    },

    onSuccess: (user: AuthUser) => {
      // Atualiza o cache com o usuário retornado pelo login
      queryClient.setQueryData(["me"], user);
      router.push("/dashboard");
    },

    onError: (error) => {
      console.error("Login mutation error:", error);
    },
  });
};

// Hook para logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: authService.logout,

    onSuccess: () => {
      logout();
      queryClient.clear();
      router.push("/auth/login");
    },

    onError: (error) => {
      console.error("Logout error:", error);
      // Mesmo com erro, limpa a sessão local
      logout();
      queryClient.clear();
      router.push("/auth/login");
    },
  });
};
