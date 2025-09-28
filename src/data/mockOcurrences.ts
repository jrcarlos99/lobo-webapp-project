import type { Occurrence } from "@/services/ocorrencies.service";

export const mockOcorrencias: Occurrence[] = [
  // AGRESTE (Chefe/Analista 1)
  {
    id_ocorrencia: 101,
    cidade: "Caruaru",
    regiao: "AGRESTE",
    status: "Aberto",
    tipo: "Fogo",
    tipo_ocorrencia: "A",
    data_hora: "2025-09-25T10:00:00",
  },
  {
    id_ocorrencia: 102,
    cidade: "Bezerros",
    regiao: "AGRESTE",
    status: "Aberto",
    tipo: "Acidente",
    tipo_ocorrencia: "B",
    data_hora: "2025-09-25T11:00:00",
  },
  {
    id_ocorrencia: 103,
    cidade: "Pesqueira",
    regiao: "AGRESTE",
    status: "Fechado",
    tipo: "Alagamento",
    tipo_ocorrencia: "C",
    data_hora: "2025-09-25T12:00:00",
  },
  // ZONA DA MATA (Chefe/Analista 2)
  {
    id_ocorrencia: 201,
    cidade: "Palmares",
    regiao: "ZONA_DA_MATA",
    status: "Aberto",
    tipo: "Fogo",
    tipo_ocorrencia: "A",
    data_hora: "2025-09-25T13:00:00",
  },
  {
    id_ocorrencia: 202,
    cidade: "Escada",
    regiao: "ZONA_DA_MATA",
    status: "Fechado",
    tipo: "Acidente",
    tipo_ocorrencia: "B",
    data_hora: "2025-09-25T14:00:00",
  },
  // CAPITAL (Admin vê tudo)
  {
    id_ocorrencia: 301,
    cidade: "Recife",
    regiao: "CAPITAL",
    status: "Aberto",
    tipo: "Alagamento",
    tipo_ocorrencia: "C",
    data_hora: "2025-09-25T15:00:00",
  },
];
