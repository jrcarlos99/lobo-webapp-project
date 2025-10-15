"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Occurrence } from "@/types/occurrence";

// utilitário para formatar status
function prettyStatus(status?: string) {
  if (!status) return "-";
  const map: Record<string, string> = {
    NOVO: "Novo",
    EM_ANDAMENTO: "Em Andamento",
    CONCLUIDO: "Concluído",
    CANCELADO: "Cancelado",
  };
  return map[status] ?? status.replace(/_/g, " ").toUpperCase();
}

export const AppTable = ({ data = [] }: { data?: Occurrence[] }) => {
  return (
    <div className="border rounded-xl overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Título</TableHead>
            <TableHead className="text-center">Cidade</TableHead>
            <TableHead className="text-center">Região</TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((occurrence) => (
              <TableRow key={occurrence.id}>
                <TableCell className="font-medium text-center">
                  {occurrence.titulo}
                </TableCell>
                <TableCell className="text-center">
                  {occurrence.cidade}
                </TableCell>
                <TableCell className="text-center">
                  {occurrence.regiao}
                </TableCell>
                <TableCell className="text-center">{occurrence.tipo}</TableCell>
                <TableCell className="text-center">
                  {prettyStatus(occurrence.status)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
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
