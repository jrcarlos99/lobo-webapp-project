export const permissions = {
  ADMIN: ["users:manage", "occurrence:all", "config:edit", "region:all"],
  CHEFE: ["occurrence:approve", "occurrence:read", "report:view"],
  ANALISTA: ["occurrence:read", "occurrence:create", "report:view"],
} as const;

export type Role = keyof typeof permissions;

// Tipos de Permissões
type PermissionArrays = (typeof permissions)[Role];
export type Permission = PermissionArrays[number];

export const can = (role: string | undefined | null, perm: Permission) => {
  if (!role) return false;
  const r = role as Role;

  const rolePermissions = permissions[r] as readonly string[];
  return rolePermissions?.includes(perm) ?? false;
};
