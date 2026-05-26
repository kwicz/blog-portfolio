import Link from 'next/link';
import { Icon } from './icons';

interface EditorialHeaderProps {
  title: string;
  eyebrow?: string;
  seeMoreHref?: string;
  seeMoreLabel?: string;
}

export function EditorialHeader({ title, eyebrow, seeMoreHref, seeMoreLabel = 'See all' }: EditorialHeaderProps) {
  return (
    <div className="ed-head">
      {eyebrow && <p className="ed-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {seeMoreHref && (
        <Link href={seeMoreHref} className="btn btn-ghost" style={{ fontSize: 14 }}>
          {seeMoreLabel}
          <Icon name="arrow-right" size={15} strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}
