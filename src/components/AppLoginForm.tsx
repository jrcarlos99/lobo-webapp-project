"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { DrawerDialogDemo } from "./AppLoginDialog";
import Image from "next/image";

import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [openForgot, setOpenForgot] = useState(false);

  const router = useRouter();
  const login = useLogin();

  const onSubmit = async (values: { email: string; senha: string }) => {
    try {
      await login.mutateAsync(values);
      router.push("/dashboard");
    } catch (err: unknown) {
      let errorMessage = "Erro desconhecido ao logar";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = (err as { message: string }).message;
      }
      alert(errorMessage);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Container para centralizar o formulário */}
      <div className="flex-grow flex items-center justify-center p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            onSubmit({
              email: fd.get("email") as string,
              senha: fd.get("senha") as string,
            });
          }}
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
