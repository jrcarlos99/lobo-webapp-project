"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { useCurrentUser } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const Navbar = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  console.log(currentUser);

  // Função para gerar iniciais do nome
  const getInitials = (name?: string) => {
    if (!name) return "US";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="p-4 flex items-center justify-between">
      {/* Left - Sidebar Trigger */}
      <SidebarTrigger />

      {/* Área do usuário - CENTRALIZADA */}
      <div className="flex-1 flex justify-center">
        <SidebarGroup className="border-b pb-4 mb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center gap-3 px-2 py-0.5">
                  {/* Avatar */}
                  <Avatar className="size-8 rounded-xl bg-muted flex items-center justify-center">
                    <AvatarImage
                      className="size-8 rounded-xl"
                      src={currentUser?.avatarUrl}
                      alt={`Avatar de ${currentUser?.nome || "Usuário"}`}
                    />
                    <AvatarFallback className="rounded-xl bg-muted text-sm font-medium">
                      {isLoading ? (
                        <Skeleton className="h-8 w-8 rounded-xl" />
                      ) : currentUser ? (
                        getInitials(currentUser.nome)
                      ) : (
                        "US"
                      )}
                    </AvatarFallback>
                  </Avatar>

                  {/* Informações do usuário */}
                  <div className="flex flex-col">
                    {isLoading ? (
                      <>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-24 mb-1" />
                        <Skeleton className="h-4 w-16" />
                      </>
                    ) : (
                      <>
                        <span className="font-semibold text-sm leading-none text-foreground">
                          {currentUser?.nome || "Usuário"}
                        </span>
                        <span className="text-xs text-muted-foreground leading-none mt-1">
                          {currentUser?.regiaoAutorizada &&
                          currentUser.regiaoAutorizada.trim() !== ""
                            ? currentUser.regiaoAutorizada
                            : currentUser?.cargo === "ADMIN"
                            ? "Todas as regiões"
                            : "Região não definida"}
                        </span>

                        {currentUser?.cargo && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full leading-none mt-1 w-fit"
                            style={{
                              backgroundColor: "var(--primary-lobo)",
                              color: "var(--primary-foreground)",
                            }}
                          >
                            {currentUser.cargo}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>

      {/* Right - Notificações */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="lg" className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notificações</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div className="p-2 rounded bg-muted">
              🔔 Nova ocorrência registrada
            </div>
            <div className="p-2 rounded bg-muted">📊 Relatório disponível</div>
            <div className="p-2 rounded bg-muted">
              ⚠️ Sistema em manutenção amanhã
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};
