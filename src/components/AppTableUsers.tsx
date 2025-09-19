"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableActions } from "./TableUserActions";

const reports = [
  {
    name: "Juliana Silveira",
    email: "juli.silveira@email.com",
    roles: "Analista",
  },
  {
    name: "João Gomes",
    email: "joao.gomes@gmail.com",
    roles: "Chefe",
  },
  {
    name: "Maria Souza",
    email: "maria.souza@email.com",
    roles: "Analista",
  },
  {
    name: "27/08",
    email: "Pedro Lima",
    roles: "Analista",
  },
];

export const AppTableUsers = () => {
  return (
    <div className="border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Nome</TableHead>
            <TableHead className="text-center">E-mail</TableHead>
            <TableHead className="text-center">Cargo</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                {report.name}
              </TableCell>
              <TableCell className="text-center">{report.email}</TableCell>
              <TableCell className="text-center">{report.roles}</TableCell>
              <TableCell className="text-center">
                <TableActions
                  onEdit={() => console.log("Editar:", report.name)}
                  onDelete={() => console.log("Deletar:", report.name)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
