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
import { Button } from "./ui/button";

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

  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

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

  const clearFilters = () => {
    setSelectedPeriod("all");
    setSelectedType("all");
    setSelectedCity("all");
    setSelectedStatus("all");
    setSelectedRegion("all");

    applyFilters({
      cidade: undefined,
      tipo: undefined,
      status: undefined,
      regiao: undefined,
      dataInicio: undefined,
      dataFim: undefined,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* GRID COM RÓTULOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* STATUS */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Status</label>
          <Select
            value={selectedStatus}
            onValueChange={(value) => {
              setSelectedStatus(value);
              applyFilters({
                status:
                  value !== "all" ? (value as OccurrenceStatus) : undefined,
              });
            }}
          >
            <SelectTrigger className="w-full">
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
        </div>

        {/* TIPO */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Tipo de Ocorrência</label>
          <Select
            value={selectedType}
            onValueChange={(value) => {
              setSelectedType(value);
              applyFilters({
                tipo: value !== "all" ? (value as OccurrenceType) : undefined,
              });
            }}
          >
            <SelectTrigger className="w-full">
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
        </div>

        {/* CIDADE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Cidade</label>
          <Select
            value={selectedCity}
            onValueChange={(value) => {
              setSelectedCity(value);
              applyFilters({
                cidade: value !== "all" ? value : undefined,
              });
            }}
          >
            <SelectTrigger className="w-full">
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
        </div>

        {/* REGIÃO */}
        {canSeeAllRegions && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Região</label>
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
              <SelectTrigger className="w-full">
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
          </div>
        )}
      </div>

      {/* BOTÃO LIMPAR */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={clearFilters}>
          Limpar filtros
        </Button>
      </div>
    </div>
  );
};
