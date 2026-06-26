import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/quantum-research-archive",
  assetPrefix: "/quantum-research-archive/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
