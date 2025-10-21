"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { exportFormularioIndividual } from "@/utils/export";
import { formsConfig } from "@/utils/formsConfig";

export default function FolhaHistoricoPage() {
  const [formData, setFormData] = useState({
    pontoBase: "",
    ome: "",
    viatura: "",
    aviso: "",
    data: "",
    hora: "",
    tipo: "",
    codigo: "",
    sigilo: "",
    historico: "",
    posto: "",
    nomeGuerra: "",
    matricula: "",
    demaisGuarnicao: "",
    dataVisto: "",
    assinatura: "",
  });

  const handleExport = () => {
    const { title, color } = formsConfig.historico;
    exportFormularioIndividual(title, formData, {
      color,
      fields: [
        { key: "pontoBase", label: "Ponto Base" },
        { key: "ome", label: "OME / Seção" },
        { key: "viatura", label: "Viatura Responsável" },
        { key: "aviso", label: "Nº do Aviso" },
        { key: "data", label: "Data" },
        { key: "hora", label: "Hora" },
        { key: "tipo", label: "Tipo" },
        { key: "codigo", label: "Código" },
        { key: "sigilo", label: "Sigilo" },
        { key: "historico", label: "Histórico" },
        { key: "posto", label: "Posto/Graduação" },
        { key: "nomeGuerra", label: "Nome de Guerra" },
        { key: "matricula", label: "Matrícula" },
        { key: "demaisGuarnicao", label: "Demais componentes da guarnição" },
        { key: "dataVisto", label: "Data Visto" },
        { key: "assinatura", label: "Assinatura / Rubrica" },
      ],
    });
  };

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <Input
              id="hora"
              type="time"
              onChange={(e) =>
                setFormData({ ...formData, hora: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="tipo"
              placeholder="Tipo"
              onChange={(e) =>
                setFormData({ ...formData, tipo: e.target.value })
              }
            />
            <Input
              id="codigo"
              placeholder="Código"
              onChange={(e) =>
                setFormData({ ...formData, codigo: e.target.value })
              }
            />
            <Input
              id="sigilo"
              placeholder="Sigilo"
              onChange={(e) =>
                setFormData({ ...formData, sigilo: e.target.value })
              }
            />
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
            <Input
              id="posto"
              placeholder="Posto/Graduação"
              onChange={(e) =>
                setFormData({ ...formData, posto: e.target.value })
              }
            />
            <Input
              id="nomeGuerra"
              placeholder="Nome de Guerra"
              onChange={(e) =>
                setFormData({ ...formData, nomeGuerra: e.target.value })
              }
            />
            <Input
              id="matricula"
              placeholder="Matrícula"
              onChange={(e) =>
                setFormData({ ...formData, matricula: e.target.value })
              }
            />
            <Input
              id="nomeGuerra"
              placeholder="Nome de Guerra"
              onChange={(e) =>
                setFormData({ ...formData, nomeGuerra: e.target.value })
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
          <Textarea placeholder="Demais componentes da guarnição" />
        </section>

        {/* 4. Visto da Divisão de Operações */}
        <section className="space-y-4">
          <h2 className="font-semibold">Visto da Divisão de Operações</h2>
          <Input
            id="dataVisto"
            type="date"
            onChange={(e) =>
              setFormData({ ...formData, dataVisto: e.target.value })
            }
          />
          <Input
            id="assinatura"
            placeholder="Assinatura / Rubrica"
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
          Salvar Histórico
        </Button>
      </CardContent>
    </Card>
  );
}
