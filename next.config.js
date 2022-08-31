const baseURIPrefix = process.env.NODE_ENV === 'production' ? 'https://israteneda.com' : undefined;
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  assetPrefix: baseURIPrefix,
  env: {
    linkPrefix: baseURIPrefix,
  },
  generateBuildId: async () => 'current',
};

module.exports = nextConfig;
