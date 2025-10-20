"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function AppDatePicker({
  onChange,
}: {
  onChange?: (value: { dataInicio?: string; dataFim?: string }) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState("");

  const handleSelectAll = () => {
    setDate(undefined);
    setValue("Todas as datas");
    setOpen(false);
    // avisa o pai que não há filtro de data
    onChange?.({ dataInicio: undefined, dataFim: undefined });
  };

  const handleSelectDate = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      setValue(formatDate(date));
      onChange?.({
        dataInicio: start.toISOString(),
        dataFim: end.toISOString(),
      });
    } else {
      setValue("");
      onChange?.({ dataInicio: undefined, dataFim: undefined });
    }
    setOpen(false);
  };

  return (
    <div className="flex gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="Selecione uma data"
          className="pr-10 border-transparent"
          readOnly
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <div className="flex flex-col">
              {/* Botão para limpar filtro de data */}
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-sm"
                onClick={handleSelectAll}
              >
                Todas as datas
              </Button>
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={handleSelectDate}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
