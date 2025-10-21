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

export default function FormBasico() {
  const [formData, setFormData] = useState({
    pontoBase: "",
    ome: "",
    viatura: "",
    aviso: "",
    data: "",
    hora: "",
    formaAcionamento: "",
    situacao: "",
    logradouro: "",
    numero: "",
    bairro: "",
    referencia: "",
    coordenadas: "",
    nomeSolicitante: "",
    cpfSolicitante: "",
    telefoneSolicitante: "",
    natureza: "",
    vitimaIlesa: false,
    vitimaLeve: false,
    vitimaGrave: false,
    vitimaObito: false,
    viaturasApoio: "",
    instituicoesApoio: "",
    historico: "",
    posto: "",
    nomeGuerra: "",
    matricula: "",
    dataVisto: "",
    assinatura: "",
  });

  const handleExport = () => {
    const { title, color } = formsConfig.basico;
    exportFormularioIndividual(title, formData, {
      color,
      fields: [
        // 1. Identificação
        { key: "pontoBase", label: "Ponto Base" },
        { key: "ome", label: "OME / Seção" },
        { key: "viatura", label: "Viatura Responsável" },
        { key: "aviso", label: "Nº do Aviso" },
        { key: "data", label: "Data" },
        { key: "hora", label: "Hora" },
        { key: "formaAcionamento", label: "Forma de Acionamento" },
        { key: "situacao", label: "Situação da Ocorrência" },

        // 2. Local
        { key: "logradouro", label: "Logradouro" },
        { key: "numero", label: "Número" },
        { key: "bairro", label: "Bairro" },
        { key: "referencia", label: "Referência" },
        { key: "coordenadas", label: "Coordenadas" },

        // 3. Solicitante
        { key: "nomeSolicitante", label: "Nome do Solicitante" },
        { key: "cpfSolicitante", label: "CPF/RG" },
        { key: "telefoneSolicitante", label: "Telefone" },

        // 4. Natureza
        { key: "natureza", label: "Natureza da Ocorrência" },

        // 5. Vítimas
        { key: "vitimaIlesa", label: "Vítima Ilesa" },
        { key: "vitimaLeve", label: "Ferido Leve" },
        { key: "vitimaGrave", label: "Ferido Grave" },
        { key: "vitimaObito", label: "Óbito" },

        // 6. Apoio
        { key: "viaturasApoio", label: "Viaturas de Apoio" },
        { key: "instituicoesApoio", label: "Instituições de Apoio" },

        // 7. Histórico
        { key: "historico", label: "Histórico Resumido" },

        // 8. Guarnição
        { key: "posto", label: "Posto/Graduação" },
        { key: "nomeGuerra", label: "Nome de Guerra" },
        { key: "matricula", label: "Matrícula" },

        // 9. Visto
        { key: "dataVisto", label: "Data Visto" },
        { key: "assinatura", label: "Assinatura / Rubrica" },
      ],
    });
  };

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
            <Input
              id="pontoBase"
              placeholder="Ponto Base"
              value={formData.pontoBase}
              onChange={(e) =>
                setFormData({ ...formData, pontoBase: e.target.value })
              }
            />
            <Input
              id="ome"
              placeholder="OME / Seção"
              value={formData.ome}
              onChange={(e) =>
                setFormData({ ...formData, ome: e.target.value })
              }
            />
            <Input
              id="viatura"
              placeholder="Viatura Responsável"
              value={formData.viatura}
              onChange={(e) =>
                setFormData({ ...formData, viatura: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="aviso"
              placeholder="Nº do Aviso"
              value={formData.aviso}
              onChange={(e) =>
                setFormData({ ...formData, aviso: e.target.value })
              }
            />
            <Input
              id="data"
              type="date"
              value={formData.data}
              onChange={(e) =>
                setFormData({ ...formData, data: e.target.value })
              }
            />
            <Input
              id="hora"
              type="time"
              value={formData.hora}
              onChange={(e) =>
                setFormData({ ...formData, hora: e.target.value })
              }
            />
          </div>
          <Input
            id="formaAcionamento"
            placeholder="Forma de Acionamento (CIODS, Direto...)"
            value={formData.formaAcionamento}
            onChange={(e) =>
              setFormData({ ...formData, formaAcionamento: e.target.value })
            }
          />
          <Input
            id="situacao"
            placeholder="Situação da Ocorrência (Atendida, Não Atendida...)"
            value={formData.situacao}
            onChange={(e) =>
              setFormData({ ...formData, situacao: e.target.value })
            }
          />
        </section>

        {/* 2. Local */}
        <section className="space-y-4">
          <h2 className="font-semibold">Local da Ocorrência</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="logradouro"
              placeholder="Logradouro"
              value={formData.logradouro}
              onChange={(e) =>
                setFormData({ ...formData, logradouro: e.target.value })
              }
            />
            <Input
              id="numero"
              placeholder="Número"
              value={formData.numero}
              onChange={(e) =>
                setFormData({ ...formData, numero: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="bairro"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={(e) =>
                setFormData({ ...formData, bairro: e.target.value })
              }
            />
            <Input
              id="referencia"
              placeholder="Ponto de Referência"
              value={formData.referencia}
              onChange={(e) =>
                setFormData({ ...formData, referencia: e.target.value })
              }
            />
          </div>
          <Input
            id="coordenadas"
            placeholder="Coordenadas (Lat/Long)"
            value={formData.coordenadas}
            onChange={(e) =>
              setFormData({ ...formData, coordenadas: e.target.value })
            }
          />
        </section>

        {/* 3. Solicitante */}
        <section className="space-y-4">
          <h2 className="font-semibold">Solicitante</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="nomeSolicitante"
              placeholder="Nome"
              value={formData.nomeSolicitante}
              onChange={(e) =>
                setFormData({ ...formData, nomeSolicitante: e.target.value })
              }
            />
            <Input
              id="cpfSolicitante"
              placeholder="CPF / RG"
              value={formData.cpfSolicitante}
              onChange={(e) =>
                setFormData({ ...formData, cpfSolicitante: e.target.value })
              }
            />
            <Input
              id="telefoneSolicitante"
              placeholder="Telefone"
              value={formData.telefoneSolicitante}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  telefoneSolicitante: e.target.value,
                })
              }
            />
          </div>
        </section>

        {/* 4. Natureza */}
        <section className="space-y-4">
          <h2 className="font-semibold">Natureza da Ocorrência</h2>
          <Input
            id="natureza"
            placeholder="Ex: Acidente de trânsito, apoio a órgão público..."
            value={formData.natureza}
            onChange={(e) =>
              setFormData({ ...formData, natureza: e.target.value })
            }
          />
        </section>

        {/* 5. Vítimas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Vítimas Envolvidas</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="ilesa"
                checked={formData.vitimaIlesa}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, vitimaIlesa: checked as boolean })
                }
              />
              <Label htmlFor="ilesa">Ilesa</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="leve"
                checked={formData.vitimaLeve}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, vitimaLeve: checked as boolean })
                }
              />
              <Label htmlFor="leve">Ferido Leve</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="grave"
                checked={formData.vitimaGrave}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, vitimaGrave: checked as boolean })
                }
              />
              <Label htmlFor="grave">Ferido Grave</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="obito"
                checked={formData.vitimaObito}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, vitimaObito: checked as boolean })
                }
              />
              <Label htmlFor="obito">Óbito</Label>
            </div>
          </div>
        </section>

        {/* 6. Apoio */}
        <section className="space-y-4">
          <h2 className="font-semibold">Viaturas / Apoio</h2>
          <Textarea
            placeholder="Viaturas envolvidas"
            value={formData.viaturasApoio}
            onChange={(e) =>
              setFormData({ ...formData, viaturasApoio: e.target.value })
            }
          />
          <Textarea
            placeholder="Instituições de apoio (SAMU, PM, Guarda Municipal...)"
            value={formData.instituicoesApoio}
            onChange={(e) =>
              setFormData({ ...formData, instituicoesApoio: e.target.value })
            }
          />
        </section>

        {/* 7. Histórico */}
        <section className="space-y-4">
          <h2 className="font-semibold">Histórico Resumido</h2>
          <Textarea
            placeholder="Descreva de forma objetiva os fatos"
            rows={6}
            value={formData.historico}
            onChange={(e) =>
              setFormData({ ...formData, historico: e.target.value })
            }
          />
        </section>

        {/* 8. Guarnição */}
        <section className="space-y-4">
          <h2 className="font-semibold">Guarnição Empenhada</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="posto"
              placeholder="Posto/Graduação"
              value={formData.posto}
              onChange={(e) =>
                setFormData({ ...formData, posto: e.target.value })
              }
            />
            <Input
              id="nomeGuerra"
              placeholder="Nome de Guerra"
              value={formData.nomeGuerra}
              onChange={(e) =>
                setFormData({ ...formData, nomeGuerra: e.target.value })
              }
            />
            <Input
              id="matricula"
              placeholder="Matrícula"
              value={formData.matricula}
              onChange={(e) =>
                setFormData({ ...formData, matricula: e.target.value })
              }
            />
          </div>
        </section>

        {/* 9. Visto */}
        <section className="space-y-4">
          <h2 className="font-semibold">Visto da Divisão de Operações</h2>
          <Input
            id="dataVisto"
            type="date"
            value={formData.dataVisto}
            onChange={(e) =>
              setFormData({ ...formData, dataVisto: e.target.value })
            }
          />
          <Input
            id="assinatura"
            placeholder="Assinatura / Rubrica"
            value={formData.assinatura}
            onChange={(e) =>
              setFormData({ ...formData, assinatura: e.target.value })
            }
          />
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--color-gray)" }}
          onClick={handleExport}
        >
          Exportar PDF
        </Button>
      </CardContent>
    </Card>
  );
}
