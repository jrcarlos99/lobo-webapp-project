"use client";

import { Cell, Pie, PieChart } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  manha: { label: "Manhã", color: "var(--chart-turno-manha)" },
  tarde: { label: "Tarde", color: "var(--chart-turno-tarde)" },
  noite: { label: "Noite", color: "var(--chart-turno-noite)" },
};

export function AppPieChartTurno() {
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <Card className="flex flex-col bg-transparent border">
        <CardHeader className="items-center pb-0">
          <CardTitle>Turno</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const chartData =
    data?.graficoTurno?.map((item) => ({
      key:
        item.label === "Manhã"
          ? "manha"
          : item.label === "Tarde"
          ? "tarde"
          : "noite",
      name: item.label,
      value: item.value,
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
