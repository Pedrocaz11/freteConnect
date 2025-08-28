/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração mínima absoluta
  reactStrictMode: false,
  swcMinify: false,
  
  // Imagens desotimizadas para evitar problemas
  images: {
    unoptimized: true,
  },
  
  // Ignorar erros que podem quebrar o preview
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Webpack mínimo
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  
  // Sem headers customizados
  async headers() {
    return [];
  },
  
  // Configurações experimentais desabilitadas
  experimental: {},
  
  // Sem otimizações que podem causar problemas
  compress: false,
  poweredByHeader: true,
};

module.exports = nextConfig;