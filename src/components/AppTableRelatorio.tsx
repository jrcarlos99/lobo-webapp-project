import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuditLog, LogDetail } from "@/types/user";

// const reports = [
//   {
//     data: "03/09",
//     user: "Juliana Silveira",
//     action: "Criar Conta",
//     details: "Usuário 'juli.sil",
//   },
//   {
//     data: "03/09",
//     user: "João Gomes",
//     action: "Alterar Senha",
//     details: "Senha: '*********'",
//   },
//   {
//     data: "29/08",
//     user: "Maria Souza",
//     action: "Login",
//     details: "Usuário Autenticado",
//   },
//   {
//     data: "27/08",
//     user: "Pedro Lima",
//     action: "Atualizar Imagem",
//     details: "Imagem Atualizada",
//   },
// ];

// Função que simula dados e que será substituido por chamada a API

function viewDetail(detail: LogDetail) {
  if (!detail) return null;
  if (detail.type === "field_change") {
    if (detail.previousValue || detail.newValue) {
      return (
        detail.message ??
        `${detail.field}: ${detail.previousValue ?? ""} → ${
          detail.newValue ?? ""
        } `
      );
    }
    return detail.message ?? `${detail.field} alterado`;
  }
  if (detail.type === "resource_event")
    return detail.message ?? `${detail.resource} ${detail.resourceId ?? ""}`;
  if (detail.type === "action") return detail.message ?? detail.actionName;
  return JSON.stringify(detail);
}

export const AppTableRelatorio = ({ reports }: { reports: AuditLog[] }) => {
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
          {reports.length ? (
            reports.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium text-center">
                  {new Date(r.timestamp).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="text-center">{r.username}</TableCell>
                <TableCell className="text-center">{r.action}</TableCell>
                <TableCell className="text-center">
                  {viewDetail(r.detail)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhum registro
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
