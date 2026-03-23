import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  serverExternalPackages: ["@react-pdf/renderer", "bcryptjs"],
};

export default nextConfig;
