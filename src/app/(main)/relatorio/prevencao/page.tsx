"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PrevencaoPage() {
  return (
    <Card
      className="border-2"
      style={{ borderColor: "var(--color-prevention)" }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--color-prevention)]">
          Formulário de Prevenção
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="aviso" placeholder="Nº do Aviso" />
            <Input id="data" type="date" />
          </div>
        </section>

        {/* 2. Evento */}
        <section className="space-y-4">
          <h2 className="font-semibold">Evento</h2>
          <Input id="nomeEvento" placeholder="Nome do Evento" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="horaChegada" type="time" placeholder="Hora Chegada" />
            <Input id="horaSaida" type="time" placeholder="Hora Saída" />
          </div>
          <Input id="documento" placeholder="Documento de Referência" />
        </section>

        {/* 3. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="flex items-center gap-6">
            <Label>Evento Regularizado?</Label>
            <div className="flex items-center gap-2">
              <Checkbox id="regularizadoSim" />
              <Label htmlFor="regularizadoSim">Sim</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="regularizadoNao" />
              <Label htmlFor="regularizadoNao">Não</Label>
            </div>
          </div>
          <Input id="cgo" placeholder="Código CGO" />
          <Input id="grupo" placeholder="Grupo/Subgrupo (por extenso)" />
        </section>

        {/* 4. Responsável pelo Evento */}
        <section className="space-y-4">
          <h2 className="font-semibold">Responsável pelo Evento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="responsavel" placeholder="Nome do Responsável" />
            <Input id="cpfcnpj" placeholder="CPF / CNPJ" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="publicoEstimado" placeholder="Público Estimado" />
            <Input id="publicoPresente" placeholder="Público Presente" />
          </div>
        </section>

        {/* 5. Prevenção Executada */}
        <section className="space-y-4">
          <h2 className="font-semibold">Prevenção Executada</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="apoio" />
              <Label htmlFor="apoio">Apoio à Operação</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="aquatica" />
              <Label htmlFor="aquatica">Prevenção Aquática</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="festivo" />
              <Label htmlFor="festivo">Evento Festivo</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="esportivo" />
              <Label htmlFor="esportivo">Evento Esportivo</Label>
            </div>
          </div>
        </section>

        {/* 6. Condições e Estruturas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Condições e Estruturas</h2>
          <Textarea placeholder="Condição do Sistema Preventivo Existente" />
          <Input
            id="responsaveis"
            placeholder="Quantidade / Nomes dos Responsáveis"
          />
          <Textarea placeholder="Estruturas de Apoio Disponíveis" />
          <Textarea placeholder="Regularidade da Documentação (AR, AVCB, Válido, Vencido...)" />
        </section>

        {/* 7. Informações Adicionais */}
        <section className="space-y-4">
          <h2 className="font-semibold">Informações Adicionais</h2>
          <Textarea placeholder="Histórico resumido, observações relevantes" />
        </section>

        {/* 8. Responsáveis */}
        <section className="space-y-4">
          <h2 className="font-semibold">Responsáveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="bombeiro" placeholder="Bombeiro Responsável" />
            <Input id="comandante" placeholder="Comandante da Operação" />
            <Input id="matricula" placeholder="Matrícula" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="telefone" type="tel" placeholder="(81) 99999-9999" />
            <Input id="rubrica" placeholder="Rubrica" />
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--color-prevention)" }}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
