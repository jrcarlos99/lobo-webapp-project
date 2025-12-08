"use client";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type UploadImagemProps = {
  onSelect: (file: File | null) => void;
};

export default function UploadImagem({ onSelect }: UploadImagemProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onSelect(file);

    if (!file) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <section className="space-y-4">
      <Label>Imagem da Ocorrência</Label>
      <Input type="file" accept="image/*" onChange={handle} />

      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={200}
          height={200}
          className="rounded-md border object-cover"
        />
      )}
    </section>
  );
}
