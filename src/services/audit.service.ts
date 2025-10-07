import { apiClient } from "@/lib/apiClient";
import type { QueryParams } from "@/types/query";
import { AuditLog } from "@/types/audit";

const STORAGE_KEY = "app_audit_logs_v1";
const MAX_LOGS = 1000;

function nowIso() {
  return new Date().toISOString();
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readStorage(): AuditLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(list: AuditLog[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-MAX_LOGS)));
  } catch {}
}

export const auditService = {
  record: (entry: Partial<AuditLog>) => {
    const log: AuditLog = {
      id: makeId(),
      timestamp: nowIso(),
      action: entry.action ?? "action",
      username: entry.username,
      userId: entry.userId,
      detail: entry.detail,
    };

    const current = readStorage();
    const updated = [...current, log];
    writeStorage(updated);

    try {
      window.dispatchEvent(new CustomEvent("audit:updated", { detail: log }));
    } catch {}
    return log;
  },

  getAll: (): AuditLog[] => {
    return readStorage();
  },

  clear: () => {
    writeStorage([]);
    try {
      window.dispatchEvent(new CustomEvent("audit:cleared"));
    } catch {}
  },
};

export const getAuditLogs = async (params?: QueryParams) => {
  const res = await apiClient.get("/auditoria", { params });
  return res.data as AuditLog;
};
