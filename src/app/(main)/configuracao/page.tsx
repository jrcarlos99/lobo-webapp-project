import { AppDatePicker } from "@/components/AppDatePicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThemeRadioGroup } from "@/components/AppModoToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppDatePicker />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Configurações
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <Separator />
          <CardDescription>
            Gerencie suas informações de perfil e preferências
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Avatar className="h-40 w-40">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h3 className="text-sm font-medium text-blue-600">
                Alterar Imagem
              </h3>
            </div>

            <div className="md:col-span-2 space-y-4">
              <Separator className="md:hidden" />

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="fullname">Nome Completo</Label>
                <Input
                  type="text"
                  id="fullname"
                  defaultValue="Juliana Melo Silveira"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  type="email"
                  id="email"
                  defaultValue="juli.silveira@lobo.com"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  id="password"
                  defaultValue="***********"
                />
              </div>

              <div className="space-y-4">
                <Label>Preferências</Label>
                <div className="grid gap-2">
                  <Label
                    htmlFor="theme"
                    className="text-sm font-normal whitespace-nowrap"
                  >
                    Tema
                  </Label>
                  <ThemeRadioGroup />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Salvar Alterações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
