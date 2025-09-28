export type AuthRole = "ADMIN" | "CHEFE" | "ANALISTA" | string;

export type AuthUser = {
  id_usuario: number;
  email: string;
  nome?: string;
  cargo?: AuthRole;
  regiao?: string;
  id_bombeiro?: number;
};
