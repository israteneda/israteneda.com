/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  assetPrefix: './',
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = nextConfig;
