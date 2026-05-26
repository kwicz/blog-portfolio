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
    tag?: string;
  };
  views: number;
};

export function Header({ project, views }: Props) {
  const accordionItems = [
    ...(project.tags && project.tags.length > 0 ? [{
      key: 'stack',
      label: 'Tech stack',
      content: (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map(tag => (
            <span key={tag} className="badge badge-instock">{tag}</span>
          ))}
        </div>
      ),
    }] : []),
    ...(project.url || project.repository ? [{
      key: 'links',
      label: 'Links',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--ink-700)', textDecoration: 'none' }}>
              <Icon name="arrow-up-right" size={14} strokeWidth={2} style={{ color: 'var(--color-lavender)' }} />
              Live site
            </a>
          )}
          {project.repository && (
            <a href={project.repository.startsWith('http') ? project.repository : `https://github.com/${project.repository}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--ink-700)', textDecoration: 'none' }}>
              <Icon name="arrow-up-right" size={14} strokeWidth={2} style={{ color: 'var(--color-lavender)' }} />
              GitHub repository
            </a>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-500)', marginTop: 4 }}>
            <Icon name="user" size={13} strokeWidth={2} />
            {views.toLocaleString()} view{views !== 1 ? 's' : ''}
          </div>
        </div>
      ),
    }] : []),
  ];

  return (
    <div style={{ paddingTop: 48 }}>
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

          <div className="pdp-info">
            {project.category && (
              <p className="pdp-eyebrow">{project.category}</p>
            )}
            <h1>{project.title}</h1>
            <p className="pdp-description">{project.description}</p>

            <div id="pdp-cta-anchor" className="pdp-actions">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visit live site
                  <Icon name="arrow-up-right" size={16} strokeWidth={2} />
                </a>
              )}
              {project.repository && (
                <a
                  href={project.repository.startsWith('http') ? project.repository : `https://github.com/${project.repository}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
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
