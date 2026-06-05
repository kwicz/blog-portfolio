import Link from 'next/link';
import { Icon } from './icons';

interface RolePill {
  label: string;
  company: string;
  href?: string;
}

interface HeroProps {
  headline?: string;
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
        {roles && roles.length > 0 ? (
          <h1 className="hero-roles-headline">
            {roles.map((r, i) => (
              <span key={r.label} className="hero-role-line">
                {r.label}
                <span className="hero-role-at"> @ </span>
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="hero-role-company">{r.company}</a>
                ) : (
                  <span className="hero-role-company">{r.company}</span>
                )}
                {i < roles.length - 1 && <span className="hero-role-divider" />}
              </span>
            ))}
          </h1>
        ) : headline ? (
          <h1>{headline}</h1>
        ) : null}
        {subline && <p>{subline}</p>}
        <div className="hero-actions">
          <Link href={ctaHref} className="btn btn-primary btn-lg">
            {ctaLabel}
            <Icon name="arrow-up-right" size={16} strokeWidth={2} />
          </Link>
          {/* Journal link hidden */}
        </div>
      </div>
      <div className="hero-art">
        <img src="/illustrations/hero-chart.svg" alt="" aria-hidden="true" />
      </div>
    </div>
  );
}
