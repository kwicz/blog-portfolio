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

## Design System

The canonical design guide lives at:

```
.claude/design-system/
```

Key files:
- `source/spec.md` — brand rules, typography, palette, component guidelines (read this first)
- `source/tokens.css` — every CSS variable defined, with comments (source of truth for tokens)
- `tokens.css` — flat token reference (same content, top-level copy)
- `colors_and_type.css` — color + typography tokens only
- `preview/` — HTML previews of every component (open in browser)
- `ui_kits/store/` — full reference component library (JSX + CSS)

**Typography rules (from spec):**
- `--font-display` → Fraunces (variable serif) — headings, display sizes only
- `--font-body` → Inter — body copy, eyebrows, captions, buttons, everything else
- `--font-script` → Caveat — handwritten accents, 3 words max, never in buttons

**When adding new styles:** derive from tokens in `source/tokens.css`. Never invent new hex values at component time.

## Styling

- The active theme is `soft-summer-ecommerce` — all styles live in `global.css` as CSS custom properties
- Custom fonts loaded locally from `public/fonts/`: Inter (body), + Fraunces + Caveat via `next/font/google`
- Font variables are injected by Next.js via `app/layout.tsx` and must match design system names (`--font-body`, `--font-display`, `--font-script`)
- `global.css` is the single source of truth for component classes — no Tailwind utility classes in component files

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
