import apiClient from "@/lib/apiClient";
import Cookies from "js-cookie";
import type { AuthUser } from "@/types/auth";

const LS_KEY = "lobo_current_user";
const TOKEN_KEY = "authToken";

export const login = async (
  email: string,
  senha: string
): Promise<AuthUser> => {
  const res = await apiClient.post("/api/auth/login", { email, senha });
  const { token } = res.data || {};

  if (!token) {
    throw new Error("Token não recebido");
  }

  // Extrai informações do payload JWT
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userRole = payload.role || "UNKNOWN";

  const normalizedUser: AuthUser = {
    id_usuario: -1,
    email: payload.sub || email,
    nome: "Usuário",
    cargo: userRole,
    regiaoAutorizada: "",
    cidadesAutorizadas: [],
  };

  // Armazenamento local
  localStorage.setItem(LS_KEY, JSON.stringify(normalizedUser));
  localStorage.setItem(TOKEN_KEY, token);

  // Cria cookie de sessão para o middleware
  const sessionData = {
    token: token,
    user: normalizedUser,
    cargo: userRole,
  };

  const encodedSession = Buffer.from(JSON.stringify(sessionData)).toString(
    "base64"
  );
  Cookies.set("session", encodedSession, {
    path: "/",
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return normalizedUser;
};

export const me = async (): Promise<AuthUser | null> => {
  try {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch (e) {
    console.error("Erro ao recuperar usuário autenticado:", e);
    return null;
  }
};

export const logout = async () => {
  try {
    await apiClient.post("/api/auth/logout").catch(() => {});
  } catch {}

  try {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove("session");
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LS_KEY);
  } catch {}
};
