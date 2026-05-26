'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export function SortSelect({ category }: { category?: string | null }) {
  const router = useRouter();
  const params = useSearchParams();
  const sort = params?.get('sort') ?? 'date';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const url = new URL(window.location.href);
    url.searchParams.set('sort', e.target.value);
    router.push(url.pathname + url.search);
  }

  return (
    <div className="sort-select">
      <select value={sort} onChange={handleChange} aria-label="Sort projects">
        <option value="date">Sort: Newest</option>
        <option value="alpha">Sort: A → Z</option>
      </select>
    </div>
  );
}
