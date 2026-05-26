import Link from 'next/link';
import { allProjects } from 'contentlayer/generated';
import { ProductCard } from '../components/product-card';
import { Redis } from '@upstash/redis';
import { Icon } from '../components/icons';

const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
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

  const filtered = (selectedCategory
    ? allProjects.filter(p => p.category === selectedCategory)
    : allProjects
  )
    .filter(p => p.published !== false)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <>
      <div style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div className="container">
          <div className="crumbs" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Work</span>
          </div>

          <div style={{ marginBottom: 32 }}>
            <p className="hero-eyebrow" style={{ marginBottom: 8 }}>Portfolio</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, marginBottom: 12 }}>
              {selectedCategory ? selectedCategory : 'All work'}
            </h1>
            <p style={{ color: 'var(--ink-500)', fontSize: 16 }}>
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="coll-filterbar">
            <Link
              href="/projects"
              className={`filter-pill${!selectedCategory ? ' active' : ''}`}
            >
              All
            </Link>
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/projects?category=${encodeURIComponent(cat)}`}
                className={`filter-pill${selectedCategory === cat ? ' active' : ''}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-500)' }}>
              <Icon name="search" size={32} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.4 }} />
              <p>No projects in this category yet.</p>
            </div>
          ) : (
            <div className="prod-grid" style={{ marginTop: 32 }}>
              {filtered.map(project => (
                <ProductCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  category={project.category}
                  url={project.url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
