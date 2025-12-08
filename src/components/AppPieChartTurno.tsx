"use client";

import { Cell, Pie, PieChart, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  manha: { label: "Manhã", color: "var(--chart-turno-manha)" },
  tarde: { label: "Tarde", color: "var(--chart-turno-tarde)" },
  noite: { label: "Noite", color: "var(--chart-turno-noite)" },
};

const turnoKeyMap: Record<string, keyof typeof chartConfig> = {
  MANHA: "manha",
  TARDE: "tarde",
  NOITE: "noite",
};

type Props = {
  data?: Record<string, number>;
  isLoading?: boolean;
};

export default function AppPieChartTurno({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <Card className="flex flex-col bg-transparent border">
        <CardHeader className="items-center pb-2">
          <CardTitle>Turno</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const chartData = Object.entries(data ?? {})
    .map(([rawKey, value]) => {
      const k = turnoKeyMap[rawKey.trim().toUpperCase()] ?? null;
      if (!k) return null;
      const conf = chartConfig[k];
      return { key: k, name: conf.label, value };
    })
    .filter((d) => d !== null && d.value > 0) as {
    key: keyof typeof chartConfig;
    name: string;
    value: number;
  }[];

  return (
    <Card className="flex flex-col bg-transparent border">
      <CardHeader className="items-center pb-0">
        <CardTitle>Turno</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[250px]"
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
                <Cell key={`cell-${i}`} fill={chartConfig[entry.key]?.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
