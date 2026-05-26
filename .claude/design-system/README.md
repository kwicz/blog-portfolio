# Katy Lee's Mouth Harps — Design System

> Small-batch Brooklyn ecommerce store for hand-tuned mouth harps. Soft palette, generous radii, a serif that knows it's pretty.

This is the source-of-truth design system: colors, typography, components, voice, and a working ecommerce UI kit. Pull from `tokens.css` and `colors_and_type.css` at the foundation; lift component patterns from `ui_kits/store/`.

---

## Sources & references

| Source | Where | Notes |
| --- | --- | --- |
| Brand notes | `source/notes.txt` (copied from `katy-lees-mouth-harps/notes.txt`) | One-paragraph "brand at a glance." |
| Spec | `source/spec.md` (copied from `katy-lees-mouth-harps/spec.md`) | Full written design system — palette, type, components, voice, hard don'ts. |
| Tokens | `tokens.css` (copied from `katy-lees-mouth-harps/tokens.css`) | The source of truth for all values. |
| Visual inspiration — editorial layout | https://www.apartmenttherapy.com/ | Full-bleed tiles, ribbon stamps, confident serif headlines, outline-pill nav, tiny caps metadata. |
| Visual inspiration — ecommerce layout | https://froyaorganics.com/ | Hero block + soft palette + tile grid pacing. |
| Visual inspiration — ecommerce layout | https://www.toadandco.com/ | Image-led cards, editorial product display, generous whitespace. |

> The codebase shipped only `tokens.css`, `spec.md`, and `notes.txt` — no React/HTML sources. Components in `ui_kits/store/` are this system's first hi-fi recreation of the brand, derived strictly from the spec.

---

## Index

```
/
├── README.md                  this file
├── SKILL.md                   agent-skill front-matter (for Claude Code)
├── tokens.css                 raw CSS variables — colors, spacing, radii, shadows
├── colors_and_type.css        semantic aliases + typography rules (import this)
├── source/
│   ├── spec.md                full original spec
│   ├── notes.txt              brand-vibe paragraph
│   └── tokens.css             original token file (mirror)
├── assets/
│   ├── logo-wordmark.svg      Fraunces wordmark
│   ├── logo-mark.svg          monogram K·L mark
│   ├── icons/                 single-stroke line icons (1.5–2px)
│   ├── illustrations/         line-art category illustrations
│   └── placeholders/          product image placeholders
├── preview/                   small specimen cards for the Design System tab
├── ui_kits/
│   └── store/                 ecommerce site UI kit
│       ├── README.md
│       ├── index.html         interactive click-thru of the storefront
│       ├── components/        JSX components — Button, ProductCard, Ribbon, etc.
│       └── screens/           Home / PDP / Cart screen JSX
└── fonts/                     (empty — Google Fonts is used; see Type Substitution)
```

---

## CONTENT FUNDAMENTALS

> Warm and a little surprised to see you. Specific over clever. The harp is treated as a real, slightly serious object — the humor comes from the seriousness, not from punning at the user.

### Voice

- **Person.** Mostly "we" (the shop) talking to "you" (a customer). Never "the user," never "users." The shop is small and real; the copy admits it.
- **Specificity over cleverness.** Always pick the version that gives the reader an extra fact. "Hand-tuned in a small shop in Brooklyn" beats "Crafted with love."
- **Humor from seriousness, not punning.** The harp is treated like a real object — heavy, tuned, fussy. The product gets the dignity; the wink is in the dignity itself.
- **Warmth without exclamation.** No "!!", no "!!", no "yay." If you want warmth, add a specific detail; don't add punctuation.

### Casing & punctuation

- **Sentence case** for buttons, labels, navigation. ("Add to bag" — not "ADD TO BAG", not "Add To Bag.")
- **Caps + 0.12em letter-spacing** only for eyebrows / metadata / outline "see more" pills.
- **No trailing periods** on single-line UI strings unless it's a full sentence with a verb.
- **Em-dash, not "—"** for asides. We use the actual character.

### I vs. you vs. we

