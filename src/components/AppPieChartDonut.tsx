"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  RMR: { label: "RMR", color: "var(--chart-region-rmr)" },
  AGRE: { label: "Agreste", color: "var(--chart-region-agre)" },
  SERT: { label: "Sertão", color: "var(--chart-region-sertao)" },
  ZDMT: { label: "Zona da Mata", color: "var(--chart-region-zdmt)" },
};

type Props = {
  data?: DashboardData;
  isLoading?: boolean;
};

export default function ChartPieDonut({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <Card className="flex flex-col bg-transparent border">
        <CardHeader className="items-center pb-0">
          <CardTitle>Região</CardTitle>
          <CardDescription>Carregando dados...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Agora usamos porRegiao em vez de graficoRegiao
  const chartData =
    Object.entries(data?.porRegiao ?? {}).map(([key, value]) => ({
      key,
      name: chartConfig[key as keyof typeof chartConfig]?.label ?? key,
      value,
    })) ?? [];

  return (
    <Card className="flex flex-col bg-transparent border">
      <CardHeader className="items-center pb-0">
        <CardTitle>Região</CardTitle>
        <CardDescription>Distribuição por região</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={
                    chartConfig[entry.key as keyof typeof chartConfig]?.color ??
                    "var(--chart-1)"
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
