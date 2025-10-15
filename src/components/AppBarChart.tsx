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
import { useDashboardData } from "@/hooks/useDashboardData";

const chartConfig: ChartConfig = {
  tipo1: { label: "A", color: "var(--chart-tipo-1)" },
  tipo2: { label: "B", color: "var(--chart-tipo-2)" },
  tipo3: { label: "C", color: "var(--chart-tipo-3)" },
  tipo4: { label: "D", color: "var(--chart-tipo-4)" },
  tipo5: { label: "E", color: "var(--chart-tipo-5)" },
};

export const AppBarChart = () => {
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return <div>Carregando gráfico de tipos...</div>;
  }

  const chartData =
    data?.graficoTipo?.map((item) => ({
      tipo: item.label,
      ocorrencias: item.value,
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
};
