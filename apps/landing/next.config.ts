import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@viralclawos/ui", "@viralclawos/utils"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
