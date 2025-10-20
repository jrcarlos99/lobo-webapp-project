"use client";

import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DashboardData } from "@/types/dashboard";

// Defina as cores para cada status
const chartConfig: ChartConfig = {
  ABERTA: { label: "Aberta", color: "var(--chart-status-aberta)" },
  EM_ANDAMENTO: {
    label: "Em Andamento",
    color: "var(--chart-status-andamento)",
  },
  PENDENTE: { label: "Pendente", color: "var(--chart-status-pendente)" },
  CANCELADO: { label: "Cancelado", color: "var(--chart-status-cancelado)" },
  CONCLUIDO: { label: "Concluído", color: "var(--chart-status-concluido)" },
};

type Props = {
  data?: DashboardData;
  isLoading?: boolean;
};

export function AppPieChartStatus({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <Card className="flex flex-col bg-transparent border">
        <CardHeader className="items-center pb-0">
          <CardTitle>Status</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  // Transforma o objeto porStatus em array para o gráfico
  const chartData =
    Object.entries(data?.porStatus ?? {}).map(([key, value]) => ({
      key,
      name: chartConfig[key as keyof typeof chartConfig]?.label ?? key,
      value,
    })) ?? [];

  return (
    <Card className="flex flex-col bg-transparent border">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={
                    chartConfig[entry.key as keyof typeof chartConfig]?.color ??
                    "var(--chart-status-aberta)"
                  }
                />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
