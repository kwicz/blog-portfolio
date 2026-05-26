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
  rating?: number;
  reviewCount?: number;
}

export function ProductCard({ slug, title, image, ribbon, rating, reviewCount }: ProductCardProps) {
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
        <div className="pcard-quickadd">
          <Link href={`/projects/${slug}`} className="pcard-quickadd-btn">
            View project <Icon name="arrow-up-right" size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
      <div className="pcard-meta">
        <p className="pcard-name">
          <Link href={`/projects/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{title}</Link>
        </p>
        {(rating !== undefined && reviewCount !== undefined) && (
          <div className="pcard-price">
            <span className="pcard-rating">
              <Icon name="star" size={12} strokeWidth={2} />
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
