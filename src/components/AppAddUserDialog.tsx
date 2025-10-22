"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userService, NewUserData } from "@/services/userService";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddUserDialogProps {
  trigger?: React.ReactNode;
  onUserAdded?: () => void;
}

//  Schema de validação com Zod
const schema = z.object({
  firstName: z.string().min(2, "Nome é obrigatório"),
  lastName: z.string().min(2, "Sobrenome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  role: z.string().min(1, "Função é obrigatória"),
  region: z.string().min(1, "Região é obrigatória"),
  nip: z.string().min(3, "NIP é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  status: z.enum(["Ativo", "Inativo"]),
});

type FormData = z.infer<typeof schema>;

export function AddUserDialog({ trigger, onUserAdded }: AddUserDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      region: "",
      nip: "",
      password: "",
      status: "Ativo",
    },
  });

  const onSubmit = async (data: FormData) => {
    const userData: NewUserData = {
      nomeCompleto: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      perfil: data.role.toUpperCase(),
      regiao: data.region.toUpperCase(),
      nip: data.nip,
      senha: data.password,
    };

    const result = await userService.createUser(userData);

    if (result.success) {
      if (onUserAdded) onUserAdded();
      reset();
      setOpen(false);
    } else {
      alert(result.error || "Erro ao adicionar usuário.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para adicionar um novo usuário.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Label>Nome *</Label>
              <Input {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Label>Sobrenome *</Label>
              <Input {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Label>Email *</Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Label>NIP *</Label>
              <Input {...register("nip")} />
              {errors.nip && (
                <p className="text-red-500 text-sm">{errors.nip.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Label>Função *</Label>
              <Select onValueChange={(val) => setValue("role", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="CHEFE">Chefe</SelectItem>
                  <SelectItem value="ANALISTA">Analista</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <Label>Região *</Label>
              <Select onValueChange={(val) => setValue("region", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RMR">RMR</SelectItem>
                  <SelectItem value="AGRESTE">Agreste</SelectItem>
                  <SelectItem value="SERTAO">Sertão</SelectItem>
                  <SelectItem value="ZONA_MATA">Zona da Mata</SelectItem>
                </SelectContent>
              </Select>
              {errors.region && (
                <p className="text-red-500 text-sm">{errors.region.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Label>Senha inicial *</Label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Label>Status *</Label>
              <Select
                onValueChange={(val) =>
                  setValue("status", val as "Ativo" | "Inativo")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Salvar novo Usuário"}
            </Button>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="bg-red-100 text-[var(--color-primary)] hover:bg[var(--color-primary)] hover:text-white"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
