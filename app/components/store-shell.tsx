'use client';

import { StoreProvider } from './store-context';
import { MarqueeBar } from './marquee-bar';
import { Navigation } from './nav';
import { CartDrawer } from './cart-drawer';
import { SiteFooter } from './site-footer';

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <MarqueeBar />
      <Navigation />
      <main>{children}</main>
      <SiteFooter />
      <CartDrawer />
    </StoreProvider>
  );
}
