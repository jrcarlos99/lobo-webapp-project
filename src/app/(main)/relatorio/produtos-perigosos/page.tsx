"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProdutosPerigosos() {
  return (
    <Card className="border-2" style={{ borderColor: "var(--chart-4)" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--chart-4)]">
          Formulário de Produtos Perigosos
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* 1. Identificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Identificação da Ocorrência</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="data" className="mb-2 block">
                Data
              </Label>
              <Input id="data" type="date" />
            </div>
            <div>
              <Label htmlFor="hora" className="mb-2 block">
                Hora
              </Label>
              <Input id="hora" type="time" />
            </div>
            <div>
              <Label htmlFor="municipio" className="mb-2 block">
                Município
              </Label>
              <Input id="municipio" placeholder="Ex: Recife" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bairro" className="mb-2 block">
                Bairro
              </Label>
              <Input id="bairro" />
            </div>
            <div>
              <Label htmlFor="rua" className="mb-2 block">
                Rua
              </Label>
              <Input id="rua" />
            </div>
            <div>
              <Label htmlFor="numero" className="mb-2 block">
                Número
              </Label>
              <Input id="numero" />
            </div>
          </div>
          <div>
            <Label htmlFor="referencia" className="mb-2 block">
              Referência
            </Label>
            <Input
              id="referencia"
              placeholder="Ex: Próximo ao posto de gasolina"
            />
          </div>
        </section>

        {/* 2. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipoDesastre" className="mb-2 block">
                Tipo de Desastre
              </Label>
              <Input id="tipoDesastre" placeholder="Ex: Vazamento, Explosão" />
            </div>
            <div>
              <Label htmlFor="grupo" className="mb-2 block">
                Grupo/Subgrupo
              </Label>
              <Input id="grupo" placeholder="Ex: COBRADE 2.2.1.1.0" />
            </div>
          </div>
        </section>

        {/* 3. Produto Envolvido */}
        <section className="space-y-4">
          <h2 className="font-semibold">Produto Envolvido</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="produto" className="mb-2 block">
                Nome do Produto
              </Label>
              <Input id="produto" placeholder="Ex: GLP, Ácido Sulfúrico" />
            </div>
            <div>
              <Label htmlFor="onu" className="mb-2 block">
                Nº ONU
              </Label>
              <Input id="onu" placeholder="Ex: 1830" />
            </div>
            <div>
              <Label htmlFor="classe" className="mb-2 block">
                Classe de Risco
              </Label>
              <Input id="classe" placeholder="Ex: Inflamável" />
            </div>
            <div>
              <Label htmlFor="estado" className="mb-2 block">
                Estado Físico
              </Label>
              <Input id="estado" placeholder="Sólido / Líquido / Gasoso" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="recipiente" className="mb-2 block">
                Tipo de Recipiente
              </Label>
              <Input
                id="recipiente"
                placeholder="Ex: Botijão, Tanque, Container"
              />
            </div>
            <div>
              <Label htmlFor="volume" className="mb-2 block">
                Volume/Massa Estimada
              </Label>
              <Input id="volume" placeholder="Ex: 200 litros" />
            </div>
            <div>
              <Label htmlFor="responsavel" className="mb-2 block">
                Responsável pelo Produto
              </Label>
              <Input id="responsavel" placeholder="Nome completo" />
            </div>
          </div>
          <div>
            <Label htmlFor="cpfcnpj" className="mb-2 block">
              CPF/CNPJ
            </Label>
            <Input
              id="cpfcnpj"
              placeholder="000.000.000-00 / 00.000.000/0001-00"
            />
          </div>
        </section>

        {/* 4. Impactos */}
        <section className="space-y-4">
          <h2 className="font-semibold">Impactos</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input id="contaminados" placeholder="Contaminados" />
            <Input id="irradiados" placeholder="Irradiados" />
            <Input id="evacuados" placeholder="Evacuados" />
            <Input id="obitos" placeholder="Óbitos" />
            <Input id="feridos" placeholder="Feridos" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="areaIsolada" placeholder="Área Isolada (m²/km²)" />
            <Input
              id="areaContaminada"
              placeholder="Área Contaminada (m²/km²)"
            />
            <Input id="areaEvacuada" placeholder="Área Evacuada (m²/km²)" />
          </div>
          <div>
            <Label className="mb-2 block">Ambiente Afetado</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="solo" />
                <Label htmlFor="solo">Solo</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="manancial" />
                <Label htmlFor="manancial">Manancial</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="atmosfera" />
                <Label htmlFor="atmosfera">Atmosfera</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="edificacoes" />
                <Label htmlFor="edificacoes">Edificações</Label>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Ações Realizadas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Ações Realizadas</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="isolamento" />
              <Label htmlFor="isolamento">Isolamento</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="contencao" />
              <Label htmlFor="contencao">Contenção</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="neutralizacao" />
              <Label htmlFor="neutralizacao">Neutralização</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="transbordo" />
              <Label htmlFor="transbordo">Transbordo / Remoção</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="interdicao" />
              <Label htmlFor="interdicao">Interdição de via</Label>
            </div>
          </div>
        </section>

        {/* 6. Resultado */}
        <section className="space-y-4">
          <h2 className="font-semibold">Resultado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="situacaoFinal" className="mb-2 block">
                Situação Final
              </Label>
              <Input
                id="situacaoFinal"
                placeholder="Ex: Controlado, em andamento"
              />
            </div>
            <div>
              <Label htmlFor="orgaos" className="mb-2 block">
                Órgãos Acionados
              </Label>
              <Input id="orgaos" placeholder="Ex: Defesa Civil, IBAMA" />
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
              <Label htmlFor="matricula" className="mb-2 block">
                Matrícula
              </Label>
              <Input id="matricula" placeholder="Ex: 123456-7" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="telefone" className="mb-2 block">
                Telefone
              </Label>
              <Input id="telefone" type="tel" placeholder="(81) 99999-9999" />
            </div>
            <div>
              <Label htmlFor="rubrica" className="mb-2 block">
                Rubrica
              </Label>
              <Input id="rubrica" placeholder="Assinatura abreviada" />
            </div>
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--chart-4)" }}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
