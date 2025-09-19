import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const AppFilter = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 xl:space-x-4 pt-4 gap-4">
        {/* Dropdown Período */}
        <Select>
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
        <Select>
          <SelectTrigger className="font-inter bg-stone-5 w-full ">
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

        {/* Dropdown Região */}
        <Select>
          <SelectTrigger className="font-inter bg-stone-5 w-full ">
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
          <SelectTrigger className="font-inter bg-stone-5 w-full ">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="font-inter">
            <SelectItem value="finished">Concluído</SelectItem>
            <SelectItem value="ongoing">Em andamento</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
