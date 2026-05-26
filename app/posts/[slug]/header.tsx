import Link from 'next/link';

type Props = {
  post: {
    url?: string;
    title: string;
    description: string;
    repository?: string;
  };
  views: number;
};

export function Header({ post, views }: Props) {
  return (
    <div style={{ paddingTop: 48, paddingBottom: 0 }}>
      <div className="container">
        <div className="crumbs" style={{ marginBottom: 28 }}>
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/posts">Journal</Link>
          <span className="sep">/</span>
          <span className="current">{post.title}</span>
        </div>

        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 48px)', lineHeight: 1.1, marginBottom: 16 }}>
            {post.title}
          </h1>
          <p style={{ color: 'var(--ink-500)', fontSize: 17, lineHeight: 1.6, marginBottom: 24 }}>
            {post.description}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {post.url && (
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13 }}>
                Visit site →
              </a>
            )}
            {post.repository && (
              <a href={`https://github.com/${post.repository}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13 }}>
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
