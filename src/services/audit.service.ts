import { apiClient } from "@/lib/apiClient";
import type { QueryParams } from "@/types/query";

export type AuditLog = {
  id_log: number;
  id_usuario: number;
  usuario_nome?: string;
  acao: string;
  entidade: string;
  id_entidade: number;
  data_hora: string;
  detalhes?: string;
};

export const getAuditLogs = async (params?: QueryParams) => {
  const res = await apiClient.get("/auditoria", { params });
  return res.data as AuditLog;
};
