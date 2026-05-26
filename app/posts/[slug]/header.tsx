import Link from 'next/link';

type Props = {
  post: {
    url?: string;
    title: string;
    description: string;
    date?: string;
    repository?: string;
  };
  views: number;
};

export function Header({ post, views }: Props) {
  return (
    <div style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--surface-line)' }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 52 }}>
        <div className="crumbs" style={{ marginBottom: 24 }}>
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/posts">Journal</Link>
          <span className="sep">/</span>
          <span className="current">{post.title}</span>
        </div>

        <div style={{ maxWidth: 720 }}>
          {post.date && (
            <p
              className="pdp-eyebrow"
              style={{ marginBottom: 16, letterSpacing: '0.1em' }}
            >
              {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
                new Date(post.date)
              )}
            </p>
          )}
          <h1 style={{ marginBottom: 20 }}>{post.title}</h1>
          {post.description && (
            <p
              style={{
                fontSize: 17,
                lineHeight: '28px',
                color: 'var(--ink-700)',
                margin: '0 0 24px',
                maxWidth: 620,
              }}
            >
              {post.description}
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ fontSize: 13 }}
              >
                Visit site →
              </a>
            )}
            {post.repository && (
              <a
                href={`https://github.com/${post.repository}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ fontSize: 13 }}
              >
                GitHub →
              </a>
            )}
            {views > 0 && (
              <span style={{ fontSize: 12, color: 'var(--ink-400)', marginLeft: 4 }}>
                {Intl.NumberFormat('en-US', { notation: 'compact' }).format(views)} views
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
