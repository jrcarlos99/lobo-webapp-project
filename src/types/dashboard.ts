export type KPIData = {
  totalOcorrencias: number;
  porcentagemComparacaoPeriodo: number;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export type DashboardData = {
  kpis: KPIData;
  graficoRegiao: ChartPoint[];
  graficoTipo: ChartPoint[];
  graficoTurno: ChartPoint[];
};
