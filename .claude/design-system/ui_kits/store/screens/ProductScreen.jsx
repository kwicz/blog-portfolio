// ProductScreen — PDP with CRO patterns layered in:
//   • Reviews snippet near top with anchor link
//   • Variant chips (tuning / color)
//   • Quantity stepper next to Add to bag
//   • Estimated delivery date
//   • Stock urgency note (warm phrasing — never aggressive)
//   • Sticky add-to-bag bar that appears after scrolling past the main CTA
//   • Accordion details: About / Care / Returns
//   • Reviews summary + sample reviews
//   • Related products
function ProductScreen({ product, onBack, onAddToCart, onProduct, onNavigate }) {
  const [thumbIdx, setThumbIdx] = React.useState(0);
  const [variant, setVariant] = React.useState(product.variants?.[0]?.key || null);
  const [qty, setQty] = React.useState(1);
  const [openAcc, setOpenAcc] = React.useState('about');
  const [stickyVisible, setStickyVisible] = React.useState(false);
  const ctaRef = React.useRef(null);
  const reviewsRef = React.useRef(null);

  // Reset state when product changes
  React.useEffect(() => {
    setVariant(product.variants?.[0]?.key || null);
    setQty(1);
    setThumbIdx(0);
  }, [product.id]);

  // Show sticky CTA after main Add-to-bag scrolls out of view
  React.useEffect(() => {
    if (!ctaRef.current) return;
    const obs = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' });
    obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, [product.id]);

  const thumbs = [product.image, ...PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(p => p.image)];
  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fillerRelated = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
  const goesWith = related.length >= 4 ? related : fillerRelated;

  const handleAdd = () => {
    onAddToCart({ ...product, variant, qty });
  };

  const ratingBreakdown = [
    { stars: 5, count: Math.round(product.reviews * 0.78) },
    { stars: 4, count: Math.round(product.reviews * 0.16) },
    { stars: 3, count: Math.round(product.reviews * 0.04) },
    { stars: 2, count: Math.round(product.reviews * 0.01) },
    { stars: 1, count: Math.round(product.reviews * 0.01) },
  ];

  return (
    <main style={{ paddingBottom: 96 }}>
      <section style={{ paddingBlock: '24px 32px' }}>
        <div className="container">
          <Breadcrumb
            items={[
              { id: 'home', label: 'Home' },
              { id: 'collections', label: 'Shop' },
              { label: product.name.replace(/\.$/, '') },
            ]}
            onNavigate={onNavigate}
          />

          <div className="pdp">
            <div className="pdp-gallery">
              <div className="pdp-main-img">
                {product.ribbon && (
                  <div style={{ position: 'absolute', top: 20, left: 0, zIndex: 2 }}>
                    <Ribbon color={product.ribbon.color}>{product.ribbon.label}</Ribbon>
                  </div>
                )}
                <img src={thumbs[thumbIdx]} alt={product.name} />
              </div>
              <div className="pdp-thumbs">
                {thumbs.map((t, i) => (
                  <div key={i} className={`pdp-thumb${i === thumbIdx ? ' active' : ''}`} onClick={() => setThumbIdx(i)}>
                    <img src={t} alt="" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pdp-info">
              <div className="pdp-eyebrow">{product.category === 'harps' ? 'Hand-tuned harp' : product.category === 'pouches' ? 'Hand-sewn pouch' : 'Accessory'}</div>
              <h1>{product.name}</h1>
              <div className="pdp-meta-row" style={{ marginBottom: 8 }}>
                <span className="pdp-stars" onClick={() => reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{ cursor: 'pointer' }}>
                  <Stars value={product.rating || 0} size={14} />
                  {product.rating} · <a href="#reviews" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'underline', textDecorationColor: 'var(--color-lavender)', textDecorationThickness: 2, textUnderlineOffset: 3, color: 'inherit' }}>{product.reviews} reviews</a>
                </span>
              </div>
              <p style={{ fontSize: 17, lineHeight: '28px', color: 'var(--ink-700)', margin: '0 0 16px', maxWidth: 480 }}>{product.short}</p>

              <div className="pdp-price-row">
                <span className="pdp-price">${product.price}.00</span>
                {product.inStock ? (
                  <span className={`pdp-stock-note${product.stockLeft != null && product.stockLeft <= 5 ? ' low' : ''}`}>
                    <span className="dot" aria-hidden></span>
                    {product.stockLeft != null && product.stockLeft <= 5
                      ? `Only ${product.stockLeft} left — we restock monthly.`
                      : 'In stock, ready to ship.'}
                  </span>
                ) : (
                  <span className="pdp-stock-note low">
                    <span className="dot" aria-hidden></span>
                    Out of stock — we'll write to you when there are more.
                  </span>
                )}
              </div>

              {/* Variant chips */}
              {product.variants && product.variants.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div className="label" style={{ marginBottom: 10 }}>
                    {product.category === 'pouches' ? 'Color' : 'Tuning'} · <span style={{ color: 'var(--ink-500)', fontWeight: 500 }}>{product.variants.find(v => v.key === variant)?.label}</span>
                  </div>
                  <div className="variant-row">
                    {product.variants.map(v => (
                      <button
                        key={v.key}
                        className={`variant-chip${variant === v.key ? ' active' : ''}`}
                        onClick={() => setVariant(v.key)}
                      >
                        <span>{v.label}</span>
                        {v.sub && <span className="vsub">{v.sub}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* EDD */}
              <div className="pdp-edd">
                <div className="edd-icon"><Icon name="truck" size={18} /></div>
                <div className="pdp-edd-text">
                  <strong>{product.edd}</strong>
                  <div style={{ marginTop: 2 }}>Free US shipping over $50 · 30-day returns · Local pickup in Brooklyn.</div>
                </div>
              </div>

              <FreeShippingBar subtotal={product.price * qty} />

              {/* Add to bag */}
              <div className="pdp-add-row" ref={ctaRef} style={{ marginTop: 20 }}>
                <QuantityStepper value={qty} onChange={setQty} />
                <Button variant="primary" size="lg" onClick={handleAdd} disabled={!product.inStock} style={{ flex: 1, justifyContent: 'center' }}>
                  {product.inStock ? `Add to bag · $${(product.price * qty).toFixed(0)}` : 'Notify me when back'}
                </Button>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <Button variant="accent" icon="heart" style={{ flex: 1, justifyContent: 'center' }}>Save for later</Button>
                <Button variant="ghost" style={{ flex: 1, justifyContent: 'center' }}>Add a gift note</Button>
              </div>

              {/* Trust strip */}
              <div style={{ display: 'flex', gap: 18, marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--surface-line)', flexWrap: 'wrap' }}>
                {[
                  { icon: 'pin',   label: 'Made in Brooklyn' },
                  { icon: 'check', label: '30-day returns' },
                  { icon: 'truck', label: 'Ships in 1–2 days' },
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-700)' }}>
                    <span style={{ color: 'var(--color-lavender)' }}><Icon name={t.icon} size={16} /></span>
                    {t.label}
                  </div>
                ))}
              </div>

              {/* Katy's notes — restored, smaller spacing */}
              {product.notes && (
                <div className="pdp-section">
                  <h3><Icon name="note" size={18} style={{ color: 'var(--color-lavender)' }} /> Katy's notes</h3>
                  <p className="pdp-katy"><span className="pdp-quote-mark">"</span>{product.notes}<span className="pdp-quote-mark">"</span></p>
                </div>
              )}

              {/* Accordion details */}
              <div className="accordion" style={{ marginTop: 32 }}>
                {[
                  { key: 'about',   label: 'About the make',  body: product.detailsLong },
                  { key: 'care',    label: 'Care & tuning',   body: 'A wipe with the included cloth after playing keeps fingerprints off the brass. Re-tune once a season — instructions are in the included care card. The plucker likes a drop of linseed oil twice a year.' },
                  { key: 'returns', label: 'Shipping & returns', body: 'Free US shipping on orders over $50, flat $6 below. International from $14 (calculated at checkout). 30 days for returns — we cover return shipping inside the US.' },
                ].map(item => (
                  <div key={item.key} className={`accordion-item${openAcc === item.key ? ' open' : ''}`}>
                    <button className="accordion-trigger" onClick={() => setOpenAcc(openAcc === item.key ? '' : item.key)}>
                      {item.label}
                      <Icon name="chevron-down" size={18} className="chev" />
                    </button>
                    <div className="accordion-body">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section ref={reviewsRef} id="reviews">
        <div className="container">
          <EditorialHeader eyebrow={`${product.reviews} reviews`} title="What people say." />
          <div className="reviews-summary">
            <div>
              <div className="reviews-avg">{product.rating?.toFixed(1) || '—'}</div>
              <Stars value={product.rating || 0} size={18} />
              <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 6 }}>{product.reviews} written reviews</div>
              <Button variant="ghost" style={{ marginTop: 16 }}>Write a review</Button>
            </div>
            <div className="reviews-bars">
              {ratingBreakdown.map(r => {
                const total = product.reviews || 1;
                const pct = (r.count / total) * 100;
                return (
                  <div key={r.stars} className="reviews-bar">
                    <span>{r.stars}★</span>
                    <div className="reviews-bar-track"><div className="reviews-bar-fill" style={{ width: `${pct}%` }}></div></div>
                    <span>{r.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            {(product.sampleReviews || []).map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-meta">
                  <div className="stars"><Stars value={r.rating} size={14} /></div>
                  <div className="review-author">{r.name}</div>
                  <div className="review-loc">{r.loc}</div>
                </div>
                <div>
                  <div className="review-title">{r.title}</div>
                  <p className="review-body">{r.body}</p>
                </div>
              </div>
            ))}
            {(!product.sampleReviews || product.sampleReviews.length === 0) && (
              <div className="empty-state" style={{ padding: '40px 20px' }}>
                <p>No written reviews yet — be the first.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      <section>
        <div className="container">
          <EditorialHeader eyebrow="Goes well with" title="A few that pair." onSeeMore={() => onNavigate('collections')} seeMoreLabel="Shop all" />
          <div className="prod-grid">
            {goesWith.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => onProduct(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA bar */}
      <div className={`pdp-sticky${stickyVisible ? ' visible' : ''}`} aria-hidden={!stickyVisible}>
        <div className="container pdp-sticky-inner">
          <div className="pdp-sticky-info">
            <div className="pdp-sticky-thumb"><img src={product.image} alt="" /></div>
            <div>
              <div className="pdp-sticky-name">{product.name}</div>
              <div className="pdp-sticky-price">${product.price}.00{variant ? ` · ${product.variants.find(v => v.key === variant)?.label}` : ''}</div>
            </div>
          </div>
          <div className="pdp-sticky-cta">
            <QuantityStepper value={qty} onChange={setQty} />
            <Button variant="primary" onClick={handleAdd} disabled={!product.inStock}>
              {product.inStock ? `Add to bag · $${(product.price * qty).toFixed(0)}` : 'Notify me'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { ProductScreen });
