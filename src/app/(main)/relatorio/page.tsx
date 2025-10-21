"use client";

import type { OccurrenceFilters } from "@/types/occurrence";
import { AppDatePicker } from "@/components/AppDatePicker";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { handleGenerateReport } from "@/utils/export";
import { getOccurrencesFor } from "@/services/ocorrencies.service";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function RelatorioPage() {
  const [filtrosDeTela, setFiltrosDeTela] = useState<OccurrenceFilters>({});
  const [loading, setLoading] = useState(false);

  // Hook que traz o usuário logado
  const { data: currentUser } = useCurrentUser();

  const gerarRelatorio = async () => {
    if (!currentUser) {
      console.warn("Nenhum usuário logado encontrado");
      return;
    }

    setLoading(true);
    try {
      const data = await getOccurrencesFor(currentUser, filtrosDeTela);

      const formatDate = (dateString?: string) =>
        dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "?";

      const periodo = `${formatDate(filtrosDeTela.dataInicio)} - ${formatDate(
        filtrosDeTela.dataFim
      )}`;
      handleGenerateReport(data, periodo);
    } finally {
      setLoading(false);
    }
  };
  const forms = [
    {
      title: "Atendimento Básico",
      color: "var(--color-gray-light)",
      href: "/relatorio/basico",
    },
    {
      title: "Folha de Histórico",
      color: "var(--color-gray)",
      href: "/relatorio/historico",
    },
    {
      title: "Pré-Hospitalar",
      color: "var(--chart-2)",
      href: "/relatorio/pre-hospitalar",
    },
    {
      title: "Incêndio",
      color: "var(--color-button)",
      href: "/relatorio/incendio",
    },
    {
      title: "Salvamento",
      color: "var(--chart-5)",
      href: "/relatorio/salvamento",
    },
    { title: "Mergulho", color: "var(--chart-5)", href: "/relatorio/mergulho" },
    {
      title: "Produtos Perigosos",
      color: "var(--chart-4)",
      href: "/relatorio/produtos-perigosos",
    },
    {
      title: "Prevenção",
      color: "var(--color-prevention)",
      href: "/relatorio/prevencao",
    },
    {
      title: "Atividade Comunitária",
      color: "var(--color-craque)",
      href: "/relatorio/atividade-comunitaria",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppDatePicker
          onChange={(value) =>
            setFiltrosDeTela((prev) => ({
              ...prev,
              dataInicio: value.dataInicio,
              dataFim: value.dataFim,
            }))
          }
        />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Relatórios
        </span>
      </div>

      <div className="flex flex-row-reverse bg-primary-foreground p-4 rounded-2xl ">
        <Button
          onClick={gerarRelatorio}
          disabled={loading}
          className="bg-[var(--color-button)] hover:bg-[var(--color-secondary-lobo)] w-full sm:w-auto px-6 h-12"
        >
          {loading ? "Gerando..." : "Gerar Relatório"}
        </Button>
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg col-span-2">
        <p>Selecione o tipo de formulário que deseja preencher:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <Link key={form.href} href={form.href}>
              <Card
                className="cursor-pointer hover:shadow-lg transition"
                style={{ backgroundColor: form.color }}
              >
                <CardHeader>
                  <CardTitle>{form.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
