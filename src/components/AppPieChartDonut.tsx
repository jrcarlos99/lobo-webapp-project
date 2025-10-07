"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart";

const chartData = [];

const chartConfig = {
  visitors: {
    label: "Ocorrências",
  },
  chrome: {
    label: "Ao Norte",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Centro",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Ao sul",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartPieDonut() {
  const { data, isLoading } = useDashboardData();

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
  const filteredChartData =
    data?.graficoRegiao?.map((item) => ({
      browser: item.label,
      visitors: item.value,
      fill:
        item.label === "Ao Norte"
          ? "var(--color-chart-1)"
          : item.label === "Centro"
          ? "var(--color-chart-2)"
          : "var(--color-chart-3)",
    })) || [];

  return (
    <Card className="flex flex-col bg-transparent border">
      <CardHeader className="items-center pb-0">
        <CardTitle>Região</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
              data={filteredChartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
