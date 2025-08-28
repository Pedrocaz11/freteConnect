import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração essencial para Vercel
  output: "standalone",
  
  // Configurações de imagem otimizadas para Vercel
  images: {
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
    // Configuração para melhor performance na Vercel
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configurações experimentais estáveis para Vercel
  experimental: {
    // Desabilitado para evitar conflitos na Vercel
    typedRoutes: false,
    // Otimização para Supabase na Vercel
    serverComponentsExternalPackages: ["@supabase/supabase-js"],
  },

  // Configurações de webpack otimizadas para Vercel
  webpack: (config, { isServer, dev }) => {
    // Resolver problemas com módulos Node.js na Vercel
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        path: false,
        os: false,
        stream: false,
        util: false,
      };
    }

    // Otimizações específicas para produção na Vercel
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      };
    }

    return config;
  },

  // Headers de segurança otimizados para Vercel
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
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },

  // ESLint configuração para não quebrar build na Vercel
  eslint: {
    // Durante o build, não parar por warnings
    ignoreDuringBuilds: false,
  },

  // TypeScript configuração para Vercel
  typescript: {
    // Não ignorar erros TS para manter qualidade
    ignoreBuildErrors: false,
  },

  // Configurações de compilação otimizadas para Vercel
  swcMinify: true,
  
  // Configuração de compressão para Vercel
  compress: true,

  // Configurações de ambiente otimizadas para Vercel
  env: {
    // Variáveis customizadas
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    
    // Fallbacks para variáveis comuns
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },

  // Configurações específicas para diferentes ambientes
  ...(process.env.NODE_ENV === "production" && {
    // Configurações apenas para produção na Vercel
    poweredByHeader: false,
    generateEtags: true,
  }),

  // Configurações para desenvolvimento local
  ...(process.env.NODE_ENV === "development" && {
    // Configurações otimizadas para desenvolvimento
    reactStrictMode: false, // Para compatibilidade com preview
    swcMinify: false, // Desabilitar minify em dev para melhor debugging
  }),
};

export default nextConfig;