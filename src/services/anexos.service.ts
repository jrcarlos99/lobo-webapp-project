import { supabase } from "@/lib/supabase";
import type { AnexoInsert } from "@/types/occurrence";

export async function addAnexo(anexo: AnexoInsert) {
  const { error } = await supabase.from("ocorrencia_anexos").insert([anexo]);

  if (error) throw error;
}
