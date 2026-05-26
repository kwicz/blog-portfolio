// Tile — full-bleed pastel category tile with single-stroke illustration centered.
function Tile({ label, tint = 'lilac', illustration, onClick }) {
  const tints = {
    lilac:    { background: 'var(--color-lilac)', color: 'var(--ink-900)' },
    sage:     { background: 'var(--color-sage)',  color: 'var(--ink-900)' },
    lavender: { background: 'var(--color-lavender)', color: 'var(--ink-900)' },
    cream:    { background: 'var(--surface-2)',   color: 'var(--ink-900)' },
    tomato:   { background: 'var(--accent-tomato)', color: 'var(--color-cream)' },
    butter:   { background: 'var(--accent-butter)', color: 'var(--ink-900)' },
  };
  return (
    <div className="tile" onClick={onClick}>
      <div className="tile-square" style={tints[tint]}>
        <img src={illustration} alt="" />
      </div>
      <div className="tile-label">{label}</div>
    </div>
  );
}

Object.assign(window, { Tile });
