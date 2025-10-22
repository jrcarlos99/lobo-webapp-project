"use client";

import { useState, useEffect, useCallback } from "react";
import { AppDatePicker } from "@/components/AppDatePicker";
import { InputWithButton } from "@/components/AppInputWithButton";
import { AppTableUsers } from "@/components/AppTableUsers";

import { AddUserDialog } from "@/components/AppAddUserDialog";
import { usePagination } from "@/hooks/usePagination";

import { useCurrentUser } from "@/hooks/useAuth";
import { can } from "@/policies/permissions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { userService } from "@/services/userService";
import { EditUserDialog } from "@/components/AppEditUserDialog";
import type { User } from "@/types/user";

const MOCK_INITIAL_PAGE_SIZE = 10;

export default function UsersPage() {
  const { data: currentUser, isLoading: isAuthLoading } = useCurrentUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const pagination = usePagination({
    itemsPerPage: MOCK_INITIAL_PAGE_SIZE,
    totalItems: totalCount,
  });

  const handleUserAdded = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    pagination.goToPage(1);
  }, [pagination]);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await userService.getUsers();

      if (result.success && result.data) {
        setUsers(result.data); // ✅ já é User[]
        setTotalCount(result.data.length);
      } else {
        console.error("Erro ao carregar usuários:", result.error);
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers, refreshTrigger]);

  // Proteção de rota
  if (isAuthLoading) {
    return <div>Carregando perfil...</div>;
  }

  const canAccessPage = can(currentUser?.cargo, "users:manage");
  if (!canAccessPage) {
    redirect("/dashboard");
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleDeleteUser = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    pagination.goToPage(1);
  };

  const AddButton = (
    <Button
      size="lg"
      className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary-lobo)] whitespace-nowrap"
    >
      <Plus className="w-4 h-4 mr-2" />
      Adicionar
    </Button>
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppDatePicker />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Usuários
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-4">
        <InputWithButton
          onSearch={handleSearch}
          onAdd={() => {}}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          placeholder="Buscar usuários por nome ou email..."
          addDialog={
            <AddUserDialog trigger={AddButton} onUserAdded={handleUserAdded} />
          }
        />
      </div>

      <div className="bg-primary-foreground rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Carregando usuários...</span>
          </div>
        ) : (
          <>
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
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
            <EditUserDialog
              user={selectedUser}
              open={editOpen}
              onOpenChange={(v) => {
                setEditOpen(v);
                if (!v) setSelectedUser(null);
              }}
              onUserEdited={() => {
                setRefreshTrigger((prev) => prev + 1);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
