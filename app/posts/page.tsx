import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { Redis } from '@upstash/redis';
import PostList from './list';

const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function PostsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allPosts.map(p => ['pageviews', 'posts', p.slug].join(':'))
    )
  ).reduce(
    (acc, v, i) => { acc[allPosts[i].slug] = v ?? 0; return acc; },
    {} as Record<string, number>
  );

  const published = allPosts
    .filter(p => p.published)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

  return (
    <>
      {/* ── Tinted header zone ─────────────────────────────── */}
      <div style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--surface-line)' }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 40 }}>
          <div className="crumbs" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Journal</span>
          </div>

          <div className="coll-hero">
            <div>
              <p className="pdp-eyebrow">Writing</p>
              <h1>Journal.</h1>
              <p className="coll-intro">
                Notes on ecommerce, CRO, development, and whatever else I'm working through.
              </p>
            </div>
            <div className="coll-stats">
              <div><strong>{published.length}</strong>entries</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Post list ──────────────────────────────────────── */}
      <div style={{ paddingBottom: 80 }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <PostList posts={published} views={views} />
        </div>
      </div>
    </>
  );
}
