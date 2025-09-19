"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeaderPage() {
  return (
    <nav className="flex items-center p-4 bg-background border-b border-border">
      {/* Nav da Esquerda */}
      <Image alt="LoboLogo" src="/lobo.svg" width={50} height={10} />
      <div className="font-bold text-lg ">L.O.B.O</div>

      {/* Conteúdo do Meio */}
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          {/* Inicio */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/inicio">Início</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* Serviços */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/services">Serviços</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* Sobre Nós */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about">Sobre Nós</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Button Contato */}
      <div className="flex justify-end rounded-full">
        <Button variant={"destructive"}>Contato</Button>
      </div>
    </nav>
  );
}
