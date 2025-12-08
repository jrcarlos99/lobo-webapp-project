import { supabase } from "@/lib/supabase";
import type { Equipe } from "@/types/equipe";

export async function getEquipes(): Promise<Equipe[]> {
  const { data, error } = await supabase
    .from("equipe")
    .select("id, nome, membros, status");

  if (error) throw error;
  return data as Equipe[];
}
