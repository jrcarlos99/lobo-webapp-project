import { Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";

type TableActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export function TableActions({ onEdit, onDelete }: TableActionsProps) {
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-700 hover:text-red-900"
        onClick={onEdit}
      >
        <Pencil size={18} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="hover:text-red-900"
        onClick={onDelete}
      >
        <Trash scale={18} />
      </Button>
    </div>
  );
}
