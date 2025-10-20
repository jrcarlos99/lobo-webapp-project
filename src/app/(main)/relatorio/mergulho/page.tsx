"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

export default function MergulhoPage() {
  return (
    <Card className="border-2" style={{ borderColor: "var(--chart-5)" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--chart-5)]">
          Formulário de Operações de Mergulho
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
        </section>

        {/* 2. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <Input id="grupo" placeholder="Grupo/Subgrupo" />
          <Input id="tipoBusca" placeholder="Tipo de Busca/Salvamento" />
        </section>

        {/* 3. Local */}
        <section className="space-y-4">
          <h2 className="font-semibold">Local da Operação</h2>
          <Input id="local" placeholder="Ex: Mar, Rio, Represa, Açude" />
          <Input id="referencia" placeholder="Referência/Especificação" />
        </section>

        {/* 4. Vítimas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Vítimas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="qualificacao" placeholder="Qualificação da Vítima" />
            <Input
              id="qtdVítimas"
              type="number"
              placeholder="Quantidade de Vítimas"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="vitimaLocalizada"
              placeholder="Vítima Localizada? Sim/Não"
            />
            <Input
              id="cadaverLocalizado"
              placeholder="Cadáver Localizado? Sim/Não"
            />
            <Input
              id="bombeiroServico"
              placeholder="Bombeiro em Serviço? Sim/Não"
            />
          </div>
        </section>

        {/* 5. Operação de Mergulho */}
        <section className="space-y-4">
          <h2 className="font-semibold">Operação de Mergulho</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="tipoOperacao" placeholder="Tipo de Operação" />
            <Input
              id="numMergulhadores"
              type="number"
              placeholder="Nº de Mergulhadores"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input id="profundidade" placeholder="Profundidade (m)" />
            <Input id="tempoFundo" placeholder="Tempo de Fundo" />
            <Input id="tempoTotal" placeholder="Tempo Total Submerso" />
            <Input id="correnteza" placeholder="Correnteza (Sim/Não)" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="tipoFundo"
              placeholder="Tipo de Fundo (Areia, Pedras...)"
            />
            <Input id="ambiente" placeholder="Ambiente (Normal, Poluído...)" />
            <Input id="coordenadas" placeholder="Coordenadas (Lat/Long)" />
          </div>
        </section>

        {/* 6. Recursos */}
        <section className="space-y-4">
          <h2 className="font-semibold">Recursos Utilizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="cilindroNum" placeholder="Cilindro Nº" />
            <Input id="barInicio" placeholder="Pressão Inicial (bar)" />
            <Input id="barFim" placeholder="Pressão Final (bar)" />
          </div>
          <Textarea placeholder="Outros Recursos (máscara, computador de mergulho, etc.)" />
        </section>

        {/* 7. Responsáveis */}
        <section className="space-y-4">
          <h2 className="font-semibold">Responsáveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="mergulhadorMatricula"
              placeholder="Matrícula do Mergulhador"
            />
            <Input
              id="mergulhadorNome"
              placeholder="Nome de Guerra do Mergulhador"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="bombeiro" placeholder="Bombeiro Responsável" />
            <Input id="comandante" placeholder="Comandante da Operação" />
            <Input id="telefone" type="tel" placeholder="(81) 99999-9999" />
          </div>
          <Input id="rubrica" placeholder="Rubrica" />
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--chart-5)" }}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
