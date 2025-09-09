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
            <TableHead className="text-left">Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Região</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{report.title}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.region}</TableCell>
              <TableCell className="text-right">{report.region}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
