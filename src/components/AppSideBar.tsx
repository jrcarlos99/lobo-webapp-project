"use client";

import { House, Settings, FileText, User, Folder, LogOut } from "lucide-react";

import { usePathname } from "next/navigation";
import { can } from "@/policies/permissions";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { LogoutForm } from "./AppLogoutDialog";
import { useCurrentUser } from "@/hooks/useAuth";
import { RestrictedSidebarLink } from "./RestrictedSidebarLink";

// Menu items.
const items = [
  {
    title: "Início",
    url: "/dashboard",
    icon: House,
  },
  {
    title: "Ocorrências",
    url: "/ocorrencia",
    icon: Folder,
  },
  {
    title: "Relatórios",
    url: "/relatorio",
    icon: FileText,
  },
  {
    title: "Auditoria/Logs",
    url: "/auditoria",
    icon: Folder,
  },
  {
    title: "Usuários",
    url: "/users",
    icon: User,
  },
];

export const AppSidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const userRole = currentUser?.cargo;

  const canAccessSettings = true;
  const isSettingsLinkDisabled = false;
  const settingsTooltipMessage = undefined;

  // Determina permissão
  const canManageUsers = can(userRole, "users:manage");

  // Define o estado de desabilitado para o link de usuários
  const isUsersLinkDisabled = !canManageUsers;

  // Define a mensagemda tooltip
  const usersTooltipMessage = isUsersLinkDisabled
    ? "Apenas administradores têm acesso à gestão de usuários."
    : undefined;

  // Logica para Auditoria/Logs
  const canAccessLogs = can(userRole, "occurrence:all");

  const isLogsLinkDisabled = !canAccessLogs;
  const logsTooltipMessage = isLogsLinkDisabled
    ? "Seu perfil não possui permissão para visualizar os logs de auditoria."
    : undefined;

  const pathname = usePathname();
  const isMobile = useIsMobile();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const isSettingsActive = pathname === "/configuracao";

  const HEADER_HEIGHT = 0;

  return (
    <div
      className="lg:sticky lg:top-0 lg:block"
      style={{
        top: `${HEADER_HEIGHT}px`,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        overflow: "auto",
      }}
    >
      <Sidebar collapsible={isMobile ? "icon" : "none"}>
        <SidebarHeader className="flex items-center justify-center">
          <SidebarMenu>
            <Link href="/">
              <Image src="/lobo.svg" alt="logo" width={70} height={40} />
            </Link>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-3">
                {items.map((item) => {
                  let linkProps = {};

                  if (item.title === "Usuários") {
                    linkProps = {
                      disabled: isUsersLinkDisabled,
                      tooltipMessage: usersTooltipMessage,
                    };
                  } else if (item.title === "Auditoria/Logs") {
                    linkProps = {
                      disabled: isLogsLinkDisabled,
                      tooltipMessage: logsTooltipMessage,
                    };
                  }
                  return (
                    <SidebarMenuItem key={item.title}>
                      <RestrictedSidebarLink
                        item={item}
                        pathname={pathname}
                        {...linkProps}
                      />
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="pt-4 border-t">
          <SidebarMenu className="gap-4">
            {/* Botão de Settings */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isSettingsActive}
                className="flex-col h-16 justify-center gap-1 px-2 py-1 "
              >
                <Link
                  href="/configuracao"
                  className={`
              flex flex-col items-center 
              ${
                pathname === "/configuracao"
                  ? "text-[var(--color-primary)]"
                  : ""
              }
              hover:text-[var(--color-primary)] 
              focus:text-[var(--color-primary)]
            `}
                >
                  <Settings size={20} />
                  <span className="text-xs">Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Botão de Sair */}
            <SidebarMenuItem>
              <Dialog
                open={isLogoutDialogOpen}
                onOpenChange={setIsLogoutDialogOpen}
              >
                <SidebarMenuButton
                  asChild
                  isActive={isSettingsActive}
                  className="flex-col h-16 justify-center gap-1 px-2 py-1"
                >
                  <DialogTrigger asChild>
                    <div
                      className={`
                    flex flex-col items-center 
                    ${pathname === "/exit" ? "text-[var(--color-primary)]" : ""}
                    hover:text-[var(--color-primary)] 
                    focus:text-[var(--color-primary)]
                    `}
                    >
                      <LogOut size={20} />
                      <span className="text-xs">Sair</span>
                    </div>
                  </DialogTrigger>
                </SidebarMenuButton>

                <LogoutForm
                  isOpen={isLogoutDialogOpen}
                  onClose={() => setIsLogoutDialogOpen(false)}
                />
              </Dialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};
