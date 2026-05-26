import { allProjects } from '@/.contentlayer/generated';
import { Hero } from './components/hero';
import { Tile } from './components/tile';
import { EditorialHeader } from './components/editorial-header';
import { Icon } from './components/icons';
import { RecentCarousel } from './components/recent-carousel';

const CATEGORY_TILES = [
  { href: '/projects?category=E-Commerce', label: 'E-Commerce', illustration: '/illustrations/category-ecommerce.svg', surface: 'lilac' as const },
  { href: '/projects?category=E-Learning', label: 'E-Learning', illustration: '/illustrations/category-elearning.svg', surface: 'sage' as const },
  { href: '/projects?category=Just+For+Fun', label: 'Just For Fun', illustration: '/illustrations/category-fun.svg', surface: 'honey' as const },
  { href: '/projects', label: 'All Work', illustration: '/illustrations/category-allwork.svg', surface: 'lavender' as const },
];

export default function Home() {
  const published = allProjects
    .filter(p => p.published !== false)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

  const featured = published.slice(0, 8);

  return (
    <>
      <section style={{ paddingBlock: '40px 64px' }}>
        <div className="container">
          <Hero
            eyebrow="Full-stack ecommerce developer"
            headline="Building stores that convert, retain, and scale."
            subline="I specialize in CRO, A/B testing, and business automations — turning ecommerce sites into high-performing revenue machines."
            ctaHref="/projects"
            ctaLabel="See my work"
          />
        </div>
      </section>

      <section style={{ padding: '0 0 64px' }}>
        <div className="container">
          <div className="trust-strip">
            {[
              { icon: 'truck' as const, title: 'CRO & A/B Testing',      sub: 'Data-driven optimization.' },
              { icon: 'code' as const,  title: 'Full-Stack Development',  sub: 'React, Next.js, Node, and more.' },
              { icon: 'check' as const, title: 'Business Automations',   sub: 'Less manual work, more revenue.' },
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

      <section style={{ padding: '64px 0 0' }}>
        <div className="container">
          <EditorialHeader
            eyebrow="Categories"
            title="Work, by type."
            seeMoreHref="/projects"
            seeMoreLabel="All projects"
          />
          <div className="tile-grid" style={{ marginTop: 24 }}>
            {CATEGORY_TILES.map(tile => (
              <Tile key={tile.href} {...tile} />
            ))}
          </div>
        </div>
      </section>

      <RecentCarousel projects={featured} />

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="ed-block">
            <div>
              <p className="ed-eyebrow">A note</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15, marginBottom: 16 }}>
                I build ecommerce that{' '}
                <span className="word--highlighted">actually performs.</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: '28px', color: 'var(--ink-700)', maxWidth: 520, margin: '0 0 24px' }}>
                From conversion rate optimization to automated workflows, I help ecommerce brands do more with what they already have — smarter funnels, sharper experiments, less manual overhead.
              </p>
              <a href="/contact" className="btn btn-primary">
                Work with me
              </a>
            </div>
            <div style={{ position: 'relative', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/illustrations/target.svg" alt="" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
