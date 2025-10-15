"use client";

import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Pencil, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

interface EditableAvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
  onImageChange: (file: File) => Promise<void>;
  isUploading?: boolean;
}

export function EditableAvatar({
  src,
  alt,
  fallback,
  className,
  onImageChange,
  isUploading = false,
}: EditableAvatarProps) {
  const [preview, setPreview] = useState<string | undefined>(src);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione um arquivo de imagem válido.");
        return;
      }

      // validar tamanho do arquivo (max 5mb)
      if (file.size > 5 * 1024 * 1024) {
        alert("O arquivo é muito grande. O tamanho máximo é 5MB.");
        return;
      }

      // criar preview temporário
      const objecturl = URL.createObjectURL(file);
      setPreview(objecturl);
      try {
        await onImageChange(file);
      } catch (error) {
        setPreview(src);
        console.error("Erro ao carregar a imagem: ", error);
      }
    }
  };
  return (
    <div>
      <Avatar
        className={cn(
          "h-24 w-24 cursor-pointer border-2 border-gray-200 transition-opacity",
          className,
          isUploading && "opacity-50"
        )}
        onClick={handleClick}
      >
        <AvatarImage src={preview} alt={alt} />
        <AvatarFallback className="text-lg font-semibold">
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            fallback
          )}
        </AvatarFallback>
      </Avatar>
      {!isUploading && (
        <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5 border-2 border-white cursor-pointer">
          <Pencil className="h-3 w-3 text-white" />
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
}
