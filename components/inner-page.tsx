import Image from "next/image";
import Link from "next/link";
import type { PageData } from "@/lib/site-data";
import { Footer, Header, SectionTitle, VideoCards } from "@/components/site-shell";
import { GalleryLightbox } from "@/components/gallery-lightbox";

const otherVideos = [
  ["Mottik DNA Smithsonian TV", "Smithsonian TV", "aired: Jan 1996", "/videos-mottik-dna-smithsonian-tv.php"],
  ["Light Up Shoes", "BBC Tomorrows World", "aired: 1992", "/videos-light-up-trainers.php"],
  ["Scrumpit", "Promo video", "July 2015", "/videos-scrumpit.php"],
  ["Mottik Toy Bricks", "ITV GIMME5", "aired: 1995", "/videos-toy-bricks-mottik.php"],
  ["Mott Research Preview", "BEYOND 2000", "aired: Jan 1990", "/videos-mott-research-preview.php"],
] as const;

function Gallery({ images }: { images: NonNullable<PageData["gallery"]> }) {
  return <><h3 className="subheading">Images</h3><GalleryLightbox images={images} /></>;
}

function VideoThumbnails({ videos }: { videos: NonNullable<PageData["sideVideos"]> }) {
  return <div className="thumbnail-videos">{videos.map(({ title, videoId }) =>
    <a className="thumbnail-video" href={`https://www.youtube.com/watch?v=${videoId}`} key={videoId}>
      <span className="thumbnail-video-image"><Image src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" fill sizes="(max-width: 760px) 100vw, 320px" /></span>
      <strong>{title}</strong>
    </a>
  )}</div>;
}

function Products({ items }: { items: NonNullable<PageData["products"]> }) {
  return <div className="product-grid">{items.map((item) => <Link href={item.href} className="product-card" key={item.href}>
    <Image src={item.image} alt="" width={120} height={60} /><span><strong>{item.title}</strong><small>{item.text}</small></span>
  </Link>)}</div>;
}

function ContactDetails() {
  return <div className="contact-details"><h3>Telephone</h3><a href="tel:+447740604660">07740 604660</a><h3>Email</h3><a href="mailto:john@mottresearch.com">john@mottresearch.com</a></div>;
}

function VideoPage({ page }: { page: PageData }) {
  return <div className="video-page-layout">
    <div className="responsive-video"><iframe src={`https://www.youtube.com/embed/${page.videoId}`} title={page.heading} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
    <aside className="other-videos">
      <SectionTitle>Other Videos</SectionTitle>
      <p className="youtube-copy">View the <a href="https://www.youtube.com/@mottresearchinvent/videos">Mott Research YouTube</a> Channel ...</p>
      <div className="other-video-grid">{otherVideos.map(([title, source, date, href]) => <Link href={href} key={href} className="video-list-item"><strong>{title}</strong><span>{source}</span><small>{date}</small></Link>)}</div>
    </aside>
  </div>;
}

export function InnerPage({ page }: { page: PageData }) {
  return <><Header /><main className="site-width inner-layout">
    <article className={`main-content${page.videoId ? " video-page-content" : ""}`}><SectionTitle>{page.heading}</SectionTitle>
      {page.videoId ? <VideoPage page={page} /> : <>
        {page.image && <Image className="lead-image" src={page.image} alt="" width={page.image.includes("toy-square") ? 400 : 80} height={page.image.includes("toy-square") ? 300 : 80} />}
        <div className="copy inner-copy">{page.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        {page.externalLink && <p><a className="text-link" href={page.externalLink.href}>{page.externalLink.label}</a></p>}
        {page.contact && <ContactDetails />}
        {page.products && <Products items={page.products} />}
        {page.gallery && <Gallery images={page.gallery} />}
      </>}
    </article>
    {!page.videoId && <aside className="video-sidebar"><SectionTitle>Videos</SectionTitle><p className="youtube-copy">View the <a href="https://www.youtube.com/@mottresearchinvent/videos">Mott Research YouTube</a> Channel ...</p>{page.sideVideos ? <VideoThumbnails videos={page.sideVideos} /> : <VideoCards />}</aside>}
  </main><Footer /></>;
}
