"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    href: "/videos-mottik-dna-smithsonian-tv.php",
    label: "Watch Mottik DNA on Smithsonian TV",
    copy: "Watch Mottik DNA on Smithsonian TV",
    image: "/images/smithsonian-logo.webp",
    alt: "Smithsonian",
    variant: "smithsonian",
  },
  {
    href: "/auction/images",
    label: "View recent Mott Research auction images",
    copy: "View images from the recent Mott Research Auction",
    image: "/images/auction-banner.webp",
    alt: "Mott Research products displayed as auction photographs",
    variant: "auction",
  },
  {
    href: "/light-shoes.php",
    label: "Light up shoes: a new era in running shoes",
    copy: "Light up shoes… A new era in running shoes",
    image: "/images/hero-shoes.webp",
    alt: "ASICS running shoes",
    variant: "standard",
  },
  {
    href: "/graphite-racquets.php",
    label: "The first commercial graphite badminton racquets",
    copy: "The first commercial graphite badminton racquets",
    image: "/images/hero-rackets.webp",
    alt: "Graphite badminton racquet",
    variant: "standard",
  },
] as const;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const showPrevious = () => setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % slides.length);

  return (
    <section
      className="hero"
      aria-label="Mott Research innovations"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const isSmithsonian = slide.variant === "smithsonian";

        return (
          <Link
            key={slide.href}
            className={`hero-slide hero-feature hero-${slide.variant}${isActive ? " hero-slide-active" : ""}`}
            href={slide.href}
            aria-label={slide.label}
            aria-hidden={!isActive}
            tabIndex={isActive ? 0 : -1}
          >
            <span className="hero-copy">{slide.copy}</span>
            {isSmithsonian ? (
              <span className="smithsonian-logo">
                <Image src={slide.image} alt={slide.alt} width={332} height={147} priority />
              </span>
            ) : (
              <span className="hero-art">
                <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 980px) 60vw, 564px" priority={index === 1} />
              </span>
            )}
          </Link>
        );
      })}
      <button type="button" className="hero-control hero-control-previous" onClick={showPrevious} aria-label="Show previous banner">‹</button>
      <button type="button" className="hero-control hero-control-next" onClick={showNext} aria-label="Show next banner">›</button>
    </section>
  );
}
