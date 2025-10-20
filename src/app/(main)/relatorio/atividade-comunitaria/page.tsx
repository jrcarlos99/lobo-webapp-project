"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AtividadeComunitariaPage() {
  return (
    <Card className="border-2" style={{ borderColor: "var(--color-craque)" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--color-craque)]">
          Formulário de Atividade Comunitária
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* 1. Identificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Identificação da Ocorrência</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="pontoBase" placeholder="Ponto Base" />
            <Input id="ciops" placeholder="CIOPS / Seção" />
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
            <Input id="horaInicio" type="time" placeholder="Hora Início" />
            <Input id="horaFim" type="time" placeholder="Hora Fim" />
          </div>
          <Input id="endereco" placeholder="Endereço completo" />
        </section>

        {/* 3. Responsável */}
        <section className="space-y-4">
          <h2 className="font-semibold">Responsável pela Atividade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="responsavel" placeholder="Nome do Responsável" />
            <Input id="cpf" placeholder="CPF" />
          </div>
          <Input id="instituicao" placeholder="Instituição" />
        </section>

        {/* 4. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="grupo" placeholder="Grupo/Subgrupo" />
            <Input id="missao" placeholder="Tipo de Missão" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="publico" placeholder="Público Atendido" />
            <Input id="participantes" placeholder="Nº de Pessoas" />
          </div>
        </section>

        {/* 5. Atividades Executadas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Atividades Executadas</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="apoio" />
              <Label htmlFor="apoio">Apoio à Instituição</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="educativa" />
              <Label htmlFor="educativa">Interação Educativa</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="social" />
              <Label htmlFor="social">Interação Social</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="religiosa" />
              <Label htmlFor="religiosa">Interação Religiosa</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="acoesSociais" />
              <Label htmlFor="acoesSociais">
                Encaminhamento para Ações Sociais
              </Label>
            </div>
          </div>
        </section>

        {/* 6. Recursos */}
        <section className="space-y-4">
          <h2 className="font-semibold">Recursos Empregados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="efetivo" placeholder="Efetivo" />
            <Input id="viaturas" placeholder="Viaturas" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="embarcacoes" placeholder="Embarcações" />
            <Input id="equipamentos" placeholder="Equipamentos" />
          </div>
          <Textarea placeholder="Estruturas de Apoio" />
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
          style={{ backgroundColor: "var(--color-craque)" }}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
