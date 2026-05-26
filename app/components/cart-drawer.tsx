'use client';

import { useEffect } from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';
import { Icon } from './icons';
import { useStore } from './store-context';

const CONTACTS = [
  {
    icon: <Linkedin size={22} />,
    href: 'https://www.linkedin.com/in/kwicz/',
    label: 'LinkedIn',
    handle: 'Katy Solovewicz',
    surface: 'var(--surface-lilac)',
    iconBg: 'var(--lilac-300)',
    iconColor: 'var(--lilac-600)',
  },
  {
    icon: <Mail size={22} />,
    href: 'mailto:katy@solovewicz.com',
    label: 'Email',
    handle: 'katy@solovewicz.com',
    surface: 'var(--surface-sage)',
    iconBg: 'var(--sage-300)',
    iconColor: 'var(--sage-600)',
  },
  {
    icon: <Github size={22} />,
    href: 'https://github.com/kwicz',
    label: 'GitHub',
    handle: 'kwicz',
    surface: 'var(--surface-lavender)',
    iconBg: 'var(--lavender-300)',
    iconColor: 'var(--lavender-600)',
  },
];

export function CartDrawer() {
  const { drawerOpen, closeDrawer } = useStore();

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeDrawer]);

  return (
    <>
      <div
        className={`cart-overlay${drawerOpen ? ' open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${drawerOpen ? ' open' : ''}`}
        aria-label="Get in touch"
        aria-modal="true"
        role="dialog"
      >
        <div className="cart-head">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: 0 }}>
            Say hello.
          </h2>
          <button className="icon-btn" onClick={closeDrawer} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="cart-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CONTACTS.map(c => (
              <a
                key={c.href}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{
                  background: c.surface,
                  borderRadius: 'var(--radius-xl)',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  textDecoration: 'none',
                  color: 'var(--ink-900)',
                  transition: 'transform 0.2s var(--ease-bounce), box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                <span style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: c.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.iconColor, flexShrink: 0,
                }}>
                  {c.icon}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 2 }}>
                    {c.handle}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {c.label}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
