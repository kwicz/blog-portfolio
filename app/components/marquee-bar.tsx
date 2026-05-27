'use client';

const MESSAGES = [
  'CRO engineer & full-stack developer, Portland OR',
  '100+ A/B tests shipped across real ecommerce brands',
  'Shopify, BigCommerce & headless',
  'Convert, Intelligems, GTM & GA4',
];

export function MarqueeBar() {
  const items = [...MESSAGES, ...MESSAGES];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((msg, i) => (
          <span key={i} className="marquee-item">
            {msg}
            <span className="marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
