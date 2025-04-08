import type { NextConfig } from "next";

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
};

export default nextConfig;
