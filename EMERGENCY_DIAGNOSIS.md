# 🚨 EMERGENCY DIAGNOSIS - Preview Não Aparece

## ⚡ EXECUTE AGORA (Passo a Passo):

### PASSO 1: Limpar TUDO
```bash
# Mate todos os processos
pkill -f next
pkill -f node
pkill -f npm

# Limpe completamente
rm -rf .next
rm -rf node_modules
rm -rf .vercel
rm -rf node_modules/.cache
rm -rf .npm
```

### PASSO 2: Reinstalar do Zero
```bash
# Reinstale apenas o essencial
npm install

# Verifique se instalou
ls node_modules/next
```

### PASSO 3: Teste Básico
```bash
# Build de emergência
npm run build

# Se der erro, force:
npx next build

# Start de emergência
npm run start

# Se der erro, force:
npx next start
```

### PASSO 4: Verificar URLs
1. **HTML Puro:** `http://localhost:3000/emergency.html`
2. **Next.js:** `http://localhost:3000/emergency-test`
3. **API:** `http://localhost:3000/api/emergency-test`
4. **App:** `http://localhost:3000/`

## 🔍 DIAGNÓSTICO COMPLETO:

### A. Verificar Terminal
```bash
# Deve mostrar:
✓ Ready in Xms
✓ Local: http://localhost:3000
✓ Network: http://192.168.x.x:3000
```

### B. Verificar Navegador (F12)
- **Console:** Sem erros vermelhos
- **Network:** Assets carregando (200 OK)
- **Elements:** HTML renderizando

### C. Verificar Porta
```bash
# Verificar se porta 3000 está livre
lsof -i :3000

# Se ocupada, mate o processo
lsof -ti:3000 | xargs kill -9
```

## 🆘 SE AINDA NÃO FUNCIONAR:

### Opção 1: Porta Diferente
```bash
npm run dev -- -p 3001
# Acesse: http://localhost:3001
```

### Opção 2: Modo Dev
```bash
npm run dev
# Acesse: http://localhost:3000
```

### Opção 3: Teste Básico
```bash
npx create-next-app@latest test-emergency
cd test-emergency
npm run dev
```

## 🔧 PROBLEMAS COMUNS:

### 1. Erro de Porta
```bash
Error: listen EADDRINUSE :::3000
# Solução: Matar processo na porta 3000
```

### 2. Erro de Build
```bash
Error: Build failed
# Solução: Verificar logs, corrigir erros
```

### 3. Erro de Módulos
```bash
Module not found
# Solução: rm -rf node_modules && npm install
```

### 4. Erro de Permissão
```bash
Permission denied
# Solução: sudo npm install (Linux/Mac)
```

## ✅ RESULTADO ESPERADO:

- ✅ `/emergency.html` carrega (HTML puro)
- ✅ `/emergency-test` carrega (Next.js)
- ✅ `/api/emergency-test` retorna JSON
- ✅ Console sem erros
- ✅ Preview funcionando

---

**🎯 Se NENHUMA das URLs funcionar, o problema é de infraestrutura/rede!**