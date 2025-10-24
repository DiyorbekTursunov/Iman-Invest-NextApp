// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint errors/warnings won't fail `next build`
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript type errors won't fail `next build`
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
