export type OccurrenceStatus =
  | "NOVO"
  | "EM_ANDAMENTO"
  | "CONCLUIDO"
  | "CANCELADO";

export type OccurrenceType =
  | "INCENDIO"
  | "ACIDENTE_DE_TRANSITO"
  | "SALVAMENTO"
  | "RESGATE"
  | "PRE_HOSPITALAR"
  | "EPI"
  | "COMUNICACAO";

export interface Occurrence {
  id: number;
  titulo: string;
  descricao: string;
  solicitante?: string;
  regiao: string;
  cidade: string;
  status: OccurrenceStatus;
  tipo: OccurrenceType;
  dataHoraAbertura: string;
  dataHoraAtualizacao: string;
  latitude?: number;
  longitude?: number;
  historico?: unknown[];
  anexos?: unknown[];
  criadoPor?: string;
  atualizadoPor?: string;
}

export interface OccurrenceFilters {
  status?: OccurrenceStatus;
  tipo?: OccurrenceType;
  cidade?: string;
  regiao?: string;
  dataInicio?: string;
  dataFim?: string;
  page?: number;
  size?: number;
  sort?: string;
}
