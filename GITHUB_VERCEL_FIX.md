# 🔧 Correção Erro GitHub-Vercel - Guia Definitivo

## 🚨 Problema Identificado
**Erro**: "Erro de configuração GitHub-Vercel. Conecte as contas corretamente."

## 📋 Solução Passo-a-Passo

### PASSO 1: Limpar Configurações Existentes

#### No GitHub:
1. Acesse [GitHub Settings](https://github.com/settings/applications)
2. Vá em **Applications** → **Authorized OAuth Apps**
3. Encontre **Vercel** na lista
4. Clique em **Revoke** para remover autorização
5. Confirme a remoção

#### Na Vercel:
1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Git**
3. Se houver conexão com GitHub, clique em **Disconnect**
4. Confirme a desconexão

### PASSO 2: Reconectar Corretamente

#### 2.1 - Conectar GitHub à Vercel
1. No [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Continue with GitHub"**
4. **IMPORTANTE**: Autorize TODAS as permissões solicitadas
5. Selecione a organização/conta correta
6. Escolha **"All repositories"** ou selecione repositórios específicos

#### 2.2 - Importar o Projeto
1. Encontre seu repositório na lista
2. Clique em **"Import"**
3. Configure as opções:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (deixe vazio se na raiz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### PASSO 3: Configurar Variáveis de Ambiente (se necessário)

Se seu projeto usa variáveis de ambiente:
```bash
# Exemplo para Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# Exemplo para outras APIs
NEXT_PUBLIC_API_URL=sua_api_url
API_SECRET_KEY=sua_chave_secreta
```

### PASSO 4: Fazer o Deploy
1. Clique em **"Deploy"**
2. Aguarde o processo de build
3. Verifique se não há erros nos logs

## 🔍 Troubleshooting Comum

### Erro: "Repository not found"
**Solução**: Verifique se a Vercel tem acesso ao repositório
1. GitHub Settings → Applications → Vercel
2. Certifique-se que o repositório está na lista de acesso

### Erro: "Build failed"
**Solução**: Teste o build localmente primeiro
```bash
npm install
npm run build
npm run start
```

### Erro: "Permission denied"
**Solução**: Reautorize completamente
1. Remova a Vercel do GitHub (Passo 1)
2. Reconecte com permissões completas (Passo 2)

### Erro: "Environment variables missing"
**Solução**: Configure todas as variáveis necessárias na Vercel
1. Project Settings → Environment Variables
2. Adicione todas as variáveis necessárias
3. Redeploy o projeto

## ✅ Verificação Final

Após o deploy bem-sucedido:
- [ ] Site carrega corretamente
- [ ] Todas as páginas funcionam
- [ ] Não há erros no console
- [ ] Deploy automático funciona em novos commits

## 🚀 Configuração de Deploy Automático

Para garantir deploys automáticos:
1. **Production Branch**: `main` ou `master`
2. **Preview Branches**: Todas as outras branches
3. **Auto-deploy**: Habilitado por padrão

## 📞 Se o Problema Persistir

1. **Verifique Status**: [Vercel Status](https://vercel-status.com/)
2. **Logs de Build**: Vercel Dashboard → Project → Deployments → View Logs
3. **Suporte Vercel**: [Vercel Support](https://vercel.com/support)

## 🎯 Resultado Esperado

✅ **Deploy bem-sucedido**  
✅ **URL de produção funcionando**  
✅ **Deploy automático em commits**  
✅ **Preview deploys em PRs**  

---

**💡 Dica**: Sempre teste o build localmente antes de fazer deploy para evitar erros na Vercel.