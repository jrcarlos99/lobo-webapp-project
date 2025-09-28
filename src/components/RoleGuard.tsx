import { ReactNode } from "react";
import { useCurrentUser } from "@/hooks/useAuth";

export default function RoleGuard({
  roles,
  children,
}: {
  roles: string[];
  children: ReactNode;
}) {
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) return null;
  if (!user) return null;
  if (!roles.includes(user.cargo ?? "")) return null;
  return <>{children}</>;
}
