import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static export served from /Makura-Site-Redesign.
// Vercel builds are unaffected.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/Makura-Site-Redesign" : "";

const nextConfig: NextConfig = {
  ...(isPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
