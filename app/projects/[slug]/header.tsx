import Link from 'next/link';
import { Icon } from '@/app/components/icons';
import { PdpAccordion } from '@/app/components/pdp-accordion';
import { Gallery } from './gallery';

type Props = {
  project: {
    url?: string;
    title: string;
    description: string;
    repository?: string;
    category?: string;
    image?: string;
    images?: string[];
    tags?: string[];
    rating?: number;
    reviewCount?: number;
    notes?: string;
    features?: string[];
    body?: { raw: string };
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
  const backgroundParagraphs = project.body?.raw
    ? project.body.raw.trim().split(/\n\n+/).filter(Boolean)
    : [];

  const accordionItems = [
    ...(project.tags && project.tags.length > 0 ? [{
      key: 'specs',
      label: 'Specs',
      defaultOpen: true,
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
    ...(backgroundParagraphs.length > 0 ? [{
      key: 'background',
      label: 'Background',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
          {backgroundParagraphs.map((para, i) => (
            <p key={i} style={{ margin: 0, fontSize: 14, lineHeight: '22px', color: 'var(--ink-700)' }}>
              {para}
            </p>
          ))}
        </div>
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
          <Gallery
            title={project.title}
            images={project.images?.length ? project.images : (project.image ? [project.image] : [])}
            notes={project.notes}
          />

          {/* ── Info ──────────────────────────── */}
          <div className="pdp-info">
            {project.category && (
              <p className="pdp-eyebrow">{project.category}</p>
            )}
            <h1>{project.title}</h1>


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

            {accordionItems.length > 0 && (
              <PdpAccordion items={accordionItems} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
