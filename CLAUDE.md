# blog-portfolio

Personal blog and portfolio site for Katy Solovewicz — built with Next.js 13 App Router, Contentlayer, and Tailwind CSS.

## Dev Commands

```bash
npm run dev      # Start dev server on :3000
npm run build    # Production build
npm run start    # Start production server
npm run fmt      # Lint + format with Rome
```

Package manager: **pnpm**

## Architecture

- **App Router** (`app/`) for all pages and UI
- **Pages Router** (`pages/api/`) for API routes only (`/api/incr` — page view tracking)
- **Contentlayer** generates typed content from `content/**/*.mdx` at build time
- **ISR** with `revalidate = 60` on listing and detail pages
- **Dark mode** — class-based, persisted in `localStorage`, toggled on `<html>`

## Content Model (Contentlayer)

| Type | Source | Required Fields |
|------|--------|----------------|
| `Post` | `content/posts/**/*.mdx` | `title`, `description` |
| `Project` | `content/projects/**/*.mdx` | `title`, `description` |
| `Page` | `content/pages/**/*.mdx` | `title` |

All types have computed `path` and `slug` fields. Only items with `published: true` appear in static routes.

## Styling

- Tailwind CSS with custom color tokens: `ivory`, `slate`, `rose`, `gold`, `sage`, `ocean`
- Custom fonts loaded locally from `public/fonts/`: Inter, Poppins, Raleway, OpenSans, CalSans
- Prose styles for MDX content via `@tailwindcss/typography`
- `global.css` sets CSS variables for colors and font families

## Environment Variables

```
UPSTASH_REDIS_REST_URL     # Redis endpoint for page view tracking
UPSTASH_REDIS_REST_TOKEN   # Redis auth token
```

Never commit `.env` — credentials must stay out of git.

## Key Files

| File | Purpose |
|------|---------|
| `contentlayer.config.js` | Content type definitions + MDX pipeline |
| `app/layout.tsx` | Root layout, fonts, metadata, GA |
| `app/components/mdx.tsx` | Custom MDX component overrides |
| `app/components/particles.tsx` | Canvas particle animation |
| `app/components/toggleButton.tsx` | Dark mode toggle |
| `util/modeToggle.ts` | Dark mode localStorage hook |
| `pages/api/incr.ts` | Edge runtime view counter (Upstash Redis) |
| `types/global.d.ts` | `window.gtag` type declaration |

## Known Issues

- `zw-full` CSS typo (should be `w-full`) in project image containers
- Duplicate `sans` key in `tailwind.config.js` — Inter config is overwritten by Open Sans
- `unoptimized={true}` on `<Image>` components disables Next.js image optimization
- Several files use `@ts-nocheck` / `any` — TypeScript coverage is incomplete
- `rome` formatter is deprecated; successor is [Biome](https://biomejs.dev/)
