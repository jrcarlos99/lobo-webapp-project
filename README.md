# L.O.B.O - Sistema de Gestão de Ocorrências

## 📋 Sobre o Projeto

L.O.B.O é uma aplicação web moderna para gestão e monitoramento de ocorrências, desenvolvida com Next.js 13+. O sistema permite o registro, acompanhamento e análise de ocorrências em diferentes regiões, com suporte a múltiplos níveis de acesso e visualização de dados em tempo real.

## 🚀 Tecnologias

- [Next.js 13+](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
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

```bash
# Clone o repositório
git clone https://github.com/jrcarlos99/lobo-webapp-project.git

# Entre no diretório
cd lobo-webapp-project

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

## 🚀 Executando o Projeto

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Rotas e layouts (Next.js App Router)
├── components/            # Componentes React reutilizáveis
├── hooks/                # Hooks personalizados
├── lib/                  # Utilitários e configurações
├── services/            # Serviços de API
└── types/               # Definições de tipos TypeScript
```

## 🔐 Permissões e Roles

O sistema possui diferentes níveis de acesso:

- **Administrador**: Acesso total ao sistema
- **Chefe**: Gestão de ocorrências e relatórios
- **Analista**: Registro e acompanhamento de ocorrências

## 📱 PWA

A aplicação é uma Progressive Web App (PWA), permitindo:

- Instalação no dispositivo
- Funcionamento offline
- Notificações push
- Atualização automática

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

- [Júnior Carlos](https://github.com/jrcarlos99)
