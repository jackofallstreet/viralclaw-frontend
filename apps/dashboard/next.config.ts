import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@viralclawos/ui",
    "@viralclawos/utils",
    "@viralclawos/core",
    "@viralclawos/agents",
  ],
};

export default nextConfig;
