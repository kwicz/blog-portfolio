import Image from 'next/image';
import Link from 'next/link';

const SI = 'https://cdn.simpleicons.org';
const GOLD = 'D4B483'; // --accent-honey

const icon = (slug: string) => `${SI}/${slug}/${GOLD}`;

const TAG_ICON_MAP: Record<string, string> = {
  'Next.js':            icon('nextdotjs'),
  'React':              icon('react'),
  'TypeScript':         icon('typescript'),
  'JavaScript':         icon('javascript'),
  'Tailwind CSS':       icon('tailwindcss'),
  'Node.js':            icon('nodedotjs'),
  'Express':            icon('express'),
  'Express.js':         icon('express'),
  'PostgreSQL':         icon('postgresql'),
  'MongoDB':            icon('mongodb'),
  'MySQL':              icon('mysql'),
  'Redis':              icon('redis'),
  'Docker':             icon('docker'),
  'Stripe':             icon('stripe'),
  'WordPress':          icon('wordpress'),
  'WooCommerce':        icon('woocommerce'),
  'PHP':                icon('php'),
  'GA4':                icon('googleanalytics'),
  'Google Analytics':   icon('googleanalytics'),
  'Google Analytics 4': icon('googleanalytics'),
  'GTM':                icon('googletagmanager'),
  'Google Tag Manager': icon('googletagmanager'),
  'BigQuery':           icon('googlebigquery'),
  'Chrome Extension':   icon('googlechrome'),
  'Vercel':             icon('vercel'),
  'Turborepo':          icon('turborepo'),
  'Framer Motion':      icon('framer'),
  'Socket.io':          icon('socketdotio'),
  'Redux':              icon('redux'),
  'Jekyll':             icon('jekyll'),
  'jQuery':             icon('jquery'),
  'TensorFlow.js':      icon('tensorflow'),
  'C#':                 icon('dotnet'),
  '.NET':               icon('dotnet'),
  'ASP.NET MVC':        icon('dotnet'),
  'CSS3':               icon('css'),
  'HTML/CSS':           icon('html5'),
};

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
  tags?: string[];
}

function formatCardDate(date: string): string {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${String(d.getFullYear()).slice(-2)}`;
}

export function ProductCard({ slug, title, tagline, category, image, ribbon, date, tags }: ProductCardProps) {
  const seenUrls = new Set<string>();
  const stackIcons = (tags ?? [])
    .filter(t => {
      const url = TAG_ICON_MAP[t];
      if (!url || seenUrls.has(url)) return false;
      seenUrls.add(url);
      return true;
    })
    .slice(0, 4);

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
          {stackIcons.length > 0 && (
            <div className="pcard-stack">
              {stackIcons.map(tag => (
                <img
                  key={tag}
                  src={TAG_ICON_MAP[tag]}
                  alt={tag}
                  title={tag}
                  className="pcard-stack-icon"
                />
              ))}
            </div>
          )}
          {date && <span className="pcard-date">{formatCardDate(date)}</span>}
        </div>
      </div>
    </article>
  );
}
