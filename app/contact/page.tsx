'use client';
import { Github, Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';

const socials = [
  {
    icon: <Linkedin size={24} />,
    href: 'https://www.linkedin.com/in/kwicz/',
    label: 'LinkedIn',
    handle: 'Katy Solovewicz',
    surface: 'var(--surface-lilac)',
    iconBg: 'var(--lilac-300)',
    iconColor: 'var(--lilac-600)',
  },
  {
    icon: <Mail size={24} />,
    href: 'mailto:katy@solovewicz.com',
    label: 'Email',
    handle: 'katy@solovewicz.com',
    surface: 'var(--surface-sage)',
    iconBg: 'var(--sage-300)',
    iconColor: 'var(--sage-600)',
  },
  {
    icon: <Github size={24} />,
    href: 'https://github.com/kwicz',
    label: 'GitHub',
    handle: 'kwicz',
    surface: 'var(--surface-lavender)',
    iconBg: 'var(--lavender-300)',
    iconColor: 'var(--lavender-600)',
  },
];

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div className="container">
        <div className="crumbs" style={{ marginBottom: 28 }}>
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <span className="current">Contact</span>
        </div>

        <div style={{ maxWidth: 560, marginBottom: 48 }}>
          <p className="hero-eyebrow" style={{ marginBottom: 8 }}>Get in touch</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, marginBottom: 16 }}>
            Say hello.
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {socials.map(s => (
            <a
              key={s.href}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                background: s.surface,
                borderRadius: 'var(--radius-xl)',
                padding: '36px 28px',
                display: 'flex', flexDirection: 'column', gap: 20,
                textDecoration: 'none', color: 'var(--ink-900)',
                transition: 'transform 0.2s var(--ease-bounce), box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              <span style={{
                width: 48, height: 48, borderRadius: '50%',
                background: s.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.iconColor,
              }}>
                {s.icon}
              </span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 4 }}>
                  {s.handle}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{s.label}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
