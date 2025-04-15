import type { NextConfig } from "next";
const path = require('path')
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vwjsevjtpenomupn.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
      }
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs')
    }
    return config
  },
};

export default nextConfig;
