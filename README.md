<div align="center">
    <a href="https://k.solovewi.cz"><h1 align="center">Katy Solovewicz</h1></a>
    <h2>Personal Portfolio and Blog</h2>

Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Upstash](https://upstash.com?ref=chronark.com), [Contentlayer](https://www.contentlayer.dev/) and deployed to [Vercel](https://vercel.com/).

Site modified from [Chronark](https://chronark.com/)

</div>

<br/>

## Get Started

```sh-session
git clone https://github.com/kwicz/blog-portfolio.git
cd https://github.com/kwicz/blog-portfolio.git
```

Create a `.env` file similar to [`.env.example`](https://github.com/kwicz/k.solovewi.cz/blob/main/.env.example).

Then install dependencies and run the development server:

```sh-session
pnpm install
pnpm dev
```

## Add New Content

After adding a new `.mdx` file in `/blog` or `/project`, `pnpm dev` will auto-generate the JSON for production-level output. Push to git to publish.

## Font Management

This project uses local fonts to avoid build-time network requests that can cause Vercel deployment failures. All fonts are stored in `public/fonts/` and loaded using Next.js `localFont`.

### Active Fonts

- **Inter** (`--font-body`): Regular (400), Bold (700)
- **Fraunces** (`--font-display`): variable font, weights 100–900, with `opsz`/`SOFT`/`WONK` axes
- **Caveat** (`--font-script`): variable font, weights 400–700

Also present in `public/fonts/` but unused by the current theme: Poppins, Raleway, Open Sans, Cal Sans.

### Updating Fonts

To update or add new fonts, run:

```bash
./scripts/download-fonts.sh
```

This script downloads the latest versions of Google Fonts locally, preventing build-time network timeouts.

## Build Issues Fixed

**Problem**: Vercel builds were failing with `FetchError: request to https://fonts.gstatic.com/... failed, reason: ETIMEDOUT`

**Solution**: Replaced `next/font/google` with `localFont` to eliminate external network requests during build.

**Benefits**:

- ✅ No more build timeouts
- ✅ Faster builds
- ✅ More reliable deployments
- ✅ Better performance (fonts served from your domain)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build now completes successfully without font-related network errors.
