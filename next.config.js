/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para funcionar no ambiente Lasy e Vercel
  assetPrefix: "",
  basePath: "",
  
  // Configuração essencial para Vercel
  output: "standalone",
  
  // Desabilitar strict mode para compatibilidade
  reactStrictMode: false,

  // Configurações para melhor compatibilidade de deploy
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Configurações de imagem otimizadas
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Configurações de webpack para resolver problemas comuns
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },

  // Headers para APIs
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },

  // Configurações experimentais estáveis
  experimental: {
    serverComponentsExternalPackages: ["@supabase/supabase-js"],
  },
};

module.exports = nextConfig;