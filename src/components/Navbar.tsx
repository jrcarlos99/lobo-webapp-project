"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { useCurrentUser, useLogout } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

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
                  {/* Avatar + Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          className="size-8 rounded-xl"
                          src={currentUser?.avatarUrl}
                          alt={`Avatar de ${currentUser?.nome || "Usuário"}`}
                        />
                        <AvatarFallback className="rounded-xl bg-muted">
                          {isLoading ? (
                            <Skeleton className="h-8 w-8 rounded-xl" />
                          ) : currentUser ? (
                            getInitials(currentUser.nome)
                          ) : (
                            "US"
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        {currentUser?.nome || "Usuário"}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
                          {currentUser?.regiaoAutorizada ||
                            "Região não definida"}
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Badge
            asChild
            variant="outline"
            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-num"
          >
            <Bell />
          </Badge>
        </Button>
      </div>
    </nav>
  );
};
