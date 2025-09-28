import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC = ["/login", "/", "/public", "/about", "/icon.png", "/_next"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();

  // proteger /main
  if (pathname.startsWith("/main")) {
    const cookie = req.cookies.get("session")?.value;
    if (!cookie) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*", "/main"],
};
