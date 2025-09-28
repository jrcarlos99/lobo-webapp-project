// src/pages/api/mock-login.ts
import type { NextApiRequest, NextApiResponse } from "next";

const regionData: Record<string, string[]> = {
  AGRESTE: ["Caruaru", "Bezerros", "Pesqueira"],
  ZONA_DA_MATA: ["Palmares", "Escada", "Primavera"],
  SERTAO: ["Salgueiro", "Petrolina", "Ouricuri"],
  METROPOLITANA: ["Recife", "Jaboatao", "Olinda"],
};

const users = [
  { id_usuario: 1, email: "admin@local", nome: "Admin", cargo: "ADMIN" },
  {
    id_usuario: 2,
    email: "chefe@local",
    nome: "Chefe",
    cargo: "CHEFE",
    regiao: "AGRESTE",
  },
  {
    id_usuario: 3,
    email: "analista@local",
    nome: "Analista",
    cargo: "ANALISTA",
    regiao: "ZONA_DA_MATA",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, senha } = req.body;

  const u = users.find((x) => x.email === email);
  if (!u || senha !== "1234")
    return res.status(401).json({ message: "Credenciais inválidas" });

  const regiaoDesignada = u.regiao;
  let cidadesAutorizadas: string[] = [];

  // verifica se a região existe antes de acessar
  if (regiaoDesignada) {
    cidadesAutorizadas = regionData[regiaoDesignada] || [];
  }

  const userPayload = {
    id_usuario: u.id_usuario,
    email: u.email,
    nome: u.nome,
    cargo: u.cargo,
    regiaoAutorizada: regiaoDesignada,
    cidadesAutorizadas: cidadesAutorizadas,
  };

  // cria cookie HttpOnly simulando session (em prod seria JWT ou sessionId)
  const fakeToken = Buffer.from(
    JSON.stringify({ sub: userPayload.id_usuario, cargo: userPayload.cargo })
  ).toString("base64");
  res.setHeader(
    "Set-Cookie",
    `session=${fakeToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`
  );
  // return user payload
  return res.status(200).json({ user: userPayload });
}
