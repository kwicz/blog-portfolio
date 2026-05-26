import Image from 'next/image';
import Link from 'next/link';
import { Icon } from './icons';

interface ProductCardProps {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  ribbon?: string;
  url?: string;
}

export function ProductCard({ slug, title, description, image, category, ribbon, url }: ProductCardProps) {
  return (
    <article className="pcard">
      <div className="pcard-img" style={{ position: 'relative' }}>
        {ribbon && <span className="ribbon ribbon-tomato pcard-ribbon">{ribbon}</span>}
        <Link href={`/projects/${slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="pcard-img-bg">
              <img src="/illustrations/harp-line.svg" alt="" />
            </div>
          )}
        </Link>
      </div>
      <div className="pcard-meta">
        {category && <span className="pcard-tag">{category}</span>}
        <p className="pcard-name">
          <Link href={`/projects/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{title}</Link>
        </p>
        {description && <p className="pcard-sub">{description}</p>}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--ink-500)', marginTop: 8, textDecoration: 'none' }}
          >
            Live site <Icon name="arrow-up-right" size={12} strokeWidth={2} />
          </a>
        )}
      </div>
    </article>
  );
}
