import { AxiosResponse } from "axios";
import apiClient from "@/lib/apiClient";
import { User } from "@/types/user";
import { auditService } from "./audit.service";

export interface NewUserData {
  nomeCompleto: string;
  email: string;
  perfil: string;
  regiao: string;
  nip?: string;
  senha?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface ApiUser {
  id?: number | string;
  nomeCompleto?: string;
  nome?: string;
  username?: string;
  name?: string;
  email?: string;
  perfil?: string;
  role?: string;
  roles?: string;
  regiao?: string | null;
  region?: string | null;
  ultimoLogin?: string | null;
  lastLogin?: string | null;
  nip?: string | null;
  status?: string | boolean;
}

/**
 * Serviço de Users (client)
 */
class UserService {
  constructor() {}

  private extractErrorMessage(err: unknown): string {
    if (typeof err === "object" && err !== null) {
      const maybeErr = err as {
        message?: string;
        response?: { data?: unknown };
      };
      if (maybeErr.response && maybeErr.response.data) {
        const data = maybeErr.response.data as unknown;
        if (typeof data === "object" && data !== null) {
          const d = data as Record<string, unknown>;
          if (typeof d.message === "string") return d.message;
        }
      }
      if (typeof maybeErr.message === "string") return maybeErr.message;
    }
    return "Erro de conexão";
  }

  /**
   * Normaliza o status vindo do backend para "active" | "inactive"
   */
  private normalizeStatus(raw?: string | boolean): "active" | "inactive" {
    if (typeof raw === "boolean") return raw ? "active" : "inactive";
    const s = String(raw ?? "").toLowerCase();
    if (["inactive", "inativo", "false", "0", "desativado"].includes(s))
      return "inactive";
    return "active";
  }

  /**
   * Mapeia o objeto retornado pela API para o formato que o frontend espera (User).
   */
  private mapApiUserToUser(u: ApiUser): User {
    const name =
      u.name ??
      u.nomeCompleto ??
      u.nome ??
      u.username ??
      (u.email ? u.email.split("@")[0] : "Usuário");

    const roles = (u.roles ?? u.perfil ?? u.role ?? "ANALISTA").toString();

    const region = (u.regiao ??
      u.region ??
      undefined) as unknown as User["region"];

    return {
      id: String(u.id ?? ""),
      name,
      email: u.email ?? "",
      roles,
      department: undefined,
      region,
      status: this.normalizeStatus(u.status),
      lastLogin: u.ultimoLogin ?? u.lastLogin ?? undefined,
    };
  }

  /**
   * Lista usuários (sem paginação por enquanto).
   */
  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      const res: AxiosResponse<unknown> = await apiClient.get("/usuarios");

      if (!res) {
        return { success: false, error: "Nenhuma resposta do servidor" };
      }

      const body = res.data;

      if (!body) {
        return { success: true, data: [] };
      }

      if (Array.isArray(body)) {
        const apiUsers = body as unknown as ApiUser[];
        const users = apiUsers.map((u) => this.mapApiUserToUser(u));
        return { success: true, data: users };
      }

      if (typeof body === "object" && body !== null) {
        const obj = body as Record<string, unknown>;
        const maybeArray = obj.data ?? obj.users ?? obj.items;
        if (Array.isArray(maybeArray)) {
          const apiUsers = maybeArray as unknown as ApiUser[];
          const users = apiUsers.map((u) => this.mapApiUserToUser(u));
          return { success: true, data: users };
        }
      }

