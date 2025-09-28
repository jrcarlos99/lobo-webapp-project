import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { can, Role } from "@/policies/permissions";
import path from "path";

const PUBLIC = ["/login", "/", "/public", "/about", "/icon.png", "/_next"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const sessionCookie = req.cookies.get("session")?.value;
  let userRole: Role | undefined = undefined;

  // Se não houver cookie, redireciona para o login( protege o /main)
  if (sessionCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    let sessionData;
    if (sessionCookie) {
      sessionData = JSON.parse(Buffer.from(sessionCookie, "base64").toString());
      userRole = sessionData.cargo as Role;
    }
  } catch (e) {
    console.error("Erro ao decodificar sessão: ", e);
  }
  // Protege a rota de usuários (APENAS ADMIN)
  if (pathname.startsWith("/configuracao")) {
    if (!can(userRole, "config:edit")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Protege a rota de Auditoria(Geralmente ADMIN ou Chefe com acesso limitado)
  if (pathname.startsWith("/auditoria")) {
    if (!can(userRole, "occurrence:all")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/main/:path*",
    "/configuracao/:path*",
    "/users/:path*",
    "/auditoria/:path*",
  ],
};
