import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '120px 24px',
      minHeight: '60vh',
    }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--color-lavender)',
        marginBottom: 16,
      }}>
        404
      </p>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(36px, 6vw, 64px)',
        fontWeight: 500,
        lineHeight: 1.1,
        color: 'var(--ink-900)',
        marginBottom: 16,
      }}>
        Nothing here.
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        lineHeight: '26px',
        color: 'var(--ink-500)',
        maxWidth: 360,
        marginBottom: 40,
      }}>
        That page doesn't exist — or it did and it's gone now.
      </p>
      <Link href="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  );
}
