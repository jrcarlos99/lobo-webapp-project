import { Region } from "./reports";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string;
  department?: string;
  region?: Region;
  status: "active" | "inactive";
  lastLogin?: string;
}

export interface ApiUser {
  id: number;
  nomeCompleto: string;
  email: string;
  perfil: string;
  regiao: string | null;
  ultimoLogin?: string;
}

export interface UsersResponse {
  users: User[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
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
