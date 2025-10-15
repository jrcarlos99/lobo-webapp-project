"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";

const chartConfig: ChartConfig = {
  ocorrencias: { label: "Ocorrências", color: "var(--color-chart-1)" },
};

export const AppBarChart = () => {
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return <div>Carregando gráfico de tipos...</div>;
  }

  const chartData =
    data?.graficoTipo?.map((item) => ({
      tipo: item.label, // eixo X
      ocorrencias: item.value, // barra
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
          <Bar dataKey="ocorrencias" fill="var(--color-chart-1)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
