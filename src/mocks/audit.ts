import { LogDetail, User } from "@/types/user";
import { AuditLog } from "@/types/audit";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const getFallbackUsers = (): User[] => [
  {
    id: "u1",
    nomeCompleto: "Juliana Silveira",
    email: "juli.sil@lobo.com",
    cargo: "Admin",
    status: "active",
    regiao: "Zona da Mata",
    lastLogin: "2024-06-10T14:23:00Z",
    nip: "123456",
  },
  {
    id: "u2",
    nomeCompleto: "João Gomes",
    email: "joao.gomes@lobo.com",
    cargo: "Analista",
    status: "active",
    regiao: "Sertão",
    lastLogin: "2024-06-09T09:15:00Z",
    nip: "654321",
  },
];

export const generateMockReports = (
  count: number,
  users?: User[]
): AuditLog[] => {
  const sourceUsers = users && users.length ? users : getFallbackUsers();
  const actions = [
    "Login",
    "Logout",
    "Alterar Senha",
    "Recuperar Senha",
    "Atualizar Imagem",
    "Criar Conta",
    "Editar Perfil",
    "Alterar Permissões",
    "Alterar Email",
    "Revogar Permissões",
  ];
  const logs: AuditLog[] = [];

  for (let i = 0; i < count; i++) {
    const user = pick(sourceUsers);
    const action = pick(actions);
    const timestamp = new Date(
      Date.now() - randomInt(0, 1000 * 60 * 60 * 24 * 30)
    ).toISOString();

    let detail: LogDetail;
    if (action === "Alterar Email") {
      const prev = user.email;
      const newEmail = `${
        user.nomeCompleto.toLowerCase().split(" ")[0]
      }.${randomInt(1, 99)}@empresa.com`;
      detail = {
        type: "field_change",
        field: "email",
        previousValue: prev,
        newValue: newEmail,
        message: `E-mail alterado de ${prev} → ${newEmail}`,
      };
    } else if (action === "Alterar Permissões") {
      detail = {
        type: "field_change",
        field: "role",
        previousValue: user.cargo ?? "user",
        newValue: "admin",
        message: "Permissão concedida: Admin",
      };
    } else if (action === "Criar Conta") {
      detail = {
        type: "resource_event",
        resource: "user",
        resourceId: `user_${randomInt(100, 999)}`,
        message: `Usuário '${user.nomeCompleto}' criado.`,
      };
    } else if (action === "Atualizar Imagem") {
      detail = {
        type: "action",
        actionName: "update_avatar",
        message: "Foto de perfil atualizada",
        meta: { size: "200x200" },
      };
    } else if (action === "Alterar Senha" || action === "Recuperar Senha") {
      detail = {
        type: "action",
        actionName:
          action === "Alterar Senha"
            ? "change_password"
            : "password_reset_request",
        message:
          action === "Alterar Senha"
            ? "Senha atualizada com sucesso"
            : `Link de redefinição enviado para ${user.email}`,
      };
    } else {
      detail = {
        type: "action",
        actionName: action.toLowerCase().replace(/\s+/g, "_"),
        message:
          action === "Login" ? "Usuário autenticado" : `${action} executada`,
      };
    }

    logs.push({
      id: `log_${Date.now()}_${i}`,
      timestamp,
      userId: user.id,
      username: user.nomeCompleto,
      action,
      detail,
    });
  }

  return logs;
};
