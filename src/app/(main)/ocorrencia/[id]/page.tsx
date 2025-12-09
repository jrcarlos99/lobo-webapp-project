import { getOcorrenciaById } from "@/services/ocorrencia.service";
import OcorrenciaClient from "./OcorrenciaClient";

export default async function OcorrenciaPage({
  params,
}: {
  params: { id: string };
}) {
  const ocorrencia = await getOcorrenciaById(params.id);

  return <OcorrenciaClient ocorrencia={ocorrencia} />;
}
