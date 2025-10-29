"use client";

import { Cell, Pie, PieChart, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Configuração de cores e labels por região
const chartConfig: ChartConfig = {
  RMR: { label: "RMR", color: "var(--chart-region-rmr)" },
  AGRE: { label: "Agreste", color: "var(--chart-region-agre)" },
  SERT: { label: "Sertão", color: "var(--chart-region-sertao)" },
  ZDMT: { label: "Zona da Mata", color: "var(--chart-region-zdmt)" },
};

// Mapa de possíveis chaves do backend → chartConfig
const regiaoKeyMap: Record<string, keyof typeof chartConfig> = {
  RMR: "RMR",
  AGRE: "AGRE",
  SERT: "SERT",
  SERTAO: "SERT", // caso venha sem acento
  Sertão: "SERT",
  ZDMT: "ZDMT",
  "Zona da Mata": "ZDMT",
  Agreste: "AGRE",
};

type Props = {
  data?: Record<string, number>;
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

  // Mapeia os dados vindos do backend para o formato esperado pelo gráfico
  const chartData =
    Object.entries(data ?? {}).map(([rawKey, value]) => {
      const normalizedKey =
        regiaoKeyMap[rawKey] ??
        regiaoKeyMap[rawKey.toUpperCase()] ??
        ("RMR" as keyof typeof chartConfig);
      const conf = chartConfig[normalizedKey];
      return {
        key: normalizedKey,
        name: conf.label,
        value,
      };
    }) ?? [];

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
                  fill={chartConfig[entry.key]?.color ?? "var(--chart-1)"}
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
