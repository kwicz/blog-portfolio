import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/app/components/icons';

type Props = {
  project: {
    url?: string;
    title: string;
    description: string;
    repository?: string;
    category?: string;
    image?: string;
    tags?: string[];
  };
  views: number;
};

export function Header({ project, views }: Props) {
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

            {project.tags && project.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {project.tags.map(tag => (
                  <span key={tag} className="badge badge-instock">{tag}</span>
                ))}
              </div>
            )}

            <div className="pdp-actions">
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
                  href={`https://github.com/${project.repository}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  View on GitHub
                  <Icon name="arrow-up-right" size={16} strokeWidth={2} />
                </a>
              )}
            </div>

            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-500)', fontSize: 13 }}>
              <Icon name="user" size={14} strokeWidth={2} />
              {views.toLocaleString()} view{views !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
