'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageviewTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', gaId, {
        page_path: pathname,
      });
    }
  }, [pathname, gaId]);

  return null;
}
