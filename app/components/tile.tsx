import Link from 'next/link';

interface TileProps {
  href: string;
  label: string;
  illustration?: string;
  surface?: 'lilac' | 'sage' | 'lavender' | 'cream';
}

const SURFACE_MAP: Record<string, string> = {
  lilac: 'var(--color-lilac)',
  sage: 'var(--color-sage)',
  lavender: '#D6CFE4',
  cream: '#EDE8F2',
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
