// Regiões
export const regioes = [
  { label: "RMR", value: "RMR" },
  { label: "Agreste", value: "AGRE" },
  { label: "Sertão", value: "SERT" },
  { label: "Zona da Mata", value: "ZDMT" },
];

// Tipos de ocorrência
export const tipos = [
  { label: "Incêndio", value: "INCENDIO" },
  { label: "Acidente", value: "ACIDENTE" },
  { label: "Acidente de Trânsito", value: "ACIDENTE_DE_TRANSITO" },
  { label: "Salvamento", value: "SALVAMENTO" },
  { label: "Resgate", value: "RESGATE" },
  { label: "Pré-hospitalar", value: "PRE_HOSPITALAR" },
  { label: "EPI", value: "EPI" },
  { label: "Comunicação", value: "COMUNICACAO" },
];

// Status
export const statusList = [
  { label: "Aberta", value: "ABERTA" },
  { label: "Pendente", value: "PENDENTE" },
  { label: "Em Andamento", value: "EM_ANDAMENTO" },
  { label: "Concluída", value: "CONCLUIDO" },
  { label: "Cancelada", value: "CANCELADO" },
];

// Helpers de tradução
export function mapRegiaoToLabel(value?: string): string {
  const found = regioes.find((r) => r.value === value);
  return found ? found.label : value ?? "-";
}

export function mapTipoToLabel(value?: string): string {
  const found = tipos.find((t) => t.value === value);
  return found ? found.label : value ?? "-";
}

export function mapStatusToLabel(value?: string): string {
  const found = statusList.find((s) => s.value === value);
  return found ? found.label : value ?? "-";
}
