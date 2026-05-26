import Link from 'next/link';

interface TileProps {
  href: string;
  label: string;
  illustration?: string;
  surface?: 'lilac' | 'sage' | 'honey' | 'lavender';
}

const SURFACE_MAP: Record<string, string> = {
  lilac:    'var(--color-lilac)', /* #E8D9F0 — cool light purple */
  sage:     'var(--color-sage)',  /* #C8D4C4 — cool green        */
  honey:    '#E26B4C',            /* orange/tomato               */
  lavender: '#B0A8C4',            /* distinct muted purple       */
};

export function Tile({ href, label, illustration, surface = 'lilac' }: TileProps) {
  const bg = SURFACE_MAP[surface] ?? SURFACE_MAP.lilac;
  return (
    <Link href={href} className="tile">
      <div className="tile-square" style={{ background: bg }}>
        {illustration && <img src={illustration} alt="" />}
      </div>
      <span className="tile-label">{label}</span>
    </Link>
  );
}
