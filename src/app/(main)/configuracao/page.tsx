"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThemeRadioGroup } from "@/components/AppModoToggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { EditableAvatar } from "@/components/AppEditableAvatar";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import { useCurrentUser } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type ActiveMainSection = "conta" | "tema" | "notificacoes" | "privacidade";

export default function SettingsPage() {
  const [activeMainSection, setActiveMainSection] =
    useState<ActiveMainSection>("conta");
  const [activeContaSubSection, setActiveContaSubSection] = useState<
    "informacoes" | "preferencias" | "redefinir-senha"
  >("informacoes");

  const { data: currentUser } = useCurrentUser();
  const { uploadAvatar, isUploading } = useAvatarUpload();

  const handleImageChange = async (file: File) => {
    await uploadAvatar(file);
  };
  const getInitials = (name?: string) => {
    if (!name) return "US";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="bg-primary-foreground p-4 rounded-lg">
        <h1 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--color-text)] text-center sm:text-left">
          Configurações
        </h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 border-b lg:border-b-0 lg:border-r p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Perfil do Usuário */}
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <EditableAvatar
                  src={currentUser?.avatarUrl}
                  alt={` Avatar de ${currentUser?.nome || "Usuário"}`}
                  fallback={getInitials(currentUser?.nome)}
                  onImageChange={handleImageChange}
                  isUploading={isUploading}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">
                    {currentUser?.nome || "Usuário"}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {currentUser?.cargo || "Cargo não definido"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {currentUser?.regiaoAutorizada || "Região não definida"}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Menu de Navegação */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveMainSection("conta")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors text-sm sm:text-base",
                    activeMainSection === "conta"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  Conta
                </button>
                <button
                  onClick={() => setActiveMainSection("tema")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors text-sm sm:text-base",
                    activeMainSection === "tema"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  Tema
                </button>
                <button
                  onClick={() => setActiveMainSection("notificacoes")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors text-sm sm:text-base",
                    activeMainSection === "notificacoes"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  Notificações
                </button>
                <button
                  onClick={() => setActiveMainSection("privacidade")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors text-sm sm:text-base",
                    activeMainSection === "privacidade"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  Privacidade
                </button>
              </nav>
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1 p-4 sm:p-6">
              {activeMainSection === "conta" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Conta</h3>

                  {/* Submenu da Conta */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b pb-4">
                    <button
                      onClick={() => setActiveContaSubSection("informacoes")}
                      className={cn(
                        "px-3 py-2 border-b-2 transition-colors text-left text-sm sm:text-base",
                        activeContaSubSection === "informacoes"
                          ? "border-primary text-primary"
                          : "border-transparent hover:border-gray-300"
                      )}
                    >
                      Informações
                    </button>
                    <button
                      onClick={() => setActiveContaSubSection("preferencias")}
                      className={cn(
                        "px-3 py-2 border-b-2 transition-colors text-left text-sm sm:text-base",
                        activeContaSubSection === "preferencias"
                          ? "border-primary text-primary"
                          : "border-transparent hover:border-gray-300"
                      )}
                    >
                      Preferências
                    </button>
                    <button
                      onClick={() =>
                        setActiveContaSubSection("redefinir-senha")
                      }
                      className={cn(
                        "px-3 py-2 border-b-2 transition-colors text-left text-sm sm:text-base",
                        activeContaSubSection === "redefinir-senha"
                          ? "border-primary text-primary"
                          : "border-transparent hover:border-gray-300"
                      )}
                    >
                      Redefinir Senha
                    </button>
                  </div>

                  {/* Conteúdo da Subseção de Conta */}
                  {activeContaSubSection === "informacoes" && (
                    <div className="space-y-6">
                      {/* Informações Pessoais */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input type="text" id="name" defaultValue="Juliana" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            type="email"
                            id="email"
                            defaultValue="juliana.silveira@lobo.com.br"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="lastname">Sobrenome</Label>
                          <Input
                            type="text"
                            id="lastname"
                            defaultValue="Silveira"
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Telefone, Senha e NIP */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Telefone</Label>
                          <Input defaultValue="(81) 99734-7823" />
                        </div>
                        <div className="space-y-2">
                          <Label>Senha</Label>
                          <Input
                            type="password"
                            defaultValue="***************"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>NIP</Label>
                          <Input defaultValue="010234-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeContaSubSection === "preferencias" && (
                    <div className="space-y-6">
                      <h4 className="font-medium">Preferências da Conta</h4>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="space-y-0.5">
                            <Label>Idioma do Sistema</Label>
                            <p className="text-sm text-muted-foreground">
                              Português (Brasil)
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            Alterar
                          </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="space-y-0.5">
                            <Label>Fuso Horário</Label>
                            <p className="text-sm text-muted-foreground">
                              America/Recife (GMT-3)
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            Alterar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeContaSubSection === "redefinir-senha" && (
                    <div className="space-y-6">
                      <h4 className="font-medium">Redefinir Senha</h4>
                      <div className="grid grid-cols-1 gap-4 max-w-md">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Senha Atual</Label>
                          <Input type="password" id="current-password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nova Senha</Label>
                          <Input type="password" id="new-password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirmar Nova Senha
                          </Label>
                          <Input type="password" id="confirm-password" />
                        </div>
                      </div>
                      <Button className="w-full sm:w-auto">
                        Alterar Senha
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeMainSection === "tema" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Tema</h3>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Personalize sua experiência no LOBO: escolha um tema ou
                      sincronize automaticamente com as preferências do seu
                      sistema.
                    </p>

                    <div className="space-y-4">
                      <Label className="text-base">Tema</Label>
                      <ThemeRadioGroup />
                    </div>
                  </div>
                </div>
              )}

              {activeMainSection === "notificacoes" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Notificações</h3>

                  <div className="space-y-6">
                    {/* Tipos de Notificação */}
                    <div className="space-y-4">
                      <Label className="text-base">Alertas</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="alertas-ocorrencias" defaultChecked />
                          <Label
                            htmlFor="alertas-ocorrencias"
                            className="font-normal text-sm sm:text-base"
                          >
                            Alertas de novas ocorrências
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="atualizacoes-relatorios"
                            defaultChecked
                          />
                          <Label
                            htmlFor="atualizacoes-relatorios"
                            className="font-normal text-sm sm:text-base"
                          >
                            Atualizações de relatórios
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="falta-equipamento" defaultChecked />
                          <Label
                            htmlFor="falta-equipamento"
                            className="font-normal text-sm sm:text-base"
                          >
                            Falta de equipamento registrada
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mensagens-administrativas"
                            defaultChecked
                          />
                          <Label
                            htmlFor="mensagens-administrativas"
                            className="font-normal text-sm sm:text-base"
                          >
                            Mensagens administrativas
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Formato de Notificação */}
                    <div className="space-y-4">
                      <Label className="text-base">
                        Formato de Notificação
                      </Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notificacao-sistema" defaultChecked />
                          <Label
                            htmlFor="notificacao-sistema"
                            className="font-normal text-sm sm:text-base"
                          >
                            No sistema (painel do LOBO)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notificacao-email" defaultChecked />
                          <Label
                            htmlFor="notificacao-email"
                            className="font-normal text-sm sm:text-base"
                          >
                            E-mail institucional
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeMainSection === "privacidade" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Privacidade</h3>

                  <div className="space-y-6">
                    {/* Controles de Privacidade */}
                    <div className="space-y-4">
                      <Label className="text-base">
                        Controles de Privacidade
                      </Label>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="space-y-0.5">
                            <Label>Compartilhar dados analíticos</Label>
                            <p className="text-sm text-muted-foreground">
                              Ajude a melhorar o LOBO compartilhando dados de
                              uso anônimos
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="space-y-0.5">
                            <Label>Visibilidade do perfil</Label>
                            <p className="text-sm text-muted-foreground">
                              Controlar quem pode ver suas informações de perfil
                            </p>
                          </div>
                          <select className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto">
                            <option>Somente eu</option>
                            <option>Administradores</option>
                            <option>Todos os usuários</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Dados Pessoais */}
                    <div className="space-y-4">
                      <Label className="text-base">Seus Dados</Label>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="space-y-0.5">
                            <Label>Exportar dados</Label>
                            <p className="text-sm text-muted-foreground">
                              Baixe uma cópia de todos os seus dados no sistema
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            Exportar
                          </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="space-y-0.5">
                            <Label>Excluir conta</Label>
                            <p className="text-sm text-muted-foreground">
                              Remove permanentemente sua conta e todos os dados
                              associados
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            className="w-full sm:w-auto"
                          >
                            Excluir Conta
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Auditoria */}
                    <div className="space-y-4">
                      <Label className="text-base">Atividade Recente</Label>
                      <div className="space-y-2 text-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 gap-1">
                          <span>Login realizado</span>
                          <span className="text-muted-foreground">
                            Hoje, 14:30
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 gap-1">
                          <span>Perfil atualizado</span>
                          <span className="text-muted-foreground">
                            Ontem, 09:15
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 gap-1">
                          <span>Senha alterada</span>
                          <span className="text-muted-foreground">
                            12 set, 2024
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        Ver histórico completo
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Botão Salvar - Aparece em todas as seções */}
              <div className="flex justify-end mt-8">
                <Button className="w-full sm:w-auto">Salvar Alterações</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
