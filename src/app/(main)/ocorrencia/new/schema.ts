import { z } from "zod";

export const schema = z.object({
  tipo: z.string().min(1, "Informe o tipo"),
  regiao: z.string().min(1, "Informe a região"),
  descricao: z.string().min(1, "Informe a descrição"),
  endereco: z.string().optional(),
  cidade: z.string().min(1, "Informe a cidade"),
  latitude: z.string().min(1, "Informe a latitude"),
  longitude: z.string().min(1, "Informe a longitude"),
  viatura_id: z.string().optional(),
  equipe_id: z.string().optional(),
});

export type FormValues = z.infer<typeof schema>;
