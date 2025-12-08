"use client";

import SignatureCanvas from "react-signature-canvas";
import { forwardRef, useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type AssinaturaDigitalProps = {
  className?: string;
  children?: ReactNode;
  onPreview?: (data: string | null) => void;
};

const AssinaturaDigital = forwardRef<SignatureCanvas, AssinaturaDigitalProps>(
  ({ className, children, onPreview }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);

    const getPad = () => {
      const sig = ref as React.RefObject<SignatureCanvas>;
      return sig.current;
    };

    const handlePreview = () => {
      const pad = getPad();
      if (!pad) return;

      const dataUrl = pad.getTrimmedCanvas().toDataURL("image/png");
      setPreview(dataUrl);

      if (onPreview) onPreview(dataUrl);
    };

    const handleUndo = () => {
      const pad = getPad();
      if (!pad) return;

      const data = pad.getSignaturePad().toData();
      if (data.length === 0) return;

      data.pop();
      pad.getSignaturePad().fromData(data);
    };

    const handleClear = () => {
      const pad = getPad();
      if (!pad) return;

      pad.clear();
      setPreview(null);
    };

    return (
      <section className={`space-y-4 ${className ?? ""}`}>
        <h2 className="text-sm font-semibold text-muted-foreground">
          Assinatura
        </h2>

        <SignatureCanvas
          ref={ref}
          penColor="black"
          canvasProps={{
            width: 600,
            height: 200,
            className: "border rounded-md bg-white",
          }}
        />

        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={handleUndo}>
              Desfazer último traço
            </Button>

            <Button type="button" variant="outline" onClick={handleClear}>
              Limpar
            </Button>

            <Button type="button" onClick={handlePreview}>
              Gerar Preview
            </Button>
          </div>

          {children}
        </div>

        {preview && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Preview:</p>
            <Image
              src={preview}
              alt="Preview da assinatura"
              width={300}
              height={150}
              className="border rounded-md object-contain bg-white"
            />
          </div>
        )}
      </section>
    );
  }
);

AssinaturaDigital.displayName = "AssinaturaDigital";

export default AssinaturaDigital;
