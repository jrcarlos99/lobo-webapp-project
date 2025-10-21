"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { exportFormularioIndividual } from "@/utils/export";
import { formsConfig } from "@/utils/formsConfig";
import { useState } from "react";

export default function MergulhoPage() {
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    ome: "",
    viatura: "",
    aviso: "",
    data: "",
    hora: "",

    // 2. Classificação
    grupo: "",
    tipoBusca: "",

    // 3. Local
    local: "",
    referencia: "",

    // 4. Vítimas
    qualificacao: "",
    qtdVítimas: "",
    vitimaLocalizada: "",
    cadaverLocalizado: "",
    bombeiroServico: "",

    // 5. Operação de Mergulho
    tipoOperacao: "",
    numMergulhadores: "",
    profundidade: "",
    tempoFundo: "",
    tempoTotal: "",
    correnteza: "",
    tipoFundo: "",
    ambiente: "",
    coordenadas: "",

    // 6. Recursos
    cilindroNum: "",
    barInicio: "",
    barFim: "",
    outrosRecursos: "",

    // 7. Responsáveis
    mergulhadorMatricula: "",
    mergulhadorNome: "",
    bombeiro: "",
    comandante: "",
    telefone: "",
    rubrica: "",
  });

  const handleExport = () => {
    const { title, color } = formsConfig.mergulho;
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

        // 2. Classificação
        { key: "grupo", label: "Grupo/Subgrupo" },
        { key: "tipoBusca", label: "Tipo de Busca/Salvamento" },

        // 3. Local
        { key: "local", label: "Local da Operação" },
        { key: "referencia", label: "Referência/Especificação" },

        // 4. Vítimas
        { key: "qualificacao", label: "Qualificação da Vítima" },
        { key: "qtdVítimas", label: "Quantidade de Vítimas" },
        { key: "vitimaLocalizada", label: "Vítima Localizada" },
        { key: "cadaverLocalizado", label: "Cadáver Localizado" },
        { key: "bombeiroServico", label: "Bombeiro em Serviço" },

        // 5. Operação de Mergulho
        { key: "tipoOperacao", label: "Tipo de Operação" },
        { key: "numMergulhadores", label: "Nº de Mergulhadores" },
        { key: "profundidade", label: "Profundidade (m)" },
        { key: "tempoFundo", label: "Tempo de Fundo" },
        { key: "tempoTotal", label: "Tempo Total Submerso" },
        { key: "correnteza", label: "Correnteza" },
        { key: "tipoFundo", label: "Tipo de Fundo" },
        { key: "ambiente", label: "Ambiente" },
        { key: "coordenadas", label: "Coordenadas" },

        // 6. Recursos
        { key: "cilindroNum", label: "Cilindro Nº" },
        { key: "barInicio", label: "Pressão Inicial (bar)" },
        { key: "barFim", label: "Pressão Final (bar)" },
        { key: "outrosRecursos", label: "Outros Recursos" },

        // 7. Responsáveis
        { key: "mergulhadorMatricula", label: "Matrícula do Mergulhador" },
        { key: "mergulhadorNome", label: "Nome de Guerra do Mergulhador" },
        { key: "bombeiro", label: "Bombeiro Responsável" },
        { key: "comandante", label: "Comandante da Operação" },
        { key: "telefone", label: "Telefone" },
        { key: "rubrica", label: "Rubrica" },
      ],
    });
  };

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
        </section>

        {/* 2. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <Input
            id="grupo"
            placeholder="Grupo/Subgrupo"
            onChange={(e) =>
              setFormData({ ...formData, grupo: e.target.value })
            }
          />
          <Input
            id="tipoBusca"
            placeholder="Tipo de Busca/Salvamento"
            onChange={(e) =>
              setFormData({ ...formData, tipoBusca: e.target.value })
            }
          />
          <Input
            id="tipoBusca"
            placeholder="Tipo de Busca/Salvamento"
            onChange={(e) =>
              setFormData({ ...formData, tipoBusca: e.target.value })
            }
          />
        </section>

        {/* 3. Local */}
        <section className="space-y-4">
          <h2 className="font-semibold">Local da Operação</h2>
          <Input
            id="local"
            placeholder="Ex: Mar, Rio, Represa, Açude"
            onChange={(e) =>
              setFormData({ ...formData, local: e.target.value })
            }
          />
          <Input
            id="referencia"
            placeholder="Referência/Especificação"
            onChange={(e) =>
              setFormData({ ...formData, referencia: e.target.value })
            }
          />
        </section>

        {/* 4. Vítimas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Vítimas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="qualificacao"
              placeholder="Qualificação da Vítima"
              onChange={(e) =>
                setFormData({ ...formData, qualificacao: e.target.value })
              }
            />
            <Input
              id="qtdVítimas"
              type="number"
              placeholder="Quantidade de Vítimas"
              onChange={(e) =>
                setFormData({ ...formData, qtdVítimas: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="vitimaLocalizada"
              placeholder="Vítima Localizada? Sim/Não"
              onChange={(e) =>
                setFormData({ ...formData, vitimaLocalizada: e.target.value })
              }
            />
            <Input
              id="cadaverLocalizado"
              placeholder="Cadáver Localizado? Sim/Não"
              onChange={(e) =>
                setFormData({ ...formData, cadaverLocalizado: e.target.value })
              }
            />
            <Input
              id="bombeiroServico"
              placeholder="Bombeiro em Serviço? Sim/Não"
              onChange={(e) =>
                setFormData({ ...formData, bombeiroServico: e.target.value })
              }
            />
          </div>
        </section>

        {/* 5. Operação de Mergulho */}
        <section className="space-y-4">
          <h2 className="font-semibold">Operação de Mergulho</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="tipoOperacao"
              placeholder="Tipo de Operação"
              onChange={(e) =>
                setFormData({ ...formData, tipoOperacao: e.target.value })
              }
            />
            <Input
              id="numMergulhadores"
              type="number"
              placeholder="Nº de Mergulhadores"
              onChange={(e) =>
                setFormData({ ...formData, numMergulhadores: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              id="profundidade"
              placeholder="Profundidade (m)"
              onChange={(e) =>
                setFormData({ ...formData, profundidade: e.target.value })
              }
            />
            <Input
              id="tempoFundo"
              placeholder="Tempo de Fundo"
              onChange={(e) =>
                setFormData({ ...formData, tempoFundo: e.target.value })
              }
            />
            <Input
              id="tempoTotal"
              placeholder="Tempo Total Submerso"
              onChange={(e) =>
                setFormData({ ...formData, tempoTotal: e.target.value })
              }
            />
            <Input
              id="correnteza"
              placeholder="Correnteza (Sim/Não)"
              onChange={(e) =>
                setFormData({ ...formData, correnteza: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="tipoFundo"
              placeholder="Tipo de Fundo (Areia, Pedras...)"
              onChange={(e) =>
                setFormData({ ...formData, tipoFundo: e.target.value })
              }
            />
            <Input
              id="ambiente"
              placeholder="Ambiente (Normal, Poluído...)"
              onChange={(e) =>
                setFormData({ ...formData, ambiente: e.target.value })
              }
            />
            <Input
              id="coordenadas"
              placeholder="Coordenadas (Lat/Long)"
              onChange={(e) =>
                setFormData({ ...formData, coordenadas: e.target.value })
              }
            />
          </div>
        </section>

        {/* 6. Recursos */}
        <section className="space-y-4">
          <h2 className="font-semibold">Recursos Utilizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="cilindroNum"
              placeholder="Cilindro Nº"
              onChange={(e) =>
                setFormData({ ...formData, cilindroNum: e.target.value })
              }
            />
            <Input
              id="barInicio"
              placeholder="Pressão Inicial (bar)"
              onChange={(e) =>
                setFormData({ ...formData, barInicio: e.target.value })
              }
            />
            <Input
              id="barFim"
              placeholder="Pressão Final (bar)"
              onChange={(e) =>
                setFormData({ ...formData, barFim: e.target.value })
              }
            />
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
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mergulhadorMatricula: e.target.value,
                })
              }
            />
            <Input
              id="mergulhadorNome"
              placeholder="Nome de Guerra do Mergulhador"
              onChange={(e) =>
                setFormData({ ...formData, mergulhadorNome: e.target.value })
              }
            />
          </div>
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
              id="telefone"
              type="tel"
              placeholder="(81) 99999-9999"
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
            />
          </div>
          <Input
            id="rubrica"
            placeholder="Rubrica"
            onChange={(e) =>
              setFormData({ ...formData, rubrica: e.target.value })
            }
          />
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
