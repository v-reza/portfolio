import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Card screenshots are text-dense UI; keep them crisp instead of softening
    // them with the default 75% encoder.
    qualities: [75, 90, 95],
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048, 2400],
    imageSizes: [128, 256, 384, 512],
  },
  turbopack: {
    rules: {
      // Tailwind only processes global stylesheets; `as: "*.css"` would otherwise
      // turn *.module.css files into global CSS and drop their class exports.
      "*.css": {
        condition: { all: [{ not: "foreign" }, { not: { path: /\.module\.css$/ } }] },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
