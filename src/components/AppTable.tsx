"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Report } from "@/types/reports";
import { Roles } from "@/types/roles";
import { Regions } from "@/types/reports";
import { regions, cities } from "@/mocks/locations";
import { useMemo, useState } from "react";

// const reports = [
//   {
//     title: "Falta de Equipamento",
//     type: "EPI",
//     region: "Centro",
//     status: "Em andamento",
//   },
//   {
//     title: "Incêndio Estrutural",
//     type: "Incêndio",
//     region: "Zona Norte",
//     status: "Concluído",
//   },
//   {
//     title: "Falta de Equipamento",
//     type: "EPI",
//     region: "Zona Sul",
//     status: "",
//   },
//   {
//     title: "Acidente de Trânsito",
//     type: "Acidente",
//     region: "Centro",
//     status: "Concluído",
//   },
//   {
//     title: "Acidente Doméstico",
//     type: "Acidente",
//     region: "Zona Norte",
//     status: "Em andamento",
//   },
//   {
//     title: "Afogamento",
//     type: "Salvamento",
//     region: "Zona Sul",
//     status: "Concluído",
//   },
// ];

// export const sampleRecords: Report[] = [
//   {
//     id: "r1",
//     title: "Falta de Equipamento",
//     type: "EPI",
//     region: Regions.METROPOLITANA,

//     status: "concluido",
//     createdAt: "2025-09-01T08:30:00.000Z",
//     reportedByName: "Juliana Silveira",
//   },
//   {
//     id: "r2",
//     title: "Incêndio Estrutural",
//     type: "Incêndio",
//     region: Regions.AGRESTE,
//     status: "em_andamento",
//     createdAt: "2025-09-02T14:10:00.000Z",
//     reportedByName: "João Gomes",
//   },
// ];

export function ReportFilters({ onFilter }) {
  const [regionId, setRegionId] = useState<string | undefined>(undefined);
  const [cityId, setCityId] = useState<string | undefined>(undefined);

  const cityOptions = useMemo(
    () => (regionId ? cities.filter((c) => c.regionId === regionId) : cities),
    [regionId]
  );
}

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

export const AppTable = ({
  records = sampleRecords,
}: {
  records?: Report[];
}) => {
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
          {records.length > 0 ? (
            records.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium text-center">
                  {report.title}
                </TableCell>
                <TableCell className="text-center">{report.type}</TableCell>
                <TableCell className="text-center">{report.region}</TableCell>
                <TableCell className="text-center">
                  {prettyStatus(report.status)}
                </TableCell>
                <TableCell className="text-center">
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleDateString()
                    : "-"}
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
          {/* {reports.map((report, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                {report.title}
              </TableCell>
              <TableCell className="text-center">{report.type}</TableCell>
              <TableCell className="text-center">{report.region}</TableCell>
              <TableCell className="text-center">{report.region}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
};
