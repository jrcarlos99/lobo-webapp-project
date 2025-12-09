import { getOcorrenciaById } from "@/services/ocorrencia.service";
import OcorrenciaClient from "./OcorrenciaClient";

export default async function OcorrenciaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ocorrencia = await getOcorrenciaById(id);

  return <OcorrenciaClient ocorrencia={ocorrencia} />;
}
