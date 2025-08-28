# 🔧 Correção Upstream Error - Guia Completo

## 🚨 Problema Identificado
**Erro**: "Upstream error" impedindo visualização do preview

## 📋 Causas Comuns

### 1. Configurações de Middleware
- Middleware muito restritivo
- Headers conflitantes
- Configurações de CORS incorretas

### 2. Configurações do Next.js
- Headers complexos demais
- Configurações experimentais problemáticas
- Webpack mal configurado

### 3. Problemas de Rede
- Proxy mal configurado
- Timeout de conexão
- Problemas de DNS

## 🔧 Soluções Implementadas

### 1. Next.js Simplificado
- ✅ Removidas configurações experimentais desnecessárias
- ✅ Headers simplificados
- ✅ Webpack otimizado
- ✅ Configurações de imagem simplificadas

### 2. Middleware Otimizado
- ✅ Middleware minimalista
- ✅ Apenas headers essenciais
- ✅ Matcher otimizado

### 3. Vercel.json Limpo
- ✅ Configurações básicas apenas
- ✅ Headers simplificados
- ✅ Funções otimizadas

## 🚀 Passos para Resolver

### Passo 1: Limpar Cache
```bash
# Limpe todos os caches
npm run clean
rm -rf .next
rm -rf node_modules/.cache
```

### Passo 2: Reinstalar Dependências
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### Passo 3: Testar Localmente
```bash
# Teste o build local
npm run build
npm run start
```

### Passo 4: Verificar Preview
```bash
# Use o script de preview
npm run preview
```

## 🔍 Troubleshooting Adicional

### Se o erro persistir:

#### 1. Verificar Logs
- Abra o console do navegador (F12)
- Verifique erros de rede na aba Network
- Procure por erros 502, 503, 504

#### 2. Testar em Modo Incógnito
- Abra uma janela incógnita
- Teste o preview novamente
- Isso elimina problemas de cache do navegador

#### 3. Verificar Configurações de Rede
- Desabilite VPN temporariamente
- Teste em outra rede
- Verifique firewall/antivírus

#### 4. Configurações do Navegador
- Desabilite extensões temporariamente
- Limpe cache do navegador
- Teste em outro navegador

## ✅ Verificações Finais

Após aplicar as correções:

- [ ] Preview carrega sem erros
- [ ] Todas as páginas são acessíveis
- [ ] Não há erros no console
- [ ] Navegação funciona corretamente
- [ ] Assets carregam adequadamente

## 🆘 Se Nada Funcionar

### Configuração de Emergência

Se o problema persistir, use esta configuração mínima:

```javascript
// next.config.js (configuração de emergência)
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
```

### Contato para Suporte
- **Logs da Vercel**: Dashboard → Deployments → View Logs
- **Status**: [Vercel Status](https://vercel-status.com/)
- **Suporte**: [Vercel Support](https://vercel.com/support)

---

**💡 Dica**: Sempre teste localmente antes de fazer deploy para identificar problemas rapidamente.