- "We" — the shop. ("We'll write to you when there are more.")
- "You" — the reader. ("Your bag has three harps and one cotton pouch.")
- "I" — never in product copy; only on the About page in Katy's voice.

### Emoji & special chars

- **No emoji.** None. Not in marketing, not in toast messages, not in empty states. The line-icon set is the emoji.
- **Unicode characters** are okay if they're real (· ↗ ↘ — × ‧). We use **·** as separator in metadata strings ("12.4K saved · Editor's pick").
- **Numerals** use figures, not words ("3 harps" not "three harps") — but Katy's letters and the About page use words.

### Length & rhythm

- Hero headlines: 4–9 words, one line.
- Product titles: a noun + a defining adjective. ("The Brass One." "The Tiny Travel Harp.")
- Microcopy: one sentence, one fact. Two if the second is a reassurance.

### Examples — we say / we don't

| We say | We don't |
| --- | --- |
| "Hand-tuned in a small shop in Brooklyn." | "Welcome to the world's best mouth harp store!!" |
| "Out of stock — we'll write to you when there are more." | "Sorry! This product is currently unavailable at this time." |
| "Added. Your bag has three harps and one cotton pouch." | "Item successfully added to cart." |
| "That postal code doesn't look quite right. Take another look?" | "Error: Invalid ZIP code." |
| "12.4K saved · Editor's pick" | "12,400 likes • Featured product" |
| "See more ↗" | "View all products →" |

### Vibe words

playful · tactile · curated · a little weird · specific · warm · unhurried

---

## VISUAL FOUNDATIONS

### Color

Five core colors do everything. Cream is the canvas; charcoal is the ink; three pastels do personality. Five accent extensions exist for state, stamps, and signal moments — never for hero positions.

- **Cream `#F9F8FB`** — the page. **Never pure white.** Pure white is colder than this brand allows.
- **Soft Lilac `#E8D9F0`** — hero blocks, secondary buttons, tags.
- **Pale Sage `#C8D4C4`** — "in stock," "save," grounding pastel.
- **Warm Gray-Lavender `#B0A8C4`** — **THE brand color.** Underlines, focus rings, signature accents. Used like a signature, not like a background.
- **Soft Charcoal `#85807A`** — secondary type, dividers, mid-tone iconography.
- **Berry / Honey / Deep Sage / Tomato / Butter** — see `tokens.css`. Tomato ribbons only; butter for the single highlighter dot per screen.

**Pairing rules.** One pastel per surface. One accent per page. Cream + one pastel + ink is the default recipe. Never stack lilac + sage + lavender at full weight on one screen — that reads Easter basket.

### Typography

Three faces, three jobs.

- **Fraunces** (variable serif) — all display, all headings. Crank `opsz` to 96–144 at 48px+ so the curves get their personality. Slight `SOFT` 30–50 for warmth.
- **Inter** — body, eyebrows, captions, buttons. Never raises its voice.
- **Caveat** — handwritten accents only. **Three words max, never under 22px, never in a button.**

**Scale.** Display XL 72/72 · Display L 48/50 · Display M 32/36 · Body L 18/28 · Body 16/26 · Body S 14/22 · Caps 12 · 0.12em letter-spacing.

> **Type substitution flag.** No font files were shipped. We pull Fraunces, Inter, and Caveat from Google Fonts (the canonical hosting for all three — they're variable, free, and identical to the spec'd versions). If you want self-hosted .ttf/.woff2 files, drop them into `./fonts/` and swap the `@import` in `colors_and_type.css` for `@font-face` blocks. **Action needed:** confirm Google Fonts is acceptable, or send the licensed files.

### Spacing & radius

- **4pt grid.** `--space-1` 4px → `--space-20` 80px. Default card padding `--space-6` (24px); default gap between cards `--space-4` (16px).
- **Round everything.** No sharp corners where a finger can land. Radius ladder: 4 / 8 / 14 / 22 / 32 / pill.
- Buttons + inputs → `--radius-md` 14px or pill. Product cards → `--radius-lg` 22px. Hero blocks → `--radius-xl` 32px.

