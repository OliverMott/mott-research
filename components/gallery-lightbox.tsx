"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/site-data";

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((current) => current === null ? null : (current - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setActiveIndex((current) => current === null ? null : (current + 1) % images.length);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [images.length, isOpen]);

  return <>
    <div className="gallery">{images.map((image, index) =>
      <button type="button" key={image.full} onClick={() => setActiveIndex(index)} aria-label={`Open image ${index + 1} of ${images.length}`}>
        <Image src={image.thumbnail} alt={image.alt} width={100} height={100} />
      </button>
    )}</div>

    {activeIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image slideshow" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setActiveIndex(null);
    }}>
      <button type="button" className="lightbox-close" onClick={() => setActiveIndex(null)} aria-label="Close slideshow">×</button>
      {images.length > 1 && <button type="button" className="lightbox-control lightbox-previous" onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)} aria-label="Previous image">‹</button>}
      <figure>
        <Image className="lightbox-image" src={images[activeIndex].full} alt={images[activeIndex].alt} width={1200} height={900} sizes="90vw" priority />
        <figcaption>{activeIndex + 1} of {images.length}</figcaption>
      </figure>
      {images.length > 1 && <button type="button" className="lightbox-control lightbox-next" onClick={() => setActiveIndex((activeIndex + 1) % images.length)} aria-label="Next image">›</button>}
    </div>}
  </>;
}
