"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useAuth";
import type { QueryParams } from "@/types/query";
import { can } from "@/policies/permissions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { OccurrenceFilters } from "@/types/occurrence";

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

  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  // força cidade se usuário não pode ver todas
  useEffect(() => {
    if (!canSeeAllRegions && cidadesAutorizadas.length > 0) {
      const cidadeForcada = cidadesAutorizadas[0];
      setSelectedCity(cidadeForcada);

      if (cidadeForcada !== "all") {
        onFilterChange((prev) => ({
          ...prev,
          cidade: cidadeForcada,
        }));
      }
    } else if (canSeeAllRegions && selectedCity === cidadesAutorizadas[0]) {
      setSelectedCity(undefined);
    }
  }, [canSeeAllRegions, cidadesAutorizadas, onFilterChange]);

  // aplica filtros
  useEffect(() => {
    const newFilters: QueryParams = {};

    if (selectedCity && selectedCity !== "all") {
      newFilters.cidade = selectedCity;
    }
    if (selectedType && selectedType !== "all") {
      newFilters.tipo = selectedType.toUpperCase();
    }
    if (selectedStatus && selectedStatus !== "all") {
      newFilters.status = selectedStatus; // já vem no formato certo
    }

    // traduz período em dataInicio/dataFim
    if (selectedPeriod && selectedPeriod !== "all") {
      const hoje = new Date();
      let inicio = new Date();

      if (selectedPeriod === "last7days") {
        inicio.setDate(hoje.getDate() - 7);
      } else if (selectedPeriod === "last30days") {
        inicio.setDate(hoje.getDate() - 30);
      } else if (selectedPeriod === "today") {
        inicio = hoje;
      } else if (selectedPeriod === "yesterday") {
        inicio.setDate(hoje.getDate() - 1);
        hoje.setDate(hoje.getDate() - 1);
      } else if (selectedPeriod === "lastmonth") {
        inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
        hoje.setDate(0); // último dia do mês anterior
      }

      newFilters.dataInicio = inicio.toISOString().split("T")[0] + "T00:00:00";
      newFilters.dataFim = hoje.toISOString().split("T")[0] + "T23:59:59";
    }

    onFilterChange(newFilters);
  }, [
    selectedPeriod,
    selectedType,
    selectedCity,
    selectedStatus,
    onFilterChange,
  ]);

  return (
    <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 xl:space-x-4 pt-4 gap-4">
      {/* Dropdown Período */}
      <Select onValueChange={setSelectedPeriod} value={selectedPeriod}>
        <SelectTrigger className="font-inter w-full">
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
      <Select onValueChange={setSelectedType} value={selectedType}>
        <SelectTrigger className="font-inter bg-stone-5 w-full">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent className="font-inter">
          <SelectItem value="all">Todos os Tipos</SelectItem>
          <SelectItem value="INCENDIO">Incêndios</SelectItem>
          <SelectItem value="ACIDENTE_DE_TRANSITO">Acidente</SelectItem>
          <SelectItem value="SALVAMENTO">Salvamento</SelectItem>
          <SelectItem value="RESGATE">Resgate</SelectItem>
          <SelectItem value="PRE_HOSPITALAR">Pré Hospitalar</SelectItem>
          <SelectItem value="EPI">EPI</SelectItem>
          <SelectItem value="COMUNICACAO">Comunicação</SelectItem>
        </SelectContent>
      </Select>

      {/* Dropdown Cidade */}
      <Select
        onValueChange={setSelectedCity}
        value={selectedCity}
        disabled={!canSeeAllRegions && cidadesAutorizadas.length <= 1}
      >
        <SelectTrigger className="font-inter bg-stone-5 w-full">
          <SelectValue
            placeholder={
              !canSeeAllRegions && cidadesAutorizadas.length === 1
                ? cidadesAutorizadas[0]
                : "Cidade"
            }
          />
        </SelectTrigger>
        <SelectContent className="font-inter">
          {canSeeAllRegions && (
            <SelectItem value="all">Todas as Cidades</SelectItem>
          )}
          {cidadesAutorizadas.map((cidade) => (
            <SelectItem key={cidade} value={cidade}>
              {cidade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Dropdown Status */}
      <Select onValueChange={setSelectedStatus} value={selectedStatus}>
        <SelectTrigger className="font-inter bg-stone-5 w-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="font-inter">
          <SelectItem value="all">Todos os Status</SelectItem>
          <SelectItem value="NOVO">Novo</SelectItem>
          <SelectItem value="EM_ANDAMENTO">Em andamento</SelectItem>
          <SelectItem value="CONCLUIDO">Concluído</SelectItem>
          <SelectItem value="CANCELADO">Cancelado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
