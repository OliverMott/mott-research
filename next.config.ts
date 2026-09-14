import type { NextConfig } from "next";

const r2PublicUrl = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      ...(r2PublicUrl ? [new URL(`${r2PublicUrl}/images/**`)] : []),
      ...(r2PublicUrl ? [new URL(`${r2PublicUrl}/auction/**`)] : []),
    ],
  },
};

export default nextConfig;
