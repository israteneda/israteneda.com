/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  assetPrefix: './',
};

module.exports = nextConfig;
