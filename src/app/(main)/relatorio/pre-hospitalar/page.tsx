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

export default function FormularioAPH() {
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    viatura: "",
    data: "",

    // 2. Classificação
    grupo: "",
    subgrupo: "",
    tipoEvento: "",

    // 3. Dados da Vítima
    nome: "",
    cpf: "",
    idade: "",
    sexo: "",
    endereco: "",

    // 4. Avaliação Clínica
    principaisLesoes: "",
    pa: "",
    pulso: "",
    resp: "",
    temp: "",
    sat: "",

    // 4b. Glasgow
    ocular: "",
    verbal: "",
    motora: "",

    // 4c. Queimaduras
    superficie: "",
    viasAereas: "",

    // 5. Ações Realizadas
    viasAereasCheck: false,
    rcpCheck: false,
    hemorragiaCheck: false,

    // 6. Destino da Vítima
    condicao: "",
    hospital: "",
    profissional: "",
    registro: "",

    // 7. Responsáveis
    bombeiro: "",
    comandante: "",
    telefone: "",
    rubrica: "",
  });
  const handleExport = () => {
    const { title, color } = formsConfig.aph;
    exportFormularioIndividual(title, formData, {
      color,
      fields: [
        // 1. Identificação
        { key: "pontoBase", label: "Ponto Base" },
        { key: "viatura", label: "Viatura" },
        { key: "data", label: "Data" },

        // 2. Classificação
        { key: "grupo", label: "Grupo" },
        { key: "subgrupo", label: "Subgrupo" },
        { key: "tipoEvento", label: "Tipo de Evento" },

        // 3. Dados da Vítima
        { key: "nome", label: "Nome" },
        { key: "cpf", label: "RG/CPF" },
        { key: "idade", label: "Idade" },
        { key: "sexo", label: "Sexo" },
        { key: "endereco", label: "Endereço" },

        // 4. Avaliação Clínica
        { key: "principaisLesoes", label: "Principais Lesões" },
        { key: "pa", label: "PA" },
        { key: "pulso", label: "Pulso" },
        { key: "resp", label: "Respiração" },
        { key: "temp", label: "Temperatura" },
        { key: "sat", label: "Saturação" },

        // 4b. Glasgow
        { key: "ocular", label: "Abertura Ocular" },
        { key: "verbal", label: "Resposta Verbal" },
        { key: "motora", label: "Resposta Motora" },

        // 4c. Queimaduras
        { key: "superficie", label: "% Superfície Queimada" },
        { key: "viasAereas", label: "Vias Aéreas Atingidas" },

        // 5. Ações Realizadas
        { key: "viasAereasCheck", label: "Vias Aéreas" },
        { key: "rcpCheck", label: "RCP" },
        { key: "hemorragiaCheck", label: "Controle de Hemorragia" },

        // 6. Destino da Vítima
        { key: "condicao", label: "Condição Final" },
        { key: "hospital", label: "Hospital" },
        { key: "profissional", label: "Profissional que recebeu" },
        { key: "registro", label: "CRM/COREN" },

        // 7. Responsáveis
        { key: "bombeiro", label: "Bombeiro Responsável" },
        { key: "comandante", label: "Comandante da Operação" },
        { key: "telefone", label: "Telefone" },
        { key: "rubrica", label: "Rubrica" },
      ],
    });
  };

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
              <Input
                id="pontoBase"
                placeholder="Ex: GBAPH - 1º SBPH"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="grupo" className="mb-2 block">
                Grupo
              </Label>
              <Input
                id="grupo"
                placeholder="Ex: GRUPO 01"
                onChange={(e) =>
                  setFormData({ ...formData, grupo: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="subgrupo" className="mb-2 block">
                Subgrupo
              </Label>
              <Input
                id="subgrupo"
                placeholder="Ex: SUBGRUPO 02"
                onChange={(e) =>
                  setFormData({ ...formData, subgrupo: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="tipoEvento" className="mb-2 block">
                Tipo de Evento
              </Label>
              <Input
                id="tipoEvento"
                placeholder="Ex: Acidente de trânsito"
                onChange={(e) =>
                  setFormData({ ...formData, tipoEvento: e.target.value })
                }
              />
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
              <Input
                id="nome"
                placeholder="Nome completo"
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="cpf" className="mb-2 block">
                RG/CPF
              </Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                onChange={(e) =>
                  setFormData({ ...formData, cpf: e.target.value })
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
                placeholder="Ex: 35"
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
              <Input
                id="pa"
                placeholder="Ex: 12x8"
                onChange={(e) =>
                  setFormData({ ...formData, pa: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="pulso" className="mb-2 block">
                Pulso
              </Label>
              <Input
                id="pulso"
                placeholder="Ex: 80 bpm"
                onChange={(e) =>
                  setFormData({ ...formData, pulso: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="resp" className="mb-2 block">
                Respiração
              </Label>
              <Input
                id="resp"
                placeholder="Ex: 18 mr"
                onChange={(e) =>
                  setFormData({ ...formData, resp: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="temp" className="mb-2 block">
                Temperatura
              </Label>
              <Input
                id="temp"
                placeholder="Ex: 36°C"
                onChange={(e) =>
                  setFormData({ ...formData, temp: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="sat" className="mb-2 block">
                Saturação
              </Label>
              <Input
                id="sat"
                placeholder="Ex: 98%"
                onChange={(e) =>
                  setFormData({ ...formData, sat: e.target.value })
                }
              />
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
              <Input
                id="ocular"
                type="number"
                placeholder="1 a 4"
                onChange={(e) =>
                  setFormData({ ...formData, ocular: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="verbal" className="mb-2 block">
                Resposta Verbal
              </Label>
              <Input
                id="verbal"
                type="number"
                placeholder="1 a 5"
                onChange={(e) =>
                  setFormData({ ...formData, verbal: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="motora" className="mb-2 block">
                Resposta Motora
              </Label>
              <Input
                id="motora"
                type="number"
                placeholder="1 a 6"
                onChange={(e) =>
                  setFormData({ ...formData, motora: e.target.value })
                }
              />
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
              <Input
                id="superficie"
                type="number"
                placeholder="Ex: 18"
                onChange={(e) =>
                  setFormData({ ...formData, superficie: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="viasAereas" className="mb-2 block">
                Vias Aéreas Atingidas?
              </Label>
              <Input
                id="viasAereas"
                placeholder="Sim / Não"
                onChange={(e) =>
                  setFormData({ ...formData, viasAereas: e.target.value })
                }
              />
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
              <Input
                id="condicao"
                placeholder="Com vida / Sem vida"
                onChange={(e) =>
                  setFormData({ ...formData, condicao: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="hospital" className="mb-2 block">
                Tipo de Hospital / Nome
              </Label>
              <Input
                id="hospital"
                placeholder="Ex: UPA Caxangá, Hospital Estadual"
                onChange={(e) =>
                  setFormData({ ...formData, hospital: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="profissional" className="mb-2 block">
                Médico/Enfermeiro que recebeu
              </Label>
              <Input
                id="profissional"
                placeholder="Nome completo"
                onChange={(e) =>
                  setFormData({ ...formData, profissional: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="registro" className="mb-2 block">
                CRM / COREN
              </Label>
              <Input
                id="registro"
                placeholder="Ex: CRM 12345 / COREN 67890"
                onChange={(e) =>
                  setFormData({ ...formData, registro: e.target.value })
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
          <div>
            <Label htmlFor="rubrica" className="mb-2 block">
              Rubrica
            </Label>
            <Input
              id="rubrica"
              placeholder="Assinatura abreviada"
              onChange={(e) =>
                setFormData({ ...formData, rubrica: e.target.value })
              }
            />
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--chart-2)" }}
          onClick={handleExport}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
