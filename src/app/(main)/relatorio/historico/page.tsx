"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FolhaHistoricoPage() {
  return (
    <Card className="border-2" style={{ borderColor: "var(--color-gray)" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--color-gray)]">
          Folha de Histórico
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="tipo" placeholder="Tipo" />
            <Input id="codigo" placeholder="Código" />
            <Input id="sigilo" placeholder="Sigilo" />
          </div>
        </section>

        {/* 2. Histórico */}
        <section className="space-y-4">
          <h2 className="font-semibold">Histórico</h2>
          <Textarea
            id="historico"
            placeholder="Descreva detalhadamente os fatos: data, hora, local, ações realizadas, desfecho..."
            rows={8}
          />
        </section>

        {/* 3. Guarnição Empenhada */}
        <section className="space-y-4">
          <h2 className="font-semibold">Guarnição Empenhada</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="posto" placeholder="Posto/Graduação" />
            <Input id="nomeGuerra" placeholder="Nome de Guerra" />
            <Input id="matricula" placeholder="Matrícula" />
          </div>
          <Textarea placeholder="Demais componentes da guarnição" />
        </section>

        {/* 4. Visto da Divisão de Operações */}
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
          Salvar Histórico
        </Button>
      </CardContent>
    </Card>
  );
}
