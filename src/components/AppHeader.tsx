"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function HeaderPage() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b border-border">
      {/* Logo */}
      <div className="flex items-center">
        <Image alt="LoboLogo" src="/lobo.svg" width={40} height={40} />
        <div className="font-bold text-lg ml-2">L.O.B.O</div>
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex flex-1 justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/inicio"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive("/inicio")
                      ? "text-[var(--color-button)] bg-[color-mix(in_oklch,var(--color-button)_10%,white)] border-b-2 border-[var(--color-button)]"
                      : "text-foreground hover:text-[var(--color-button)] hover:bg-[color-mix(in_oklch,var(--color-button)_5%,white)]"
                  )}
                >
                  Início
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/servicos"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive("/servicos")
                      ? "text-[var(--color-button)] bg-[color-mix(in_oklch,var(--color-button)_10%,white)] border-b-2 border-[var(--color-button)]"
                      : "text-foreground hover:text-[var(--color-button)] hover:bg-[color-mix(in_oklch,var(--color-button)_5%,white)]"
                  )}
                >
                  Serviços
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive("/about")
                      ? "text-[var(--color-button)] bg-[color-mix(in_oklch,var(--color-button)_10%,white)] border-b-2 border-[var(--color-button)]"
                      : "text-foreground hover:text-[var(--color-button)] hover:bg-[color-mix(in_oklch,var(--color-button)_5%,white)]"
                  )}
                >
                  Sobre Nós
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Botão Desktop */}
      <div className="hidden md:flex justify-end">
        <Button className="bg-[var(--color-button)] text-white hover:bg-[var(--color-button)]/90">
          <Link href="/contato">Contato</Link>
        </Button>
      </div>

      {/* Menu Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6">
            <nav className="flex flex-col gap-4 mt-4">
              <Link href="/inicio" className="text-lg font-medium">
                Início
              </Link>
              <Link href="/servicos" className="text-lg font-medium">
                Serviços
              </Link>
              <Link href="/about" className="text-lg font-medium">
                Sobre Nós
              </Link>
              <Link href="/contato" className="text-lg font-medium">
                Contato
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
