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

export default function PrevencaoPage() {
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    ome: "",
    viatura: "",
    aviso: "",
    data: "",

    // 2. Evento
    nomeEvento: "",
    horaChegada: "",
    horaSaida: "",
    documento: "",

    // 3. Classificação
    regularizadoSim: false,
    regularizadoNao: false,
    cgo: "",
    grupo: "",

    // 4. Responsável pelo Evento
    responsavel: "",
    cpfcnpj: "",
    publicoEstimado: "",
    publicoPresente: "",

    // 5. Prevenção Executada
    apoio: false,
    aquatica: false,
    festivo: false,
    esportivo: false,

    // 6. Condições e Estruturas
    condicaoSistema: "",
    responsaveis: "",
    estruturas: "",
    regularidade: "",

    // 7. Informações Adicionais
    adicionais: "",

    // 8. Responsáveis
    bombeiro: "",
    comandante: "",
    matricula: "",
    telefone: "",
    rubrica: "",
  });

  const handleExport = () => {
    const { title, color } = formsConfig.prevencao;
    exportFormularioIndividual(title, formData, {
      color,
      fields: [
        // 1. Identificação
        { key: "pontoBase", label: "Ponto Base" },
        { key: "ome", label: "OME / Seção" },
        { key: "viatura", label: "Viatura Responsável" },
        { key: "aviso", label: "Nº do Aviso" },
        { key: "data", label: "Data" },

        // 2. Evento
        { key: "nomeEvento", label: "Nome do Evento" },
        { key: "horaChegada", label: "Hora Chegada" },
        { key: "horaSaida", label: "Hora Saída" },
        { key: "documento", label: "Documento de Referência" },

        // 3. Classificação
        { key: "regularizadoSim", label: "Evento Regularizado (Sim)" },
        { key: "regularizadoNao", label: "Evento Regularizado (Não)" },
        { key: "cgo", label: "Código CGO" },
        { key: "grupo", label: "Grupo/Subgrupo" },

        // 4. Responsável pelo Evento
        { key: "responsavel", label: "Responsável pelo Evento" },
        { key: "cpfcnpj", label: "CPF/CNPJ" },
        { key: "publicoEstimado", label: "Público Estimado" },
        { key: "publicoPresente", label: "Público Presente" },

        // 5. Prevenção Executada
        { key: "apoio", label: "Apoio à Operação" },
        { key: "aquatica", label: "Prevenção Aquática" },
        { key: "festivo", label: "Evento Festivo" },
        { key: "esportivo", label: "Evento Esportivo" },

        // 6. Condições e Estruturas
        { key: "condicaoSistema", label: "Condição do Sistema Preventivo" },
        { key: "responsaveis", label: "Responsáveis" },
        { key: "estruturas", label: "Estruturas de Apoio" },
        { key: "regularidade", label: "Regularidade da Documentação" },

        // 7. Informações Adicionais
        { key: "adicionais", label: "Informações Adicionais" },

        // 8. Responsáveis
        { key: "bombeiro", label: "Bombeiro Responsável" },
        { key: "comandante", label: "Comandante da Operação" },
        { key: "matricula", label: "Matrícula" },
        { key: "telefone", label: "Telefone" },
        { key: "rubrica", label: "Rubrica" },
      ],
    });
  };

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
            <Input
              id="pontoBase"
              placeholder="Ponto Base"
              onChange={(e) =>
                setFormData({ ...formData, pontoBase: e.target.value })
              }
            />
            <Input
              id="ome"
              placeholder="OME / Seção"
              onChange={(e) =>
                setFormData({ ...formData, ome: e.target.value })
              }
            />
            <Input
              id="viatura"
              placeholder="Viatura Responsável"
              onChange={(e) =>
                setFormData({ ...formData, viatura: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="aviso"
              placeholder="Nº do Aviso"
              onChange={(e) =>
                setFormData({ ...formData, aviso: e.target.value })
              }
            />
            <Input
              id="data"
              type="date"
              onChange={(e) =>
                setFormData({ ...formData, data: e.target.value })
              }
            />
          </div>
        </section>

        {/* 2. Evento */}
        <section className="space-y-4">
          <h2 className="font-semibold">Evento</h2>
          <Input
            id="nomeEvento"
            placeholder="Nome do Evento"
            onChange={(e) =>
              setFormData({ ...formData, nomeEvento: e.target.value })
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="horaChegada"
              type="time"
              placeholder="Hora Chegada"
              onChange={(e) =>
                setFormData({ ...formData, horaChegada: e.target.value })
              }
            />
            <Input
              id="horaSaida"
              type="time"
              placeholder="Hora Saída"
              onChange={(e) =>
                setFormData({ ...formData, horaSaida: e.target.value })
              }
            />
          </div>
          <Input
            id="documento"
            placeholder="Documento de Referência"
            onChange={(e) =>
              setFormData({ ...formData, documento: e.target.value })
            }
          />
        </section>

        {/* 3. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="flex items-center gap-6">
            <Label>Evento Regularizado?</Label>
            <div className="flex items-center gap-2">
              <Checkbox
                id="regularizadoSim"
                checked={formData.regularizadoSim}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    regularizadoSim: checked as boolean,
                  })
                }
              />
              <Label htmlFor="regularizadoSim">Sim</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="regularizadoNao"
                checked={formData.regularizadoNao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    regularizadoNao: checked as boolean,
                  })
                }
              />
              <Label htmlFor="regularizadoNao">Não</Label>
            </div>
          </div>
          <Input
            id="cgo"
            placeholder="Código CGO"
            onChange={(e) => setFormData({ ...formData, cgo: e.target.value })}
          />
          <Input
            id="grupo"
            placeholder="Grupo/Subgrupo (por extenso)"
            onChange={(e) =>
              setFormData({ ...formData, grupo: e.target.value })
            }
          />
        </section>

        {/* 4. Responsável pelo Evento */}
        <section className="space-y-4">
          <h2 className="font-semibold">Responsável pelo Evento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="responsavel"
              placeholder="Nome do Responsável"
              onChange={(e) =>
                setFormData({ ...formData, responsavel: e.target.value })
              }
            />
            <Input
              id="cpfcnpj"
              placeholder="CPF / CNPJ"
              onChange={(e) =>
                setFormData({ ...formData, cpfcnpj: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="publicoEstimado"
              placeholder="Público Estimado"
              onChange={(e) =>
                setFormData({ ...formData, publicoEstimado: e.target.value })
              }
            />
            <Input
              id="publicoPresente"
              placeholder="Público Presente"
              onChange={(e) =>
                setFormData({ ...formData, publicoPresente: e.target.value })
              }
            />
          </div>
        </section>

        {/* 5. Prevenção Executada */}
        <section className="space-y-4">
          <h2 className="font-semibold">Prevenção Executada</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="apoio"
                checked={formData.apoio}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    apoio: checked as boolean,
                  })
                }
              />
              <Label htmlFor="apoio">Apoio à Operação</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="aquatica"
                checked={formData.aquatica}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    aquatica: checked as boolean,
                  })
                }
              />
              <Label htmlFor="aquatica">Prevenção Aquática</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="festivo"
                checked={formData.festivo}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    festivo: checked as boolean,
                  })
                }
              />
              <Label htmlFor="festivo">Evento Festivo</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="esportivo"
                checked={formData.esportivo}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    esportivo: checked as boolean,
                  })
                }
              />
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
            onChange={(e) =>
              setFormData({ ...formData, responsaveis: e.target.value })
            }
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
            <Input
              id="bombeiro"
              placeholder="Bombeiro Responsável"
              onChange={(e) =>
                setFormData({ ...formData, bombeiro: e.target.value })
              }
            />
            <Input
              id="comandante"
              placeholder="Comandante da Operação"
              onChange={(e) =>
                setFormData({ ...formData, comandante: e.target.value })
              }
            />
            <Input
              id="matricula"
              placeholder="Matrícula"
              onChange={(e) =>
                setFormData({ ...formData, matricula: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="telefone"
              type="tel"
              placeholder="(81) 99999-9999"
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
            />
            <Input
              id="rubrica"
              placeholder="Rubrica"
              onChange={(e) =>
                setFormData({ ...formData, rubrica: e.target.value })
              }
            />
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--color-prevention)" }}
          onClick={handleExport}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
