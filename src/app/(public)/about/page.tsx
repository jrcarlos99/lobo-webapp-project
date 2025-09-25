import Image from "next/image";

const HEADER_HEIGHT = 69;

export default function AboutUsPage() {
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
          Eficiência Operacional
        </h1>

        <div className="space-y-6 mb-12">
          <div>
            <p className="text-2xl font-semibold mb-2">
              O L.O.B.O é uma plataforma interna do Corpo de Bombeiros Militar
              de Pernambuco(CBMPE) voltada para o registro e acompanhamento de
              ocorrências.
            </p>
            <p className="text-2xl font-semibold mb-2">
              Nosso objetivo é tornar os processos mais ágeis, precisos e
              seguros, oferecendo suporte confiável ás equipes e à
              administração. Com tecnologia moderna e protocolos de segurança,
              fortalecemos a eficiência operacional e a transparência nos
              registros instituicionais.
            </p>
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
