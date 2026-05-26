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

  return (
    <div style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div className="container">
        <div className="crumbs" style={{ marginBottom: 28 }}>
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <span className="current">Journal</span>
        </div>

        <div style={{ maxWidth: 560, marginBottom: 48 }}>
          <p className="hero-eyebrow" style={{ marginBottom: 8 }}>Writing</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, marginBottom: 16 }}>
            Journal
          </h1>
          <p style={{ color: 'var(--ink-500)', fontSize: 16 }}>
            A record of what I've been thinking, building, and learning.
          </p>
        </div>

        <PostList posts={allPosts} views={views} />
      </div>
    </div>
  );
}
