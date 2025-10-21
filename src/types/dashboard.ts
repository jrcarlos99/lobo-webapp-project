export type KPIData = {
  totalOcorrencias: number;
  porcentagemComparacaoPeriodo: number;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export type DashboardData = {
  totalOcorrencias: number;
  porcentagemComparacaoPeriodo: number;
  porStatus: Record<string, number>;
  porTipo: Record<string, number>;
  porTurno: Record<string, number>;
  porRegiao: Record<string, number>;
  graficoTipo?: ChartPoint[];
};
