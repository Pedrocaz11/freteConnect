# FreteConnect - Plataforma de Fretes

Uma plataforma moderna para conectar motoristas a oportunidades de frete de forma rápida e segura.

## 🚀 Deploy na Vercel

### Pré-requisitos
- Conta GitHub
- Conta Vercel
- Node.js 18+ instalado

### Configuração Rápida

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd fretelasy-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Teste localmente**
```bash
npm run build
npm run start
```

4. **Siga o guia de deploy**
- Abra o arquivo `GITHUB_VERCEL_FIX.md`
- Siga os passos 1-4 para conectar GitHub-Vercel
- Use o `VERCEL_DEPLOY_CHECKLIST.md` para verificar tudo

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 15.2.4 com App Router
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS + Shadcn/UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── dashboard/         # Dashboards
│   │   ├── client/       # Dashboard do cliente
│   │   └── driver/       # Dashboard do motorista
│   ├── login/            # Páginas de login
│   ├── register/         # Páginas de cadastro
│   └── page.tsx          # Página inicial
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (Shadcn/UI)
│   └── dashboard/       # Componentes específicos
├── hooks/               # Hooks customizados
├── lib/                 # Utilitários
└── types/               # Tipos TypeScript
```

## 🔧 Configurações Incluídas

- ✅ **next.config.js** otimizado para Vercel
- ✅ **vercel.json** com configurações específicas
- ✅ **.vercelignore** para builds eficientes
- ✅ **tsconfig.json** otimizado
- ✅ **tailwind.config.ts** configurado
- ✅ Dependências compatíveis com React 19

## 🚨 Troubleshooting

### Erro de Deploy GitHub-Vercel
1. Siga o guia `GITHUB_VERCEL_FIX.md`
2. Desconecte e reconecte as contas
3. Verifique permissões no GitHub

### Erro de Build
```bash
# Teste local primeiro
npm run build
```

### Problemas de Dependências
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

## 📞 Suporte

- **Logs de Build**: Vercel Dashboard → Deployments → View Logs
- **Status Vercel**: [vercel-status.com](https://vercel-status.com/)
- **Documentação**: [vercel.com/docs](https://vercel.com/docs)

## 🎯 Funcionalidades

### Para Clientes
- ✅ Dashboard completo
- ✅ Criação de fretes
- ✅ Acompanhamento em tempo real
- ✅ Sistema de pagamentos
- ✅ Histórico financeiro

### Para Motoristas
- ✅ Dashboard personalizado
- ✅ Busca de fretes disponíveis
- ✅ Sistema de filtros avançados
- ✅ Perfil e documentos
- ✅ Controle financeiro

## 📱 Responsividade

- ✅ Mobile-first design
- ✅ Tablet otimizado
- ✅ Desktop completo
- ✅ PWA ready

---

**Desenvolvido com ❤️ usando Next.js e Tailwind CSS**