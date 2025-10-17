import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARNING: ignores TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
