# Configuração GitHub-Vercel - Guia Completo

## 🚨 Problema Identificado
Erro de configuração GitHub-Vercel. Este guia resolve o problema de conexão entre as contas.

## 📋 Pré-requisitos
- Conta GitHub ativa
- Conta Vercel ativa
- Repositório do projeto no GitHub

## 🔧 Passos para Reconectar

### 1. Desconectar Configuração Atual (se necessário)
1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Git**
3. Desconecte a integração atual com GitHub

### 2. Reconectar GitHub à Vercel
1. No Vercel Dashboard, clique em **"New Project"**
2. Selecione **"Import Git Repository"**
3. Clique em **"Continue with GitHub"**
4. **Autorize a Vercel** a acessar seus repositórios
5. Selecione o repositório do projeto

### 3. Configurar o Deploy
1. **Framework Preset**: Next.js (deve ser detectado automaticamente)
2. **Root Directory**: `.` (raiz do projeto)
3. **Build Command**: `npm run build` (já configurado)
4. **Output Directory**: `.next` (já configurado)
5. **Install Command**: `npm install` (já configurado)

### 4. Configurar Variáveis de Ambiente (se necessário)
Se você usar Supabase ou outras integrações:
```bash
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
```

### 5. Deploy
1. Clique em **"Deploy"**
2. Aguarde o build completar
3. Verifique se não há erros

## ✅ Verificações Pós-Deploy

### Build Bem-sucedido
- ✅ Build completa sem erros
- ✅ Todas as páginas carregam corretamente
- ✅ Componentes renderizam adequadamente

### Performance
- ✅ Lighthouse Score > 90
- ✅ Tempo de carregamento < 3s
- ✅ Imagens otimizadas

## 🔍 Troubleshooting

### Erro: "Build Failed"
```bash
# Teste local primeiro
npm run build
npm run start
```

### Erro: "Module not found"
- Verifique todas as importações
- Confirme que todos os arquivos existem
- Verifique case-sensitivity nos nomes

### Erro: "Environment Variables"
- Configure todas as variáveis necessárias na Vercel
- Use NEXT_PUBLIC_ para variáveis do cliente
- Mantenha chaves secretas apenas no servidor

## 📱 Configurações Automáticas Incluídas

Este template já inclui:
- ✅ **next.config.ts** otimizado para Vercel
- ✅ **.vercelignore** para builds eficientes
- ✅ **vercel.json** com configurações específicas
- ✅ **package.json** com scripts corretos
- ✅ Dependências compatíveis com Vercel
- ✅ Configurações de TypeScript otimizadas

## 🚀 Deploy Automático

Após a configuração inicial:
1. **Push para main/master** → Deploy automático
2. **Pull Requests** → Preview deploys
3. **Branches** → Deploy de preview (opcional)

## 📞 Suporte

Se o problema persistir:
1. Verifique o [Status da Vercel](https://vercel-status.com/)
2. Consulte os [logs de build](https://vercel.com/docs/concepts/deployments/build-step#build-logs)
3. Teste o build localmente: `npm run build`

## 🎯 Resultado Esperado

Após seguir este guia:
- ✅ Deploy automático funcionando
- ✅ Preview deploys em PRs
- ✅ Build otimizado e rápido
- ✅ Todas as funcionalidades operacionais