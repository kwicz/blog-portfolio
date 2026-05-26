'use client';
import { useEffect, useState } from 'react';
import { Icon } from './icons';

interface PdpStickyProps {
  title: string;
  category?: string;
  image?: string;
  url?: string;
}

export function PdpSticky({ title, category, image, url }: PdpStickyProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById('pdp-cta-anchor');
    if (!target) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  if (!url) return null;

  return (
    <div className={`pdp-sticky${visible ? ' visible' : ''}`} aria-hidden={!visible}>
      <div className="container pdp-sticky-inner">
        <div className="pdp-sticky-info">
          {image && (
            <div className="pdp-sticky-thumb">
              <img src={image} alt="" />
            </div>
          )}
          <div>
            <div className="pdp-sticky-name">{title}</div>
            {category && <div className="pdp-sticky-meta">{category}</div>}
          </div>
        </div>
        <div className="pdp-sticky-cta">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Visit live site <Icon name="arrow-up-right" size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  );
}
