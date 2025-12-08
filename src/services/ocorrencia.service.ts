import { supabase } from "@/lib/supabase";
import type { OccurrenceInsert } from "@/types/occurrence";

export async function createOcorrencia(data: OccurrenceInsert) {
  const { data: inserted, error } = await supabase
    .from("ocorrencia")
    .insert([data])
    .select()
    .single();

  if (error) throw error;

  return inserted;
}
export async function getOcorrenciaById(id: number | string) {
  const { data, error } = await supabase
    .from("ocorrencias")
    .select("*, anexos(*)") // se não tiver relação anexos, pode remover isso
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro ao buscar ocorrência por ID", error);
    throw error;
  }

  return data;
}
