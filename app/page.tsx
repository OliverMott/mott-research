import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { Footer, Header, SectionTitle, VideoCards } from "@/components/site-shell";

export default function Home() {
  return (
    <>
      <Header />
      <main className="site-width">
        <HeroCarousel />
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
            <p className="youtube-copy">View the <a href="https://www.youtube.com/@mottresearchinvent/videos" target="_blank" rel="noopener noreferrer">Mott Research YouTube</a> Channel</p>
            <VideoCards compact />
            <Link className="more-link" href="/videos-scrumpit.php">&gt; more videos</Link>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
