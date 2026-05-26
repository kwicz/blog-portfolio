// CartDrawer — slides in from the right.
// CRO patterns: free-shipping progress, single-item upsell, collapsible gift note +
// discount code, trust strip. Brand-soft copy throughout.
function CartDrawer({ open, items, onClose, onQty, onCheckout, onAddItem }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const itemCount = items.reduce((s, it) => s + it.qty, 0);

  const [giftOpen, setGiftOpen] = React.useState(false);
  const [codeOpen, setCodeOpen] = React.useState(false);

  // Pick an upsell — first product not already in cart, preferring small accessories.
  const upsell = React.useMemo(() => {
    const cartIds = new Set(items.map(it => it.id));
    return [...PRODUCTS]
      .filter(p => !cartIds.has(p.id) && p.inStock)
      .sort((a, b) => {
        // accessories + pouches first (small adds)
        const score = (p) => (p.category === 'pouches' ? 0 : p.category === 'accessories' ? 1 : 2);
        return score(a) - score(b) || a.price - b.price;
      })[0];
  }, [items]);

  return (
    <React.Fragment>
      <div className={`cart-overlay${open ? ' open' : ''}`} onClick={onClose}></div>
      <aside className={`cart-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="cart-head">
          <h2>Your bag{itemCount > 0 ? ` · ${itemCount}` : ''}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="script">empty for now</span>
            <p>Quiet bag. We have a few new harps if you'd like to look.</p>
            <Button variant="primary" onClick={onClose} style={{ marginTop: 20 }}>Keep browsing</Button>
          </div>
        ) : (
          <React.Fragment>
            <div className="cart-fs">
              <FreeShippingBar subtotal={subtotal} />
            </div>

            <div className="cart-items">
              {items.map((it, idx) => (
                <div key={idx} className="cart-item">
                  <div className="cart-item-img"><img src={it.image} alt="" /></div>
                  <div>
                    <div className="cart-item-name">{it.name}</div>
                    {it.variant && (
                      <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginTop: 4 }}>
                        {it.variant}
                      </div>
                    )}
                    <div className="cart-item-price">${it.price.toFixed(2)}</div>
                    <div style={{ marginTop: 10 }}>
                      <QuantityStepper value={it.qty} onChange={(v) => onQty(idx, v - it.qty)} min={0} />
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontVariationSettings: "'opsz' 36" }}>
                    ${(it.price * it.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Single-item upsell */}
            {upsell && onAddItem && (
              <div className="cart-upsell">
                <div className="cart-upsell-img"><img src={upsell.image} alt="" /></div>
                <div className="cart-upsell-meta">
                  <div className="cart-upsell-eyebrow">Often added</div>
                  <div className="cart-upsell-name">{upsell.name}</div>
                  <div className="cart-upsell-price">${upsell.price.toFixed(2)}</div>
                </div>
                <Button variant="secondary" onClick={() => onAddItem(upsell)}>Add</Button>
              </div>
            )}

            {/* Gift note */}
            <div className={`cart-toggle${giftOpen ? ' open' : ''}`}>
              <button className="cart-toggle-btn" onClick={() => setGiftOpen(v => !v)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="note" size={16} style={{ color: 'var(--color-lavender)' }} />
                  Add a gift note
                </span>
                <Icon name="chevron-down" size={16} className="chev" />
              </button>
              <div className="cart-toggle-body">
                <textarea className="cart-gift-textarea" placeholder="A short note. We'll hand-write it on a small card." />
              </div>
            </div>

            {/* Discount code */}
            <div className={`cart-toggle${codeOpen ? ' open' : ''}`}>
              <button className="cart-toggle-btn" onClick={() => setCodeOpen(v => !v)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="plus" size={14} strokeWidth={2.2} style={{ color: 'var(--color-lavender)' }} />
                  Have a discount code?
                </span>
                <Icon name="chevron-down" size={16} className="chev" />
              </button>
              <div className="cart-toggle-body">
                <div className="cart-code-row">
                  <input type="text" placeholder="Enter code" />
                  <Button variant="ghost">Apply</Button>
                </div>
              </div>
            </div>

            <div className="cart-foot">
              <div className="cart-summary">
                <span>Subtotal</span>
                <span className="cart-total">${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary" style={{ fontSize: 13, color: 'var(--ink-500)' }}>
                <span>Shipping</span>
                <span>{subtotal >= (window.FREE_SHIPPING_THRESHOLD || 50) ? 'Free' : 'Calculated at checkout'}</span>
              </div>
              <div className="cart-summary" style={{ fontSize: 13, color: 'var(--ink-500)' }}>
                <span>Taxes</span><span>Calculated at checkout</span>
              </div>
              <Button variant="primary" size="lg" onClick={onCheckout} style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                Check out · ${subtotal.toFixed(2)}
              </Button>
              <div className="cart-trust">
                <span><Icon name="check" size={12} strokeWidth={2.4} /> Secure checkout</span>
                <span><Icon name="truck" size={12} /> Ships from Brooklyn</span>
                <span><Icon name="heart" size={12} /> 30-day returns</span>
              </div>
            </div>
          </React.Fragment>
        )}
      </aside>
    </React.Fragment>
  );
}

Object.assign(window, { CartDrawer });
