import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const HEADER_HEIGHT = 69;

export default function ContatosPage() {
  return (
    <main
      className="grid lg:grid-cols-2 bg-gradient-custom text-white"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Lado Esquerdo */}
      <div className="flex items-center justify-center p-8 lg:p-8 overflow-auto min-h-0">
        <div
          className="w-full flex items-center justify-center"
          style={{ maxHeight: `(100vh - ${HEADER_HEIGHT}px)` }}
        >
          <Image
            alt="Imagem dos bombeiros"
            src="/bombeiros.svg"
            width={800}
            height={715}
            className="w-auto h-auto max-w-full max-h-[calc(100vh - 69px)]"
            priority
          />
        </div>
      </div>

      {/* Lado Direito */}
      <div className="p-8 lg:p-16 flex flex-col justify-center overflow-auto">
        <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">
          Fale Conosco
        </h1>

        <div className="space-y-6 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Emergência bombeiros:{" "}
              <span className="text-red-400">LIGUE 193</span>
            </h2>
            <Separator className="my-4 bg-gray-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">E-mail: sac@LOBO.pe.br</h2>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Telefone: 4002-8922</h2>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <Image
            alt="Logo do CBMPE"
            src="/logo_cbmpe.svg"
            width={150}
            height={150}
            className="w-[150px] h-[150px] object-contain"
          />
          <Image
            alt="Logo do LOBO"
            src="/lobo.svg"
            width={260}
            height={178}
            className="w-[260px] h-[178px] object-contain"
          />
        </div>
      </div>
    </main>
  );
}
