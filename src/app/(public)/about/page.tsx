import Image from "next/image";

export default function AboutUsPage() {
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
