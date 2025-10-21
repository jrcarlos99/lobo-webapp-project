"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LogDetail, AuditLog } from "@/types/audit";

function viewDetail(detail?: LogDetail) {
  if (!detail) return null;

  switch (detail.type) {
    case "field_change": {
      const hasValues = detail.previousValue || detail.newValue;
      if (hasValues) {
        return (
          detail.message ??
          `${detail.field}: ${detail.previousValue ?? ""} → ${
            detail.newValue ?? ""
          }`
        );
      }
      return detail.message ?? `${detail.field} alterado`;
    }

    case "resource_event":
      return detail.message ?? `${detail.resource} ${detail.resourceId ?? ""}`;

    case "action":
      return detail.message ?? detail.actionName;

    case "unknown":
      return detail.message ?? JSON.stringify(detail);

    default:
      // Fallback defensivo, embora não deva acontecer
      return JSON.stringify(detail);
  }
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
                <TableCell className="text-center">
                  {r.username ?? "-"}
                </TableCell>
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
