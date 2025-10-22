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

export default function HeaderPage() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="flex items-center p-4 bg-background border-b border-border">
      {/* Logo e Nome */}
      <div className="flex items-center">
        <Image alt="LoboLogo" src="/lobo.svg" width={50} height={10} />
        <div className="font-bold text-lg ml-2">L.O.B.O</div>
      </div>

      {/* Conteúdo do Meio - Menu de Navegação */}
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            {/* Início */}
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

            {/* Serviços */}
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

            {/* Sobre Nós */}
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

      {/* Botão Contato */}
      <div className="flex justify-end">
        <Button className="bg-[var(--color-button)] text-white hover:bg-[var(--color-button)]/90 text-white ">
          <Link href="/contato">Contato</Link>
        </Button>
      </div>
    </nav>
  );
}
