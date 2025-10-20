"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FormularioIncendio() {
  return (
    <Card className="border-2" style={{ borderColor: "var(--color-button)" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--color-button)]">
          Formulário de Incêndio
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/*  Identificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Identificação da Ocorrência</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pontoBase" className="mb-2 block">
                Ponto Base
              </Label>
              <Input id="pontoBase" placeholder="Ex: 5º GB – 1ª Cia" />
            </div>
            <div>
              <Label htmlFor="viatura" className="mb-2 block">
                Viatura Responsável
              </Label>
              <Input id="viatura" placeholder="Ex: ABT 3106" />
            </div>
            <div>
              <Label htmlFor="data" className="mb-2 block">
                Data
              </Label>
              <Input id="data" type="date" />
            </div>
          </div>
        </section>

        {/*  Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Label>Associado a Desastre?</Label>
            <div className="flex items-center gap-2">
              <Checkbox id="desastreSim" />
              <Label htmlFor="desastreSim">Sim</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="desastreNao" />
              <Label htmlFor="desastreNao">Não</Label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="codigoDesastre" className="mb-2 block">
                Código do Desastre
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="inline w-4 h-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Código conforme classificação brasileira de desastres.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input id="codigoDesastre" placeholder="Ex: 2.3.12" />
            </div>
            <div>
              <Label htmlFor="grupo" className="mb-2 block">
                Grupo/Subgrupo
              </Label>
              <Input id="grupo" placeholder="Ex: Incêndio em edificação" />
            </div>
          </div>
        </section>

        {/*  Local */}
        <section className="space-y-4">
          <h2 className="font-semibold">Local e Especificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endereco" className="mb-2 block">
                Endereço
              </Label>
              <Input id="endereco" placeholder="Rua, nº, bairro, cidade" />
            </div>
            <div>
              <Label htmlFor="tipoEdificacao" className="mb-2 block">
                Tipo de Edificação
              </Label>
              <Input
                id="tipoEdificacao"
                placeholder="Ex: Comercial, Residencial"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="agente" className="mb-2 block">
              Agente Causador
            </Label>
            <Input id="agente" placeholder="Ex: Instalação elétrica" />
          </div>
        </section>

        {/*  Recursos */}
        <section className="space-y-4">
          <h2 className="font-semibold">Recursos Utilizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agua" className="mb-2 block">
                Consumo de Água (litros)
              </Label>
              <Input id="agua" type="number" placeholder="Ex: 5000" />
            </div>
            <div>
              <Label htmlFor="espuma" className="mb-2 block">
                Consumo de Espuma (litros)
              </Label>
              <Input id="espuma" type="number" placeholder="Ex: 200" />
            </div>
          </div>
        </section>

        {/*  Danos */}
        <section className="space-y-4">
          <h2 className="font-semibold">Danos</h2>
          <div>
            <Label htmlFor="bens" className="mb-2 block">
              Bens Atingidos
            </Label>
            <Textarea
              id="bens"
              placeholder="Ex: Instalações elétricas, móveis"
            />
          </div>
        </section>

        {/*  Responsáveis */}
        <section className="space-y-4">
          <h2 className="font-semibold">Responsáveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="proprietario" className="mb-2 block">
                Proprietário
              </Label>
              <Input id="proprietario" placeholder="Nome completo" />
            </div>
            <div>
              <Label htmlFor="telefone" className="mb-2 block">
                Telefone
              </Label>
              <Input id="telefone" type="tel" placeholder="(81) 99999-9999" />
            </div>
            <div>
              <Label htmlFor="comandante" className="mb-2 block">
                Comandante da Operação
              </Label>
              <Input id="comandante" placeholder="Nome de guerra" />
            </div>
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--color-button)" }}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
