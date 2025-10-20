"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FormularioAPH() {
  return (
    <Card className="border-2" style={{ borderColor: "var(--chart-2)" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--chart-2)]">
          Formulário de Atendimento Pré-Hospitalar
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* 1. Identificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Identificação da Ocorrência</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pontoBase" className="mb-2 block">
                Ponto Base
              </Label>
              <Input id="pontoBase" placeholder="Ex: GBAPH – 1º SBPH" />
            </div>
            <div>
              <Label htmlFor="viatura" className="mb-2 block">
                Viatura
              </Label>
              <Input id="viatura" placeholder="Ex: ABS 1234" />
            </div>
            <div>
              <Label htmlFor="data" className="mb-2 block">
                Data
              </Label>
              <Input id="data" type="date" />
            </div>
          </div>
        </section>

        {/* 2. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="grupo" className="mb-2 block">
                Grupo
              </Label>
              <Input id="grupo" placeholder="Ex: GRUPO 01" />
            </div>
            <div>
              <Label htmlFor="subgrupo" className="mb-2 block">
                Subgrupo
              </Label>
              <Input id="subgrupo" placeholder="Ex: SUBGRUPO 02" />
            </div>
            <div>
              <Label htmlFor="tipoEvento" className="mb-2 block">
                Tipo de Evento
              </Label>
              <Input id="tipoEvento" placeholder="Ex: Acidente de trânsito" />
            </div>
          </div>
        </section>

        {/* 3. Dados da Vítima */}
        <section className="space-y-4">
          <h2 className="font-semibold">Dados da Vítima</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome" className="mb-2 block">
                Nome
              </Label>
              <Input id="nome" placeholder="Nome completo" />
            </div>
            <div>
              <Label htmlFor="cpf" className="mb-2 block">
                RG/CPF
              </Label>
              <Input id="cpf" placeholder="000.000.000-00" />
            </div>
            <div>
              <Label htmlFor="idade" className="mb-2 block">
                Idade
              </Label>
              <Input id="idade" type="number" placeholder="Ex: 35" />
            </div>
            <div>
              <Label htmlFor="sexo" className="mb-2 block">
                Sexo
              </Label>
              <Input id="sexo" placeholder="M / F" />
            </div>
          </div>
          <div>
            <Label htmlFor="endereco" className="mb-2 block">
              Endereço
            </Label>
            <Input id="endereco" placeholder="Rua, nº, bairro, cidade" />
          </div>
        </section>

        {/* 4. Avaliação Clínica */}
        <section className="space-y-4">
          <h2 className="font-semibold">Avaliação Clínica</h2>
          <div>
            <Label className="mb-2 block">Principais Lesões</Label>
            <Textarea placeholder="Ex: Fratura fechada, hemorragia externa" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="pa" className="mb-2 block">
                PA
              </Label>
              <Input id="pa" placeholder="Ex: 12x8" />
            </div>
            <div>
              <Label htmlFor="pulso" className="mb-2 block">
                Pulso
              </Label>
              <Input id="pulso" placeholder="Ex: 80 bpm" />
            </div>
            <div>
              <Label htmlFor="resp" className="mb-2 block">
                Respiração
              </Label>
              <Input id="resp" placeholder="Ex: 18 mr" />
            </div>
            <div>
              <Label htmlFor="temp" className="mb-2 block">
                Temperatura
              </Label>
              <Input id="temp" placeholder="Ex: 36°C" />
            </div>
            <div>
              <Label htmlFor="sat" className="mb-2 block">
                Saturação
              </Label>
              <Input id="sat" placeholder="Ex: 98%" />
            </div>
          </div>
        </section>

        {/* 4b. Escala de Glasgow */}
        <section className="space-y-4">
          <h3 className="font-semibold">Escala de Coma de Glasgow</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ocular" className="mb-2 block">
                Abertura Ocular
              </Label>
              <Input id="ocular" type="number" placeholder="1 a 4" />
            </div>
            <div>
              <Label htmlFor="verbal" className="mb-2 block">
                Resposta Verbal
              </Label>
              <Input id="verbal" type="number" placeholder="1 a 5" />
            </div>
            <div>
              <Label htmlFor="motora" className="mb-2 block">
                Resposta Motora
              </Label>
              <Input id="motora" type="number" placeholder="1 a 6" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            A soma dos três parâmetros define o grau de Glasgow (3 a 15 pontos).
          </p>
        </section>

        {/* 4c. Queimaduras */}
        <section className="space-y-4">
          <h3 className="font-semibold">Queimaduras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="superficie" className="mb-2 block">
                % Superfície Corporal Queimada
              </Label>
              <Input id="superficie" type="number" placeholder="Ex: 18" />
            </div>
            <div>
              <Label htmlFor="viasAereas" className="mb-2 block">
                Vias Aéreas Atingidas?
              </Label>
              <Input id="viasAereas" placeholder="Sim / Não" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Utilize a regra dos 9 ou diagrama de superfície corporal para
            estimar.
          </p>
        </section>

        {/* 5. Ações Realizadas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Ações Realizadas</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="viasAereas" />
              <Label htmlFor="viasAereas">Vias Aéreas</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="rcp" />
              <Label htmlFor="rcp">RCP</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="hemorragia" />
              <Label htmlFor="hemorragia">Controle de Hemorragia</Label>
            </div>
          </div>
        </section>

        {/* 6. Destino da Vítima */}
        <section className="space-y-4">
          <h2 className="font-semibold">Destino da Vítima</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="condicao" className="mb-2 block">
                Condição Final
              </Label>
              <Input id="condicao" placeholder="Com vida / Sem vida" />
            </div>
            <div>
              <Label htmlFor="hospital" className="mb-2 block">
                Tipo de Hospital / Nome
              </Label>
              <Input
                id="hospital"
                placeholder="Ex: UPA Caxangá, Hospital Estadual"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="profissional" className="mb-2 block">
                Médico/Enfermeiro que recebeu
              </Label>
              <Input id="profissional" placeholder="Nome completo" />
            </div>
            <div>
              <Label htmlFor="registro" className="mb-2 block">
                CRM / COREN
              </Label>
              <Input id="registro" placeholder="Ex: CRM 12345 / COREN 67890" />
            </div>
          </div>
        </section>

        {/* 7. Responsáveis */}
        <section className="space-y-4">
          <h2 className="font-semibold">Responsáveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bombeiro" className="mb-2 block">
                Bombeiro Responsável
              </Label>
              <Input id="bombeiro" placeholder="Nome completo" />
            </div>
            <div>
              <Label htmlFor="comandante" className="mb-2 block">
                Comandante da Operação
              </Label>
              <Input id="comandante" placeholder="Nome de guerra" />
            </div>
            <div>
              <Label htmlFor="telefone" className="mb-2 block">
                Telefone
              </Label>
              <Input id="telefone" type="tel" placeholder="(81) 99999-9999" />
            </div>
          </div>
          <div>
            <Label htmlFor="rubrica" className="mb-2 block">
              Rubrica
            </Label>
            <Input id="rubrica" placeholder="Assinatura abreviada" />
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--chart-2)" }}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
