"use client";

import { useEffect, useState } from "react";
import { getOcorrenciaById } from "@/services/ocorrencia.service";
import Image from "next/image";
import type { Anexo, AnexoInsert, Occurrence } from "@/types/occurrence";

type OcorrenciaPageProps = {
  params: {
    id: string;
  };
};

// se quiser, depois você pode tipar melhor isso
type OcorrenciaComAnexos = Occurrence & { anexos: Anexo[] };

export default function OcorrenciaPage({ params }: OcorrenciaPageProps) {
  const [ocorrencia, setOcorrencia] = useState<OcorrenciaComAnexos | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await getOcorrenciaById(params.id);
        setOcorrencia(data);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar ocorrência");
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Carregando ocorrência...</h1>
      </div>
    );
  }

  if (erro || !ocorrencia) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Ocorrência não encontrada</h1>
        {erro && <p className="text-sm text-red-500">{erro}</p>}
      </div>
    );
  }

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
        {ocorrencia.anexos?.map((a: AnexoInsert) => (
          <Image
            key={a.ocorrencia_id}
            src={a.url_anexo}
            alt="Anexo da ocorrência"
            width={160}
            height={160}
            className="object-cover border rounded"
          />
        ))}
      </div>
    </div>
  );
}
