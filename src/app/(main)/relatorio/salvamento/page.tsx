"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { exportFormularioIndividual } from "@/utils/export";
import { formsConfig } from "@/utils/formsConfig";
import { useState } from "react";

export default function SalvamentoRelatori() {
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    viatura: "",
    data: "",

    // 2. Classificação
    tipo: "",
    grupo: "",

    // 3. Local
    endereco: "",
    ambiente: "",
    condicoes: "",

    // 4. Vítima(s)
    nome: "",
    idade: "",
    sexo: "",
    situacao: "",

    // 5. Ações Realizadas
    desencarceramento: false,
    resgateAltura: false,
    mergulho: false,

    // 6. Resultado
    condicaoFinal: "",
    destino: "",

    // 7. Responsáveis
    bombeiro: "",
    comandante: "",
    telefone: "",
  });

  const handleExport = () => {
    const { title, color } = formsConfig.salvamento;

    exportFormularioIndividual(title, formData, {
      color,
      fields: [
        // 1. Identificação
        { key: "pontoBase", label: "Ponto Base" },
        { key: "viatura", label: "Viatura" },
        { key: "data", label: "Data" },

        // 2. Classificação
        { key: "tipo", label: "Tipo de Salvamento" },
        { key: "grupo", label: "Grupo/Subgrupo" },

        // 3. Local
        { key: "endereco", label: "Endereço" },
        { key: "ambiente", label: "Tipo de Ambiente" },
        { key: "condicoes", label: "Condições do Local" },

        // 4. Vítima(s)
        { key: "nome", label: "Nome" },
        { key: "idade", label: "Idade" },
        { key: "sexo", label: "Sexo" },
        { key: "situacao", label: "Situação Encontrada" },

        // 5. Ações Realizadas
        { key: "desencarceramento", label: "Desencarceramento" },
        { key: "resgateAltura", label: "Resgate em Altura" },
        { key: "mergulho", label: "Mergulho" },

        // 6. Resultado
        { key: "condicaoFinal", label: "Condição Final" },
        { key: "destino", label: "Destino" },

        // 7. Responsáveis
        { key: "bombeiro", label: "Bombeiro Responsável" },
        { key: "comandante", label: "Comandante da Operação" },
        { key: "telefone", label: "Telefone" },
      ],
    });
  };

  return (
    <Card className="border-2" style={{ borderColor: "var(--chart-5)" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[var(--chart-5)]">
          Formulário de Salvamento
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
              <Input
                id="pontoBase"
                placeholder="Ex: 1º GB – 2ª Cia"
                onChange={(e) =>
                  setFormData({ ...formData, pontoBase: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="viatura" className="mb-2 block">
                Viatura
              </Label>
              <Input
                id="viatura"
                placeholder="Ex: ABS 1234"
                onChange={(e) =>
                  setFormData({ ...formData, viatura: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="data" className="mb-2 block">
                Data
              </Label>
              <Input
                id="data"
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* 2. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo" className="mb-2 block">
                Tipo de Salvamento
              </Label>
              <Input
                id="tipo"
                placeholder="Ex: Aquático, Altura, Veicular"
                onChange={(e) =>
                  setFormData({ ...formData, tipo: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="grupo" className="mb-2 block">
                Grupo/Subgrupo
              </Label>
              <Input
                id="grupo"
                placeholder="Ex: Resgate em altura"
                onChange={(e) =>
                  setFormData({ ...formData, grupo: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* 3. Local */}
        <section className="space-y-4">
          <h2 className="font-semibold">Local e Especificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endereco" className="mb-2 block">
                Endereço
              </Label>
              <Input
                id="endereco"
                placeholder="Rua, nº, bairro, cidade"
                onChange={(e) =>
                  setFormData({ ...formData, endereco: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="ambiente" className="mb-2 block">
                Tipo de Ambiente
              </Label>
              <Input
                id="ambiente"
                placeholder="Ex: Urbano, Rural, Aquático"
                onChange={(e) =>
                  setFormData({ ...formData, ambiente: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="ambiente" className="mb-2 block">
                Tipo de Ambiente
              </Label>
              <Input
                id="ambiente"
                placeholder="Ex: Urbano, Rural, Aquático"
                onChange={(e) =>
                  setFormData({ ...formData, ambiente: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="ambiente" className="mb-2 block">
                Tipo de Ambiente
              </Label>
              <Input
                id="ambiente"
                placeholder="Ex: Urbano, Rural, Aquático"
                onChange={(e) =>
                  setFormData({ ...formData, ambiente: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="condicoes" className="mb-2 block">
              Condições do Local
            </Label>
            <Textarea
              id="condicoes"
              placeholder="Ex: Acesso difícil, risco de desabamento"
            />
          </div>
        </section>

        {/* 4. Vítima(s) */}
        <section className="space-y-4">
          <h2 className="font-semibold">Vítima(s)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nome" className="mb-2 block">
                Nome
              </Label>
              <Input
                id="nome"
                placeholder="Nome completo"
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="idade" className="mb-2 block">
                Idade
              </Label>
              <Input
                id="idade"
                type="number"
                placeholder="Ex: 30"
                onChange={(e) =>
                  setFormData({ ...formData, idade: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="sexo" className="mb-2 block">
                Sexo
              </Label>
              <Input
                id="sexo"
                placeholder="M / F"
                onChange={(e) =>
                  setFormData({ ...formData, sexo: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="situacao" className="mb-2 block">
              Situação Encontrada
            </Label>
            <Input
              id="situacao"
              placeholder="Ex: Presa em ferragens, submersa"
              onChange={(e) =>
                setFormData({ ...formData, situacao: e.target.value })
              }
            />
          </div>
        </section>

        {/* 5. Ações Realizadas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Ações Realizadas</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="desencarceramento"
                checked={formData.desencarceramento}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    desencarceramento: checked as boolean,
                  })
                }
              />
              <Label htmlFor="desencarceramento">Desencarceramento</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="resgateAltura"
                checked={formData.resgateAltura}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    resgateAltura: checked as boolean,
                  })
                }
              />
              <Label htmlFor="resgateAltura">Resgate em Altura</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="mergulho"
                checked={formData.mergulho}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    mergulho: checked as boolean,
                  })
                }
              />
              <Label htmlFor="mergulho">Mergulho</Label>
            </div>
          </div>
        </section>

        {/* 6. Resultado */}
        <section className="space-y-4">
          <h2 className="font-semibold">Resultado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="condicaoFinal" className="mb-2 block">
                Condição Final
              </Label>
              <Input
                id="condicaoFinal"
                placeholder="Com vida / Sem vida"
                onChange={(e) =>
                  setFormData({ ...formData, condicaoFinal: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="destino" className="mb-2 block">
                Destino
              </Label>
              <Input
                id="destino"
                placeholder="Ex: Hospital, UPA, Permaneceu no local"
                onChange={(e) =>
                  setFormData({ ...formData, destino: e.target.value })
                }
              />
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
              <Input
                id="bombeiro"
                placeholder="Nome completo"
                onChange={(e) =>
                  setFormData({ ...formData, bombeiro: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="comandante" className="mb-2 block">
                Comandante da Operação
              </Label>
              <Input
                id="comandante"
                placeholder="Nome de guerra"
                onChange={(e) =>
                  setFormData({ ...formData, comandante: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="telefone" className="mb-2 block">
                Telefone
              </Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(81) 99999-9999"
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--chart-5)" }}
          onClick={handleExport}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
