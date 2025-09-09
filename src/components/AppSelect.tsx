import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const AppSelect = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 pt-4">
        {/* Dropdown Período */}
        <Select>
          <SelectTrigger className="font-inter bg-stone-50 w-full sm:w-[180px]">
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
        <Select>
          <SelectTrigger className="font-inter bg-stone-5 w-full sm:w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="fire">Incêndios</SelectItem>
            <SelectItem value="accident">Acidente</SelectItem>
            <SelectItem value="save">Salvamento</SelectItem>
            <SelectItem value="rescue">Resgate</SelectItem>
            <SelectItem value="prehospital">Pré Hospitalar</SelectItem>
            <SelectItem value="epi">EPI</SelectItem>
            <SelectItem value="comunication">Comunicação</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex space-x-4 pt-4">
        {/* Dropdown Região */}
        <Select>
          <SelectTrigger className="font-inter bg-stone-5 w-full sm:w-[180px]">
            <SelectValue placeholder="Região" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="downtown">Centro</SelectItem>
            <SelectItem value="north">Zona Norte</SelectItem>
            <SelectItem value="south">Zona Sul</SelectItem>
            <SelectItem value="east">Zona Leste</SelectItem>
            <SelectItem value="west">Zona Oeste</SelectItem>
            <SelectItem value="rmr">Região Metropolitana</SelectItem>
            <SelectItem value="countryside">Interior</SelectItem>
          </SelectContent>
        </Select>

        {/* Dropdown Status */}
        <Select>
          <SelectTrigger className="font-inter bg-stone-5 w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="finished">Concluído</SelectItem>
            <SelectItem value="ongoing">Em andamento</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="pt-4">
        <Button className=" w-full sm:w-[358px] bg-[var(--color-button)] hover:bg-[var(--color-button-hover)">
          Gerar Estatística
        </Button>
      </div>
    </>
  );
};
