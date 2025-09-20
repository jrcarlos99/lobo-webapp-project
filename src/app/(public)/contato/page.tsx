import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function ContatosPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2 bg-gradient-custom text-white">
      {/* Lado Esquerdo */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-8 overflow-auto">
        <div className="w-full max-w-[800px] h-auto">
          <Image
            alt="Imagem dos bombeiros"
            src="/bombeiros.svg"
            width={800}
            height={715}
            className="w-full h-auto max-h-[60vh] lg:max-h-[80vh]"
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

        <div className="grid lg:grid-cols-2 gap-6 mt-12">
          <Image
            alt="Logo do CBMPE"
            src="/logo_cbmpe.svg"
            width={150}
            height={150}
            className="mx-auto"
          />
          <Image
            alt="Logo do LOBO"
            src="/lobo.svg"
            width={200}
            height={150}
            className="mx-auto "
          />
        </div>
      </div>
    </main>
  );
}
