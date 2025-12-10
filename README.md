# LOBO Webapp — Sistema de Gestão de Ocorrências

L.O.B.O é uma aplicação web moderna para gestão e monitoramento de ocorrências, com rotas protegidas, mapas, gráficos e PWA.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![React_Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery) ![Axios](https://img.shields.io/badge/Axios-1.12.2-5A29E4?logo=axios) ![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet) ![Recharts](https://img.shields.io/badge/Recharts-2.15.4-764ABC) ![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss) ![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa)

## 📋 Sobre o Projeto

O sistema permite o registro, acompanhamento e análise de ocorrências em diferentes regiões, com suporte a múltiplos níveis de acesso, filtros avançados e visualização de dados em tempo real.

## 🚀 Tecnologias

- Next.js 15 (App Router)
- React 18 + TypeScript 5
- Tailwind CSS 4
- TanStack React Query 5
- Axios
- Leaflet + React-Leaflet
- Recharts
- PWA (Progressive Web App)

## ✨ Funcionalidades

- 📊 Dashboard interativo com gráficos e mapas
- 👥 Gestão de usuários com diferentes níveis de acesso
- 📍 Mapeamento geográfico de ocorrências
- 📱 Interface responsiva e PWA
- 🔒 Autenticação e autorização baseada em roles
- 📈 Relatórios e análises
- 🗺️ Filtros por região e período

## 🛠️ Instalação

```pwsh
# Clone o repositório
git clone https://github.com/jrcarlos99/lobo-webapp-project.git

# Entre no diretório
cd lobo-webapp-project

# Instale as dependências
npm install
```

Crie `.env.local` (se necessário) com a URL do backend:

```
NEXT_PUBLIC_API_URL=https://api-gateway-60vv.onrender.com
```

## 🚀 Executando o Projeto

```pwsh
# Desenvolvimento
npm run dev

# Produção
npm run build
npm run start
```

A aplicação estará disponível em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                 # Rotas e layouts (App Router)
├── components/          # UI e componentes de features
├── hooks/               # Autenticação, dashboard, uploads
├── lib/                 # Cliente axios, utilitários
├── services/            # Auth, usuários, ocorrências, dashboard, auditoria
├── policies/            # Permissões e escopos
├── utils/               # Helpers (região, export, datas)
└── types/               # Tipos TypeScript das entidades
```

## 🔐 Permissões e Roles

O sistema possui diferentes níveis de acesso:

- **Administrador**: Acesso total ao sistema
- **Chefe**: Gestão de ocorrências e relatórios
- **Analista**: Registro e acompanhamento de ocorrências

## 📱 PWA

- Instalação no dispositivo
- Funcionamento offline
- Atualização automática

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Mudanças Recentes (Dez/2025)

- Nova página de criação de ocorrência: `src/app/(main)/ocorrencia/new/page.tsx`.
- Botão "Criar Ocorrência" na listagem: `src/app/(main)/ocorrencia/page.tsx`.
- Serviço `createOccurrence(data)` em `src/services/ocorrencies.service.ts` (POST `/api/ocorrencias`).
- Ajuste Next 15: páginas com `params` usam `Promise<...>` (ex.: `src/app/(main)/ocorrencia/[id]/page.tsx`).
- Autenticação: normalização e persistência de usuário e token em `auth.services.ts`.

## 🔐 Permissões e Roles

- Middleware valida cookie `session` e permissões via `policies/permissions.ts`.
- `RoleGuard` e componentes controlam acesso/visibilidade por cargo.

## 📝 Licença

Uso interno do projeto LOBO.

## 👨‍💻 Autor

- [Júnior Carlos](https://github.com/jrcarlos99)
