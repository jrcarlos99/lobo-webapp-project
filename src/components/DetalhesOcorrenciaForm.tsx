"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormComponentProps } from "../types/form-types";

export default function DetalhesOcorrenciaForm({
  register,
  errors,
}: FormComponentProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-muted-foreground">
        Detalhes da Ocorrência
      </h2>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <Label>Tipo</Label>
          <select
            {...register("tipo")}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Selecione...</option>
            <option value="INCENDIO">Incêndio</option>
            <option value="ACIDENTE">Acidente</option>
            <option value="RESGATE">Resgate</option>
          </select>
          {errors.tipo && (
            <p className="text-sm text-red-500">
              {errors.tipo.message as string}
            </p>
          )}
        </div>

        <div className="col-span-12 md:col-span-6">
          <Label>Região</Label>
          <select
            {...register("regiao")}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Selecione...</option>
            <option value="RMR">RMR</option>
            <option value="SERTAO">Sertão</option>
            <option value="AGRE">Agreste</option>
          </select>
          {errors.regiao && (
            <p className="text-sm text-red-500">
              {errors.regiao.message as string}
            </p>
          )}
        </div>

        <div className="col-span-12">
          <Label>Descrição</Label>
          <Textarea {...register("descricao")} />
          {errors.descricao && (
            <p className="text-sm text-red-500">
              {errors.descricao.message as string}
            </p>
          )}
        </div>

        <div className="col-span-12">
          <Label>Endereço</Label>
          <Input {...register("endereco")} />
        </div>
      </div>
    </section>
  );
}
