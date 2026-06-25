/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@viralclawos/ui", "@viralclawos/utils"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
