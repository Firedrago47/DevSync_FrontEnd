// next.config.ts
import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';
import type { WebpackConfigContext } from 'next/dist/server/config-shared';

const nextConfig: NextConfig = {
  webpack(config: Configuration, { isServer }: WebpackConfigContext) {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          path: false,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
