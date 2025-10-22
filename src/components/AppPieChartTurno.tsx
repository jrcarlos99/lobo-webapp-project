"use client";

import { Cell, Pie, PieChart, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DashboardData } from "@/types/dashboard";

// Config de turnos
const chartConfig: ChartConfig = {
  manha: { label: "Manhã", color: "var(--chart-turno-manha)" },
  tarde: { label: "Tarde", color: "var(--chart-turno-tarde)" },
  noite: { label: "Noite", color: "var(--chart-turno-noite)" },
};

// Mapa de chaves do backend → config
const turnoKeyMap: Record<string, keyof typeof chartConfig> = {
  Manhã: "manha",
  Manha: "manha", // caso venha sem acento
  Tarde: "tarde",
  Noite: "noite",
  Dia: "manha", // se “Dia” significar manhã no seu dado
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

  const chartData =
    Object.entries(data?.porTurno ?? {}).map(([rawKey, value]) => {
      const k = turnoKeyMap[rawKey] ?? turnoKeyMap[rawKey.trim()] ?? "manha";
      const conf = chartConfig[k];
      return {
        key: k, // "manha" | "tarde" | "noite"
        name: conf.label, // legenda e tooltip
        value,
      };
    }) ?? [];

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
                    chartConfig[entry.key]?.color ?? "var(--chart-turno-manha)"
                  }
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
