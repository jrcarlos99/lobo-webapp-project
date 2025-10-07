"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { DrawerDialogDemo } from "./AppLoginDialog";
import Image from "next/image";

import { useLogin } from "@/hooks/useAuth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [openForgot, setOpenForgot] = useState(false);
  const [error, setError] = useState<string>("");

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;

    console.log("Tentando login com:", { email });

    try {
      await loginMutation.mutateAsync({ email, senha });
    } catch (err: unknown) {
      let errorMessage = "Erro ao fazer login";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = (err as { message: string }).message;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Container para centralizar o formulário */}
      <div className="flex-grow flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className={cn("flex flex-col gap-6 w-full max-w-md", className)}
          {...props}
        >
          <Image
            alt=""
            src="/lobo.svg"
            height={100}
            width={145}
            className="mx-auto translate-x-1"
          />
          <h1 className="text-2xl font-bold text-center">Entre na sua conta</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="border rounded-lg p-8">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
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
                  name="senha"
                  type="password"
                  placeholder="*******"
                  required
                  className="h-12"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6">
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
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12"
              disabled={loginMutation.isPending}
            >
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
