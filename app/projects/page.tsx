import Link from 'next/link';
import { Fragment, Suspense } from 'react';
import { allProjects } from 'contentlayer/generated';
import { ProductCard } from '../components/product-card';
import { Redis } from '@upstash/redis';
import { Icon } from '../components/icons';
import { EditorialHeader } from '../components/editorial-header';
import { SortSelect } from '../components/sort-select';

const redis = Redis.fromEnv();

export const revalidate = 60;

const CATEGORY_COPY: Record<string, { eyebrow: string; intro: string }> = {
  'E-Commerce': { eyebrow: 'E-Commerce', intro: 'Storefronts, checkout flows, and conversion-focused interfaces built for real businesses.' },
  'E-Learning': { eyebrow: 'E-Learning', intro: 'Learning platforms and educational tools designed to make complex topics click.' },
  'Just For Fun': { eyebrow: 'Just For Fun', intro: 'Side projects and passion work — built for community, curiosity, or the craft itself.' },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string };
}) {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map(p => ['pageviews', 'projects', p.slug].join(':'))
    )
  ).reduce(
    (acc, v, i) => { acc[allProjects[i].slug] = v ?? 0; return acc; },
    {} as Record<string, number>
  );

  const categories = Array.from(
    new Set(allProjects.map(p => p.category).filter(Boolean))
  ) as string[];

  const selectedCategory = searchParams.category ?? null;
  const sort = searchParams.sort ?? 'date';

  const filtered = (selectedCategory
    ? allProjects.filter(p => p.category === selectedCategory)
    : allProjects
  )
    .filter(p => p.published !== false)
    .sort((a, b) => {
      if (sort === 'alpha') return a.title.localeCompare(b.title);
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const allPublished = allProjects.filter(p => p.published !== false);
  const copy = selectedCategory ? CATEGORY_COPY[selectedCategory] : null;

  return (
    <>
      {/* ── Tinted header zone ─────────────────────────────── */}
      <div style={{ background: 'var(--surface-2)' }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
          <div className="crumbs" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Work</span>
          </div>

          <div className="coll-hero">
            <div>
              <p className="pdp-eyebrow">{copy?.eyebrow ?? 'Portfolio'}</p>
              <h1>{selectedCategory ?? 'All work.'}</h1>
              <p className="coll-intro">
                {copy?.intro ?? 'Frontend engineering and design projects — from e-commerce storefronts to learning platforms. Built for real users, real businesses.'}
              </p>
            </div>
            <div className="coll-stats">
              <div><strong>{allPublished.length}</strong>projects total</div>
              <div><strong>{categories.length}</strong>categories</div>
            </div>
          </div>
        </div>

        {/* Filter bar — full-width sticky, inherits tinted bg */}
        <div className="coll-filterbar">
          <div className="container" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/projects" className={`filter-pill${!selectedCategory ? ' active' : ''}`}>All</Link>
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/projects?category=${encodeURIComponent(cat)}`}
                className={`filter-pill${selectedCategory === cat ? ' active' : ''}`}
              >
                {cat}
              </Link>
            ))}
            <span className="count">{filtered.length} {filtered.length === 1 ? 'item' : 'items'}</span>
            <Suspense>
              <SortSelect category={selectedCategory} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* ── Content zone ───────────────────────────────────── */}
      <div style={{ paddingBottom: 80 }}>
        <div className="container" style={{ paddingTop: 32 }}>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Icon name="search" size={32} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.4 }} />
              <p>No projects in this category yet.</p>
            </div>
          ) : (
            <div className="prod-grid">
              {filtered.map((project, idx) => (
                <Fragment key={project.slug}>
                  <ProductCard
                    slug={project.slug}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    category={project.category}
                    url={project.url}
                  />
                  {idx === 3 && (
                    <div className="coll-feature">
                      <div>
                        <div className="ed-eyebrow">About me</div>
                        <h3>Frontend engineer & designer, based in Portland, OR.</h3>
                        <p>I build thoughtful digital experiences from the ground up — from concept through launch. Open to freelance and full-time roles.</p>
                        <a href="/contact" className="btn btn-outline-caps">Get in touch</a>
                      </div>
                      <div className="feature-art">
                        <img src="/illustrations/harp-line.svg" alt="" />
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          )}

          <div className="trust-strip" style={{ marginTop: 64 }}>
            {[
              { icon: 'check' as const, title: 'Frontend engineering', sub: 'React, Next.js, TypeScript.' },
              { icon: 'pin'   as const, title: 'UX + visual design',   sub: 'Figma to production.' },
              { icon: 'truck' as const, title: 'Based in Portland, OR', sub: 'Remote-friendly.' },
            ].map(item => (
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
      </div>
    </>
  );
}
