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

interface AddUserDialogProps {
  trigger?: React.ReactNode;
  onUserAdded?: () => void;
}
type UserFormData = {
  status: string;
  role: string;
  firstName: string;
  lastName: string;
  region: string;
  nip: string;
  password: string;
  email: string;
};

export function AddUserDialog({ trigger, onUserAdded }: AddUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    region: "",
    nip: "",
    status: "Ativo",
    password: "",
  });

  const handleInputChange =
    (field: keyof UserFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setError(null);
    };

  const handleSelectChange = (field: keyof UserFormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "status" ? (value as "Ativo" | "Inativo") : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // simular chamada à API
    try {
      const userData: NewUserData = {
        nomeCompleto: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        perfil: formData.role.toUpperCase(),
        regiao: formData.region.toUpperCase(),
        nip: formData.nip,
        senha: formData.password,
      };

      console.log("Enviando dados:", userData);

      const result = await userService.createUser(userData);

      if (result.success && result.data) {
        console.log("Usuário criado com sucesso.");
      }

      setOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        region: "",
        nip: "",
        status: "active",
        password: "",
      });

      if (onUserAdded) {
        onUserAdded();
      } else {
        setError(result.error || "Erro ao adicionar usuário.");
      }
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      setError("Erro ao adicionar usuário. Tente novamente.");
    } finally {
      setIsLoading(false);
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex-1 space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="firstName">Nome *</Label>
                <Input
                  type="text"
                  placeholder="FirstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                />
              </div>

              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="lastName">Sobrenome *</Label>
                <Input
                  type="text"
                  placeholder="LastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                />
              </div>

              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="number">Telefone</Label>
                <Input type="tel" placeholder="Telefone" id="number" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="nip">NIP *</Label>
                <Input
                  type="text"
                  placeholder="NIP"
                  id="nip"
                  inputMode="numeric"
                  maxLength={14}
                  onChange={handleInputChange("nip")}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="role">Função *</Label>
                <Select
                  defaultValue="admin"
                  value={formData.role}
                  onValueChange={handleSelectChange("role")}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="chefe">Chefe</SelectItem>
                    <SelectItem value="analista">Analista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="password">Senha inicial *</Label>
                <Input
                  type="password"
                  placeholder="Senha"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  required
                  minLength={6}
                />
              </div>
              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleSelectChange("status")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1 flex-1">
                <Label htmlFor="region">Região *</Label>
                <Select
                  defaultValue="rmr"
                  value={formData.region}
                  onValueChange={handleSelectChange("region")}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma região" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rmr">RMR</SelectItem>
                    <SelectItem value="agre">Agreste</SelectItem>
                    <SelectItem value="sert">Sertão</SelectItem>
                    <SelectItem value="zdmt">Zona da Mata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Salvar novo Usuário"}
            </Button>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isLoading}
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
