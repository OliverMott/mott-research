import type { Metadata } from "next";
import { Footer, Header, SectionTitle } from "@/components/site-shell";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import type { GalleryImage } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Mott Research Auction",
  description: "View images of Mott Research products featured at Andrew Smith & Son auction house.",
};

type AuctionManifest = { images: GalleryImage[] };

async function getAuctionImages(): Promise<GalleryImage[]> {
  const baseUrl = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "");
  if (!baseUrl) return [];

  try {
    const response = await fetch(`${baseUrl}/auction/manifest.json`, { next: { revalidate: 300 } });
    if (!response.ok) return [];

    const manifest = await response.json() as AuctionManifest;
    return manifest.images.map((image) => ({
      ...image,
      thumbnail: `${baseUrl}/${image.thumbnail}`,
      full: `${baseUrl}/${image.full}`,
    }));
  } catch {
    return [];
  }
}

export default async function AuctionImagesPage() {
  const auctionImages = await getAuctionImages();

  return <>
    <Header />
    <main className="site-width auction-page">
      <SectionTitle>Mott Research Auction</SectionTitle>
      <p className="auction-intro">
        Mott Research inventions were recently featured at an auction held by <a href="http://www.andrewsmithandson.com/" target="_blank" rel="noopener noreferrer">Andrew Smith &amp; Son</a>. View images from the auction below.
      </p>
      {auctionImages.length > 0
        ? <div className="auction-gallery"><GalleryLightbox images={auctionImages} /></div>
        : <p className="auction-empty">The auction images are temporarily unavailable. Please try again shortly.</p>}
    </main>
    <Footer />
  </>;
}
