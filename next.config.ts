import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Static site, so no nonces — 'unsafe-inline' is required for the inline
// bootstrap scripts Next.js emits into prerendered pages.
const csp = [
  "default-src 'self'",
  // Dev: React needs eval for error overlays; Vercel Analytics loads its debug script from va.vercel-scripts.com
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  // Contact form posts to Google Apps Script, which redirects to googleusercontent; dev needs websockets for HMR
  `connect-src 'self' https://script.google.com https://script.googleusercontent.com${isDev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — browsers that support AVIF get the smallest files,
    // others fall back to WebP, then the original format.
    formats: ["image/avif", "image/webp"],
    // Common breakpoints for responsive srcsets
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    // Optimized images are immutable per-URL — cache them for a year.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        source: "/(.*)\\.(ico|png|svg|jpg|jpeg|webp|avif|woff|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
