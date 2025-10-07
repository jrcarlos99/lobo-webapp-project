import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const BACKEND_HOST =
  process.env.NEXT_PUBLIC_USERS_URL ?? "http://localhost:8081";
const BACKEND_PATH = "/auth/login";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await fetch(`${BACKEND_HOST}${BACKEND_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await backendRes.text();
    const data = text ? JSON.parse(text) : {};

    // Repassa Set-Cookie se o backend enviar (útil para cookies HttpOnly)
    const setCookie = backendRes.headers.get("set-cookie");

    const res = NextResponse.json(data, { status: backendRes.status });

    if (setCookie) {
      // Propagar cookie para o browser
      res.headers.set("set-cookie", setCookie);
    }

    return res;
  } catch (err: unknown) {
    console.error("[NEXT PROXY] erro ao encaminhar login:", err);
    return NextResponse.json(
      { message: "Erro no proxy de autenticação", error: String(err) },
      { status: 500 }
    );
  }
}
