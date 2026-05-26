# Katy Lee's Mouth Harps — Design System

A small-batch ecommerce store selling hand-tuned mouth harps. Soft palette, generous radii, a serif that knows it's pretty.

Companion files in this folder:

- `design-system.html` — full visual showcase (every component, in context)
- `tokens.css` — flat CSS variable reference (the source of truth)
- `notes.txt` — short paragraph for the "Any other notes?" field

## Brand at a glance

Warm and a little surprised to see you. Specific over clever. The harp is treated as a real, slightly serious object — the humor comes from the seriousness, not from punning at the user.

**Vibe words:** playful, tactile, curated, a little weird.

## Palette

Five core hues. Cream is the canvas; charcoal is the ink; the three pastels do the personality work. Five accent extensions exist for tags, ribbons, and signal moments only — never for hero positions.

| Token | Hex | Job |
| --- | --- | --- |
| Cream | `#F9F8FB` | Default page canvas. Never pure white. |
| Soft Lilac | `#E8D9F0` | Hero blocks, secondary buttons, decorative tags. |
| Pale Sage | `#C8D4C4` | "In stock," "keep / save" buttons, grounding pastel. |
| Warm Gray-Lavender | `#B0A8C4` | THE brand color. Underlines, focus rings, signature accents. |
| Soft Charcoal | `#85807A` | Secondary type, dividers, mid-tone iconography. |
| Berry | `#B8657A` | Sale pills, inline errors, "low stock." |
| Honey | `#D4B483` | Star ratings, awards, warnings. |
| Deep Sage | `#8AA38C` | Success toasts, check icons, "in stock" signals. |
| Tomato | `#E26B4C` | Ribbon flag stamps only ("new," "before," "limited"). Never a button. |
| Butter | `#F2E26A` | The highlighter dot. One per screen, max 80px. |

**Pairing rules.** One pastel does the personality work per surface. Never stack lilac + sage + lavender at full weight on the same screen — that reads Easter basket. Cream + one pastel + ink is the default recipe.

## Typography

Three faces, three jobs.

- **Fraunces** (variable serif) — for warmth and personality. All display sizes. Use the optical-size axis: at 48px+, set `opsz: 96–144` so the curves get their personality.
- **Inter** — for everything you need to read quickly. Body, eyebrows, captions, buttons.
- **Caveat** — for handwritten accents. Three words at most. Never under 22px. Never in a button.

**Scale.** Display XL 72/72 · Display L 48/50 · Display M 32/36 · Body L 18/28 · Body 16/26 · Body S 14/22 · Caps 12 · 0.12em letter-spacing.

## Spacing & radius

- 4pt grid. Default card padding is `--space-6` (24px). Default gap between cards is `--space-4` (16px).
- Round everything. **No sharp corners where a finger can land.** Radius ladder: 4 / 8 / 14 / 22 / 32 / pill.

## Elevation

Three soft lifts and one focus glow. Long, low, slightly cool — never above 12% opacity. Cards lift 4px on hover; the shadow announces the interaction, not the color.

## Components — at-a-glance rules

- **Buttons** are pill-shaped, generously padded. Primary = ink. Secondary = lilac. Accent = sage ("save / keep / continue"). Ghost = hairline border. **Outline pill** (caps, with arrow icon) is for editorial "see more" moments — pairs with the round nav-arrow button on carousels.
- **Forms** use rounded inputs on white surfaces inside cream sections, with a lavender focus glow. Labels are bold 13px.
- **Ribbon flags** (tomato by default, with a notched right edge) pin to the top-left of an image. Use for "new," "sale · 20%," "limited," "before." Variants: charcoal, lavender, honey.
- **Pill badges** announce a state ("in stock," "shipped," "pre-order") — lower-volume than ribbons.
- **Cards** are borderless when image-led — let the image be the frame. Use a hairline `--surface-line` border only on form/demo cards.
- **Tile grid** (category navigation) — full-bleed colored squares with single-stroke line art and a sans label below. Backgrounds rotate through the saturated members of the palette. One tomato tile per row, one butter tile per row, max — never two saturated tiles touching at the corners.
- **Highlighter dot** — butter-yellow circle that points AT something (a corner of an image, a price). Never floating in dead space. One per screen.
- **View-count metadata** — caps 11–12px with a small lavender leading icon ("12.4K saved," "Editor's pick"). Sits above editorial card titles or pinned over imagery in a translucent pill.

## Illustration & iconography

All in-store illustrations are line-based, single-stroke, with rounded caps (2–3px). Icons share the same vocabulary at 1.5–2px stroke. The line color is always the foreground ink — color comes from the surface behind. If it has eyes, it has a personality (use sparingly — the cat is a friend, not the mascot).

## Voice & tone

| We say | We don't |
| --- | --- |
| "Hand-tuned in a small shop in Brooklyn." | "Welcome to the world's best mouth harp store!!" |
| "Out of stock — we'll write to you when there are more." | "Sorry! This product is currently unavailable at this time." |
| "Added. Your bag has three harps and one cotton pouch." | "Item successfully added to cart." |
| "That postal code doesn't look quite right. Take another look?" | "Error: Invalid ZIP code." |

## The five rules that matter most

1. **Cream is the canvas.** Pure white is colder than this brand allows.
2. **One pastel per surface, one accent per page.**
3. **Lavender is the brand color** — use it like a signature, not like a background.
4. **Round everything.** No sharp corners where a finger can land.
5. **Fraunces does the talking. Caveat whispers. Inter never raises its voice.**

## Hard don'ts

- **No single colored left-border accent stripes on cards.** Use full-bleed tinted blocks for Do/Don't, alerts, and callout patterns.
- No drop shadows that use opacity above 12%. We lift, we don't drop.
- No Caveat in buttons, body copy, or anywhere it has to work for a living.
- No three-pastel stacks at the same weight on one screen.
- No tomato or butter in hero positions or in buttons.
- No new hex values invented at component time — derive from a token in `tokens.css`. If a new token is needed, canonize it in this folder first.

## Editorial composition cues (from the visual showcase)

- Section headers use the "editorial-head" pattern: title on the left, controls + an outline `SEE MORE ↗` pill on the right.
- Cards are tall (4:5) with pastel backgrounds that rotate through the palette.
- Hero blocks layer two radial gradients (lilac + sage) over cream for a "warm envelope" feel.
- Footers are ink-on-cream — reserved for one moment per page.

## When in doubt

Choose the version that feels like it came from a real, small shop. Not from a brand deck.
