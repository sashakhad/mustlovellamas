import path from 'path';
import type { NextConfig } from 'next';

// Pinned so Next does not treat the enclosing mustlovellamas checkout as the workspace root.
const projectRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
