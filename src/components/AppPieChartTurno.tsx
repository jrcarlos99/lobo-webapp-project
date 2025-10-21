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

const chartConfig: ChartConfig = {
  manha: { label: "Manhã", color: "var(--chart-turno-manha)" },
  tarde: { label: "Tarde", color: "var(--chart-turno-tarde)" },
  noite: { label: "Noite", color: "var(--chart-turno-noite)" },
};

type Props = {
  data?: DashboardData;
  isLoading?: boolean;
};

export default function AppPieChartTurno({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <Card className="flex flex-col bg-transparent border">
        <CardHeader className="items-center pb-0">
          <CardTitle>Turno</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  // Agora usamos porTurno em vez de graficoTurno
  const chartData =
    Object.entries(data?.porTurno ?? {}).map(([key, value]) => ({
      key: key.toLowerCase(), // "Manhã" -> "manha"
      name: key,
      value,
    })) ?? [];

  return (
    <Card className="flex flex-col bg-transparent border">
      <CardHeader className="items-center pb-0">
        <CardTitle>Turno</CardTitle>
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
                    "var(--chart-turno-manha)"
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
