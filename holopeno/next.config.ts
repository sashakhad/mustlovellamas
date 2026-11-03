import type { NextConfig } from 'next';

const fonts = ['./assets/fonts/**'];

const nextConfig: NextConfig = {
  // Pin tracing to this directory so a parent repo's lockfile is never mistaken for the workspace root.
  outputFileTracingRoot: process.cwd(),
  transpilePackages: ['next-mdx-remote'],
  outputFileTracingIncludes: {
    '/opengraph-image': fonts,
    '/icon': fonts,
    '/apple-icon': fonts,
    '/posts/[slug]/opengraph-image': fonts,
    '/brand/[asset]': fonts,
  },
};

export default nextConfig;