### Elevation

Three soft lifts and one focus glow. Long, low, slightly cool — **never above 12% opacity.** Cards lift 4px on hover; the shadow announces the interaction, not the color.

- `--shadow-1` resting · `--shadow-2` hovered · `--shadow-3` floating
- `--shadow-glow` — lavender 25%, the focus ring.

### Backgrounds & textures

- **Page is cream**, flat, untextured. Almost everything sits on cream.
- **Hero blocks** layer two radial gradients (lilac + sage) over cream for a "warm envelope" feel. No mesh-gradients, no photographic textures, no noise.
- **Category tiles** are full-bleed flat color, rotating through the saturated palette. Single-stroke line illustration centered. Label sits *underneath* the tile, not on it.
- **No photographic full-bleed marketing imagery** behind text. Product photography is image-led-card territory.
- **No grain, no paper texture, no noise overlay.** The serif and the radii carry the warmth.

### Animation & easing

- Two easings. **`--ease-soft`** `cubic-bezier(.4, 0, .2, 1)` for color / box-shadow / opacity. **`--ease-bounce`** `cubic-bezier(.34, 1.56, .64, 1)` for hover lifts and the button press.
- Hover: cards translate `-4px` over 200–240ms, shadow swaps from `--shadow-1` to `--shadow-2`. No scale on cards.
- Press: buttons scale `0.97` for 80ms, then settle. Lavender focus glow appears with a 120ms fade.
- No long animations. No spring-into-place layouts on load. The page is here, it doesn't need to make an entrance.

### Hover & press states

- **Buttons.** Primary (ink) → lifts to `--charcoal-500`, lavender glow appears on focus. Secondary (lilac) → `--lilac-300`. Accent (sage) → `--sage-300`. Ghost → border darkens from `--ink-300` to `--ink-700`. **No opacity changes** as a hover signal — color shifts, never alpha.
- **Cards.** Translate up 4px + shadow upgrade. Image inside stays put (no zoom).
- **Links.** Underline `text-decoration-color` swaps from `--color-lavender` to `--ink-900`. Color never changes.
- **Press.** `transform: scale(0.97)` for 80ms on buttons. Cards don't press — they only hover.

### Borders

- Hairline `1px solid var(--surface-line) #E4DEEA` on form/demo cards.
- Image-led product cards are **borderless** — the image is the frame.
- **Hard don't:** single colored left-border accent stripes. For Do/Don't and alerts, use full-bleed tinted blocks (lilac/sage/berry-50 wash).

### Transparency & blur

- **Used sparingly.** One place: translucent pills pinned over imagery (e.g. "Editor's pick" pinned to a product image) — `rgba(249, 248, 251, 0.85)` + `backdrop-filter: blur(8px)`.
- Never on hero text. Never on body copy. Never on full sections.

### Imagery — color vibe

- Product photography: warm-toned, soft natural light, cream or oak backgrounds. **No b&w.** No cool-blue product shots. Slight film grain is acceptable from the photo itself — never added in CSS.
- Lifestyle: one human hand holding the harp, warm wood/brass tones, shallow depth of field. Hands and harps only — no full-face portraits in product imagery.

### Layout rules

- **Max content width** 1280px. **Generous gutters** — never `padding: 0` on a section. Section vertical rhythm uses `--space-16` 64px (mobile) → `--space-20` 80px (desktop).
- **Sticky header** — cream with a hairline bottom border, no shadow. Goes to `--shadow-1` only after the user scrolls past 24px.
- **Footers** are ink-on-cream — reserved for one moment per page.
- **Editorial section header pattern.** Title on the left, controls + an outline `SEE MORE ↗` pill on the right.
- **Product cards** are tall (4:5) with pastel backgrounds that rotate through the palette.

### Cards (recap)

- **Image-led card.** Borderless. Image fills `--radius-lg` 22px container. Title + price below in cream gutter. Ribbon flag (if any) pinned top-left.
- **Demo / form card.** White on cream, `1px solid var(--surface-line)`, `--radius-md` 14px, `--shadow-1` at rest.
- **Tile.** Full-bleed pastel square, line illustration centered, sans label below the tile.

