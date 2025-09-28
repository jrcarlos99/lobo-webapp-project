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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string;
  status: "active" | "inactive";
  lastLogin?: string;
}

interface AppTableUserProps {
  users: User[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

// Função que simula dados e que será substituido por chamada a API
export const generateMockusers = (count: number): User[] => {
  const firstNames = [
    "Ana",
    "João",
    "Maria",
    "Pedro",
    "Carlos",
    "Juliana",
    "Fernanda",
    "Ricardo",
    "Camila",
    "Lucas",
  ];
  const lastNames = [
    "Silva",
    "Santos",
    "Oliveira",
    "Souza",
    "Costa",
    "Pereira",
    "Rodrigues",
    "Almeida",
    "Carvalho",
    "Gomes",
  ];
  const roles = ["Admin", "Analista", "Chefe"];

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `${firstNames[i % firstNames.length]} ${
      lastNames[i % lastNames.length]
    }`,
    email: `user${i + 1}@empresa.com`,
    roles: roles[i % roles.length],

    status: i % 5 === 0 ? "inactive" : "active",
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  }));
};

export const AppTableUsers = ({
  users,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: AppTableUserProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <div className="space-y-4">
      <div className="border rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">E-mail</TableHead>
              <TableHead className="text-center">Cargo</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Último Login</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-center">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell className="text-center">{user.roles}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className="{`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}"
                    >
                      {user.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell className="text-center">
                    <TableActions
                      onEdit={() => console.log("Editar:", user.name)}
                      onDelete={() => console.log("Deletar:", user.name)}
                      // onView={() => console.log("Visualizar:", user.name)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Controle de paginação */}

      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Itens por página:
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Primeira Página</span>
              <ChevronLeft className="h-4 w-4" />
              <ChevronLeft className="h-4 w-4 -ml-2" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Página Anterior</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Próxima Página</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Última Página</span>
              <ChevronRight className="h-4 w-4" />
              <ChevronRight className="h-4 w-4 -ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
