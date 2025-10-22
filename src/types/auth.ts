export type AuthRole = "ADMIN" | "CHEFE" | "ANALISTA" | string;

export type AuthUser = {
  id_usuario: string | number;
  email: string;
  nome?: string;
  cargo?: AuthRole;
  regiaoAutorizada: string;
  cidadesAutorizadas?: string[];
  id_bombeiro?: number;
  avatarUrl?: string;
};
