"use client";

import {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import type {
  OccurrenceFilters,
  OccurrenceStatus,
  OccurrenceType,
} from "@/types/occurrence";
import { useCurrentUser } from "@/hooks/useAuth";
import { can } from "@/policies/permissions";
import { regioes } from "@/constants/occurrenceOptions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AppFilterProps {
  cidadesAutorizadas: string[];
  onFilterChange: Dispatch<SetStateAction<OccurrenceFilters>>;
}

export const AppFilter = ({
  cidadesAutorizadas,
  onFilterChange,
}: AppFilterProps) => {
  const { data: currentUser } = useCurrentUser();
  const userRole = currentUser?.cargo;
  const canSeeAllRegions = can(userRole, "occurrence:all");

  const [selectedPeriod, setSelectedPeriod] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedRegion, setSelectedRegion] = useState<string>();

  const applyFilters = useCallback(
    (updates: Partial<OccurrenceFilters>) => {
      onFilterChange((prev) => ({
        ...prev,
        ...updates,
        page: 0,
      }));
    },
    [onFilterChange]
  );

  useEffect(() => {
    if (!canSeeAllRegions && cidadesAutorizadas.length > 0) {
      setSelectedCity(cidadesAutorizadas[0]);
      applyFilters({ cidade: cidadesAutorizadas[0] });
    }
  }, [canSeeAllRegions, cidadesAutorizadas, applyFilters]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      {/* Período */}
      <Select
        value={selectedPeriod}
        onValueChange={(value) => {
          setSelectedPeriod(value);

          if (value === "all") {
            applyFilters({ dataInicio: undefined, dataFim: undefined });
            return;
          }

          const hoje = new Date();
          let inicio = new Date();

          if (value === "today") inicio = hoje;
          if (value === "yesterday") inicio.setDate(hoje.getDate() - 1);
          if (value === "last7days") inicio.setDate(hoje.getDate() - 7);
          if (value === "last30days") inicio.setDate(hoje.getDate() - 30);
          if (value === "lastmonth") {
            inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
            hoje.setDate(0);
          }

          applyFilters({
            dataInicio: inicio.toISOString().split("T")[0],
            dataFim: hoje.toISOString().split("T")[0],
          });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="today">Hoje</SelectItem>
          <SelectItem value="yesterday">Ontem</SelectItem>
          <SelectItem value="last7days">Últimos 7 dias</SelectItem>
          <SelectItem value="last30days">Últimos 30 dias</SelectItem>
          <SelectItem value="lastmonth">Mês passado</SelectItem>
        </SelectContent>
      </Select>

      {/* Tipo */}
      <Select
        value={selectedType}
        onValueChange={(value) => {
          setSelectedType(value);
          applyFilters({
            tipo:
              value !== "all"
                ? (value.toUpperCase() as OccurrenceType)
                : undefined,
          });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="INCENDIO">Incêndio</SelectItem>
          <SelectItem value="ACIDENTE_DE_TRANSITO">
            Acidente de Trânsito
          </SelectItem>
          <SelectItem value="SALVAMENTO">Salvamento</SelectItem>
          <SelectItem value="RESGATE">Resgate</SelectItem>
          <SelectItem value="VAZAMENTO">Vazamento</SelectItem>
        </SelectContent>
      </Select>

      {/* Cidade */}
      <Select
        value={selectedCity}
        onValueChange={(value) => {
          setSelectedCity(value);
          applyFilters({ cidade: value !== "all" ? value : undefined });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Cidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {cidadesAutorizadas.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select
        value={selectedStatus}
        onValueChange={(value) => {
          setSelectedStatus(value);
          applyFilters({
            status:
              value !== "all"
                ? (value as OccurrenceStatus)
                : ([
                    "EM_ANDAMENTO",
                    "ABERTA",
                    "CANCELADO",
                    "PENDENTE",
                    "CONCLUIDO",
                  ] as OccurrenceStatus[]),
          });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="PENDENTE">Pendente</SelectItem>
          <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
          <SelectItem value="ABERTA">Aberta</SelectItem>
          <SelectItem value="CANCELADO">Cancelado</SelectItem>
          <SelectItem value="CONCLUIDO">Concluído</SelectItem>
        </SelectContent>
      </Select>

      {/* Região */}
      {canSeeAllRegions ? (
        <Select
          value={selectedRegion}
          onValueChange={(value) => {
            setSelectedRegion(value);
            applyFilters({
              regiao:
                value !== "all"
                  ? (value as OccurrenceFilters["regiao"])
                  : undefined,
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Região" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {regioes.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="w-[180px] flex items-center px-3 py-2">
          <span className="text-sm">{currentUser?.regiaoAutorizada}</span>
        </div>
      )}
    </div>
  );
};
