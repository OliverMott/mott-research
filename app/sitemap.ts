import type { MetadataRoute } from "next";
import { pages } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...Object.keys(pages).map((slug) => `/${slug}`), "/auction/images"].map((path) => ({
    url: `https://www.mottresearch.com${path}`,
  }));
}
