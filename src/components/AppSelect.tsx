"use client";

import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { exportToCSV, exportToPDF } from "@/utils/export";
import {
  Occurrence,
  OccurrenceFilters,
  OccurrenceStatus,
} from "@/types/occurrence";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type AppSelectProps = {
  occurrences: Occurrence[];
  onFilterChange: (filters: Partial<OccurrenceFilters>) => void;
  disabled?: boolean;
  fixedRegionLabel?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

// helper para formatar yyyy-MM-dd
function toIsoDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export const AppSelect = ({
  occurrences,
  onFilterChange,
  disabled = false,
  fixedRegionLabel,
  className,
  size = "md",
}: AppSelectProps) => {
  const sizeClasses = {
    sm: "h-8 text-sm px-2",
    md: "h-10 text-base px-3",
    lg: "h-12 text-lg px-4",
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 sm:max-w-[740px]">
        {/* Dropdown Período */}
        <Select
          onValueChange={(value) => {
            if (!onFilterChange) return;
            const hoje = new Date();

            let dataInicio: string | undefined;
            let dataFim: string | undefined;

            if (value === "today") {
              dataInicio = toIsoDate(hoje);
              dataFim = toIsoDate(hoje);
            } else if (value === "yesterday") {
              const ontem = new Date();
              ontem.setDate(hoje.getDate() - 1);
              dataInicio = toIsoDate(ontem);
              dataFim = toIsoDate(ontem);
            } else if (value === "last7days") {
              const seteDias = new Date();
              seteDias.setDate(hoje.getDate() - 7);
              dataInicio = toIsoDate(seteDias);
              dataFim = toIsoDate(hoje);
            } else if (value === "last30days") {
              const trintaDias = new Date();
              trintaDias.setDate(hoje.getDate() - 30);
              dataInicio = toIsoDate(trintaDias);
              dataFim = toIsoDate(hoje);
            } else if (value === "lastmonth") {
              const primeiroDiaMesAnterior = new Date(
                hoje.getFullYear(),
                hoje.getMonth() - 1,
                1
              );
              const ultimoDiaMesAnterior = new Date(
                hoje.getFullYear(),
                hoje.getMonth(),
                0
              );
              dataInicio = toIsoDate(primeiroDiaMesAnterior);
              dataFim = toIsoDate(ultimoDiaMesAnterior);
            }

            onFilterChange({ dataInicio, dataFim });
          }}
        >
          <SelectTrigger
            className={`font-inter bg-stone-50 w-full ${sizeClasses[size]} ${
              className ?? ""
            }`}
          >
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="yesterday">Ontem</SelectItem>
            <SelectItem value="last7days">Últimos 7 dias</SelectItem>
            <SelectItem value="last30days">Últimos 30 dias</SelectItem>
            <SelectItem value="lastmonth">Mês Anterior</SelectItem>
          </SelectContent>
        </Select>

        {/* Dropdown Tipo */}
        <Select
          onValueChange={(value) =>
            onFilterChange?.({ tipo: value as OccurrenceFilters["tipo"] })
          }
        >
          <SelectTrigger
            className={`font-inter bg-stone-50 w-full ${sizeClasses[size]} ${
              className ?? ""
            }`}
          >
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="INCENDIO">Incêndios</SelectItem>
            <SelectItem value="ACIDENTE_DE_TRANSITO">Acidente</SelectItem>
            <SelectItem value="SALVAMENTO">Salvamento</SelectItem>
            <SelectItem value="RESGATE">Resgate</SelectItem>
            <SelectItem value="VAZAMENTO">Vazamento</SelectItem>
          </SelectContent>
        </Select>

        {/* Dropdown Região */}
        <Select
          disabled={disabled}
          onValueChange={(value) =>
            onFilterChange?.({ regiao: value as OccurrenceFilters["regiao"] })
          }
        >
          <SelectTrigger
            className={`font-inter bg-stone-50 w-full ${sizeClasses[size]} ${
              className ?? ""
            }`}
          >
            <SelectValue placeholder="Região" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="RMR">Região Metropolitana</SelectItem>
            <SelectItem value="AGRE">Agreste</SelectItem>
            <SelectItem value="SERT">Sertão</SelectItem>
            <SelectItem value="ZDMT">Zona da Mata</SelectItem>
            <SelectItem value="all">Todas</SelectItem>
          </SelectContent>
        </Select>

        {/* Dropdown Status */}
        <Select
          onValueChange={(value) =>
            onFilterChange?.({ status: [value as OccurrenceStatus] })
          }
        >
          <SelectTrigger
            className={`font-inter bg-stone-50 w-full ${sizeClasses[size]} ${
              className ?? ""
            }`}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="ABERTA">Aberta</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em andamento</SelectItem>
            <SelectItem value="PENDENTE">Pendente</SelectItem>
            <SelectItem value="CANCELADO">Cancelado</SelectItem>
            <SelectItem value="CONCLUIDO">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 sm:max-w-[740px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`w-full bg-[var(--color-button)] hover:bg-[var(--color-secondary-lobo)] ${
                sizeClasses[size]
              } ${className ?? ""}`}
            >
              Gerar Estatística
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => exportToCSV(occurrences)}>
              Exportar CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportToPDF(occurrences)}>
              Exportar PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {disabled && fixedRegionLabel && (
        <p className="pt-2 text-sm text-gray-500 sm:max-w-[740px]">
          Sua região está fixada em <strong>{fixedRegionLabel}</strong>
        </p>
      )}
    </>
  );
};
