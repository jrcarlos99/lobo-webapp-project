"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import type { FormComponentProps } from "@/types/form-types";
import type { UseFormSetValue } from "react-hook-form";
import type { FormValues } from "@/app/(main)/ocorrencia/new/schema";

type LocalizacaoFormProps = FormComponentProps & {
  setValue: UseFormSetValue<FormValues>;
};

export default function LocalizacaoForm({
  register,
  errors,
  setValue,
}: LocalizacaoFormProps) {
  const [cidadeDetectada, setCidadeDetectada] = useState<string | null>(null);

  const handleGeolocalizacao = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocalização não suportada pelo navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setValue("latitude", latitude.toString());
        setValue("longitude", longitude.toString());

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const cidade =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.municipality ||
            data.address?.county ||
            data.address?.suburb ||
            data.address?.state_district ||
            null;

          if (cidade) {
            setCidadeDetectada(cidade);
            setValue("cidade", cidade);
            toast.success(`Localização detectada: ${cidade}`);
          } else {
            toast.warning("Coordenadas capturadas, mas cidade não encontrada");
          }
        } catch {
          toast.error("Erro ao buscar cidade pela coordenada");
        }
      },
      () => {
        toast.error("Não foi possível obter sua localização");
      }
    );
  };

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-muted-foreground">
        Localização
      </h2>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <Label>Latitude</Label>
          <Input {...register("latitude")} />
          {errors.latitude && (
            <p className="text-sm text-red-500">
              {errors.latitude.message as string}
            </p>
          )}
        </div>

        <div className="col-span-12 md:col-span-6">
          <Label>Longitude</Label>
          <Input {...register("longitude")} />
          {errors.longitude && (
            <p className="text-sm text-red-500">
              {errors.longitude.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleGeolocalizacao}>
          Usar minha localização
        </Button>
      </div>

      {cidadeDetectada && (
        <p className="text-sm text-muted-foreground">
          Cidade detectada: <strong>{cidadeDetectada}</strong>
        </p>
      )}
    </section>
  );
}
