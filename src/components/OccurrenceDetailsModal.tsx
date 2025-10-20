"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Occurrence } from "@/types/occurrence";

interface Props {
  occurrence: Occurrence | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OccurrenceDetailsModal({
  occurrence,
  open,
  onOpenChange,
}: Props) {
  if (!occurrence) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{occurrence.titulo}</DialogTitle>
          <DialogDescription>Detalhes da ocorrência</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            <strong>Cidade:</strong> {occurrence.cidade}
          </p>
          <p>
            <strong>Região:</strong> {occurrence.regiao}
          </p>
          <p>
            <strong>Tipo:</strong> {occurrence.tipo}
          </p>
          <p>
            <strong>Status:</strong> {occurrence.status}
          </p>
          <p>
            <strong>Abertura:</strong>{" "}
            {new Date(occurrence.dataHoraAbertura!).toLocaleString("pt-BR")}
          </p>

          {occurrence.descricao && (
            <div>
              <strong>Descrição:</strong>
              <p>{occurrence.descricao}</p>
            </div>
          )}

          {occurrence.latitude && occurrence.longitude && (
            <div>
              <strong>Localização:</strong>
              <iframe
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${occurrence.latitude},${occurrence.longitude}&hl=pt&z=15&output=embed`}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
