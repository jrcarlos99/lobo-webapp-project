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
  role: string | null;
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
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("userRole");
    const user = localStorage.getItem("lobo_current_user");

    if (storedToken && user) {
      setToken(storedToken);
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const user = await authService.login(email, senha);
      if (user) {
        const storedToken = localStorage.getItem("authToken");
        const storedRole = localStorage.getItem("userRole");
        setToken(storedToken);
        setRole(storedRole);
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
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("lobo_current_user");
    authService.logout();
  };

  return (
    <AuthContext.Provider
      value={{ token, role, login, logout, isAuthenticated }}
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

// Hook para usuário atual
export const useCurrentUser = () => {
  const { isAuthenticated, logout } = useAuth();

  return useQuery<AuthUser | null>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        return await authService.me();
      } catch (err) {
        console.error("Erro ao buscar usuário atual:", err);
        logout(); // token inválido → força logout
        return null;
      }
    },
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

  return useMutation({
    mutationFn: ({ email, senha }: { email: string; senha: string }) =>
      login(email, senha),
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        router.push("/dashboard");
      }
    },
  });
};

// Hook para logout
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
