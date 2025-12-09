"use client";

import { useState, useEffect, useCallback } from "react";
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
  onFilterChange: (updates: Partial<OccurrenceFilters>) => void;
}

export const AppFilter = ({
  cidadesAutorizadas,
  onFilterChange,
}: AppFilterProps) => {
  const { data: currentUser } = useCurrentUser();
  const userRole = currentUser?.cargo;
  const canSeeAllRegions = can(userRole, "occurrence:all");

  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const applyFilters = useCallback(
    (updates: Partial<OccurrenceFilters>) => {
      onFilterChange(updates);
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
      {/* STATUS */}
      <Select
        value={selectedStatus}
        onValueChange={(value) => {
          setSelectedStatus(value);

          applyFilters({
            status: value !== "all" ? (value as OccurrenceStatus) : undefined,
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

      {/* TIPO */}
      <Select
        value={selectedType}
        onValueChange={(value) => {
          setSelectedType(value);

          applyFilters({
            tipo: value !== "all" ? (value as OccurrenceType) : undefined,
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

      {/* CIDADE */}
      <Select
        value={selectedCity}
        onValueChange={(value) => {
          setSelectedCity(value);

          applyFilters({
            cidade: value !== "all" ? value : undefined,
          });
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

      {/* REGIÃO */}
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
