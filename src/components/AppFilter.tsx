"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useCurrentUser } from "@/hooks/useAuth";
import { can } from "@/policies/permissions";
import type { OccurrenceFilters } from "@/types/occurrence";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { regioes } from "@/constants/occurrenceOptions";

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
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();

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
  }, [canSeeAllRegions, cidadesAutorizadas, onFilterChange, selectedCity]);

  // aplica filtros
  useEffect(() => {
    const newFilters: OccurrenceFilters = {};

    if (selectedRegion) {
      newFilters.regiao = selectedRegion as OccurrenceFilters["regiao"];
    }

    if (selectedCity && selectedCity !== "all") {
      newFilters.cidade = selectedCity;
    }
    if (selectedType && selectedType !== "all") {
      newFilters.tipo = selectedType.toUpperCase() as OccurrenceFilters["tipo"];
    }
    if (selectedStatus && selectedStatus !== "all") {
      newFilters.status = selectedStatus as OccurrenceFilters["status"];
    } else {
      // usa só os status que já existem no backend
      newFilters.status = ["EM_ANDAMENTO", "ABERTA", "CANCELADO", "PENDENTE"];
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

    console.log("Filtros do AppFilter:", newFilters);
    onFilterChange(newFilters);
  }, [
    selectedPeriod,
    selectedType,
    selectedCity,
    selectedStatus,
    selectedRegion,
    onFilterChange,
  ]);

  return (
    <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 xl:space-x-4 pt-4 gap-4">
      {/* Período */}
      <Select onValueChange={setSelectedPeriod} value={selectedPeriod}>
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
      <Select onValueChange={setSelectedType} value={selectedType}>
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
      <Select onValueChange={setSelectedCity} value={selectedCity}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Cidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {cidadesAutorizadas.map((cidade) => (
            <SelectItem key={cidade} value={cidade}>
              {cidade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select onValueChange={setSelectedStatus} value={selectedStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="PENDENTE">Pendente</SelectItem>
          <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
          <SelectItem value="ABERTA">Aberta</SelectItem>
          <SelectItem value="CANCELADO">Cancelado</SelectItem>
        </SelectContent>
      </Select>

      {/* Região */}
      {canSeeAllRegions ? (
        <Select onValueChange={setSelectedRegion} value={selectedRegion}>
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
        <div className="w-[180px] flex items-center px-3 py-2 border-rounded">
          <span className="text-sm">
            {currentUser?.regiaoAutorizada ?? "Região não definida"}
          </span>
        </div>
      )}
    </div>
  );
};
