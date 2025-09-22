"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { DrawerDialogDemo } from "./AppLoginDialog";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [openForgot, setOpenForgot] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Container para centralizar o formulário */}
      <div className="flex-grow flex items-center">
        <form
          className={cn("flex flex-col gap-6 w-full", className)}
          {...props}
        >
          <h1 className="text-2xl font-bold text-center">Entre na sua conta</h1>

          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="fireman@cbpmpe.gov.br"
                required
                className="h-12"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                required
                className="h-12"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Lembre-se de mim
                </Label>
              </div>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenForgot(true);
                }}
                className="text-sm text-blue-600 underline-offset-4 hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>

            <Button type="submit" className="w-full h-12">
              Entrar
            </Button>
          </div>
        </form>
      </div>
      <DrawerDialogDemo open={openForgot} onOpenChange={setOpenForgot} />

      <footer className="text-center text-sm text-gray-500 py-4">
        <p>
          Ao se inscrever, você concorda com os Termos de Serviço e o Contrato
          de Processamento de Dados
        </p>
      </footer>
    </div>
  );
}
