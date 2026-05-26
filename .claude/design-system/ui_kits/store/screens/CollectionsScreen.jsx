// CollectionsScreen — filterable product list with editorial header.
function CollectionsScreen({ initialCategory = 'all', onProduct, onAddToCart, onNavigate }) {
  const [category, setCategory] = React.useState(initialCategory);
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const [sort, setSort] = React.useState('featured');

  const filtered = React.useMemo(() => {
    let list = PRODUCTS.slice();
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (inStockOnly)        list = list.filter(p => p.inStock);
    switch (sort) {
      case 'new':         list = [...list].sort((a, b) => (b.ribbon?.label === 'New' ? 1 : 0) - (a.ribbon?.label === 'New' ? 1 : 0)); break;
      case 'price-asc':   list.sort((a, b) => a.price - b.price); break;
      case 'price-desc':  list.sort((a, b) => b.price - a.price); break;
      case 'bestselling': list.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }
    return list;
  }, [category, inStockOnly, sort]);

  const activeCategory = CATEGORIES.find(c => c.key === category);

  const headerCopy = {
    all:         { eyebrow: 'The full shop', title: 'Everything we make.', intro: 'Eight things, hand-tuned in a small shop in Brooklyn. We don\'t carry anyone else\'s work — every harp and pouch on this page came off our bench.' },
    harps:       { eyebrow: 'All harps',    title: 'The harps themselves.', intro: 'Brass and steel, tuned by ear, sized for a coat pocket up to a serious instrument. Pick the tuning that sounds best in your jaw.' },
    pouches:     { eyebrow: 'Pouches',      title: 'For the harp\'s peace of mind.', intro: 'Heavy cotton, drawstring, hand-sewn in the same shop. Keeps lint out and the harp ready to play.' },
    accessories: { eyebrow: 'Accessories',  title: 'The small extras.', intro: 'Forks, oils, picks. Everything that helps a harp stay a harp.' },
  };
  const copy = headerCopy[category] || headerCopy.all;

  return (
    <main>
      <section style={{ paddingBlock: '32px 0' }}>
        <div className="container">
          <Breadcrumb
            items={[
              { id: 'home', label: 'Home' },
              { id: 'collections', label: 'Shop' },
              { label: activeCategory?.label || 'Everything' },
            ]}
            onNavigate={onNavigate}
          />

          <div className="coll-hero">
            <div>
              <div className="pdp-eyebrow">{copy.eyebrow}</div>
              <h1>{copy.title}</h1>
              <p className="coll-intro">{copy.intro}</p>
            </div>
            <div className="coll-stats">
              <div><strong>{filtered.length}</strong>{filtered.length === 1 ? 'thing' : 'things'} in stock</div>
              <div><strong>4.8</strong>average rating · 631 reviews</div>
              <div><strong>30/mo</strong>made by hand</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="coll-filterbar">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                className={`filter-pill${c.key === category ? ' active' : ''}`}
                onClick={() => setCategory(c.key)}
              >
                {c.label}
              </button>
            ))}
            <button
              className={`filter-pill${inStockOnly ? ' active' : ''}`}
              onClick={() => setInStockOnly(v => !v)}
            >
              {inStockOnly && <Icon name="check" size={12} strokeWidth={2.4} />}
              In stock only
            </button>

            <span className="count">{filtered.length} {filtered.length === 1 ? 'item' : 'items'}</span>

            <div className="sort-select">
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                <option value="featured">Sort: Featured</option>
                <option value="new">Newest first</option>
                <option value="bestselling">Bestselling</option>
                <option value="price-asc">Price · low to high</option>
                <option value="price-desc">Price · high to low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="script">nothing here, yet</span>
              <p>That combination is empty for now. Try widening the filters — or join the list and we'll write to you when there are more.</p>
            </div>
          ) : (
            <div className="prod-grid">
              {filtered.map((p, idx) => (
                <React.Fragment key={p.id}>
                  <CollectionsCard product={p} onClick={() => onProduct(p)} onQuickAdd={() => onAddToCart(p)} />
                  {/* Editorial feature card inserted after the 4th product */}
                  {idx === 3 && category === 'all' && (
                    <div className="coll-feature">
                      <div>
                        <div className="ed-eyebrow">Lessons</div>
                        <h3>Free first lesson, whenever you want it.</h3>
                        <p>A 12-minute video covering grip, breath, and the first three notes. Made for people who have never held one.</p>
                        <SeeMore>Start the lesson</SeeMore>
                      </div>
                      <div className="feature-art">
                        <img src="../../assets/illustrations/note-music-line.svg" alt="" style={{ color: 'var(--ink-900)' }} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, padding: '32px 0', borderTop: '1px solid var(--surface-line)' }}>
            {[
              { icon: 'truck', title: 'Free US shipping over $50', sub: 'Flat $6 below.' },
              { icon: 'check', title: '30-day return window',       sub: 'Send it back if it doesn\'t sing.' },
              { icon: 'pin',   title: 'Made by four people',        sub: 'In Brooklyn. Sometimes the cat helps.' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-lavender)' }}><Icon name={c.icon} size={22} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Slightly extended ProductCard with quick-add. Keeps the original visual; overlays
// a translucent ink CTA on hover.
function CollectionsCard({ product, onClick, onQuickAdd }) {
  return (
    <div className="pcard">
      <div className="pcard-img" onClick={onClick} style={{ cursor: 'pointer' }}>
        {product.ribbon && (
          <div className="pcard-ribbon">
            <Ribbon color={product.ribbon.color || 'tomato'}>{product.ribbon.label}</Ribbon>
          </div>
        )}
        <img src={product.image} alt={product.name} />
        <div className="pcard-quickadd">
          <button
            className="btn"
            onClick={(e) => { e.stopPropagation(); onQuickAdd(); }}
            disabled={!product.inStock}
          >
            <Icon name="plus" size={14} strokeWidth={2.2} />
            {product.inStock ? 'Quick add' : 'Notify me'}
          </button>
        </div>
      </div>
      <div className="pcard-meta" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div className="pcard-name">{product.name}</div>
        <div className="pcard-price">
          <span>${product.price}</span>
          {product.rating && (
            <span className="pcard-rating">
              <Icon name="star" size={12} strokeWidth={2} /> {product.rating} ({product.reviews})
            </span>
          )}
          {product.stockLeft != null && product.stockLeft <= 5 && product.stockLeft > 0 && (
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--accent-berry)', fontWeight: 600, letterSpacing: '0.02em' }}>
              {product.stockLeft} left
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CollectionsScreen });
