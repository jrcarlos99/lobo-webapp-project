import { supabase } from "@/lib/supabase";
import type { Viatura } from "@/types/viatura";

export async function getViaturas(): Promise<Viatura[]> {
  const { data, error } = await supabase
    .from("viatura")
    .select("id, tipo, descricao, status");

  if (error) throw error;
  return data as Viatura[];
}
