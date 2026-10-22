import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";

const inventions = [
  ["Light Shoes", "/light-shoes"], ["Board Games", "/board-games"],
  ["Graphite Racquets", "/graphite-racquets"], ["Graphite Golf Clubs", "/graphite-golf-clubs"],
  ["Mottik DNA", "/mottik-dna"], ["Popular Inventions", "/popular-inventions"],
] as const;

export function Header() {
  return <header className="site-header"><div className="site-width header-inner">
    <Link href="/" className="brand" aria-label="Mott Research home"><Image src="/images/logo.png" alt="Mott Research" width={300} height={86} priority /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">
      <Link href="/">Home</Link><Link href="/about">About</Link>
      <span className="nav-dropdown"><Link href="/invention">Inventions</Link><span className="dropdown-menu">{inventions.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</span></span>
      <Link href="/consultation">Consultation</Link><Link href="/contact">Contact</Link>
    </nav>
    <details className="mobile-nav"><summary aria-label="Open menu"><span /><span /><span /></summary><nav aria-label="Mobile navigation">
      <Link href="/">Home</Link><Link href="/about">About</Link><Link href="/invention">Inventions</Link>
      {inventions.map(([label, href]) => <Link className="sub-link" key={href} href={href}>{label}</Link>)}
      <Link href="/consultation">Consultation</Link><Link href="/contact">Contact</Link>
    </nav></details>
  </div></header>;
}

export function SectionTitle({ children }: { children: ReactNode }) { return <h2 className="section-title"><span aria-hidden="true">›</span>{children}</h2>; }

export function VideoCards({ compact = false }: { compact?: boolean }) {
  const items = compact ? [
    ["Mottik DNA Smithsonian TV", "Smithsonian TV", "aired: Jan 1996", "/videos-mottik-dna-smithsonian-tv"],
    ["Light up Shoes", "BBC Tomorrows World", "aired: 1992", "/videos-light-up-trainers"],
  ] : [
    ["Light up Shoes", "BBC Tomorrows World", "aired: 1992", "/videos-light-up-trainers"],
    ["Mottik Toy Brick", "ITV GIMME5", "aired: Jan 1996", "/videos-toy-bricks-mottik"],
  ];
  return <div className="video-cards">{items.map(([title, source, date, href]) => <Link className="video-card" href={href} key={href}><strong>{title}</strong><span>{source}</span><small>{date}</small></Link>)}</div>;
}

export function Footer() {
  return <footer className="footer site-width">
    <section><SectionTitle>Site Map</SectionTitle><div className="sitemap">
      <div><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/consultation">Consultation</Link></div>
      <div><Link href="/invention">Inventions</Link>{inventions.slice(0, 5).map(([label, href]) => <Link className="minor" key={href} href={href}>{label}</Link>)}</div>
      <div><Link href="/contact">Contact</Link><Link href="/videos-scrumpit">Videos</Link><Link href="/auction/images">Auction Images</Link></div>
    </div></section>
    <section><SectionTitle>Quick Contact</SectionTitle>
      <p>Tel:&nbsp;&nbsp;<a href="tel:+447740604660">07740 604660</a></p><p>Email:&nbsp;&nbsp;<a href="mailto:jhn.mott@gmail.com" target="_blank" rel="noopener noreferrer">jhn.mott@gmail.com</a></p>
      <ContactForm />
    </section>
  </footer>;
}
