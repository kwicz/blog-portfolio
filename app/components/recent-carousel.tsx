'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard } from './product-card';
import { Icon } from './icons';

interface CarouselProject {
  slug: string;
  title: string;
  tagline?: string;
  category?: string;
  image?: string;
  date?: string;
  rating?: number;
  reviewCount?: number;
  ribbon?: string;
}

const GAP = 24;

export function RecentCarousel({ projects }: { projects: CarouselProject[] }) {
  const [page, setPage] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(projects.length / perPage);

  useEffect(() => {
    const update = () => {
      const next = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
      setPerPage(prev => { if (prev !== next) setPage(0); return next; });
      if (containerRef.current) setPageWidth(containerRef.current.offsetWidth + GAP);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section style={{ padding: '48px 0' }}>
      <div className="container">
        <div className="ed-head" style={{ marginBottom: 28 }}>
          <div>
            <p className="ed-eyebrow">Recent</p>
            <h2>Just shipped.</h2>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              className="icon-btn"
              aria-label="Previous"
              style={{
                border: '1.5px solid var(--ink-300)',
                padding: '10px 11px',
                opacity: page === 0 ? 0.35 : 1,
                transition: 'opacity 160ms',
              }}
            >
              <Icon name="arrow-left" size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              className="icon-btn"
              aria-label="Next"
              style={{
                border: '1.5px solid var(--ink-300)',
                padding: '10px 11px',
                opacity: page === totalPages - 1 ? 0.35 : 1,
                transition: 'opacity 160ms',
              }}
            >
              <Icon name="arrow-right" size={16} strokeWidth={2} />
            </button>
            <Link href="/projects" className="btn btn-outline-caps">
              All projects <Icon name="arrow-up-right" size={13} strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div ref={containerRef} style={{ overflow: 'hidden', paddingTop: 8, marginTop: -8 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${projects.length}, calc(${100 / perPage}% - ${GAP * (perPage - 1) / perPage}px))`,
              gap: GAP,
              transform: `translateX(${-page * pageWidth}px)`,
              transition: 'transform 420ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {projects.map(p => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                tagline={p.tagline}
                category={p.category}
                image={p.image}
                date={p.date}
                rating={p.rating}
                ribbon={p.ribbon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
