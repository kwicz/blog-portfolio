# Storefront UI kit — Katy Lee's Mouth Harps

A hi-fi recreation of the ecommerce experience. Pull from these components when building storefront screens.

## Run

Open `index.html` directly. It loads React from CDN and the component files from `components/` + `screens/`. No build step.

## Components

| File | What it is |
| --- | --- |
| `components/Button.jsx` | Pill buttons — primary, secondary, accent, ghost, outline-caps |
| `components/Commerce.jsx` | `FreeShippingBar` · `QuantityStepper` · `Breadcrumb` · `Stars` |
| `components/Ribbon.jsx` | Notched flag stamp (tomato / charcoal / lavender / honey) |
| `components/Badge.jsx` | Lower-volume pill state markers |
| `components/Marquee.jsx` | Scrolling announcement bar above the header |
| `components/Header.jsx` | Sticky cream header with logo, nav, search, account, bag |
| `components/Footer.jsx` | Ink-on-cream footer — one moment per page |
| `components/Hero.jsx` | Two-radial warm-envelope hero block |
| `components/Tile.jsx` | Full-bleed pastel category tile with line illustration |
| `components/ProductCard.jsx` | Image-led product card (4:5) with optional ribbon |
| `components/EditorialHeader.jsx` | "Title left · See more ↗ right" section header |
| `components/HighlighterDot.jsx` | Butter circle + Caveat label — pins to a corner |
| `components/CartDrawer.jsx` | Slide-in bag from the right |
| `components/Icon.jsx` | Inline SVG icon by name |

## Screens

| File | What it is |
| --- | --- |
| `screens/HomeScreen.jsx` | Storefront home — hero, tile grid, "new this week" carousel, editorial block |
| `screens/CollectionsScreen.jsx` | PLP — breadcrumb, sticky filter bar, sort, product grid with quick-add, editorial feature, empty state |
| `screens/ProductScreen.jsx` | PDP — variant chips, qty stepper, EDD, free-shipping progress, sticky add-to-bag, accordion, reviews summary + cards, related products |
| `screens/JournalScreen.jsx` | Journal index — featured post, category filter, grid, newsletter callout |
| `screens/JournalPostScreen.jsx` | Journal post detail — lede, body blocks, pull-quotes, cross-sell, author bio, related posts |
| `screens/AboutScreen.jsx` | About — founder intro, stats, team grid, shop info & hours, press strip, closing newsletter |

## Notes on fidelity

- The provided codebase shipped only `tokens.css` + `spec.md` — no source components. Everything here is the system's first hi-fi pass against the written spec.
- Inspiration patterns lifted from Apartment Therapy (editorial tile grids, ribbon stamps), Froya Organics (soft palette hero pacing), and Toad & Co (image-led product cards, generous whitespace).
- Product photography is line-art SVG placeholder on pastel backgrounds. Swap in real warm-toned product photography when available.
