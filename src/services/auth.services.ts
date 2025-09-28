import { apiClient } from "@/lib/apiClient";
import Cookies from "js-cookie";
import type { AuthUser } from "@/types/auth";

const LS_KEY = "lobo_current_user";

export const login = async (
  email: string,
  senha: string
): Promise<AuthUser> => {
  // Tenta o backend real primeiro
  try {
    const res = await apiClient.post("/api/mock-login", { email, senha });
    // backend ideal: seta cookie HttpOnly e retorna user
    if (res.data?.user) return res.data.user as AuthUser;
    // se backend retornar token (jwt), salva em cookie (dev only)
    if (res.data?.token) {
      Cookies.set("session", res.data.token);
      return res.data.user as AuthUser;
    }
  } catch (e) {
    // se backend não estiver disponível, cai no fallback (dev mode)
  }

  // DEV fallback: mock user stored in localStorage (apenas para protótipo)
  const mockUsers: AuthUser[] = [
    { id_usuario: 1, email: "admin@local", nome: "Admin", cargo: "ADMIN" },
    { id_usuario: 2, email: "chefe@local", nome: "Chefe", cargo: "CHEFE" },
    {
      id_usuario: 3,
      email: "analista@local",
      nome: "Analista",
      cargo: "ANALISTA",
    },
  ];

  const found = mockUsers.find((u) => u.email === email);
  if (!found || senha !== "1234") {
    throw { status: 401, message: "Credenciais inválidas (dev)" };
  }

  // salva em localStorage para persistir sessão em dev
  localStorage.setItem(LS_KEY, JSON.stringify(found));
  return found;
};

export const me = async (): Promise<AuthUser | null> => {
  // tenta backend primeiro
  try {
    const res = await apiClient.get("/auth/me");
    if (res.data) return res.data as AuthUser;
  } catch (e) {
    //fallback para dev
  }

  // fallback dev:
  const raw =
    typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
  return raw ? (JSON.parse(raw) as AuthUser) : null;
};

export const logout = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch (e) {
    // ignore
  }
  // remover dev session
  localStorage.removeItem(LS_KEY);
  Cookies.remove("session");
};
