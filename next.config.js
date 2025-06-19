const baseURIPrefix = process.env.NODE_ENV === 'production' ? 'https://israteneda.com' : undefined;
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['israteneda.com'],
    formats: ['image/avif', 'image/webp']
  },
  assetPrefix: baseURIPrefix,
  env: {
    linkPrefix: baseURIPrefix,
  },
  generateBuildId: async () => 'current',
};

module.exports = nextConfig;
