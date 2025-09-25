import { AuditLog, LogDetail, User } from "@/types/user";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const getFallbackUsers = (): User[] => [
  {
    id: "u1",
    name: "Juliana Silveira",
    email: "juli.sil@lobo.com",
    roles: "Admin",
    status: "active",
  },
  {
    id: "u2",
    name: "João Gomes",
    email: "joao.gomes@lobo.com",
    roles: "Analista",
    status: "active",
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
      const newEmail = `${user.name.toLowerCase().split(" ")[0]}.${randomInt(
        1,
        99
      )}@empresa.com`;
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
        previousValue: user.roles ?? "user",
        newValue: "admin",
        message: "Permissão concedida: Admin",
      };
    } else if (action === "Criar Conta") {
      detail = {
        type: "resource_event",
        resource: "user",
        resourceId: `user_${randomInt(100, 999)}`,
        message: `Usuário '${user.name}' criado.`,
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
      username: user.name,
      action,
      detail,
    });
  }

  return logs;
};
