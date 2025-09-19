import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Plus } from "lucide-react";

type Props = {
  className?: string;
  placeholder?: string;
  buttonText?: string;
};

export function InputWithButton({
  className,
  placeholder = "Buscar",
  buttonText = "Adicionar",
}: Props) {
  return (
    <div className={clsx("flex w-full items-center gap-2", className)}>
      <Input type="search" placeholder={placeholder} className="flex-1" />
      <Button
        type="submit"
        className="w-64 bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary-lobo)]"
      >
        <Plus />
        {buttonText}
      </Button>
    </div>
  );
}
