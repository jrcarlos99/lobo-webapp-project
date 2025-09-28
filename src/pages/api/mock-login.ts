// // src/pages/api/mock-login.ts
// import type { NextApiRequest, NextApiResponse } from "next";

// const users = [
//   { id_usuario: 1, email: "admin@local", nome: "Admin", papel: "ADMIN" },
//   { id_usuario: 2, email: "chefe@local", nome: "Chefe", papel: "CHEFE" },
//   {
//     id_usuario: 3,
//     email: "analista@local",
//     nome: "Analista",
//     papel: "ANALISTA",
//   },
// ];

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).end();
//   const { email, senha } = req.body;
//   const u = users.find((x) => x.email === email);
//   if (!u || senha !== "1234")
//     return res.status(401).json({ message: "Credenciais inválidas" });

//   // cria cookie HttpOnly simulando session (em prod seria JWT ou sessionId)
//   const fakeToken = Buffer.from(
//     JSON.stringify({ sub: u.id_usuario, papel: u.papel })
//   ).toString("base64");
//   res.setHeader(
//     "Set-Cookie",
//     `session=${fakeToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`
//   );
//   // return user payload
//   return res.status(200).json({ user: u });
// }