      return { success: false, error: "Resposta inesperada do servidor" };
    } catch (err: unknown) {
      console.error("Erro ao buscar usuários:", err);
      return { success: false, error: this.extractErrorMessage(err) };
    }
  }

  /**
   * Criar usuário e registrar auditoria
   */
  async createUser(userData: NewUserData): Promise<ApiResponse<User>> {
    try {
      const res: AxiosResponse<unknown> = await apiClient.post(
        "/usuarios",
        userData
      );
      const body = res.data;

      const apiUser =
        body && (body as Record<string, unknown>).data
          ? (body as Record<string, unknown>).data
          : body;
      let u = apiUser as ApiUser | null;

      if ((!u || !u.id) && body && (body as Record<string, unknown>).user) {
        u = (body as Record<string, unknown>).user as ApiUser;
      }

      if (!u || !u.id) {
        return {
          success: false,
          error: "Resposta inesperada ao criar usuário",
        };
      }

      const created = this.mapApiUserToUser(u);

      // registrar auditoria (Criar Conta) — sem dados sensíveis
      try {
        auditService.record({
          userId: created.id,
          username: created.name ?? created.email,
          action: "Criar Conta",
          detail: {
            type: "action",
            actionName: "Criar Conta",
            message: `Usuário '${created.email}' criado`,
          },
        });
      } catch (e) {
        console.warn("Erro ao registrar auditoria (createUser):", e);
      }

      return {
        success: true,
        data: created,
        message: "Usuário criado com sucesso",
      };
    } catch (err: unknown) {
      console.error("Erro ao criar usuário:", err);
      return { success: false, error: this.extractErrorMessage(err) };
    }
  }

  /**
   * Atualizar usuário e registrar auditoria
   */
  async updateUser(
    userId: string,
    userData: Partial<NewUserData>
  ): Promise<ApiResponse<User>> {
    try {
      let prevApiUser: ApiUser | null = null;
      try {
        const prevRes = await apiClient.get(`/usuarios/${userId}`);
        prevApiUser = (prevRes.data ?? null) as ApiUser;
      } catch (e) {
        console.warn("Erro ao buscar usuário anterior:", e);
        prevApiUser = null;
      }

      const res: AxiosResponse<unknown> = await apiClient.put(
        `/usuarios/${userId}`,
        userData
      );
      const body = res.data;

      const apiUser =
        body && (body as Record<string, unknown>).data
          ? (body as Record<string, unknown>).data
          : body;
      if (!apiUser || !(apiUser as ApiUser).id) {
        return {
          success: false,
          error: "Resposta inesperada ao atualizar usuário",
        };
      }

      const updatedApi = apiUser as ApiUser;
      const updated = this.mapApiUserToUser(updatedApi);

      // registrar auditoria
      try {
        const prev = prevApiUser;
        const changes: { field: string; previous?: string; next?: string }[] =
          [];

        if (prev) {
          const prevRole = String(prev.perfil ?? prev.role ?? prev.roles ?? "");
          const nextRole = String(
            userData.perfil ??
              updatedApi.perfil ??
              updatedApi.role ??
              updatedApi.roles ??
              ""
          );
          if (prevRole !== nextRole)
            changes.push({
              field: "roles",
              previous: prevRole,
              next: nextRole,
            });

          const prevRegion = String(prev.regiao ?? prev.region ?? "");
          const nextRegion = String(
            userData.regiao ?? updatedApi.regiao ?? updatedApi.region ?? ""
          );
          if (prevRegion !== nextRegion)
            changes.push({
              field: "region",
              previous: prevRegion,
              next: nextRegion,
            });

          const prevName = String(
            prev.nomeCompleto ?? prev.nome ?? prev.username ?? prev.name ?? ""
          );
          const nextName = String(
            userData.nomeCompleto ??
              updatedApi.nomeCompleto ??
              updatedApi.nome ??
              updatedApi.username ??
              updatedApi.name ??
              ""
          );
          if (prevName !== nextName)
            changes.push({ field: "name", previous: prevName, next: nextName });
        }

        if (changes.length > 0) {
          auditService.record({
            userId,
            username: updated.name ?? updated.email,
            action: "Atualizar Usuário",
            detail: {
              type: "field_change",
              field: changes.map((c) => c.field).join(", "),
              previousValue: changes
                .map((c) => `${c.field}:${c.previous ?? ""}`)
                .join("; "),
              newValue: changes
                .map((c) => `${c.field}:${c.next ?? ""}`)
                .join("; "),
              message: `Campos alterados: ${changes
                .map((c) => c.field)
                .join(", ")}`,
            },
          });
        } else {
          auditService.record({
            userId,
            username: updated.name ?? updated.email,
            action: "Atualizar Usuário",
            detail: {
              type: "action",
              actionName: "Atualizar Usuário",
              message: "Usuário atualizado",
            },
          });
        }
      } catch (e) {
        console.warn("Erro ao registrar auditoria (updateUser):", e);
      }

      return {
        success: true,
        data: updated,
        message: "Usuário atualizado com sucesso",
      };
    } catch (err: unknown) {
      console.error("Erro ao atualizar usuário:", err);
      return { success: false, error: this.extractErrorMessage(err) };
    }
  }

  /**
   * Deletar usuário e registrar auditoria
   */
  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.delete(`/usuarios/${userId}`);

      try {
        auditService.record({
          userId,
          action: "Deletar Usuário",
          detail: {
            type: "resource_event",
            resource: "user",
            resourceId: userId,
            message: "Usuário deletado",
          },
        });
      } catch (e) {
        console.warn("Erro ao registrar auditoria (deleteUser):", e);
      }

      return { success: true, message: "Usuário deletado com sucesso" };
    } catch (err: unknown) {
      console.error("Erro ao deletar usuário:", err);
      return { success: false, error: this.extractErrorMessage(err) };
    }
  }
}

export const userService = new UserService();
export default userService;
