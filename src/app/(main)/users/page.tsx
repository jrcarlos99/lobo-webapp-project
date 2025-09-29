"use client";

import { useState, useEffect } from "react";
import { AppDatePicker } from "@/components/AppDatePicker";
import { InputWithButton } from "@/components/AppInputWithButton";
import {
  AppTableUsers,
  generateMockusers,
  User,
} from "@/components/AppTableUsers";
import { usePagination } from "@/hooks/usePagination";
import { UsersResponse } from "@/types/user";

import { useCurrentUser } from "@/hooks/useAuth";
import { can } from "@/policies/permissions";
import { redirect } from "next/navigation";

// Simular chamada à API que irei substituir por uma chamada real
const fetchUsers = async (
  page: number,
  pageSize: number,
  searchTerm?: string
): Promise<UsersResponse> => {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allUsers = generateMockusers(157);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredUsers = searchTerm
    ? allUsers.filter(
        (user: User) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allUsers;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    totalCount: filteredUsers.length,
    page,
    pageSize,
    totalPages: Math.ceil(filteredUsers.length / pageSize),
  };
};

const MOCK_INITIAL_PAGE_SIZE = 10;

export default function UsersPage() {
  const { data: currentUser, isLoading: isAuthLoading } = useCurrentUser();

  // Lógica de Paginação e Busca
  const userRole = currentUser?.cargo;

  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const pagination = usePagination({
    itemsPerPage: MOCK_INITIAL_PAGE_SIZE,
    totalItems: totalCount,
  });
  // Busca de usuários quando a página ou o search term mudar

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsers(
          pagination.currentPage,
          pagination.pageSize,
          searchTerm
        );
        setUsers(data.users);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [pagination.currentPage, pagination.pageSize, searchTerm]);

  // Logica de proteção de rota
  if (isAuthLoading) {
    return <div>Carregando perfil...</div>;
  }

  const canAccessPage = can(currentUser?.cargo, "users:manage");

  if (!canAccessPage) {
    redirect("/dashboard");
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    pagination.goToPage(1);
  };

  const handleAdd = () => console.log("Adicionar usuário (APENAS ADMIN)");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <AppDatePicker />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Usuários
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-col items center gap-4">
        <InputWithButton
          onSearch={handleSearch}
          onAdd={handleAdd}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          placeholder="Buscar usuários por nome ou email..."
        />
      </div>

      <div className="bg-primary-foreground rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Carregando usuários...</span>
          </div>
        ) : (
          <AppTableUsers
            users={users}
            currentPage={pagination.currentPage}
            pageSize={pagination.pageSize}
            totalItems={totalCount}
            onPageChange={pagination.goToPage}
            onPageSizeChange={(size) => {
              pagination.setPageSize(size);
              pagination.goToPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
}
