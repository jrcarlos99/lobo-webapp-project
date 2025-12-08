// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { can, Role } from "@/policies/permissions";

const PUBLIC_ROUTES = [
  "/login",
  "/",
  "/public",
  "/about",
  "/icon.png",
  "/_next",
  "/api",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Pathname:", pathname);

  if (PUBLIC_ROUTES.some((p) => pathname.startsWith(p))) {
    console.log("Public route, skipping middleware");
    return NextResponse.next();
  }

  const sessionCookie = req.cookies.get("session")?.value;
  console.log("Session cookie exists:", !!sessionCookie);

  if (!sessionCookie) {
    console.log("No session cookie, redirecting to login");
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  let userRole: Role | undefined = undefined;

  try {
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie, "base64").toString()
    );
    console.log("Full session data:", sessionData);

    // Tenta obter o cargo de várias formas possíveis
    if (sessionData.cargo) {
      userRole = sessionData.cargo as Role;
      console.log("Role from sessionData.cargo:", userRole);
    } else if (sessionData.user?.cargo) {
      userRole = sessionData.user.cargo as Role;
      console.log("Role from sessionData.user.cargo:", userRole);
    } else if (sessionData.user?.perfil) {
      userRole = sessionData.user.perfil as Role;
      console.log("Role from sessionData.user.perfil:", userRole);
    } else {
      console.log(
        "No role found in session data, available keys:",
        Object.keys(sessionData)
      );
    }
  } catch (e) {
    console.error("Erro ao decodificar sessão: ", e);
  }

  console.log("Final user role for permissions:", userRole);

  // Protege as rotas
  if (pathname.startsWith("/users")) {
    console.log("Checking users:manage permission for role:", userRole);
    const hasPermission = can(userRole, "users:manage");
    console.log("Has users:manage permission:", hasPermission);

    if (!hasPermission) {
      console.log("Access denied to users route");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/configuracao")) {
    console.log("Checking config:edit permission for role:", userRole);
    const hasPermission = can(userRole, "config:edit");
    console.log("Has config:edit permission:", hasPermission);

    if (!hasPermission) {
      console.log("Access denied to configuracao route");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/auditoria")) {
    console.log("Checking occurrence:all permission for role:", userRole);
    const hasPermission = can(userRole, "occurrence:all");
    console.log("Has occurrence:all permission:", hasPermission);

    if (!hasPermission) {
      console.log("Access denied to auditoria route");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  console.log("Access granted to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/main/:path*",
    "/configuracao/:path*",
    "/users/:path*",
    "/auditoria/:path*",
    "/ocorrencia/:path*",
  ],
};
