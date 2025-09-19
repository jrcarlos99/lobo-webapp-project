import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const reports = [
  {
    title: "Falta de Equipamento",
    type: "EPI",
    region: "Centro",
    status: "Em andamento",
  },
  {
    title: "Incêndio Estrutural",
    type: "Incêndio",
    region: "Zona Norte",
    status: "Concluído",
  },
  {
    title: "Falta de Equipamento",
    type: "EPI",
    region: "Zona Sul",
    status: "",
  },
  {
    title: "Acidente de Trânsito",
    type: "Acidente",
    region: "Centro",
    status: "Concluído",
  },
  {
    title: "Acidente Doméstico",
    type: "Acidente",
    region: "Zona Norte",
    status: "Em andamento",
  },
  {
    title: "Afogamento",
    type: "Salvamento",
    region: "Zona Sul",
    status: "Concluído",
  },
];

export const AppTable = () => {
  return (
    <div className="border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Título</TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead className="text-center">Região</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                {report.title}
              </TableCell>
              <TableCell className="text-center">{report.type}</TableCell>
              <TableCell className="text-center">{report.region}</TableCell>
              <TableCell className="text-center">{report.region}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
