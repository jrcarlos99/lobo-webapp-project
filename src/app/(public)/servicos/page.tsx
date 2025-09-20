import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function ServicosPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2 bg-gradient-custom text-white">
      {/* Lado Esquerdo */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-8 overflow-auto">
        <Image
          alt="Imagem dos bombeiros"
          src="/bombeiros.svg"
          width={800}
          height={715}
          className="w-full max-w-[800px] h-auto"
          priority
        />
      </div>

      {/* Lado Direito */}
      <div className="p-8 lg:p-16 flex flex-col justify-center overflow-auto">
        <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">
          Nosso Serviços
        </h1>

        <div className="space-y-6 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              O L.O.B.O gerencia ocorrências do Corpo de Bombeiros, oferecendo
              suporte em atendimento pré-hospitalar, apoio a órgãos públicos,
              acidentes de trânsito, incêndios, salvamento de animais, produtos
              perigosos, ocorrências ambientais e diversos tipos de salvamentos.
            </h2>
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
