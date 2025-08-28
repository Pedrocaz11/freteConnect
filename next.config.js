/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  swcMinify: false,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {},
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  }
}