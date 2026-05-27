# blog-portfolio

Personal blog and portfolio site for Katy Solovewicz — built with Next.js 13 App Router, Contentlayer, and Tailwind CSS.

> **Do not commit or push unless explicitly asked.** Make changes and wait for instruction.
> **Never include "Co-Authored-By: Claude" in commit messages.**


## Deployment

Hosted on Vercel, connected to `kwicz/blog-portfolio` on GitHub. Every push to `main` triggers an automatic deploy. No manual steps needed — commit and push, and it's live.

## Dev Commands

```bash
pnpm dev         # Start dev server on :3000
pnpm build       # Production build
pnpm start       # Start production server
pnpm fmt         # Lint + format (Rome — see Known Issues)
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

**Project optional fields:** `tagline`, `category`, `image`, `images[]`, `tags[]`, `features[]`, `specs{}`, `rating`, `reviewCount`, `ribbon`, `repository`, `url`, `date`, `notes`

The `images[]` array powers the PDP gallery thumbnails. The first image should match the `image` field (hero/card image).

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

## Adding a New Project

Use the `/add-to-portfolio` skill from inside any project directory. It will:
1. Read the project (README, package.json, source files)
2. Start the dev server and take 5 screenshots
3. Generate a complete MDX file with all frontmatter filled in
4. Bundle everything into `~/Downloads/<slug>.zip`

Then drop `<slug>.mdx` into `content/projects/` and the images into `public/projects/`.

## Known Issues

- `unoptimized={true}` on `<Image>` components disables Next.js image optimization
- Several files use `@ts-nocheck` / `any` — TypeScript coverage is incomplete
- `rome` formatter is deprecated; successor is [Biome](https://biomejs.dev/)
