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
    data: "03/09",
    user: "Juliana Silveira",
    action: "Criar Conta",
    details: "Usuário 'juli.sil",
  },
  {
    data: "03/09",
    user: "João Gomes",
    action: "Alterar Senha",
    details: "Senha: '*********'",
  },
  {
    data: "29/08",
    user: "Maria Souza",
    action: "Login",
    details: "Usuário Autenticado",
  },
  {
    data: "27/08",
    user: "Pedro Lima",
    action: "Atualizar Imagem",
    details: "Imagem Atualizada",
  },
];

export const AppTableRelatorio = () => {
  return (
    <div className="border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Usuário</TableHead>
            <TableHead className="text-center">Ação</TableHead>
            <TableHead className="text-center">Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                {report.data}
              </TableCell>
              <TableCell className="text-center">{report.user}</TableCell>
              <TableCell className="text-center">{report.action}</TableCell>
              <TableCell className="text-center">{report.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
