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

export default function AtividadeComunitariaPage() {
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    ciops: "",
    viatura: "",
    aviso: "",
    data: "",

    // 2. Evento
    nomeEvento: "",
    horaInicio: "",
    horaFim: "",
    endereco: "",

    // 3. Responsável
    responsavel: "",
    cpf: "",
    instituicao: "",

    // 4. Classificação
    grupo: "",
    missao: "",
    publico: "",
    participantes: "",

    // 5. Atividades Executadas
    apoio: false,
    educativa: false,
    social: false,
    religiosa: false,
    acoesSociais: false,

    // 6. Recursos
    efetivo: "",
    viaturas: "",
    embarcacoes: "",
    equipamentos: "",
    estruturas: "",

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
    const { title, color } = formsConfig.comunitaria;
    exportFormularioIndividual(title, formData, {
      color,
      fields: [
        // 1. Identificação
        { key: "pontoBase", label: "Ponto Base" },
        { key: "ciops", label: "CIOPS / Seção" },
        { key: "viatura", label: "Viatura Responsável" },
        { key: "aviso", label: "Nº do Aviso" },
        { key: "data", label: "Data" },

        // 2. Evento
        { key: "nomeEvento", label: "Nome do Evento" },
        { key: "horaInicio", label: "Hora Início" },
        { key: "horaFim", label: "Hora Fim" },
        { key: "endereco", label: "Endereço" },

        // 3. Responsável
        { key: "responsavel", label: "Responsável pela Atividade" },
        { key: "cpf", label: "CPF" },
        { key: "instituicao", label: "Instituição" },

        // 4. Classificação
        { key: "grupo", label: "Grupo/Subgrupo" },
        { key: "missao", label: "Tipo de Missão" },
        { key: "publico", label: "Público Atendido" },
        { key: "participantes", label: "Nº de Pessoas" },

        // 5. Atividades Executadas
        { key: "apoio", label: "Apoio à Instituição" },
        { key: "educativa", label: "Interação Educativa" },
        { key: "social", label: "Interação Social" },
        { key: "religiosa", label: "Interação Religiosa" },
        { key: "acoesSociais", label: "Encaminhamento para Ações Sociais" },

        // 6. Recursos
        { key: "efetivo", label: "Efetivo" },
        { key: "viaturas", label: "Viaturas" },
        { key: "embarcacoes", label: "Embarcações" },
        { key: "equipamentos", label: "Equipamentos" },
        { key: "estruturas", label: "Estruturas de Apoio" },

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
            <Input
              id="pontoBase"
              placeholder="Ponto Base"
              onChange={(e) =>
                setFormData({ ...formData, pontoBase: e.target.value })
              }
            />
            <Input
              id="ciops"
              placeholder="CIOPS / Seção"
              onChange={(e) =>
                setFormData({ ...formData, ciops: e.target.value })
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
              id="horaInicio"
              type="time"
              placeholder="Hora Início"
              onChange={(e) =>
                setFormData({ ...formData, horaInicio: e.target.value })
              }
            />
            <Input
              id="horaFim"
              type="time"
              placeholder="Hora Fim"
              onChange={(e) =>
                setFormData({ ...formData, horaFim: e.target.value })
              }
            />
          </div>
          <Input
            id="endereco"
            placeholder="Endereço completo"
            onChange={(e) =>
              setFormData({ ...formData, endereco: e.target.value })
            }
          />
        </section>

        {/* 3. Responsável */}
        <section className="space-y-4">
          <h2 className="font-semibold">Responsável pela Atividade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="responsavel"
              placeholder="Nome do Responsável"
              onChange={(e) =>
                setFormData({ ...formData, responsavel: e.target.value })
              }
            />
            <Input
              id="cpf"
              placeholder="CPF"
              onChange={(e) =>
                setFormData({ ...formData, cpf: e.target.value })
              }
            />
          </div>
          <Input
            id="instituicao"
            placeholder="Instituição"
            onChange={(e) =>
              setFormData({ ...formData, instituicao: e.target.value })
            }
          />
        </section>

        {/* 4. Classificação */}
        <section className="space-y-4">
          <h2 className="font-semibold">Classificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="grupo"
              placeholder="Grupo/Subgrupo"
              onChange={(e) =>
                setFormData({ ...formData, grupo: e.target.value })
              }
            />
            <Input
              id="missao"
              placeholder="Tipo de Missão"
              onChange={(e) =>
                setFormData({ ...formData, missao: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="publico"
              placeholder="Público Atendido"
              onChange={(e) =>
                setFormData({ ...formData, publico: e.target.value })
              }
            />
            <Input
              id="participantes"
              placeholder="Nº de Pessoas"
              onChange={(e) =>
                setFormData({ ...formData, participantes: e.target.value })
              }
            />
          </div>
        </section>

        {/* 5. Atividades Executadas */}
        <section className="space-y-4">
          <h2 className="font-semibold">Atividades Executadas</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="apoio"
                checked={formData.apoio}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, apoio: checked as boolean })
                }
              />
              <Label htmlFor="apoio">Apoio à Instituição</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="educativa"
                checked={formData.educativa}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, educativa: checked as boolean })
                }
              />
              <Label htmlFor="educativa">Interação Educativa</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="social"
                checked={formData.social}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, social: checked as boolean })
                }
              />
              <Label htmlFor="social">Interação Social</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="religiosa"
                checked={formData.religiosa}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, religiosa: checked as boolean })
                }
              />
              <Label htmlFor="religiosa">Interação Religiosa</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="acoesSociais"
                checked={formData.acoesSociais}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acoesSociais: checked as boolean })
                }
              />
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
            <Input
              id="efetivo"
              placeholder="Efetivo"
              onChange={(e) =>
                setFormData({ ...formData, efetivo: e.target.value })
              }
            />
            <Input
              id="viaturas"
              placeholder="Viaturas"
              onChange={(e) =>
                setFormData({ ...formData, viaturas: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="embarcacoes"
              placeholder="Embarcações"
              onChange={(e) =>
                setFormData({ ...formData, embarcacoes: e.target.value })
              }
            />
            <Input
              id="equipamentos"
              placeholder="Equipamentos"
              onChange={(e) =>
                setFormData({ ...formData, equipamentos: e.target.value })
              }
            />
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
          style={{ backgroundColor: "var(--color-craque)" }}
          onClick={handleExport}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