### Iconography & illustration

Line-based, single-stroke, rounded caps. Illustration strokes 2–3px; UI icons 1.5–2px. **Line color is always the foreground ink** — the color comes from the surface behind. See the **ICONOGRAPHY** section below for the full rules.

---

## ICONOGRAPHY

> All in-store illustrations are line-based, single-stroke, with rounded caps (2–3px). Icons share the same vocabulary at 1.5–2px stroke. **The line color is always the foreground ink — color comes from the surface behind.** If it has eyes, it has a personality (use sparingly).

### Approach

- **Bespoke single-stroke set.** This brand uses its own hand-drawn-feeling SVG line icons. There is no icon font. Each icon is a flat `<svg>` with `stroke="currentColor"`, `stroke-width="1.75"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, no fills.
- **Sizes.** 16px (inline with text), 20px (default UI), 24px (large UI / buttons), 32–48px (tile illustrations, 2–3px stroke).
- **Color.** `stroke="currentColor"` only. Color is inherited from `color:` on the parent — usually `--ink-900` for primary, `--ink-500` for metadata, `--color-lavender` for the leading icon on caps metadata.
- **No fills.** No two-tone icons. No colored-background icon chips. The single stroke does all the work.

### Icon set inventory

The kit ships a starter set in `assets/icons/`. All are 24×24 single-stroke SVGs. Add new icons by following the same `<svg>` template (see `assets/icons/_template.svg`).

| File | Use |
| --- | --- |
| `cart.svg` | header — bag count |
| `search.svg` | header search |
| `heart.svg` | save / wishlist |
| `user.svg` | account |
| `arrow-up-right.svg` | "see more ↗" outline pill |
| `arrow-right.svg` | carousel nav, in-flow links |
| `arrow-left.svg` | carousel nav |
| `check.svg` | "in stock" pill leading icon |
| `star.svg` | rating (single, repeated; honey stroke) |
| `pin.svg` | "made in Brooklyn" metadata |
| `truck.svg` | shipping metadata |
| `note.svg` | "Katy's notes" leading icon |

### Illustrations

Tile-grid illustrations (category navigation) live in `assets/illustrations/`. 2–3px stroke, rounded caps, single color. They are illustrations of the *category*, not the product (e.g. "brass" is a coiled brass-toned line drawing of a tuning shape; "travel" is a small zipped pouch). Always centered on a saturated pastel tile, with the sans label sitting *below* the tile, never on it.

### Emoji and unicode

- **No emoji. Anywhere.** The line-icon set is the brand's emoji.
- **Unicode characters** used: `·` (metadata separator), `↗` (see-more pill), `↘` (rare), `×` (close), `‧` (rare separator). Never anything decorative.

### CDN fallback

If a designer needs an icon not in the bespoke set, **fall back to Lucide** (`https://unpkg.com/lucide-static`) — same stroke vocabulary, same single-color line style, same rounded caps. Match the stroke width to 1.75. **Flag the substitution** in the design and request a bespoke version.

> **Note.** The shipped codebase had no icon files. The starter SVGs in `assets/icons/` are this system's first pass — clean, on-vocabulary, but new. **Action needed:** confirm direction; we'll iterate if any feel off.

---

## The five rules that matter most

1. **Cream is the canvas.** Pure white is colder than this brand allows.
2. **One pastel per surface, one accent per page.**
3. **Lavender is the brand color** — use it like a signature, not like a background.
4. **Round everything.** No sharp corners where a finger can land.
5. **Fraunces does the talking. Caveat whispers. Inter never raises its voice.**

## Hard don'ts

- No colored left-border accent stripes on cards.
- No drop shadows above 12% opacity.
- No Caveat in buttons / body / anywhere it has to work for a living.
- No three-pastel stacks at full weight on one screen.
- No tomato or butter in hero positions or in buttons.
- No new hex values invented at component time — derive from `tokens.css`.
- No emoji. None.
- No bluish-purple gradients. No left-stripe alert cards. No emoji-cards.
