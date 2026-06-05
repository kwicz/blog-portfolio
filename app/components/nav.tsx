'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from './icons';
import { useStore } from './store-context';

const NAV_LINKS = [
  { href: '/projects', label: 'Work' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { openDrawer } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`hdr${scrolled ? ' scrolled' : ''}`}>
      <div className="hdr-inner container">
        <Link href="/" className="hdr-logo" aria-label="Katy Solovewicz — home">
          <img src="/favicon.png" alt="" aria-hidden="true" width={28} height={28} />
          <span className="hdr-logo-text">K. Solovewicz</span>
        </Link>

        <nav className="hdr-nav" aria-label="Main">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hdr-tools">
          <Link href="/favorites" className="icon-btn" aria-label="Favorites">
            <Icon name="heart" size={20} />
          </Link>
          <button
            className="icon-btn"
            aria-label="Social links"
            onClick={openDrawer}
          >
            <Icon name="at-sign" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
