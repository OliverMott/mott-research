export const defaultDescription = "Innovation and Invention in business, Mott Research leads the way in business innovation. Mott Research focuses on inventing and innovation.";
export const defaultKeywords = "innovation,invention,inventions,inventors,inventing,innovated,innovating,business innovation,innovation business,innovation and business,innovation in business,business and innovation,innov,inven,inventive,world of invention,a new invention,new invention,invention new,inventions new,new inventions,invents";
const legacyTypoKeywords = "innovation,invention,inventions,inventors,inventing,innovated,inninnovating,business innovation,innovation business,innovation and business,innovation in business,business and innovation,innov,inven,inventive,world of invention,a new invention,new invention,invention new,inventions new,new inventions,invents";

export type ProductCard = { title: string; text: string; href: string; image: string };
export type SideVideo = { title: string; videoId: string };
export type GalleryImage = { thumbnail: string; full: string; alt: string };
export type PageData = {
  title: string; heading: string; paragraphs?: string[]; image?: string; gallery?: GalleryImage[];
  description?: string; keywords?: string; externalLink?: { label: string; href: string };
  contact?: boolean; products?: ProductCard[]; videoId?: string; videos?: boolean; sideVideos?: SideVideo[];
};

export const pages: Record<string, PageData> = {
  "about.php": {
    title: "Mott Research - About Innovation & Invention", heading: "About Mott Research",
    keywords: legacyTypoKeywords,
    paragraphs: [
      "With over 40 years experience, Mott Research is a driving force behind innovation and product development around the world.",
      "Based in the idyllic Surrey countryside, South England, Mott Research has a long, successful history of inventing sports products, children's toy games and educational toys.",
      "Mott Research provides consultation services to companies of all sizes, developing existing products or building on new ideas.",
      "Our consistency in designing winning products has been recognised by industry bodies.",
      "Mott Research's aim is to continue inventing and developing products in an ever changing world for everyone to enjoy.",
    ], videos: true,
  },
  "invention.php": {
    title: "Mott Research - Inventing", heading: "Invention", image: "/images/scrumpit-board-game.jpg",
    paragraphs: [
      "Mott Research has been at the forefront of UK invention for the last 40 years.",
      "Mott Research boasts a portfolio of successful inventions across a range of industries. Products and designs which have become known across households and recognised amongst leading industry bodies such as the Smithsonian institute, Mott Research continues to make new innovative products which change industries.",
      "Award winning inventions from Mott Research:",
    ],
    products: [
      { title: "Scrumpit - Board Games", text: "Invented a new type of word game, available as a board game or mobile game.", href: "/board-games.php", image: "/images/scrumpit-board-game.jpg" },
      { title: "Light Up Shoes", text: "Creator of the first ever light up shoes", href: "/light-shoes.php", image: "/images/shoes-small.png" },
      { title: "Mottik DNA", text: "Designed a new type of connecting toy brick", href: "/mottik-dna.php", image: "/images/blocks-small.png" },
      { title: "Graphite Golf Clubs", text: "Created one of the first graphite golf club shafts", href: "/graphite-golf-clubs.php", image: "/images/golf-small.png" },
      { title: "Graphite Racquets", text: "Created one of the first graphite badminton racquets", href: "/graphite-racquets.php", image: "/images/rackets-small.png" },
      { title: "Popular Inventions", text: "Invented products across a range of industries", href: "/popular-inventions.php", image: "/images/popular-small.png" },
    ], videos: true,
  },
  "light-shoes.php": {
    title: "Mott Research - Inventing Light Shoes", heading: "About Mott Research", image: "/images/shoes-square.png",
    paragraphs: [
      "One of the biggest inventions from Mott Research, the Light Shoe.",
      "Originally designed for recreational runners at night, the invention is now commonly used across all leading trainer manufacturers for professional athletes, recreational sports and children's shoes.",
      "The light up shoe was not a new idea however the issues faced by shoe designers was how to develop energy within a shoe without the use of a battery (which would require replacing by the user).",
      "Using new technologies in light weight electric plastic filaments, Mott Research patented a unique thin, light weight film which produces a small electrical charge from kinetic energy. Placed inside the heel of the shoe, the impact of the heel on the special film creates enough energy for a small light at the back of the heel.",
      "Unlike a battery the film can last for more than the average life of a sports trainer and given the electric films size and weight, it had no impact to the style and design of the trainer.",
    ], gallery: [
      { thumbnail: "/images/light-gallery.png", full: "/images/light-full.png", alt: "Light-up shoe" },
    ], videos: true,
    sideVideos: [
      { title: "The inspiration behind the Light Up Shoes", videoId: "1zroBdKsVTE" },
      { title: "The unlucky Light Up Shoe thief", videoId: "dlj7qfuKkZs" },
      { title: "Light Up Shoes – Olympic torch story – Barcelona 1992 Games", videoId: "N5R_15iiOyU" },
      { title: "The Light Up Shoe – Meeting Mr Onitskua", videoId: "9gGz00nv8HE" },
      { title: "The Light Up Shoe – Turned down by the big Footware Brands in the ’90s", videoId: "bcwGNNnfdrQ" },
    ],
  },
  "board-games.php": {
    title: "Mott Research - Inventing Board Games", heading: "Board Games - Scrumpit", image: "/images/board-square.jpg",
    paragraphs: [
      "Mott Research expands its portfolio in the board games industry with a new and hugely successful board game, Scrumpit.",
      "As a traditional board game or as a mobile app, Scrumpit is a new take on word games which children and adults can't put down.",
      "Scrumpit is an ‘Old English’ word which means to steal your neighbours’ fruit – The game is for 2, 3 or 4 players, involving tactics, strategy and wordplay with the option of scoring for yourself and/or frustrating other players by stealing their letters.",
    ], gallery: [
      { thumbnail: "/images/board-apps.jpg", full: "/images/board-3-full.jpg", alt: "Scrumpit mobile apps" },
      { thumbnail: "/images/board-game.jpg", full: "/images/board-2-full.jpg", alt: "Scrumpit board game" },
      { thumbnail: "/images/board-lrg-thumb.jpg", full: "/images/board-1-full.jpg", alt: "Scrumpit board and pieces" },
      { thumbnail: "/images/board-full.jpg", full: "/images/board-4-full.jpg", alt: "Full Scrumpit game" },
    ], videos: true,
  },
  "graphite-racquets.php": {
    title: "Mott Research - Inventing Graphite Racquets", heading: "Graphite Racquets", image: "/images/rackets-square.png",
    paragraphs: [
      "Mott Research played a leading role in the introduction of graphite technology in badminton racquets.",
      "Players of this popular mainstream sport demanded lighter, more durable racquets to gain a competitive advantage, and the introduction of a graphite frame was a major improvement to the heavier frames used previously.",
    ], gallery: [
      { thumbnail: "/images/racket-5.png", full: "/images/racket-5-full.png", alt: "Graphite badminton racquet" },
      { thumbnail: "/images/racket-4.png", full: "/images/racket-4-full.png", alt: "Graphite racquet design" },
      { thumbnail: "/images/racket-3.png", full: "/images/racket-3-full.png", alt: "Graphite racquet detail" },
      { thumbnail: "/images/racket-2.png", full: "/images/racket-2-full.png", alt: "Graphite badminton racquet detail" },
      { thumbnail: "/images/racket-1.png", full: "/images/racket-1-full.png", alt: "Mott Research graphite racquet" },
    ], videos: true,
  },
  "graphite-golf-clubs.php": {
    title: "Mott Research - Inventing Graphite Golf Clubs", heading: "Graphite Golf Clubs", image: "/images/golf-square.png",
    paragraphs: [
      "Demand in golfing exploded during the 20th century and with it came demand for more flexible, durable golf clubs.",
      "One of the key advancements in golf club technology came with graphite golf shafts.",
      "Mott Research was at the forefront of this new advancement of golf shafts.",
    ], videos: true,
  },
  "mottik-dna.php": {
    title: "Mott Research - Mottik DNA", heading: "Mottik DNA", image: "/images/toy-square.jpg",
    paragraphs: [
      "Mott Research has had a long and successful history in the children's toy brick industry.",
      "Starting with exploring new shapes and ways to connect squares and triangles, a new format of toy bricks was formed, called Mottik.",
      "Mottik was the first really three dimensional side joining bricks and Triangles system. John invented the idea of a Direction changer (X joiner) that with this triangle idea allows users so much more opportunity to build than Traditional bricks. Mottik fully used 4 sides of the brick whereas traditional bricks only used two – Simple but brilliant. See some of the great ideas and models below.",
      "After an explosion across the toy brick industry including the educational sector, the original Mottik toy design has been incorporated into the fast selling toy brick Morphun.",
      "Morphun products have won ten GOLD or winners awards and twelve other major educational or retail product awards and are available in over 50 countries world wide.",
    ], externalLink: { label: "Find out more about Morphun here.", href: "https://www.morphun.com/" }, gallery: [
      { thumbnail: "/images/toy-1.jpg", full: "/images/toy-1-full.jpg", alt: "Mottik toy bricks model" },
      { thumbnail: "/images/toy-2.jpg", full: "/images/toy-2-full.jpg", alt: "Mottik construction pieces" },
      { thumbnail: "/images/toy-3.jpg", full: "/images/toy-3-full.jpg", alt: "Mottik toy brick set" },
      { thumbnail: "/images/toy-4.jpg", full: "/images/toy-4-full.jpg", alt: "Mottik sumo model" },
    ], videos: true,
  },
  "popular-inventions.php": {
    title: "Mott Research - Popular Inventions", heading: "Popular Inventions", image: "/images/popular-square.png",
    paragraphs: ["Mott Research has invented new ideas and products across a range of industries.", "From sports equipment, toys, board games and safety devices, Mott Research takes ideas and turns them into award winning products."], videos: true,
  },
  "consultation.php": {
    title: "Mott Research - Product Consultation", heading: "Consultation",
    description: "Product development consultant, Mott Research is a well established product development consultancy company. Use Mott Research to consult on product development using innovation and invention.",
    keywords: "product development,product development consultant,innovation,invention,inventions,inventors,inventing,innovated,innovating,business innovation,innovation business,innovation and business,innovation in business,business and innovation,innov,inven,inventive",
    paragraphs: [
      "Everyone has ideas but not everyone can take those ideas and make them into industry leading products.",
      "Mott Research works with businesses and individuals to help take new or existing products to a new level. With a combination of technical, business and market experience, Mott Research has been a trusted consultancy for companies across the world.",
      "Get in touch today to find out how Mott Research can help your products grow.",
    ], gallery: [
      { thumbnail: "/images/shell.png", full: "/images/shell-full.png", alt: "Shell" },
      { thumbnail: "/images/asics.png", full: "/images/asics-full.png", alt: "Asics" },
      { thumbnail: "/images/hallmark.png", full: "/images/hallmark-full.png", alt: "Hallmark" },
      { thumbnail: "/images/marks-and-spencer.png", full: "/images/marks-and-spencer-full.png", alt: "Marks and Spencer" },
    ], videos: true,
  },
  "contact.php": { title: "Mott Research - Contact", heading: "Contact", keywords: legacyTypoKeywords, contact: true, videos: true },
  "videos-mottik-dna-smithsonian-tv.php": { title: "Mott Research - Mottik DNA Smithsonian TV", heading: "Videos - Mottik DNA Smithsonian TV", videoId: "I1khEv62Mkg" },
  "videos-light-up-trainers.php": { title: "Mott Research - Light shoe videos", heading: "Videos - Light Up Shoes", videoId: "jVRqduAuPq4" },
  "videos-scrumpit.php": { title: "Mott Research - Board games Scrumpit video", heading: "Videos - Scrumpit", videoId: "L3QoMQqCXF4" },
  "videos-toy-bricks-mottik.php": { title: "Mott Research - Mott Research overview video", heading: "Videos - Mottik - Toy Bricks", videoId: "0x-xSAMCwFs" },
  "videos-mott-research-preview.php": { title: "Mott Research - Toy Bricks video", heading: "Videos - Mott Research Preview", videoId: "WTFf3Q3Rkv4" },
};
