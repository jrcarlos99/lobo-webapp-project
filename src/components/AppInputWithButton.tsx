import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Plus, Search } from "lucide-react";

interface InputWithButtonProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  onSearch?: (term: string) => void;
  onAdd?: () => void;
  searchTerm?: string;
  onSearchTermChange?: (term: string) => void;
}

export function InputWithButton({
  className,
  placeholder = "Buscar usuários por nome ou email...",
  buttonText = "Adicionar",
  onSearch,
  onAdd,
  searchTerm = "",
  onSearchTermChange,
}: InputWithButtonProps) {
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={clsx("flex w-full items-center gap-3", className)}>
      <div className="flex-1 flex items-center gap-2">
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchTermChange?.(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSearch} variant="default" size="lg">
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
      </div>

      {/* Botão Adicionar */}
      <Button
        onClick={onAdd}
        size="lg"
        className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary-lobo)] whitespace-nowrap"
      >
        <Plus className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  );
}
