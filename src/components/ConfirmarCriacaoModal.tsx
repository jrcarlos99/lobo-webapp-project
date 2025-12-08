"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmarCriacaoModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmarCriacaoModal({
  open,
  onCancel,
  onConfirm,
}: ConfirmarCriacaoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar criação</DialogTitle>
        </DialogHeader>

        <p>Tem certeza que deseja criar esta ocorrência?</p>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
