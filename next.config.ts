import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Cloudflare quick tunnel for testing Viva redirects and webhooks against `next dev`
  allowedDevOrigins: ["*.trycloudflare.com"],
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "karpadu.blob.core.windows.net" }],
  },
  async redirects() {
    return [
      { source: "/product/:slug*", destination: "/en/fleet", permanent: true },
      { source: "/search-your-car", destination: "/en", permanent: true },
      { source: "/privacy-policy", destination: "/en/privacy", permanent: true },
      { source: "/shop", destination: "/en/fleet", permanent: true },
      { source: "/cart", destination: "/en", permanent: true },
      { source: "/checkout", destination: "/en", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
