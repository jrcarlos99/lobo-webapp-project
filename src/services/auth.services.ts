import { apiUsuarios } from "@/lib/apiClientUsuarios";
import Cookies from "js-cookie";
import type { AuthUser, AuthRole, Regiao } from "@/types/auth";

const LS_KEY = "lobo_current_user";
const TOKEN_KEY = "authToken";

// Tipo exato do backend
type BackendUser = {
  id: number;
  nomeCompleto: string;
  email: string;
  perfil: string;
  regiao: string | null;
  regiaoAutorizada?: string;
  cidadesAutorizadas?: string[];
};

// Normalizadores
function normalizeRole(value: string): AuthRole {
  const upper = value.toUpperCase();

  if (upper === "ADMIN") return "ADMIN";
  if (upper === "CHEFE") return "CHEFE";
  if (upper === "ANALISTA") return "ANALISTA";

  throw new Error(`Perfil inválido recebido do backend: ${value}`);
}

function normalizeRegiao(value: string | null | undefined): Regiao {
  if (!value) return "";
  const upper = value.toUpperCase();

  if (upper === "AGRE") return "AGRE";
  if (upper === "RMR") return "RMR";
  if (upper === "SERTAO") return "SERT";
  if (upper === "ZDMT") return "ZDMT";

  return "";
}

// Normaliza o usuário
function normalizeUser(data: BackendUser): AuthUser {
  return {
    id_usuario: data.id,
    email: data.email,
    nome: data.nomeCompleto,
    cargo: normalizeRole(data.perfil),
    regiaoAutorizada: normalizeRegiao(data.regiaoAutorizada ?? data.regiao),
    cidadesAutorizadas: data.cidadesAutorizadas ?? [],
  };
}

export const login = async (
  email: string,
  senha: string
): Promise<AuthUser> => {
  const res = await apiUsuarios.post("/auth/login", { email, senha });
  const { token } = res.data;

  if (!token) throw new Error("Token não recebido");

  localStorage.setItem(TOKEN_KEY, token);

  const meRes = await apiUsuarios.get<BackendUser>("/usuarios/me");
  const normalized = normalizeUser(meRes.data);

  localStorage.setItem(LS_KEY, JSON.stringify(normalized));

  Cookies.set("session", btoa(JSON.stringify({ token, user: normalized })), {
    path: "/",
    expires: 1,
  });

  return normalized;
};

export const me = async (): Promise<AuthUser | null> => {
  try {
    const res = await apiUsuarios.get<BackendUser>("/usuarios/me");
    const normalized = normalizeUser(res.data);

    localStorage.setItem(LS_KEY, JSON.stringify(normalized));

    return normalized;
  } catch (e) {
    console.error("Erro ao buscar usuário atual:", e);
    return null;
  }
};

export const logout = async () => {
  try {
    await apiUsuarios.post("/auth/logout").catch(() => {});
  } catch {}

  Cookies.remove("session");
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LS_KEY);
};
