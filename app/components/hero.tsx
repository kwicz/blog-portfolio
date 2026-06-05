import Link from 'next/link';
import { Icon } from './icons';

interface RolePill {
  label: string;
  company: string;
}

interface HeroProps {
  headline: string;
  subline?: string;
  eyebrow?: string;
  roles?: RolePill[];
  ctaHref?: string;
  ctaLabel?: string;
}

export function Hero({
  headline,
  subline,
  eyebrow,
  roles,
  ctaHref = '/projects',
  ctaLabel = 'See my work',
}: HeroProps) {
  return (
    <div className="hero">
      <div className="hero-bg" />
      <div>
        {eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
        {roles && roles.length > 0 && (
          <div className="hero-roles">
            {roles.map((r) => (
              <span key={r.label} className="hero-role-pill">
                {r.label} · {r.company}
              </span>
            ))}
          </div>
        )}
        <h1>{headline}</h1>
        {subline && <p>{subline}</p>}
        <div className="hero-actions">
          <Link href={ctaHref} className="btn btn-primary btn-lg">
            {ctaLabel}
            <Icon name="arrow-up-right" size={16} strokeWidth={2} />
          </Link>
          <Link href="/posts" className="btn btn-outline-caps btn-lg">
            Read the journal
          </Link>
        </div>
      </div>
      <div className="hero-art">
        <img src="/illustrations/hero-chart.svg" alt="" aria-hidden="true" />
      </div>
    </div>
  );
}
