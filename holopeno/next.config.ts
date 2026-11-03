import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  outputFileTracingIncludes: {
    '/opengraph-image': ['./assets/fonts/**'],
    '/icon': ['./assets/fonts/**'],
    '/apple-icon': ['./assets/fonts/**'],
    '/posts/[slug]/opengraph-image': ['./assets/fonts/**'],
  },
};

export default nextConfig;
