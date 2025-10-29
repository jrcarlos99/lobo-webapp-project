"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DashboardData } from "@/types/dashboard";

type Props = {
  data?: DashboardData;
  isLoading?: boolean;
};

export const AppOcorrenciaChart = ({ data, isLoading }: Props) => {
  const totalOcorrencias = data?.totalOcorrencias ?? 0;

  if (isLoading) {
    return (
      <Card className="bg-transparent border p-2">
        <CardHeader className="p-2">
          <CardDescription className="text-sm">Carregando...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="@container/card bg-transparent border p-2">
      <CardHeader className="p-2">
        <CardDescription className="text-xl">Ocorrências</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
          {totalOcorrencias.toLocaleString("pt-BR")}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
