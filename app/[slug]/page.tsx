import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { defaultDescription, defaultKeywords, pages } from "@/lib/site-data";

export const dynamicParams = false;

const legacyRedirects: Record<string, string> = {
  "toy-bricks.php": "/mottik-dna.php",
  "videos-mott-smithsonian-preview.php": "/videos-mottik-dna-smithsonian-tv.php",
};

export function generateStaticParams() {
  return [...Object.keys(pages), ...Object.keys(legacyRedirects), "index.php"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "index.php") return {};
  if (legacyRedirects[slug]) return {};
  const page = pages[slug];
  if (!page) return {};
  return { title: page.title, description: page.description ?? defaultDescription, keywords: page.keywords ?? defaultKeywords };
}

export default async function LegacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "index.php") permanentRedirect("/");
  if (legacyRedirects[slug]) permanentRedirect(legacyRedirects[slug]);
  const page = pages[slug];
  if (!page) notFound();
  return <InnerPage page={page} />;
}
