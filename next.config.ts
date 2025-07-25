import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"], // Enables Next/Image to load TMDB images
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
