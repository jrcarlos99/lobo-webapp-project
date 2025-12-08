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
  | "COMUNICACAO"
  | "VAZAMENTO"; //

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
  tipo?: OccurrenceType;
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

export interface CreateOccurrenceDTO {
  id: number;
  titulo: string;
  descricao: string;
  regiao: string;
  tipo: OccurrenceType;
  status: OccurrenceStatus;
  latitude: number;
  longitude: number;
  viatura_id?: number | null;
  equipe_id?: number | null;
  data_hora_abertura: string;
  endereco?: string;
}

export interface OccurrenceInsert {
  titulo: string;
  descricao: string;
  solicitante?: string | null;
  regiao: string;
  cidade?: string | null;
  data_hora_abertura: string;
  data_hora_atualizacao?: string | null;
  status: string;
  tipo: string;
  latitude: number;
  longitude: number;
  criado_por?: string | null;
  atualizado_por?: string | null;
  viatura_id?: number | null;
  equipe_id?: number | null;
}

export interface AnexoInsert {
  ocorrencia_id: number;
  url_anexo: string;
  tipo: "imagem" | "assinatura";
}
