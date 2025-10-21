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
import { useState } from "react";
import { exportFormularioIndividual } from "@/utils/export";
import { formsConfig } from "@/utils/formsConfig";

export default function FormularioIncendio() {
  const [formData, setFormData] = useState({
    // Identificação
    pontoBase: "",
    viatura: "",
    data: "",

    // Classificação
    desastreSim: false,
    desastreNao: false,
    codigoDesastre: "",
    grupo: "",

    // Local
    endereco: "",
    tipoEdificacao: "",
    agente: "",

    // Recursos
    agua: "",
    espuma: "",

    // Danos
    bens: "",

    // Responsáveis
    proprietario: "",
    telefone: "",
    comandante: "",
  });

  const handleExport = () => {
    const { title, color } = formsConfig.incendio;
    exportFormularioIndividual(title, formData, {
      color,
      fields: [
        // Identificação
        { key: "pontoBase", label: "Ponto Base" },
        { key: "viatura", label: "Viatura Responsável" },
        { key: "data", label: "Data" },

        // Classificação
        { key: "desastreSim", label: "Associado a Desastre (Sim)" },
        { key: "desastreNao", label: "Associado a Desastre (Não)" },
        { key: "codigoDesastre", label: "Código do Desastre" },
        { key: "grupo", label: "Grupo/Subgrupo" },

        // Local
        { key: "endereco", label: "Endereço" },
        { key: "tipoEdificacao", label: "Tipo de Edificação" },
        { key: "agente", label: "Agente Causador" },

        // Recursos
        { key: "agua", label: "Consumo de Água (litros)" },
        { key: "espuma", label: "Consumo de Espuma (litros)" },

        // Danos
        { key: "bens", label: "Bens Atingidos" },

        // Responsáveis
        { key: "proprietario", label: "Proprietário" },
        { key: "telefone", label: "Telefone" },
        { key: "comandante", label: "Comandante da Operação" },
      ],
    });
  };

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
              <Input
                id="pontoBase"
                placeholder="Ex: 5º GB – 1ª Cia"
                onChange={(e) =>
                  setFormData({ ...formData, pontoBase: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="viatura" className="mb-2 block">
                Viatura Responsável
              </Label>
              <Input
                id="viatura"
                placeholder="Ex: ABT 3106"
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

        {/*  Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Label>Associado a Desastre?</Label>
            <div className="flex items-center gap-2">
              <Checkbox
                id="desastreSim"
                checked={formData.desastreSim}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, desastreNao: checked as boolean })
                }
              />
              <Label htmlFor="desastreSim">Sim</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="desastreNao"
                checked={formData.desastreNao}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, desastreNao: checked as boolean })
                }
              />
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
              <Input
                id="codigoDesastre"
                placeholder="Ex: 2.3.12"
                onChange={(e) =>
                  setFormData({ ...formData, codigoDesastre: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="grupo" className="mb-2 block">
                Grupo/Subgrupo
              </Label>
              <Input
                id="grupo"
                placeholder="Ex: Incêndio em edificação"
                onChange={(e) =>
                  setFormData({ ...formData, grupo: e.target.value })
                }
              />
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
              <Input
                id="endereco"
                placeholder="Rua, nº, bairro, cidade"
                onChange={(e) =>
                  setFormData({ ...formData, endereco: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="tipoEdificacao" className="mb-2 block">
                Tipo de Edificação
              </Label>
              <Input
                id="tipoEdificacao"
                placeholder="Ex: Comercial, Residencial"
                onChange={(e) =>
                  setFormData({ ...formData, tipoEdificacao: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="agente" className="mb-2 block">
              Agente Causador
            </Label>
            <Input
              id="agente"
              placeholder="Ex: Instalação elétrica"
              onChange={(e) =>
                setFormData({ ...formData, agente: e.target.value })
              }
            />
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
              <Input
                id="agua"
                type="number"
                placeholder="Ex: 5000"
                onChange={(e) =>
                  setFormData({ ...formData, agua: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="espuma" className="mb-2 block">
                Consumo de Espuma (litros)
              </Label>
              <Input
                id="espuma"
                type="number"
                placeholder="Ex: 200"
                onChange={(e) =>
                  setFormData({ ...formData, espuma: e.target.value })
                }
              />
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
              <Input
                id="proprietario"
                placeholder="Nome completo"
                onChange={(e) =>
                  setFormData({ ...formData, proprietario: e.target.value })
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
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--color-button)" }}
          onClick={handleExport}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
