import { allProjects } from '@/.contentlayer/generated';
import { Hero } from './components/hero';
import { Tile } from './components/tile';
import { ProductCard } from './components/product-card';
import { EditorialHeader } from './components/editorial-header';
import { Icon } from './components/icons';

const CATEGORY_TILES = [
  { href: '/projects?category=E-Commerce', label: 'E-Commerce', illustration: '/illustrations/pouch-line.svg', surface: 'lilac' as const },
  { href: '/projects?category=E-Learning', label: 'E-Learning', illustration: '/illustrations/note-music-line.svg', surface: 'sage' as const },
  { href: '/projects?category=Just+For+Fun', label: 'Just For Fun', illustration: '/illustrations/cat-2-line.svg', surface: 'lavender' as const },
  { href: '/projects', label: 'All Work', illustration: '/illustrations/harp-line.svg', surface: 'cream' as const },
];

export default function Home() {
  const published = allProjects
    .filter(p => p.published !== false)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

  const featured = published.slice(0, 4);

  return (
    <>
      <Hero
        eyebrow="Frontend engineer & designer"
        headline="Building things that feel as good as they look."
        subline="I design and build thoughtful digital experiences — from e-commerce storefronts to learning platforms."
        ctaHref="/projects"
        ctaLabel="See my work"
      />

      <section style={{ padding: '64px 0 0' }}>
        <div className="container">
          <EditorialHeader title="Explore by type" />
          <div className="tile-grid" style={{ marginTop: 24 }}>
            {CATEGORY_TILES.map(tile => (
              <Tile key={tile.href} {...tile} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0' }}>
        <div className="container">
          <EditorialHeader
            title="Recent work"
            seeMoreHref="/projects"
            seeMoreLabel="All projects"
          />
          <div className="prod-grid" style={{ marginTop: 28 }}>
            {featured.map(project => (
              <ProductCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 32px' }}>
        <div className="container">
          <div className="trust-strip">
            {[
              { icon: 'truck' as const, title: 'Available for freelance', sub: 'Usually replies in 1–2 days.' },
              { icon: 'pin' as const,   title: 'Based in NYC',            sub: 'Open to remote and on-site.' },
              { icon: 'check' as const, title: 'Full-stack capable',      sub: 'Design through deployment.' },
            ].map((item) => (
              <div key={item.title} className="trust-item">
                <div className="trust-icon"><Icon name={item.icon} size={20} strokeWidth={1.75} /></div>
                <div>
                  <div className="trust-title">{item.title}</div>
                  <div className="trust-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="ed-block">
            <div>
              <p className="ed-eyebrow">A note</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15, marginBottom: 16 }}>
                I care about work that{' '}
                <span className="word--highlighted">means something.</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: '28px', color: 'var(--ink-700)', maxWidth: 520, margin: '0 0 24px' }}>
                Every project I take on is an opportunity to make something genuinely useful — whether that's a storefront that converts, a learning tool that sticks, or a small site that makes someone smile.
              </p>
              <a href="/contact" className="btn btn-primary">
                Work with me
              </a>
            </div>
            <div style={{ position: 'relative', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/illustrations/hand-line.svg" alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', opacity: 0.65 }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
