import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/useAuth";
import { can } from "@/policies/permissions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type TableActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  onView?: () => void;
};

export function TableActions({ onEdit, onDelete, onView }: TableActionsProps) {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return null;
  }
  const userRole = currentUser?.cargo;

  const canManageUsers = can(userRole, "users:manage");

  // visualizar geralmente é liberado para todos
  const canView = !!onView;

  const hasNoActions = !canView && !canManageUsers;

  // caso de acesso negado
  if (hasNoActions) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-gray-400 text-sm italic">Sem Ações</span>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white text-sm">
            <p>Ações de gerenciamento restritas ao Administrador</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // caso de acesso permitido
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </DropdownMenuItem>
        )}
        {canManageUsers && (
          <>
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
