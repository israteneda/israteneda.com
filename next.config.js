const isProd = process.env.NODE_ENV === 'production'
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  assetPrefix: isProd ? 'https://israteneda.com' : undefined,
  env: {
    linkPrefix: isProd ? 'https://israteneda.com' : undefined,
  },
  generateBuildId: async () => 'current',
};

module.exports = nextConfig;
