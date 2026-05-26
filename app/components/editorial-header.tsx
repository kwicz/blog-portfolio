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
      <div>
        {eyebrow && <p className="ed-eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {seeMoreHref && (
        <Link href={seeMoreHref} className="btn btn-outline-caps">
          {seeMoreLabel}
          <Icon name="arrow-up-right" size={13} strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}
