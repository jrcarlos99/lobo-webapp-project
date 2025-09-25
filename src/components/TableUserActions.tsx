import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type TableActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  onView?: () => void;
};

export function TableActions({ onEdit, onDelete, onView }: TableActionsProps) {
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
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit} className="text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // <div>
    //   <Button
    //     variant="ghost"
    //     size="icon"
    //     className="text-red-700 hover:text-red-900"
    //     onClick={onEdit}
    //   >
    //     <Pencil size={18} />
    //   </Button>

    //   <Button
    //     variant="ghost"
    //     size="icon"
    //     className="hover:text-red-900"
    //     onClick={onDelete}
    //   >
    //     <Trash scale={18} />
    //   </Button>
    // </div>
  );
}
