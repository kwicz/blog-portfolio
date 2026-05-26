import Link from 'next/link';
import type { Post } from '@/.contentlayer/generated';

interface PostListProps {
  posts: Post[];
  views: Record<string, number>;
}

export default function PostList({ posts, views }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p style={{ color: 'var(--ink-500)', fontSize: 15 }}>No entries yet.</p>
    );
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <Link key={post.slug} href={`/posts/${post.slug}`} className="post-row">
          <div className="post-row-date">
            {post.date
              ? new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(post.date))
              : 'Coming soon'}
          </div>
          <div>
            <div className="post-row-title">{post.title}</div>
            {post.description && (
              <p className="post-row-desc">{post.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
