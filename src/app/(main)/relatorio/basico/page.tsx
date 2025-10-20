"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FormBasico() {
  return (
    <Card
      className="border-2"
      style={{ borderColor: "var(--color-gray-light)" }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--color-gray)]">
          Formulário de Atendimento Básico
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* 1. Identificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Identificação da Ocorrência</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="pontoBase" placeholder="Ponto Base" />
            <Input id="ome" placeholder="OME / Seção" />
            <Input id="viatura" placeholder="Viatura Responsável" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="aviso" placeholder="Nº do Aviso" />
            <Input id="data" type="date" />
            <Input id="hora" type="time" />
          </div>
          <Input
            id="formaAcionamento"
            placeholder="Forma de Acionamento (CIODS, Direto...)"
          />
          <Input
            id="situacao"
            placeholder="Situação da Ocorrência (Atendida, Não Atendida...)"
          />
        </section>

        {/* 2. Local */}
        <section className="space-y-4">
          <h2 className="font-semibold">Local da Ocorrência</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="logradouro" placeholder="Logradouro" />
            <Input id="numero" placeholder="Número" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="bairro" placeholder="Bairro" />
            <Input id="referencia" placeholder="Ponto de Referência" />
          </div>
          <Input id="coordenadas" placeholder="Coordenadas (Lat/Long)" />
        </section>

        {/* 3. Solicitante */}
        <section className="space-y-4">
          <h2 className="font-semibold">Solicitante</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="nomeSolicitante" placeholder="Nome" />
            <Input id="cpfSolicitante" placeholder="CPF / RG" />
            <Input id="telefoneSolicitante" placeholder="Telefone" />
          </div>
        </section>

        {/* 4. Natureza */}
        <section className="space-y-4">
          <h2 className="font-semibold">Natureza da Ocorrência</h2>
          <Input
            id="natureza"
            placeholder="Ex: Acidente de trânsito, apoio a órgão público..."
          />
        </section>

        {/* 5. Vítimas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Vítimas Envolvidas</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="ilesa" />
              <Label htmlFor="ilesa">Ilesa</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="leve" />
              <Label htmlFor="leve">Ferido Leve</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="grave" />
              <Label htmlFor="grave">Ferido Grave</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="obito" />
              <Label htmlFor="obito">Óbito</Label>
            </div>
          </div>
        </section>

        {/* 6. Apoio */}
        <section className="space-y-4">
          <h2 className="font-semibold">Viaturas / Apoio</h2>
          <Textarea placeholder="Viaturas envolvidas" />
          <Textarea placeholder="Instituições de apoio (SAMU, PM, Guarda Municipal...)" />
        </section>

        {/* 7. Histórico */}
        <section className="space-y-4">
          <h2 className="font-semibold">Histórico Resumido</h2>
          <Textarea
            placeholder="Descreva de forma objetiva os fatos"
            rows={6}
          />
        </section>

        {/* 8. Guarnição */}
        <section className="space-y-4">
          <h2 className="font-semibold">Guarnição Empenhada</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="posto" placeholder="Posto/Graduação" />
            <Input id="nomeGuerra" placeholder="Nome de Guerra" />
            <Input id="matricula" placeholder="Matrícula" />
          </div>
        </section>

        {/* 9. Visto */}
        <section className="space-y-4">
          <h2 className="font-semibold">Visto da Divisão de Operações</h2>
          <Input id="dataVisto" type="date" />
          <Input id="assinatura" placeholder="Assinatura / Rubrica" />
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--color-gray)" }}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
