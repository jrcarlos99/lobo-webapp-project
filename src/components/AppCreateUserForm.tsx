"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userService, NewUserData } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const schema = z.object({
  nomeCompleto: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  perfil: z.string().min(1, "Perfil é obrigatório"),
  regiao: z.string().min(1, "Região é obrigatória"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await userService.createUser(data as NewUserData);
      if (result.success) {
        alert("Usuário criado com sucesso!");
      } else {
        alert(result.error);
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao criar usuário");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Nome completo" {...register("nomeCompleto")} />
      {errors.nomeCompleto && (
        <p className="text-red-500">{errors.nomeCompleto.message}</p>
      )}

      <Input placeholder="E-mail" {...register("email")} />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Select onValueChange={(val) => setValue("perfil", val)}>
        <SelectTrigger>Selecione o perfil</SelectTrigger>
        <SelectContent>
          <SelectItem value="ADMIN">ADMIN</SelectItem>
          <SelectItem value="CHEFE">CHEFE</SelectItem>
          <SelectItem value="ANALISTA">ANALISTA</SelectItem>
        </SelectContent>
      </Select>
      {errors.perfil && <p className="text-red-500">{errors.perfil.message}</p>}

      <Select onValueChange={(val) => setValue("regiao", val)}>
        <SelectTrigger>Selecione a região</SelectTrigger>
        <SelectContent>
          <SelectItem value="RMR">RMR</SelectItem>
          <SelectItem value="SERTAO">SERTÃO</SelectItem>
          <SelectItem value="AGRESTE">AGRESTE</SelectItem>
        </SelectContent>
      </Select>
      {errors.regiao && <p className="text-red-500">{errors.regiao.message}</p>}

      <Input type="password" placeholder="Senha" {...register("senha")} />
      {errors.senha && <p className="text-red-500">{errors.senha.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        Criar Usuário
      </Button>
    </form>
  );
}
