"use client";

import { AppDatePicker } from "@/components/AppDatePicker";
import { InputWithButton } from "@/components/AppInputWithButton";
import { AppTableRelatorio } from "@/components/AppTableRelatorio";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateMockReports } from "@/mocks/audit";
import { generateMockusers } from "@/components/AppTableUsers";
import { useEffect, useState } from "react";
import { AuditLog } from "@/types/user";

const users = generateMockusers(8);
const reports = generateMockReports(12, users);

export default function AuditoriaPage() {
  const [reports, setReports] = useState<AuditLog[] | null>(null);

  useEffect(() => {
    const r = generateMockReports(12);
    setReports(r);
  }, []);

  if (!reports) return <div>Carregando registros...</div>;

  return (
    <div className="w-full space-y-4">
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppDatePicker />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Auditoria e Logs
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-col items center gap-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-64">
                Período
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hoje</DropdownMenuItem>
              <DropdownMenuItem>Ontem</DropdownMenuItem>
              <DropdownMenuItem>Ultimos 7 dias</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex-1">
            <InputWithButton />
          </div>
        </form>
      </div>

      <div className="bg-primary-foreground rounded-lg">
        <AppTableRelatorio reports={reports} />
      </div>
    </div>
  );
}
