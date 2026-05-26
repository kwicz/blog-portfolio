'use client';

const MESSAGES = [
  'Full-stack ecommerce developer, Portland OR',
  'Specializing in CRO, A/B testing & automations',
  'Open to freelance & creative partnerships',
  'Turning ecommerce sites into revenue machines',
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
