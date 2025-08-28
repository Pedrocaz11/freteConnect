# ⚡ Fix Rápido - Upstream Error

## 🚨 Solução Imediata (2 minutos)

### 1. Execute estes comandos:
```bash
# Pare qualquer processo
pkill -f next

# Limpe tudo
rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel

# Reinstale
npm install

# Teste local
npm run build
npm run start
```

### 2. Se ainda não funcionar:
```bash
# Configuração de emergência
echo 'module.exports = { reactStrictMode: false, images: { unoptimized: true } }' > next.config.js

# Build novamente
npm run build
npm run start
```

### 3. Verificar no navegador:
- Abra modo incógnito
- Vá para http://localhost:3000
- Verifique se carrega sem erros

## 🔧 Verificações Rápidas

### Console do Navegador (F12):
- [ ] Sem erros vermelhos
- [ ] Sem erros 502/503/504
- [ ] Assets carregando (aba Network)

### Terminal:
- [ ] Build completa sem erros
- [ ] Server inicia na porta 3000
- [ ] Sem warnings críticos

## 🆘 Se Nada Funcionar

### Configuração Mínima Absoluta:
```javascript
// next.config.js
module.exports = {
  reactStrictMode: false,
  swcMinify: false,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
}
```

### Teste Básico:
```bash
npx create-next-app@latest test-app
cd test-app
npm run dev
```

Se o teste básico funcionar, o problema é na configuração específica.

## ✅ Resultado Esperado

- ✅ Preview carrega instantaneamente
- ✅ Sem erros de upstream
- ✅ Navegação fluida
- ✅ Assets carregam corretamente

---

**⏱️ Tempo estimado: 2-5 minutos**