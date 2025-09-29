import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCurrentUser } from "@/hooks/useAuth";
import { can } from "@/policies/permissions";
import type { QueryParams } from "@/types/query";

interface AppFilterProps {
  cidadesAutorizadas: string[];
  onFilterChange: Dispatch<SetStateAction<QueryParams>>;
}

export const AppFilter = ({
  cidadesAutorizadas,
  onFilterChange,
}: AppFilterProps) => {
  const { data: currentUser } = useCurrentUser();
  const userRole = currentUser?.cargo;

  const canSeeAllRegions = can(userRole, "occurrence:all");

  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>(
    undefined
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!canSeeAllRegions && cidadesAutorizadas.length > 0) {
      const cidadeForcada = cidadesAutorizadas[0];

      setSelectedCity(cidadeForcada);

      if (cidadeForcada !== "all") {
        onFilterChange((prev) => ({
          ...prev,
          cidadeFiltro: cidadeForcada,
        }));
      }
    } else if (canSeeAllRegions && selectedCity === cidadesAutorizadas[0]) {
      setSelectedCity(undefined);
    }
  }, [canSeeAllRegions, cidadesAutorizadas, onFilterChange]);

  useEffect(() => {
    const newFilters: QueryParams = {};

    // mapeia o estado local para os nomes de query string que o service espera
    if (selectedCity && selectedCity !== "all") {
      newFilters.cidadeFiltro = selectedCity;
    }
    if (selectedPeriod && selectedPeriod !== "all") {
      newFilters.periodo = selectedPeriod;
    }
    if (selectedType && selectedType !== "all") {
      newFilters.tipo = selectedType;
    }
    if (selectedStatus && selectedStatus !== "all") {
      newFilters.status = selectedStatus;
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
    <>
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 xl:space-x-4 pt-4 gap-4">
        {/* Dropdown Período */}
        <Select onValueChange={setSelectedPeriod} value={selectedPeriod}>
          <SelectTrigger className="font-inter w-full ]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="yesterday">Ontem</SelectItem>
            <SelectItem value="last7days">Ultimos 7 dias</SelectItem>
            <SelectItem value="last30days">Ultimos 30 dias</SelectItem>
            <SelectItem value="lastmonth">Mês Anterior</SelectItem>
          </SelectContent>
        </Select>
        {/* Dropdown Tipo */}
        <Select onValueChange={setSelectedType} value={selectedType}>
          <SelectTrigger className="font-inter bg-stone-5 w-full ">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="fire">Incêndios</SelectItem>
            <SelectItem value="accident">Acidente</SelectItem>
            <SelectItem value="save">Salvamento</SelectItem>
            <SelectItem value="rescue">Resgate</SelectItem>
            <SelectItem value="prehospital">Pré Hospitalar</SelectItem>
            <SelectItem value="epi">EPI</SelectItem>
            <SelectItem value="comunication">Comunicação</SelectItem>
          </SelectContent>
        </Select>

        {/* Dropdown de Cidade (Restrito pela autorização) */}
        <Select
          onValueChange={setSelectedCity}
          value={selectedCity}
          disabled={!canSeeAllRegions && cidadesAutorizadas.length <= 1}
        >
          <SelectTrigger className="font-inter bg-stone-5 w-full ">
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
          <SelectTrigger className="font-inter bg-stone-5 w-full ">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="finished">Concluído</SelectItem>
            <SelectItem value="ongoing">Em andamento</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
