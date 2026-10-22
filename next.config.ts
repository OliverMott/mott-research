import type { NextConfig } from "next";
import { pages } from "./lib/site-data";

const r2PublicUrl = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/toy-bricks.php", destination: "/mottik-dna", permanent: true },
      { source: "/videos-mott-smithsonian-preview.php", destination: "/videos-mottik-dna-smithsonian-tv", permanent: true },
      ...Object.keys(pages).map((slug) => ({
        source: `/${slug}.php`,
        destination: `/${slug}`,
        permanent: true,
      })),
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      ...(r2PublicUrl ? [new URL(`${r2PublicUrl}/images/**`)] : []),
      ...(r2PublicUrl ? [new URL(`${r2PublicUrl}/auction/**`)] : []),
    ],
  },
};

export default nextConfig;
