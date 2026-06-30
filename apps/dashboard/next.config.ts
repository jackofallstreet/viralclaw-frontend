import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@viralclawxyz/ui",
    "@viralclawxyz/utils",
    "@viralclawxyz/core",
    "@viralclawxyz/agents",
  ],
};

export default nextConfig;
