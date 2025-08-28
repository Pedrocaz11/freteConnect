# 🚨 EMERGENCY FIX - Preview Não Aparece

## ⚡ EXECUTE IMEDIATAMENTE:

```bash
# 1. PARE TUDO
pkill -f next
pkill -f node

# 2. LIMPE COMPLETAMENTE
rm -rf .next
rm -rf node_modules
rm -rf .vercel
rm -rf node_modules/.cache

# 3. REINSTALE APENAS O ESSENCIAL
npm install

# 4. TESTE BÁSICO
npm run build
npm run start
```

## 🔍 VERIFICAR:

1. **Acesse:** `http://localhost:3000`
2. **Teste:** `http://localhost:3000/test-simple`
3. **API:** `http://localhost:3000/api/simple-test`

## ✅ SE FUNCIONAR:

- ✅ Preview carrega
- ✅ Sem erros no console
- ✅ Navegação funciona

## 🆘 SE AINDA NÃO FUNCIONAR:

### Opção 1: Teste com Create Next App
```bash
npx create-next-app@latest test-app
cd test-app
npm run dev
```

### Opção 2: Verificar Porta
```bash
# Matar processos na porta 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Opção 3: Modo de Desenvolvimento
```bash
npm run dev
# Acesse http://localhost:3000
```

## 🔧 DIAGNÓSTICO:

### Console do Navegador (F12):
- Verificar erros JavaScript
- Verificar aba Network
- Verificar se assets carregam

### Terminal:
- Verificar se build completa
- Verificar se server inicia
- Verificar porta 3000

---

**🎯 OBJETIVO: Preview funcionando em menos de 5 minutos!**