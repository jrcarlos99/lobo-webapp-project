"use client";

import { useEffect, useState } from "react";
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
import type { User } from "./AppTableUsers";

interface EditUserDialogProps {
  trigger?: React.ReactNode;
  user?: User | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUserEdited?: () => void;
}
type UserFormData = {
  status: "Ativo" | "Inativo";
  role: string;
  firstName: string;
  lastName: string;
  region: string;
  nip: string;
  password: string;
  email: string;
};

export function EditUserDialog({
  trigger,
  user = null,
  open: controlledOpen,
  onOpenChange,
  onUserEdited,
}: EditUserDialogProps) {
  const [openInternal, setOpenInternal] = useState(false);
  const isControlled = typeof controlledOpen === "boolean";
  const open = isControlled ? controlledOpen : openInternal;

  const setOpen = (v: boolean) => {
    if (isControlled) {
      onOpenChange?.(v);
    } else {
      setOpenInternal(v);
    }
  };
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

  useEffect(() => {
    if (user) {
      const fullname = user.nomeCompleto || "";
      const [firstName, ...lastNameParts] = fullname.split(" ");
      const lastName = lastNameParts.join(" ") || "";

      const rawStatus = String(user.status ?? "").toLowerCase();
      const statusMapped = ["inactive", "inativo", "inativo"].includes(
        rawStatus
      )
        ? "Inativo"
        : "Ativo";

      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        role: (user.cargo || "").toLowerCase() || "",
        region: (user.regiao || "").toLowerCase() || "",
        nip: user.nip ?? "",
        status: statusMapped,
        password: "",
      });
    } else {
      // limpa o form quando não há user selecionado
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        region: "",
        nip: "",
        status: "Ativo",
        password: "",
      });
    }

    setError(null);
  }, [user]);

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
        perfil:
          formData.role && formData.role.trim() !== ""
            ? formData.role.toUpperCase()
            : "ADMIN",
        regiao:
          formData.region && formData.region.trim() !== ""
            ? formData.region.toUpperCase()
            : "RMR",
        nip: formData.nip,
        senha: formData.password,
      };

      console.log("Enviando dados:", userData);

      let result;
      if (user && user.id) {
        result = await userService.updateUser(user.id, userData);
      } else {
        result = await userService.createUser(userData);
      }

      if (result.success) {
        console.log("Usuário editado com sucesso.");
        setOpen(false);
        onUserEdited?.();
      } else {
        setError(result.error || "Erro ao editar usuário.");
      }
    } catch (err) {
      console.error("Erro ao editar usuário:", err);
      setError("Erro ao editar usuário. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{user ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
          <DialogDescription>
            {user
              ? "Altere os dados abaixos e salve."
              : "Preencha os dados para criar um usuário."}
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
                  required
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
                  required
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
                <Label htmlFor="password">
                  Senha inicial {user ? "(opcional)" : "*"}{" "}
                </Label>
                <Input
                  type="password"
                  placeholder="Senha"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  required={!user}
                  minLength={user ? undefined : 6}
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
              {isLoading
                ? "Salvando..."
                : user
                ? "Salvar alterações"
                : "Criar novo Usuário"}
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
