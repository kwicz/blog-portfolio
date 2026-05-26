import Image from 'next/image';
import Link from 'next/link';
import { Icon } from './icons';

interface ProductCardProps {
  slug: string;
  title: string;
  description?: string;
  tagline?: string;
  image?: string;
  category?: string;
  ribbon?: string;
  url?: string;
  date?: string;
  rating?: number;
  reviewCount?: number;
}

function formatCardDate(date: string): string {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${String(d.getFullYear()).slice(-2)}`;
}

export function ProductCard({ slug, title, tagline, category, image, ribbon, date, rating }: ProductCardProps) {
  return (
    <article className="pcard">
      <div className="pcard-img">
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
        {category && <p className="pcard-category">{category}</p>}
        <p className="pcard-name">
          <Link href={`/projects/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{title}</Link>
        </p>
        {tagline && <p className="pcard-tagline">{tagline}</p>}
        <div className="pcard-price">
          {date && <span className="pcard-date">{formatCardDate(date)}</span>}
          {rating !== undefined && (
            <span className="pcard-rating">
              <Icon name="star" size={12} strokeWidth={2} />
              {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
