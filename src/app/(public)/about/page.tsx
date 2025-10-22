import Image from "next/image";

const HEADER_HEIGHT = 69;

export default function AboutUsPage() {
  return (
    <main
      className="grid lg:grid-cols-2 bg-gradient-custom text-white"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Lado Esquerdo - Imagem dos Bombeiros */}
      <div className="relative w-full h-full min-h-[400px] lg:min-h-0">
        <Image
          alt="Imagem dos bombeiros"
          src="/bombeiros.png"
          fill
          className="object-cover object-center-bottom"
          priority
        />
      </div>

      {/* Lado Direito - Conteúdo */}
      <div className="p-8 lg:p-16 flex flex-col justify-center overflow-auto">
        <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">
          Eficiência Operacional
        </h1>

        <div className="space-y-6 mb-12">
          <div>
            <p className="text-2xl font-semibold mb-2">
              O L.O.B.O é uma plataforma interna do Corpo de Bombeiros Militar
              de Pernambuco (CBMPE) voltada para o registro e acompanhamento de
              ocorrências.
            </p>
            <p className="text-2xl font-semibold mb-2">
              Nosso objetivo é tornar os processos mais ágeis, precisos e
              seguros, oferecendo suporte confiável às equipes e à
              administração. Com tecnologia moderna e protocolos de segurança,
              fortalecemos a eficiência operacional e a transparência nos
              registros institucionais.
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
