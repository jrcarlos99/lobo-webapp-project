"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { schema, type FormValues } from "./schema";
import { uploadBase64, uploadFile } from "@/services/upload.service";
import { createOcorrencia } from "@/services/ocorrencia.service";
import { addAnexo } from "@/services/anexos.service";

import DetalhesOcorrenciaForm from "../../../../components/DetalhesOcorrenciaForm";
import LocalizacaoForm from "../../../../components/LocalizacaoForm";
import EquipeForm from "../../../../components/EquipeForm";
import UploadImagem from "../../../../components/UploadImagem";
import AssinaturaDigital from "../../../../components/AssinaturaDigital";
import ConfirmarCriacaoModal from "../../../../components/ConfirmarCriacaoModal";

import type SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";

export default function CriarOcorrenciaPage() {
  const router = useRouter();
  const signatureRef = useRef<SignatureCanvas | null>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const submit = async () => {
    try {
      const values = getValues();

      const ocorrencia = await createOcorrencia({
        titulo: values.tipo,
        descricao: values.descricao,
        regiao: values.regiao,
        tipo: values.tipo,
        status: "ABERTA",
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        solicitante: null,
        data_hora_abertura: new Date().toISOString(),
        cidade: values.cidade ?? null,
        data_hora_atualizacao: null,
        criado_por: null,
        atualizado_por: null,
        viatura_id: values.viatura_id ? Number(values.viatura_id) : null,
        equipe_id: values.equipe_id ? Number(values.equipe_id) : null,
      });

      // ✅ Upload da imagem da ocorrência
      if (imageFile) {
        const imageUrl = await uploadFile(
          "ocorrencia-anexos",
          `ocorrencia-${ocorrencia.id}.png`,
          imageFile
        );

        await addAnexo({
          ocorrencia_id: ocorrencia.id,
          url_anexo: imageUrl,
          tipo: "imagem",
        });
      }

      // ✅ Upload da assinatura (usando o preview)
      if (signaturePreview) {
        const assinaturaUrl = await uploadBase64(
          "ocorrencia-anexos",
          `assinatura-${ocorrencia.id}.png`,
          signaturePreview
        );

        await addAnexo({
          ocorrencia_id: ocorrencia.id,
          url_anexo: assinaturaUrl,
          tipo: "assinatura",
        });
      }

      // ✅ Feedback visual
      toast.success(
        `Ocorrência criada: ${values.tipo} em ${values.regiao} (ID ${ocorrencia.id})`
      );

      // ✅ Redirecionamento suave
      setTimeout(() => {
        router.push(`/ocorrencia/${ocorrencia.id}`);
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar ocorrência");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(() => setOpenConfirm(true))}>
        <DetalhesOcorrenciaForm register={register} errors={errors} />

        <LocalizacaoForm
          register={register}
          errors={errors}
          setValue={setValue}
        />

        <EquipeForm register={register} />
        <UploadImagem onSelect={setImageFile} />

        <AssinaturaDigital
          ref={signatureRef}
          onPreview={(data) => setSignaturePreview(data)}
        >
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar Ocorrência"}
          </Button>
        </AssinaturaDigital>
      </form>

      <ConfirmarCriacaoModal
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={submit}
      />
    </>
  );
}
