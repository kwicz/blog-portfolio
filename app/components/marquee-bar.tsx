'use client';

const MESSAGES = [
  'Hand-tuned with love in Brooklyn',
  'Free US shipping on orders $50+',
  'New: The Pocket Harp — compact & bright',
  'Playable in 3 minutes, guaranteed',
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
