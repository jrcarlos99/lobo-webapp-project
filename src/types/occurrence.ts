export type OccurrenceStatus =
  | "EM_ANDAMENTO"
  | "ABERTA"
  | "CANCELADO"
  | "PENDENTE"
  | "CONCLUIDO";

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
  latitude: number;
  longitude: number;
  historico?: unknown[];
  anexos?: unknown[];
  criadoPor?: string;
  atualizadoPor?: string;
}

export interface OccurrenceFilters {
  dataInicio?: string;
  dataFim?: string;
  page?: number;
  size?: number;
  sort?: string;
  status?: OccurrenceStatus | OccurrenceStatus[];
  tipo?:
    | "INCENDIO"
    | "ACIDENTE_DE_TRANSITO"
    | "SALVAMENTO"
    | "RESGATE"
    | "VAZAMENTO";
  cidade?: string;
  regiao?: "RMR" | "AGRE" | "SERT" | "ZDMT" | "all";
}

export interface OccurrenceReport extends Occurrence {
  vitimaIlesa?: number;
  vitimaFeridos?: number;
  vitimaObitos?: number;
  tempoRespostaMin?: number;
  tempoOperacaoMin?: number;
  apoioExterno?: boolean;
}
