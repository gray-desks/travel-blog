# Sanity Studio (Minimal / MVP)

This repository hosts both:
- Next.js frontend (root)
- Sanity Studio (./studio)

## How to run Studio
```bash
cd studio
npm install
npm run dev   # default: http://localhost:3333
```

## One-time settings in Sanity (already done or verify)

- **Project ID**: c3twwalw
- **Dataset**: production
- **API → Public content API**: ON (anonymous read)
- **API → CORS origins**: add `http://localhost:3333` and your Vercel URL(s)

## Create first content

1. Open Studio → New → Article
2. Fill title / slug / publishedAt / body (and image optionally)
3. Publish

The frontend will read from the same project/dataset with one env var:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=c3twwalw
```

## Schema (Minimal)

This studio contains only essential fields:
- **title** (required)
- **slug** (required, auto-generated from title)
- **publishedAt** (datetime)
- **excerpt** (text summary)
- **mainImage** (image with hotspot)
- **body** (blockContent: text, headings, lists, images)

No multilingual, tags, gallery, affiliate, or custom plugins are included in this minimal setup.