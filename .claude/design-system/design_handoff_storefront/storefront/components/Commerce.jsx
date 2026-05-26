// FreeShippingBar — lavender progress bar with brand-warm copy.
// Props: subtotal, threshold (defaults to global FREE_SHIPPING_THRESHOLD).
function FreeShippingBar({ subtotal, threshold = (window.FREE_SHIPPING_THRESHOLD || 50) }) {
  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, (subtotal / threshold) * 100);
  const done = remaining === 0;

  return (
    <div className="fs-bar">
      <div className="fs-bar-text">
        {done ? (
          <span className="fs-success">
            <Icon name="check" size={14} strokeWidth={2.4} />
            Free US shipping unlocked.
          </span>
        ) : (
          <span>
            <span className="fs-amount">${remaining.toFixed(0)}</span> to free US shipping.
          </span>
        )}
      </div>
      <div className="fs-bar-track">
        <div className={`fs-bar-fill${done ? ' complete' : ''}`} style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
}

// QuantityStepper — pill quantity control. Min defaults to 1.
function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="qstep" role="group" aria-label="Quantity">
      <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease">
        <Icon name="minus" size={12} strokeWidth={2} />
      </button>
      <span>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase">
        <Icon name="plus" size={12} strokeWidth={2} />
      </button>
    </div>
  );
}

// Breadcrumb — small navigation crumbs.
function Breadcrumb({ items, onNavigate }) {
  return (
    <div className="crumbs">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">/</span>}
          {it.onClick || it.id ? (
            <a href="#" onClick={(e) => { e.preventDefault(); (it.onClick || (() => onNavigate(it.id)))(); }}>{it.label}</a>
          ) : (
            <span className="current">{it.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Stars — inline star rating renderer.
function Stars({ value, size = 14 }) {
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {[1,2,3,4,5].map(n => (
        <Icon key={n} name="star" size={size} strokeWidth={2} style={{ opacity: n <= Math.round(value) ? 1 : 0.25 }} />
      ))}
    </span>
  );
}

Object.assign(window, { FreeShippingBar, QuantityStepper, Breadcrumb, Stars });
