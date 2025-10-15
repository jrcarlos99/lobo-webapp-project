import apiClient from "@/lib/apiClient";
import Cookies from "js-cookie";
import type { AuthUser } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

const LS_KEY = "lobo_current_user";
const TOKEN_KEY = "authToken";

interface TokenPayload {
  sub: string;
  authorities: string[];
  role?: string;
  exp: number;
  iat: number;
}

export const login = async (
  email: string,
  senha: string
): Promise<AuthUser> => {
  const res = await apiClient.post("/auth/login", { email, senha });
  const { token, user } = res.data;

  if (!token) {
    throw new Error("Token não recebido");
  }

  // Salva token
  localStorage.setItem("authToken", token);

  // Decodifica token
  const decoded = jwtDecode<TokenPayload>(token);
  const role = decoded.role || decoded.authorities?.[0] || "UNKNOWN";

  // Extrai payload cru (se precisar de mais dados)
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userFromApi = user || {};

  // extrair nome do email
  const extractNameFromEmail = (email: string) => {
    const namePart = email.split("@")[0];
    return namePart
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const normalizedUser: AuthUser = {
    id_usuario: userFromApi.id_usuario || payload.id_usuario || -1,
    email: userFromApi.email || payload.sub || email,
    nome:
      userFromApi.nome ||
      payload.nome ||
      extractNameFromEmail(payload.sub || email) ||
      "Usuário",
    cargo: userFromApi.cargo || role,
    regiaoAutorizada:
      userFromApi.regiaoAutorizada || payload.regiaoAutorizada || "",
    cidadesAutorizadas:
      userFromApi.cidadesAutorizadas || payload.cidadesAutorizadas || [],
  };

  // Armazenamento local
  localStorage.setItem(LS_KEY, JSON.stringify(normalizedUser));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("userRole", role);

  // Cria cookie de sessão
  const sessionData = {
    token: token,
    user: normalizedUser,
    cargo: role,
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
    await apiClient.post("/auth/logout").catch(() => {});
  } catch {}

  try {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove("session");
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LS_KEY);
  } catch {}
};
