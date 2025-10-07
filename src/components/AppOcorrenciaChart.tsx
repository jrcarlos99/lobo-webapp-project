"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { useDashboardData } from "@/hooks/useDashboardData";

export const AppOcorrenciaChart = () => {
  const { data, isLoading } = useDashboardData();

  // extrair os dados necessários (usando o fallback para 0)
  const totalOcorrencias = data?.kpis?.totalOcorrencias ?? 0;
  const comparacao = data?.kpis?.porcentagemComparacaoPeriodo ?? 0;

  const isTrendingDown = comparacao < 0;
  const IconComponent = isTrendingDown ? IconTrendingDown : IconTrendingUp;
  const comparacaoTexto = `${Math.abs(comparacao)}%`;

  if (isLoading) {
    return (
      <div className="pt-4">
        <Card className="bg-transparent border">
          <CardHeader>
            <CardDescription>Carregando...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return (
    <div className="pt-4">
      <Card className="@container/card bg-transparent border ">
        <CardHeader>
          <CardDescription>Ocorrências</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalOcorrencias.toLocaleString("pt-BR")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              {isTrendingDown ? "-" : "+"}
              {comparacaoTexto}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isTrendingDown ? "Down" : "Up"}
            {comparacaoTexto} esse período <IconComponent className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {isTrendingDown
              ? "A aquisição precisa de atenção"
              : "Performance está boa"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
