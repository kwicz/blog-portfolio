// HomeScreen — hero, tile grid, "new this week" product grid, editorial block.
function HomeScreen({ onProduct, onAddToCart, onNavigate }) {
  const newThisWeek = PRODUCTS.slice(0, 4);
  const bestsellers = PRODUCTS.slice(4, 8);

  return (
    <main>
      <section style={{ paddingBlock: '40px 64px' }}>
        <div className="container">
          <Hero
            eyebrow="New this autumn"
            title="The Brass One is back, finally."
            body="Hand-tuned in a small shop in Brooklyn. We make about thirty harps a month, sometimes fewer. When they're gone, they're gone — but we'll write to you when there are more."
            primaryCta="Shop the brass"
            secondaryCta="Read the journal"
            image="../../assets/placeholders/prod-brass.svg"
            caveat="finally!"
            onPrimary={() => onProduct(PRODUCTS[0])}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <EditorialHeader eyebrow="Categories" title="A small shop, organized" onSeeMore={() => {}} seeMoreLabel="All categories" />
          <div className="tile-grid">
            <Tile label="All harps" tint="lilac" illustration="../../assets/illustrations/harp-line.svg" />
            <Tile label="Pouches" tint="sage" illustration="../../assets/illustrations/pouch-line.svg" />
            <Tile label="Lessons" tint="tomato" illustration="../../assets/illustrations/note-music-line.svg" />
            <Tile label="Care &amp; tuning" tint="lavender" illustration="../../assets/illustrations/leaf-line.svg" />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <EditorialHeader eyebrow="New this week" title="Just off the bench" onPrev={() => {}} onNext={() => {}} onSeeMore={() => {}} seeMoreLabel="All new" />
          <div className="prod-grid">
            {newThisWeek.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => onProduct(p)} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div style={{
            background: 'var(--color-lilac)',
            borderRadius: 32,
            padding: '64px 56px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 48,
            alignItems: 'center',
            position: 'relative',
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--lavender-600)', marginBottom: 14 }}>From the journal</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: '48px', fontVariationSettings: "'opsz' 120, 'SOFT' 40", letterSpacing: '-0.01em', marginBottom: 20, maxWidth: 540 }}>
                How to tune a mouth harp in a quiet room.
              </div>
              <p style={{ fontSize: 17, lineHeight: '28px', color: 'var(--ink-700)', maxWidth: 520, margin: '0 0 24px' }}>
                A short, specific guide. Most of it is about listening, and the rest is about not being in a hurry.
              </p>
              <SeeMore onClick={() => onNavigate && onNavigate('journal')}>Read the piece</SeeMore>
            </div>
            <div style={{ position: 'relative', aspectRatio: '1/1' }}>
              <img src="../../assets/illustrations/hand-line.svg" alt="" style={{ width: '70%', height: '70%', display: 'block', margin: '0 auto', color: 'var(--ink-900)' }} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <EditorialHeader eyebrow="Always" title="Quietly the bestsellers" onSeeMore={() => {}} seeMoreLabel="Shop all" />
          <div className="prod-grid">
            {bestsellers.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => onProduct(p)} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, padding: '32px 0', borderTop: '1px solid var(--surface-line)', borderBottom: '1px solid var(--surface-line)' }}>
            {[
              { icon: 'truck', title: 'Free shipping over $50', sub: 'In the US, always.' },
              { icon: 'pin',   title: 'Made in Brooklyn',         sub: 'By the four of us.' },
              { icon: 'note',  title: 'Care kits included',       sub: 'Oil, cloth, instructions.' },
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

Object.assign(window, { HomeScreen });
