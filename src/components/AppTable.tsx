"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Report } from "@/types/reports";
import { Regions } from "@/types/reports";
import { regions, cities } from "@/mocks/locations";
import type { Occurrence } from "@/services/ocorrencies.service";

// --- tipos auxiliares para filtros ---
type FilterPayload = {
  regionId?: string;
  cityId?: string;
};

// --- utilitário para formatar status ---
function prettyStatus(status?: string) {
  if (!status) return "-";
  const map: Record<string, string> = {
    novo: "Novo",
    em_andamento: "Em Andamento",
    concluido: "Concluído",
    cancelado: "Cancelado",
  };
  return (
    map[status] ??
    status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

// --- componente principal da tabela ---
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
              <TableRow key={occurrence.id_ocorrencia}>
                <TableCell className="font-medium text-center">
                  {occurrence.id_ocorrencia}
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
