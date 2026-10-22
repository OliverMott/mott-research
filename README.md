# Mott Research

A clean Next.js rebuild of [mottresearch.com](https://mottresearch.com), preserving the company’s existing design, content, imagery, page structure, existing links through permanent redirects from legacy `.php` URLs, and page-level SEO metadata while adding responsive layouts.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

The project is ready to import into Vercel with the default Next.js settings.

## Page URLs and search indexing

Pages use extensionless URLs, for example `/consultation`. Next.js returns permanent
308 redirects from every previous `.php` page directly to its replacement, including
`/index.php` and the older toy brick and Smithsonian aliases. Keep these redirects
indefinitely so existing links and bookmarks continue to work.

Internal links, page canonical URLs and `/sitemap.xml` use the clean URLs on
`https://www.mottresearch.com`, matching the live site's preferred hostname.
`/robots.txt` advertises the sitemap. After deployment, submit the sitemap in Google
Search Console and monitor indexing and search traffic as Google processes the URLs.
