"use client";

import { Label } from "@/components/ui/label";
import { useEquipes } from "@/hooks/useEquipes";
import { useViaturas } from "@/hooks/useViaturas";
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../app/(main)/ocorrencia/new/schema";

type EquipeFormProps = {
  register: UseFormRegister<FormValues>;
};

export default function EquipeForm({ register }: EquipeFormProps) {
  const { equipes, loading: loadingEquipes } = useEquipes();
  const { viaturas, loading: loadingViaturas } = useViaturas();

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-muted-foreground">
        Equipe e Viatura
      </h2>

      <div className="grid grid-cols-12 gap-6">
        {/* VIATURA */}
        <div className="col-span-12 md:col-span-6">
          <Label>Viatura</Label>
          <select
            {...register("viatura_id")}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Selecione...</option>

            {loadingViaturas && <option>Carregando...</option>}

            {!loadingViaturas &&
              viaturas.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.tipo} — {v.status}
                </option>
              ))}
          </select>
        </div>

        {/* EQUIPE */}
        <div className="col-span-12 md:col-span-6">
          <Label>Equipe</Label>
          <select
            {...register("equipe_id")}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Selecione...</option>

            {loadingEquipes && <option>Carregando...</option>}

            {!loadingEquipes &&
              equipes.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nome} — {e.status}
                </option>
              ))}
          </select>
        </div>
      </div>
    </section>
  );
}
