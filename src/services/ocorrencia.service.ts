import { supabase } from "@/lib/supabase";
import type { Anexo, Occurrence, OccurrenceInsert } from "@/types/occurrence";

//  Criação de ocorrência
export async function createOcorrencia(data: OccurrenceInsert) {
  const { data: inserted, error } = await supabase
    .from("ocorrencia")
    .insert([data])
    .select()
    .single();

  if (error) throw error;

  return inserted as Occurrence;
}

// Busca de ocorrência + anexos
export async function getOcorrenciaById(
  id: number | string
): Promise<Occurrence & { anexos: Anexo[] }> {
  const { data: ocorrencia, error: errOcorrencia } = await supabase
    .from("ocorrencia")
    .select("*")
    .eq("id", id)
    .single();

  if (errOcorrencia) {
    console.error("Erro ao buscar ocorrência por ID", errOcorrencia);
    throw errOcorrencia;
  }

  const { data: anexos, error: errAnexos } = await supabase
    .from("ocorrencia_anexos")
    .select("*")
    .eq("ocorrencia_id", id);

  if (errAnexos) {
    console.error("Erro ao buscar anexos da ocorrência", errAnexos);
  }

  return {
    ...ocorrencia,
    anexos: anexos ?? [],
  };
}
