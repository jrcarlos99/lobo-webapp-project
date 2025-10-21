"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { exportFormularioIndividual } from "@/utils/export";
import { formsConfig } from "@/utils/formsConfig";
import { useState } from "react";

export default function ProdutosPerigosos() {
  const [formData, setFormData] = useState({
    // 1. Identificação
    data: "",
    hora: "",
    municipio: "",
    bairro: "",
    rua: "",
    numero: "",
    referencia: "",

    // 2. Classificação
    tipoDesastre: "",
    grupo: "",

    // 3. Produto Envolvido
    produto: "",
    onu: "",
    classe: "",
    estado: "",
    recipiente: "",
    volume: "",
    responsavel: "",
    cpfcnpj: "",

    // 4. Impactos
    contaminados: "",
    irradiados: "",
    evacuados: "",
    obitos: "",
    feridos: "",
    areaIsolada: "",
    areaContaminada: "",
    areaEvacuada: "",
    solo: false,
    manancial: false,
    atmosfera: false,
    edificacoes: false,

    // 5. Ações Realizadas
    isolamento: false,
    contencao: false,
    neutralizacao: false,
    transbordo: false,
    interdicao: false,

    // 6. Resultado
    situacaoFinal: "",
    orgaos: "",

    // 7. Responsáveis
    bombeiro: "",
    comandante: "",
    matricula: "",
    telefone: "",
    rubrica: "",
  });

  const handleExport = () => {
    const { title, color } = formsConfig.produtos;
    exportFormularioIndividual(title, formData, {
      color,
      fields: [
        // 1. Identificação
        { key: "data", label: "Data" },
        { key: "hora", label: "Hora" },
        { key: "municipio", label: "Município" },
        { key: "bairro", label: "Bairro" },
        { key: "rua", label: "Rua" },
        { key: "numero", label: "Número" },
        { key: "referencia", label: "Referência" },

        // 2. Classificação
        { key: "tipoDesastre", label: "Tipo de Desastre" },
        { key: "grupo", label: "Grupo/Subgrupo" },

        // 3. Produto Envolvido
        { key: "produto", label: "Nome do Produto" },
        { key: "onu", label: "Nº ONU" },
        { key: "classe", label: "Classe de Risco" },
        { key: "estado", label: "Estado Físico" },
        { key: "recipiente", label: "Tipo de Recipiente" },
        { key: "volume", label: "Volume/Massa Estimada" },
        { key: "responsavel", label: "Responsável pelo Produto" },
        { key: "cpfcnpj", label: "CPF/CNPJ" },

        // 4. Impactos
        { key: "contaminados", label: "Contaminados" },
        { key: "irradiados", label: "Irradiados" },
        { key: "evacuados", label: "Evacuados" },
        { key: "obitos", label: "Óbitos" },
        { key: "feridos", label: "Feridos" },
        { key: "areaIsolada", label: "Área Isolada" },
        { key: "areaContaminada", label: "Área Contaminada" },
        { key: "areaEvacuada", label: "Área Evacuada" },
        { key: "solo", label: "Ambiente Afetado: Solo" },
        { key: "manancial", label: "Ambiente Afetado: Manancial" },
        { key: "atmosfera", label: "Ambiente Afetado: Atmosfera" },
        { key: "edificacoes", label: "Ambiente Afetado: Edificações" },

        // 5. Ações Realizadas
        { key: "isolamento", label: "Isolamento" },
        { key: "contencao", label: "Contenção" },
        { key: "neutralizacao", label: "Neutralização" },
        { key: "transbordo", label: "Transbordo / Remoção" },
        { key: "interdicao", label: "Interdição de via" },

        // 6. Resultado
        { key: "situacaoFinal", label: "Situação Final" },
        { key: "orgaos", label: "Órgãos Acionados" },

        // 7. Responsáveis
        { key: "bombeiro", label: "Bombeiro Responsável" },
        { key: "comandante", label: "Comandante da Operação" },
        { key: "matricula", label: "Matrícula" },
        { key: "telefone", label: "Telefone" },
        { key: "rubrica", label: "Rubrica" },
      ],
    });
  };

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
              <Input
                id="data"
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="hora" className="mb-2 block">
                Hora
              </Label>
              <Input
                id="hora"
                type="time"
                onChange={(e) =>
                  setFormData({ ...formData, hora: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="municipio" className="mb-2 block">
                Município
              </Label>
              <Input
                id="municipio"
                placeholder="Ex: Recife"
                onChange={(e) =>
                  setFormData({ ...formData, municipio: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bairro" className="mb-2 block">
                Bairro
              </Label>
              <Input
                id="bairro"
                onChange={(e) =>
                  setFormData({ ...formData, bairro: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="rua" className="mb-2 block">
                Rua
              </Label>
              <Input
                id="rua"
                onChange={(e) =>
                  setFormData({ ...formData, rua: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="numero" className="mb-2 block">
                Número
              </Label>
              <Input
                id="numero"
                onChange={(e) =>
                  setFormData({ ...formData, numero: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="referencia" className="mb-2 block">
              Referência
            </Label>
            <Input
              id="referencia"
              placeholder="Ex: Próximo ao posto de gasolina"
              onChange={(e) =>
                setFormData({ ...formData, referencia: e.target.value })
              }
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
              <Input
                id="tipoDesastre"
                placeholder="Ex: Vazamento, Explosão"
                onChange={(e) =>
                  setFormData({ ...formData, tipoDesastre: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="grupo" className="mb-2 block">
                Grupo/Subgrupo
              </Label>
              <Input
                id="grupo"
                placeholder="Ex: COBRADE 2.2.1.1.0"
                onChange={(e) =>
                  setFormData({ ...formData, grupo: e.target.value })
                }
              />
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
              <Input
                id="produto"
                placeholder="Ex: GLP, Ácido Sulfúrico"
                onChange={(e) =>
                  setFormData({ ...formData, produto: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="onu" className="mb-2 block">
                Nº ONU
              </Label>
              <Input
                id="onu"
                placeholder="Ex: 1830"
                onChange={(e) =>
                  setFormData({ ...formData, onu: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="classe" className="mb-2 block">
                Classe de Risco
              </Label>
              <Input
                id="classe"
                placeholder="Ex: Inflamável"
                onChange={(e) =>
                  setFormData({ ...formData, classe: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="estado" className="mb-2 block">
                Estado Físico
              </Label>
              <Input
                id="estado"
                placeholder="Sólido / Líquido / Gasoso"
                onChange={(e) =>
                  setFormData({ ...formData, estado: e.target.value })
                }
              />
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
                onChange={(e) =>
                  setFormData({ ...formData, recipiente: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="volume" className="mb-2 block">
                Volume/Massa Estimada
              </Label>
              <Input
                id="volume"
                placeholder="Ex: 200 litros"
                onChange={(e) =>
                  setFormData({ ...formData, volume: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="responsavel" className="mb-2 block">
                Responsável pelo Produto
              </Label>
              <Input
                id="responsavel"
                placeholder="Nome completo"
                onChange={(e) =>
                  setFormData({ ...formData, responsavel: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cpfcnpj" className="mb-2 block">
              CPF/CNPJ
            </Label>
            <Input
              id="cpfcnpj"
              placeholder="000.000.000-00 / 00.000.000/0001-00"
              onChange={(e) =>
                setFormData({ ...formData, cpfcnpj: e.target.value })
              }
            />
          </div>
        </section>

        {/* 4. Impactos */}
        <section className="space-y-4">
          <h2 className="font-semibold">Impactos</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              id="contaminados"
              placeholder="Contaminados"
              onChange={(e) =>
                setFormData({ ...formData, contaminados: e.target.value })
              }
            />
            <Input
              id="irradiados"
              placeholder="Irradiados"
              onChange={(e) =>
                setFormData({ ...formData, irradiados: e.target.value })
              }
            />
            <Input
              id="evacuados"
              placeholder="Evacuados"
              onChange={(e) =>
                setFormData({ ...formData, evacuados: e.target.value })
              }
            />
            <Input
              id="obitos"
              placeholder="Óbitos"
              onChange={(e) =>
                setFormData({ ...formData, obitos: e.target.value })
              }
            />
            <Input
              id="feridos"
              placeholder="Feridos"
              onChange={(e) =>
                setFormData({ ...formData, feridos: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="areaIsolada"
              placeholder="Área Isolada (m²/km²)"
              onChange={(e) =>
                setFormData({ ...formData, areaIsolada: e.target.value })
              }
            />
            <Input
              id="areaContaminada"
              placeholder="Área Contaminada (m²/km²)"
              onChange={(e) =>
                setFormData({ ...formData, areaContaminada: e.target.value })
              }
            />
            <Input
              id="areaEvacuada"
              placeholder="Área Evacuada (m²/km²)"
              onChange={(e) =>
                setFormData({ ...formData, areaEvacuada: e.target.value })
              }
            />
          </div>
          <div>
            <Label className="mb-2 block">Ambiente Afetado</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="solo"
                  checked={formData.solo}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, solo: checked as boolean })
                  }
                />
                <Label htmlFor="solo">Solo</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="manancial"
                  checked={formData.manancial}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, manancial: checked as boolean })
                  }
                />
                <Label htmlFor="manancial">Manancial</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="atmosfera"
                  checked={formData.atmosfera}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, atmosfera: checked as boolean })
                  }
                />
                <Label htmlFor="atmosfera">Atmosfera</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="edificacoes"
                  checked={formData.edificacoes}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      edificacoes: checked as boolean,
                    })
                  }
                />
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
              <Checkbox
                id="isolamento"
                checked={formData.isolamento}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    isolamento: checked as boolean,
                  })
                }
              />
              <Label htmlFor="isolamento">Isolamento</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="contencao"
                checked={formData.contencao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    contencao: checked as boolean,
                  })
                }
              />
              <Label htmlFor="contencao">Contenção</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="neutralizacao"
                checked={formData.neutralizacao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    neutralizacao: checked as boolean,
                  })
                }
              />
              <Label htmlFor="neutralizacao">Neutralização</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="transbordo"
                checked={formData.transbordo}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    transbordo: checked as boolean,
                  })
                }
              />
              <Label htmlFor="transbordo">Transbordo / Remoção</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="interdicao"
                checked={formData.interdicao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    interdicao: checked as boolean,
                  })
                }
              />
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
                onChange={(e) =>
                  setFormData({ ...formData, situacaoFinal: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="orgaos" className="mb-2 block">
                Órgãos Acionados
              </Label>
              <Input
                id="orgaos"
                placeholder="Ex: Defesa Civil, IBAMA"
                onChange={(e) =>
                  setFormData({ ...formData, orgaos: e.target.value })
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
              <Label htmlFor="matricula" className="mb-2 block">
                Matrícula
              </Label>
              <Input
                id="matricula"
                placeholder="Ex: 123456-7"
                onChange={(e) =>
                  setFormData({ ...formData, matricula: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </section>

        {/* Botão Final */}
        <Button
          className="text-white w-full md:w-auto"
          style={{ backgroundColor: "var(--chart-4)" }}
          onClick={handleExport}
        >
          Salvar Formulário
        </Button>
      </CardContent>
    </Card>
  );
}
