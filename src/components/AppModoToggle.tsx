"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ThemeRadioGroup() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <RadioGroup
      value={theme}
      onValueChange={setTheme}
      className="flex space-x-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="light" id="light" />
        <Label htmlFor="light">Claro</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="dark" id="dark" />
        <Label htmlFor="dark">Escuro</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="system" id="system" />
        <Label htmlFor="dark">Sistema</Label>
      </div>
    </RadioGroup>
  );
}
