"use client";

import { useState } from "react";
import Image from "next/image";
import type { Anexo, Occurrence } from "@/types/occurrence";

type Props = {
  ocorrencia: Occurrence & { anexos: Anexo[] };
};

export default function OcorrenciaClient({ ocorrencia }: Props) {
  const [erro] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Ocorrência #{ocorrencia.id}</h1>

      <div className="space-y-2">
        <p>
          <strong>Tipo:</strong> {ocorrencia.tipo}
        </p>
        <p>
          <strong>Região:</strong> {ocorrencia.regiao}
        </p>
        <p>
          <strong>Cidade:</strong> {ocorrencia.cidade ?? "Não informada"}
        </p>
        <p>
          <strong>Status:</strong> {ocorrencia.status}
        </p>
        <p>
          <strong>Descrição:</strong> {ocorrencia.descricao}
        </p>
        <p>
          <strong>Latitude:</strong> {ocorrencia.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {ocorrencia.longitude}
        </p>
      </div>

      <h2 className="text-lg font-semibold mt-4">Anexos</h2>

      <div className="flex gap-4 flex-wrap">
        {ocorrencia.anexos?.map((a: Anexo) => (
          <Image
            key={a.ocorrencia_id}
            src={a.url_anexo}
            alt="Anexo da ocorrência"
            width={160}
            height={160}
            className="object-cover border rounded"
          />
        ))}
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
      </div>
    </div>
  );
}
