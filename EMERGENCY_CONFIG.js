// CONFIGURAÇÃO DE EMERGÊNCIA - Use apenas se nada mais funcionar
// Renomeie este arquivo para next.config.js se necessário

/** @type {import('next').NextConfig} */
const emergencyConfig = {
  // Configuração mínima absoluta
  reactStrictMode: false,
  swcMinify: false,
  
  // Desabilitar otimizações que podem causar problemas
  images: {
    unoptimized: true,
    domains: [],
  },
  
  // Ignorar erros durante build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuração de webpack mínima
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  
  // Sem headers customizados
  async headers() {
    return [];
  },
  
  // Sem redirects
  async redirects() {
    return [];
  },
  
  // Sem rewrites
  async rewrites() {
    return [];
  },
  
  // Configurações experimentais desabilitadas
  experimental: {},
  
  // Output padrão
  output: undefined,
  
  // Outras configurações mínimas
  compress: false,
  poweredByHeader: true,
  generateEtags: false,
};

module.exports = emergencyConfig;

/*
INSTRUÇÕES DE USO:

1. Renomeie este arquivo para next.config.js
2. Execute: rm -rf .next && npm run build
3. Se funcionar, vá adicionando configurações gradualmente
4. Teste cada mudança com npm run build

ORDEM DE TESTE:
1. Configuração de emergência (este arquivo)
2. Adicionar reactStrictMode: true
3. Adicionar configurações de imagem
4. Adicionar headers básicos
5. Adicionar outras configurações conforme necessário
*/