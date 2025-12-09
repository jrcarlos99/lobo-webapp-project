import { apiGateway } from "@/lib/apiClientGateway";
import { apiUsuarios } from "@/lib/apiClientUsuarios";
import Cookies from "js-cookie";
import type { AuthUser } from "@/types/auth";

const LS_KEY = "lobo_current_user";
const TOKEN_KEY = "authToken";

export const login = async (
  email: string,
  senha: string
): Promise<AuthUser> => {
  const res = await apiGateway.post("/auth/login", { email, senha });
  const { token } = res.data;

  if (!token) throw new Error("Token não recebido");

  localStorage.setItem(TOKEN_KEY, token);

  //  Busca o usuário real no serviço de usuários
  const meRes = await apiUsuarios.get("/usuarios/me");
  const user = meRes.data;

  localStorage.setItem(LS_KEY, JSON.stringify(user));

  //  Cookie opcional
  Cookies.set("session", btoa(JSON.stringify({ token, user })), {
    path: "/",
    expires: 1,
  });

  return user;
};

export const me = async (): Promise<AuthUser | null> => {
  try {
    const res = await apiUsuarios.get("/usuarios/me");
    const user = res.data;

    localStorage.setItem(LS_KEY, JSON.stringify(user));

    return user;
  } catch (e) {
    console.error("Erro ao buscar usuário atual:", e);
    return null;
  }
};

export const logout = async () => {
  try {
    await apiGateway.post("/auth/logout").catch(() => {});
  } catch {}

  Cookies.remove("session");
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LS_KEY);
};
