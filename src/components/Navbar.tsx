"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  LogOut,
  Moon,
  Settings,
  SquareMenu,
  Sun,
  User,
  User2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";

export const Navbar = () => {
  const { setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="p-4 flex items-center justify-between">
      {/* Left */}
      <SidebarTrigger />
      {/* <Button variant={"outline"} onClick={toggleSidebar}>
        Custom button
      </Button> */}
      {/* Área do usuário */}
      <SidebarGroup className="border-b pb-4 mb-4">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col px-2 py-0.5">
                <div className="flex items-center gap-1 mb-1">
                  <Avatar>
                    <AvatarImage
                      className="size-8 rounded-xl"
                      src="https://avatars.githubusercontent.com/u/1486366"
                      alt="@l.o.b.o"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <span className="font-semibold text-sm">João Carlos</span>
                <span className="text-xs text-muted-foreground">
                  Admin - Zona da Mata
                </span>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      {/* Right */}
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
