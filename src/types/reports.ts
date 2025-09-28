export const Regions = {
  ZONA_DA_MATA: "Zona da Mata",
  SERTAO: "Sertão",
  METROPOLITANA: "Região Metropolitana",
  AGRESTE: "Agreste",
} as const;

export type Region = (typeof Regions)[keyof typeof Regions];

export type ReportStatus = "novo" | "em_andamento" | "concluido" | "cancelado";

export interface Report {
  id: string;
  title: string;
  type: string;
  region: Region;
  status: ReportStatus;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  reportedByName?: string;
  reportedById?: string;
}

export interface ReportsResponse {
  reports: Report[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ReportsFilters {
  periodFrom?: string;
  periodTo?: string;
  type?: string;
  region?: Region;
  status?: ReportStatus | "todos";
  search?: string;
  page?: number;
  pageSize?: number;
}
