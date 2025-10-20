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
  onFilterChange?: (filters: Partial<OccurrenceFilters>) => void;
  disabled?: boolean;
  fixedRegionLabel?: string;
};

export const AppSelect = ({
  occurrences,
  onFilterChange,
  disabled = false,
  fixedRegionLabel,
}: AppSelectProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 pt-4">
        {/* Dropdown Período */}
        <Select
          onValueChange={(value) => {
            if (!onFilterChange) return;
            const hoje = new Date();
            const toLocalIso = (date: Date, endOfDay = false) => {
              const y = date.getFullYear();
              const m = String(date.getMonth() + 1).padStart(2, "0");
              const d = String(date.getDate()).padStart(2, "0");
              const hh = endOfDay ? "23" : "00";
              const mm = endOfDay ? "59" : "00";
              const ss = endOfDay ? "59" : "00";
              return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
            };

            let dataInicio: string | undefined;
            let dataFim: string | undefined;

            if (value === "today") {
              dataInicio = toLocalIso(hoje);
              dataFim = toLocalIso(hoje, true);
            } else if (value === "yesterday") {
              const ontem = new Date();
              ontem.setDate(hoje.getDate() - 1);
              dataInicio = toLocalIso(ontem);
              dataFim = toLocalIso(ontem, true);
            } else if (value === "last7days") {
              const seteDias = new Date();
              seteDias.setDate(hoje.getDate() - 7);
              dataInicio = toLocalIso(seteDias);
              dataFim = toLocalIso(hoje, true);
            } else if (value === "last30days") {
              const trintaDias = new Date();
              trintaDias.setDate(hoje.getDate() - 30);
              dataInicio = toLocalIso(trintaDias);
              dataFim = toLocalIso(hoje, true);
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
              dataInicio = toLocalIso(primeiroDiaMesAnterior);
              dataFim = toLocalIso(ultimoDiaMesAnterior, true);
            }

            onFilterChange({ dataInicio, dataFim });
          }}
        >
          <SelectTrigger className="font-inter bg-stone-50 w-full sm:w-[180px]">
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
          <SelectTrigger className="font-inter bg-stone-5 w-full sm:w-[180px]">
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
      </div>

      <div className="flex space-x-4 pt-4">
        {/* Dropdown Região */}
        <Select
          disabled={disabled}
          onValueChange={(value) =>
            onFilterChange?.({ regiao: value as OccurrenceFilters["regiao"] })
          }
        >
          <SelectTrigger className="font-inter bg-stone-5 w-full sm:w-[180px]">
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

        {disabled && fixedRegionLabel && (
          <p className="text-sm text-gray-500">
            Sua região está fixada em <strong>{fixedRegionLabel}</strong>
          </p>
        )}

        {/* Dropdown Status */}
        <Select
          onValueChange={(value) =>
            onFilterChange?.({ status: [value as OccurrenceStatus] })
          }
        >
          <SelectTrigger className="font-inter bg-stone-5 w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="ABERTA">Aberta</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em andamento</SelectItem>
            <SelectItem value="PENDENTE">Pendente</SelectItem>
            <SelectItem value="CANCELADO">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botão de Exportação */}
      <div className="pt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className=" w-full sm:w-[358px] bg-[var(--color-button)] hover:bg-[var(--color-secondary-lobo)]">
              <a href="">Gerar Estatística</a>
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
    </>
  );
};
