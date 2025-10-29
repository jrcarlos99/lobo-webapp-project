"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const chartConfig: ChartConfig = {
  INCENDIO: { label: "Incêndio", color: "var(--chart-tipo-1)" },
  ACIDENTE_DE_TRANSITO: {
    label: "Acidente de Trânsito",
    color: "var(--chart-tipo-2)",
  },
  PRE_HOSPITALAR: { label: "Pré-hospitalar", color: "var(--chart-tipo-3)" },
  COMUNICACAO: { label: "Comunicação", color: "var(--chart-tipo-4)" },
  RESGATE: { label: "Resgate", color: "var(--chart-tipo-5)" },
  // adicione outros tipos conforme necessário
};

type Props = {
  data?: Record<string, number>;
  isLoading?: boolean;
};

export default function AppBarChart({ data, isLoading }: Props) {
  if (isLoading) {
    return <div>Carregando gráfico de tipos...</div>;
  }

  // Agora usamos porTipo em vez de graficoTipo
  const chartData =
    Object.entries(data ?? {}).map(([tipo, value]) => ({
      tipo,
      ocorrencias: value,
    })) ?? [];

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Tipo</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="tipo"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="ocorrencias" radius={4}>
            {chartData.map((entry, i) => (
              <Cell
                key={`cell-${i}`}
                fill={
                  chartConfig[entry.tipo as keyof typeof chartConfig]?.color ??
                  "var(--chart-tipo-1)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
