import { AxiosResponse } from "axios";
import apiClient from "@/lib/apiClient";
import { auditService } from "./audit.service";
import type { AuthUser } from "@/types/auth";
import type { User } from "@/types/user";

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
  regiao?: string | null;
  region?: string | null;
  ultimoLogin?: string | null;
  lastLogin?: string | null;
  nip?: string | null;
  status?: string | boolean;
}

type AxiosErrorLike = {
  message?: string;
  response?: { data?: { message?: string } };
};

class UserService {
  private extractErrorMessage(err: unknown): string {
    const maybeErr = err as AxiosErrorLike;
    if (maybeErr.response?.data?.message) return maybeErr.response.data.message;
    if (maybeErr.message) return maybeErr.message;
    return "Erro de conexão";
  }

  private normalizeStatus(raw?: string | boolean): "active" | "inactive" {
    if (typeof raw === "boolean") return raw ? "active" : "inactive";
    const s = String(raw ?? "").toLowerCase();
    if (["inactive", "inativo", "false", "0", "desativado"].includes(s))
      return "inactive";
    return "active";
  }

  private mapApiUserToUser(u: ApiUser): User {
    const nomeCompleto =
      u.nomeCompleto ??
      u.name ??
      u.username ??
      (u.email ? u.email.split("@")[0] : "Usuário");

    const cargo = (u.perfil ?? u.role ?? "ANALISTA").toString();
    const regiao = (u.regiao ?? u.region ?? "") as string;

    return {
      id: String(u.id ?? ""),
      nomeCompleto,
      email: u.email ?? "",
      cargo,
      regiao,
      status: this.normalizeStatus(u.status),
      lastLogin: u.ultimoLogin ?? u.lastLogin ?? undefined,
      nip: u.nip ?? undefined,
    };
  }

  // 🔹 Pega o usuário logado (via /usuarios/me)
  async getCurrentUser(): Promise<AuthUser> {
    const res = await apiClient.get("/usuarios/me");
    const data = res.data;
    return {
      id_usuario: data.id,
      email: data.email,
      nome: data.nomeCompleto,
      cargo: data.perfil,
      regiaoAutorizada: data.regiao ?? "",
    } as AuthUser;
  }

  // 🔹 Lista todos os usuários
  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      const res: AxiosResponse<ApiUser[]> = await apiClient.get("/usuarios");
      const users = res.data.map((u) => this.mapApiUserToUser(u));
      return { success: true, data: users };
    } catch (err) {
      return { success: false, error: this.extractErrorMessage(err) };
    }
  }

  // 🔹 Cria usuário
  async createUser(userData: NewUserData): Promise<ApiResponse<User>> {
    try {
      const res = await apiClient.post("/usuarios", userData);
      const created = this.mapApiUserToUser(res.data);
      auditService.record({
        userId: created.id,
        username: created.nomeCompleto ?? created.email,
        action: "Criar Conta",
        detail: { type: "action", actionName: "Criar Conta" },
      });
      return { success: true, data: created };
    } catch (err) {
      return { success: false, error: this.extractErrorMessage(err) };
    }
  }

  // 🔹 Atualiza usuário
  async updateUser(
    userId: string,
    userData: Partial<NewUserData>
  ): Promise<ApiResponse<User>> {
    try {
      const res = await apiClient.put(`/usuarios/${userId}`, userData);
      const updated = this.mapApiUserToUser(res.data);
      auditService.record({
        userId,
        username: updated.nomeCompleto ?? updated.email,
        action: "Atualizar Usuário",
        detail: { type: "action", actionName: "Atualizar Usuário" },
      });
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: this.extractErrorMessage(err) };
    }
  }

  // 🔹 Deleta usuário
  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.delete(`/usuarios/${userId}`);
      auditService.record({
        userId,
        action: "Deletar Usuário",
        detail: {
          type: "resource_event",
          resource: "user",
          resourceId: userId,
        },
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: this.extractErrorMessage(err) };
    }
  }
}

export const userService = new UserService();
export default userService;
