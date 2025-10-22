import Image from "next/image";

const HEADER_HEIGHT = 69;

export default function ServicosPage() {
  return (
    <main
      className="grid lg:grid-cols-2 bg-gradient-custom text-white"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Lado Esquerdo */}
      <div className="relative w-full h-full min-h-[400px] lg:min-h-0">
        <Image
          alt="Imagem dos bombeiros"
          src="/bombeiros.png"
          fill
          className="object-cover object-center-bottom"
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
