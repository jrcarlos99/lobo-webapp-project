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

function formatDate(iso?: string) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const AppTable = ({
  data = [],
  onRowClick,
}: {
  data?: Occurrence[];
  onRowClick?: (occurrence: Occurrence) => void;
}) => {
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
            <TableHead className="text-center">Abertura</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((occurrence) => (
              <TableRow
                key={occurrence.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick?.(occurrence)}
              >
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
                  {occurrence.status}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(occurrence.dataHoraAbertura)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
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
