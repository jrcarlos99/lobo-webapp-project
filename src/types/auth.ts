export type AuthRole = "ADMIN" | "CHEFE" | "ANALISTA";

export type Regiao = "RMR" | "AGRE" | "SERT" | "ZDMT";

export type AuthUser = {
  id_usuario: string | number;
  email: string;
  nome?: string;
  cargo: AuthRole;
  regiaoAutorizada: Regiao;
  cidadesAutorizadas?: string[];
  id_bombeiro?: number;
  avatarUrl?: string;
};
