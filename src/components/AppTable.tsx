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

type AppTableProps = {
  data?: Occurrence[];
  onRowClick?: (occurrence: Occurrence) => void;
  page?: number; // página atual (0-based)
  size?: number; // tamanho da página
  totalElements?: number; // total de registros
};

export const AppTable = ({
  data = [],
  onRowClick,
  page = 0,
  size = 10,
  totalElements = 0,
}: AppTableProps) => {
  // cálculo do range exibido
  const start = totalElements > 0 ? page * size + 1 : 0;
  const end = Math.min((page + 1) * size, totalElements);

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

      {/* Rodapé com range e total */}
      {totalElements > 0 && (
        <div className="px-4 py-2 text-sm text-gray-600">
          Mostrando {start}–{end} de {totalElements} registros
        </div>
      )}
    </div>
  );
};
