import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/app/components/icons';
import { PdpAccordion } from '@/app/components/pdp-accordion';

type Props = {
  project: {
    url?: string;
    title: string;
    description: string;
    repository?: string;
    category?: string;
    image?: string;
    tags?: string[];
    rating?: number;
    reviewCount?: number;
    notes?: string;
    features?: string[];
  };
};

function Stars({ value }: { value: number }) {
  return (
    <span className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ opacity: i < Math.round(value) ? 1 : 0.22 }}>★</span>
      ))}
    </span>
  );
}

export function Header({ project }: Props) {
  const accordionItems = [
    ...(project.tags && project.tags.length > 0 ? [{
      key: 'specs',
      label: 'Specs',
      content: (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map(tag => (
            <span key={tag} className="badge badge-instock">{tag}</span>
          ))}
        </div>
      ),
    }] : []),
    ...(project.features && project.features.length > 0 ? [{
      key: 'features',
      label: 'Features',
      content: (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {(project.features as string[]).map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, lineHeight: '20px', color: 'var(--ink-700)' }}>
              <Icon name="check" size={14} strokeWidth={2.5} style={{ color: 'var(--accent-deepsage)', flexShrink: 0, marginTop: 3 }} />
              {f}
            </li>
          ))}
        </ul>
      ),
    }] : []),
  ];

  return (
    <div style={{ background: 'var(--surface-2)', paddingTop: 48, paddingBottom: 56 }}>
      <div className="container">
        <div className="crumbs" style={{ marginBottom: 28 }}>
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/projects">Work</Link>
          {project.category && (
            <>
              <span className="sep">/</span>
              <Link href={`/projects?category=${encodeURIComponent(project.category)}`}>
                {project.category}
              </Link>
            </>
          )}
          <span className="sep">/</span>
          <span className="current">{project.title}</span>
        </div>

        <div className="pdp">
          {/* ── Gallery ───────────────────────── */}
          <div className="pdp-gallery">
            {project.image ? (
              <div className="pdp-main-img">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <div className="pdp-main-img">
                <div className="pdp-main-img-placeholder">
                  <img src="/illustrations/harp-line.svg" alt="" />
                </div>
              </div>
            )}
          </div>

          {/* ── Info ──────────────────────────── */}
          <div className="pdp-info">
            {project.category && (
              <p className="pdp-eyebrow">{project.category}</p>
            )}
            <h1>{project.title}</h1>

            {(project.rating !== undefined && project.reviewCount !== undefined) && (
              <div className="pdp-meta-row">
                <span className="pdp-stars">
                  <Stars value={project.rating} />
                  {project.rating.toFixed(1)} ·{' '}
                  <a href="#reviews" style={{
                    textDecoration: 'underline',
                    textDecorationColor: 'var(--color-lavender)',
                    textDecorationThickness: 2,
                    textUnderlineOffset: 3,
                    color: 'inherit',
                  }}>
                    {project.reviewCount} reviews
                  </a>
                </span>
              </div>
            )}

            <p className="pdp-description">{project.description}</p>

            <div id="pdp-cta-anchor" className="pdp-actions">
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Visit live site
                  <Icon name="arrow-up-right" size={16} strokeWidth={2} />
                </a>
              )}
              {project.repository && (
                <a
                  href={project.repository.startsWith('http') ? project.repository : `https://github.com/${project.repository}`}
                  target="_blank" rel="noopener noreferrer" className="btn btn-outline-caps"
                >
                  View on GitHub
                  <Icon name="arrow-up-right" size={16} strokeWidth={2} />
                </a>
              )}
            </div>

            {project.notes && (
              <div className="pdp-section">
                <h3>
                  <Icon name="note" size={18} strokeWidth={1.75} style={{ color: 'var(--color-lavender)' }} />
                  Katy's notes
                </h3>
                <p className="pdp-katy">
                  <span className="pdp-quote-mark">"</span>
                  {project.notes}
                  <span className="pdp-quote-mark">"</span>
                </p>
              </div>
            )}

            {accordionItems.length > 0 && (
              <PdpAccordion items={accordionItems} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
