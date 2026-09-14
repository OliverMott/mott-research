import Image from "next/image";
import Link from "next/link";
import { Footer, Header, SectionTitle, VideoCards } from "@/components/site-shell";

const slides = ["slide-blocks.png", "slide-shoes.png", "slide-rackets.png"];

export default function Home() {
  return (
    <>
      <Header />
      <main className="site-width">
        <section className="hero" aria-label="Mott Research innovations">
          <Link className="hero-slide hero-slide-1 hero-smithsonian" href="/videos-mottik-dna-smithsonian-tv.php" aria-label="Watch Mottik DNA on Smithsonian TV">
            <span className="smithsonian-copy"><span>Watch Mottik DNA</span><span>on Smithsonian TV</span></span>
            <span className="smithsonian-logo"><Image src="/images/smithsonian-logo.webp" alt="Smithsonian" width={332} height={147} priority /></span>
          </Link>
          <Link className="hero-slide hero-slide-2 hero-auction" href="/auction/images" aria-label="View recent Mott Research auction images">
            <span className="auction-copy">View recent Mott Research Auction</span>
            <span className="auction-art"><Image src="/images/auction-banner.webp" alt="Mott Research products displayed as auction photographs" width={1600} height={534} /></span>
          </Link>
          {slides.map((slide, index) => (
            <Image key={slide} src={`/images/${slide}`} alt="" fill
              sizes="(max-width: 980px) 100vw, 940px" className={`hero-slide hero-slide-${index + 3}`} />
          ))}
        </section>
        <section className="home-columns">
          <article>
            <SectionTitle>Consultation</SectionTitle>
            <div className="copy">
              <p>Mott Research has a long and successful record of helping companies inject new life into old products.</p>
              <p>With vision and innovation, Mott Research can take new ideas or existing ones and turn them into world leaders.</p>
            </div>
            <Link className="more-link" href="/consultation.php">&gt; read more</Link>
          </article>
          <article>
            <SectionTitle>Invention</SectionTitle>
            <div className="copy">
              <p>Mott Research is a world innovator in products and services.</p>
              <p>With invention at the heart of Mott Research and a long history of patents and designs, Mott Research continues to push boundries in the world of invention.</p>
            </div>
            <Link className="more-link" href="/invention.php">&gt; read more</Link>
          </article>
          <article>
            <SectionTitle>Videos</SectionTitle>
            <p className="youtube-copy">View the <a href="https://www.youtube.com/@mottresearchinvent/videos">Mott Research YouTube</a> Channel ...</p>
            <VideoCards compact />
            <Link className="more-link" href="/videos-scrumpit.php">&gt; more videos</Link>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
