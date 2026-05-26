import Link from 'next/link';
import { Icon } from './icons';

interface EditorialHeaderProps {
  title: string;
  seeMoreHref?: string;
  seeMoreLabel?: string;
}

export function EditorialHeader({ title, seeMoreHref, seeMoreLabel = 'See all' }: EditorialHeaderProps) {
  return (
    <div className="ed-head">
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
