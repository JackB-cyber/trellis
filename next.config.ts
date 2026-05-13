import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — browsers that support AVIF get the smallest files,
    // others fall back to WebP, then the original format.
    formats: ["image/avif", "image/webp"],
    // Common breakpoints for responsive srcsets
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    // Keep decoded images in memory for 60 seconds
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
