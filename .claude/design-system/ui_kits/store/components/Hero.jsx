// Hero — two-radial warm-envelope block. Headline left, image right, optional highlighter dot.
function Hero({ eyebrow, title, body, primaryCta, secondaryCta, image, caveat, onPrimary, onSecondary }) {
  return (
    <div className="hero">
      <div className="hero-bg"></div>
      <div>
        {eyebrow && <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-lavender)', marginBottom: 16 }}>{eyebrow}</div>}
        <h1>{title}</h1>
        <p>{body}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          {primaryCta && <Button variant="primary" size="lg" onClick={onPrimary}>{primaryCta}</Button>}
          {secondaryCta && <Button variant="ghost" size="lg" onClick={onSecondary}>{secondaryCta}</Button>}
        </div>
      </div>
      <div className="hero-art">
        {caveat && <div className="hero-caveat">{caveat}</div>}
        <img src={image} alt="" />
        <div className="hero-dot" aria-hidden></div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero });
