/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração básica para resolver upstream errors
  reactStrictMode: false,
  
  // Configurações essenciais para preview
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Configurações de imagem simplificadas
  images: {
    unoptimized: true,
    domains: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Configurações de webpack simplificadas
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Headers simplificados para evitar conflitos
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },

  // Configurações de output para Vercel
  output: "standalone",
  
  // Configurações experimentais mínimas
  experimental: {
    serverComponentsExternalPackages: [],
  },

  // Configurações de compressão
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;