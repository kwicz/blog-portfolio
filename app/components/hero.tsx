import Link from 'next/link';
import { Icon } from './icons';

interface HeroProps {
  headline: string;
  subline?: string;
  eyebrow?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function Hero({
  headline,
  subline,
  eyebrow,
  ctaHref = '/projects',
  ctaLabel = 'See my work',
}: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div>
        {eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
        <h1>{headline}</h1>
        {subline && <p>{subline}</p>}
        <div className="hero-actions">
          <Link href={ctaHref} className="btn btn-primary">
            {ctaLabel}
            <Icon name="arrow-right" size={16} strokeWidth={2} />
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>
      </div>
      <div className="hero-art">
        <img src="/illustrations/harp-line.svg" alt="" aria-hidden="true" style={{ opacity: 0.55 }} />
      </div>
    </section>
  );
}
