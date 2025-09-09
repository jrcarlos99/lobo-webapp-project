import { AppDatePicker } from "@/components/AppDatePicker";
import { AppFilter } from "@/components/AppFilter";
import { AppTable } from "@/components/AppTable";

import { Button } from "@/components/ui/button";

export default function RelatorioPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <AppDatePicker />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Relatórios
        </span>
      </div>

      <div className="flex flex-row-reverse bg-primary-foreground p-4 rounded-2xl ">
        <Button
          className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover) w-full sm:w-auto px-6 h-12"
          variant={"destructive"}
        >
          Gerar Relatório
        </Button>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg col-span-2">
        <AppFilter />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg col-span-2">
        <AppTable />
      </div>
    </div>
  );
}
