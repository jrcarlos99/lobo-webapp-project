import { Region } from "./reports";

export interface User {
  id: string;
  nomeCompleto: string;
  email: string;
  cargo: string;
  regiao: string;
  region?: Region;
  status: string;
  lastLogin?: string;
  nip?: string;
}

export interface ApiUser {
  id?: string | number;
  _id?: string | number;
  nomeCompleto?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  cargo?: string;
  perfil?: string;
  role?: string;
  regiao?: string;
  region?: string;
  status?: string;
  active?: boolean;
  lastLogin?: string | null;
  ultimoLogin?: string | null;
  nip?: string;
}

export interface UsersResponse {
  users: User[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CurrentUser {
  id?: string;
  nome?: string;
  email?: string;
  avatarUrl?: string;
  // adicione outros campos que você sabe que existem
}

export type LogDetail =
  | {
      type: "field_change";
      field: string;
      previousValue?: string | null;
      newValue?: string | null;
      message?: string;
      meta?: Record<string, unknown>;
    }
  | {
      type: "action";
      actionName: string;
      message?: string;
      meta?: Record<string, unknown>;
    }
  | {
      type: "resource_event";
      resource: string;
      resourceId?: string | number;
      message?: string;
      meta?: Record<string, unknown>;
    };
