import Link from 'next/link';
import { allProjects } from 'contentlayer/generated';
import { ProductCard } from './components/product-card';

const FEATURED_SLUGS = ['analytics-audit', 'clipses', 'market-motors', 'fox-and-quill'];

export default function NotFound() {
  const published = allProjects.filter(p => p.published !== false);

  const featured = [
    ...FEATURED_SLUGS.map(slug => published.find(p => p.slug === slug)).filter(Boolean),
    ...published.filter(p => !FEATURED_SLUGS.includes(p.slug))
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')),
  ].slice(0, 4) as typeof published;

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 24px 64px',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-lavender)',
          marginBottom: 16,
        }}>
          404
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 500,
          lineHeight: 1.1,
          color: 'var(--ink-900)',
          marginBottom: 16,
        }}>
          Nothing here.
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: '26px',
          color: 'var(--ink-500)',
          maxWidth: 360,
          marginBottom: 0,
        }}>
          That page doesn't exist — or it did and it's gone now.
        </p>
      </div>

      {featured.length > 0 && (
        <div style={{ paddingBottom: 80 }}>
          <div className="container">
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-500)',
              marginBottom: 24,
            }}>
              Were you looking for one of these?
            </p>
            <div className="prod-grid">
              {featured.map(project => (
                <ProductCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  tagline={project.tagline}
                  category={project.category}
                  image={project.image}
                  date={project.date}
                  tags={project.tags}
                  ribbon={project.ribbon}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
