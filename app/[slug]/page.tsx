import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { defaultDescription, defaultKeywords, pages } from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = Object.hasOwn(pages, slug) ? pages[slug] : undefined;
  if (!page) return {};
  return {
    title: page.title,
    description: page.description ?? defaultDescription,
    keywords: page.keywords ?? defaultKeywords,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = Object.hasOwn(pages, slug) ? pages[slug] : undefined;
  if (!page) notFound();
  return <InnerPage page={page} />;
}
