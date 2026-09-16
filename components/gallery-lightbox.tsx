"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/site-data";

const DEFAULT_BATCH_SIZE = 48;

export function GalleryLightbox({ images, batchSize = DEFAULT_BATCH_SIZE }: { images: GalleryImage[]; batchSize?: number }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(() => Math.min(batchSize, images.length));
  const loadMoreTrigger = useRef<HTMLDivElement>(null);
  const isOpen = activeIndex !== null;
  const visibleImages = images.slice(0, visibleCount);
  const remainingCount = images.length - visibleCount;

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

  useEffect(() => {
    const trigger = loadMoreTrigger.current;
    if (!trigger || remainingCount <= 0) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setVisibleCount((count) => Math.min(count + batchSize, images.length));
    }, { rootMargin: "600px 0px" });

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [batchSize, images.length, remainingCount]);

  return <>
    <div className="gallery">{visibleImages.map((image, index) =>
      <figure className="gallery-item" key={`${image.full}-${index}`}>
        <button type="button" onClick={() => setActiveIndex(index)} aria-label={`Open image ${index + 1} of ${images.length}`}>
          <Image src={image.thumbnail} alt={image.alt} width={100} height={100} loading="lazy" sizes="132px" unoptimized={image.thumbnail.startsWith("http")} />
        </button>
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
    )}</div>

    {remainingCount > 0 && <div ref={loadMoreTrigger} className="gallery-load-status" aria-live="polite">
      Showing {visibleCount.toLocaleString()} of {images.length.toLocaleString()} images. More load automatically as you scroll.
    </div>}

    {activeIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image slideshow" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setActiveIndex(null);
    }}>
      <button type="button" className="lightbox-close" onClick={() => setActiveIndex(null)} aria-label="Close slideshow">×</button>
      {images.length > 1 && <button type="button" className="lightbox-control lightbox-previous" onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)} aria-label="Previous image">‹</button>}
      <figure>
        <Image className="lightbox-image" src={images[activeIndex].full} alt={images[activeIndex].alt} width={1200} height={900} sizes="90vw" priority unoptimized={images[activeIndex].full.startsWith("http")} />
        <figcaption>{images[activeIndex].caption ? `${images[activeIndex].caption} — ` : ""}{activeIndex + 1} of {images.length}</figcaption>
      </figure>
      {images.length > 1 && <button type="button" className="lightbox-control lightbox-next" onClick={() => setActiveIndex((activeIndex + 1) % images.length)} aria-label="Next image">›</button>}
    </div>}
  </>;
}
