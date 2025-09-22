"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DrawerDialogDemo({ open, onOpenChange }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* Overlay com blur */}
        {open && (
          <div
            aria-hidden
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs -webkit-backdrop-filter: blur(4px);"
          />
        )}
        <DialogContent className="max-w-3xl w-full">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-center">
                Esqueceu sua senha?
              </DialogTitle>
              <div className="flex justify-center mt-3 mb-3">
                <Lock
                  color="#86222f"
                  className="w-12 h-12 text-muted-foreground "
                />
              </div>
              <DialogDescription className="text-center">
                Digite o e-mail cadastrado e enviaremos um link para que possa
                redefinir sua senha.
              </DialogDescription>
            </DialogHeader>
            <ProfileForm />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Esqueceu sua senha?</DrawerTitle>
          <div className="flex justify-center">
            <Lock color="#86222f" />
          </div>
          <DrawerDescription>
            Digite o e-mail cadastrado e enviaremos um link para que possa
            redefinir sua senha.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>

      <Button type="submit">Enviar link</Button>
    </form>
  );
}
