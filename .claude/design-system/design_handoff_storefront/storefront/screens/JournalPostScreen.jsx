// JournalPostScreen — single editorial post detail.
// Renders the body blocks (lede / h2 / h3 / p / quote) into long-form layout.
function JournalPostScreen({ post, onPost, onProduct, onNavigate }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, [post.id]);

  const tintBgs = {
    lilac: 'var(--color-lilac)', sage: 'var(--color-sage)',
    lavender: 'var(--color-lavender)', cream: 'var(--surface-2)',
    'lilac-deep': 'var(--lilac-300)', 'sage-deep': 'var(--sage-300)',
  };

  // Pick a product to cross-sell mid-article based on post category.
  const crosssellMap = { Lessons: 'greenroom', 'From the shop': 'brass', Stories: 'the-original' };
  const crosssell = (window.PRODUCTS || []).find(p => p.id === crosssellMap[post.category]) || (window.PRODUCTS || [])[0];

  const more = JOURNAL.filter(p => p.id !== post.id).slice(0, 3);

  // Split body into two halves so the cross-sell can sit in the middle
  const mid = Math.floor(post.body.length / 2);
  const first = post.body.slice(0, mid);
  const second = post.body.slice(mid);

  const renderBlock = (b, i) => {
    switch (b.type) {
      case 'lede':  return <p key={i} className="lede" style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: '32px', color: 'var(--ink-700)', fontVariationSettings: "'opsz' 48, 'SOFT' 30", fontStyle: 'italic', textWrap: 'balance', margin: '0 0 32px' }}>{b.text}</p>;
      case 'h2':    return <h2 key={i}>{b.text}</h2>;
      case 'h3':    return <h3 key={i}>{b.text}</h3>;
      case 'p':     return <p key={i}>{b.text}</p>;
      case 'quote': return <blockquote key={i} className="post-pullquote">{b.text}</blockquote>;
      default:      return null;
    }
  };

  return (
    <main>
      <section style={{ paddingBlock: '24px 0' }}>
        <div className="container">
          <Breadcrumb
            items={[
              { id: 'home', label: 'Home' },
              { id: 'journal', label: 'Journal' },
              { label: post.title.replace(/\.$/, '') },
            ]}
            onNavigate={onNavigate}
          />

          <div className="post-hero">
            <div className="jcard-eyebrow">{post.category}</div>
            <h1>{post.title}</h1>
            <p className="lede">{post.excerpt}</p>
            <div className="post-byline">
              <span className="author-name">{post.author}</span>
              <span className="sep">·</span>
              <span>{post.date}</span>
              <span className="sep">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="post-cover" style={{ background: tintBgs[post.imageTint] }}>
            <img src={post.image} alt="" />
          </div>

          <article className="post-body">
            {first.map(renderBlock)}
          </article>

          {/* Cross-sell card mid-article */}
          {crosssell && (
            <div className="post-crosssell">
              <div className="post-crosssell-img"><img src={crosssell.image} alt="" /></div>
              <div>
                <div className="post-crosssell-eyebrow">Mentioned in this post</div>
                <h4 className="post-crosssell-name">{crosssell.name}</h4>
                <div className="post-crosssell-price">${crosssell.price}.00</div>
              </div>
              <Button variant="primary" onClick={() => onProduct(crosssell)}>Take a look</Button>
            </div>
          )}

          <article className="post-body">
            {second.map((b, i) => renderBlock(b, i + 100))}
          </article>

          <div className="post-toolbar">
            <div className="tags">
              <span className="caps" style={{ marginRight: 4 }}>Tagged</span>
              <button className="filter-pill" onClick={() => onNavigate('journal')}>{post.category}</button>
              <button className="filter-pill">Mouth harp</button>
              <button className="filter-pill">Brooklyn</button>
            </div>
            <div className="share">
              <Button variant="ghost" icon="heart">Save</Button>
              <Button variant="ghost" iconRight="arrow-up-right">Share</Button>
            </div>
          </div>

          {/* Author bio */}
          <div style={{ maxWidth: 680, margin: '0 auto 80px', padding: 24, background: 'var(--surface-2)', borderRadius: 22, display: 'grid', gridTemplateColumns: '72px 1fr', gap: 20, alignItems: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: 999, background: 'var(--color-lilac)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="../../assets/illustrations/cat-2-line.svg" alt="" style={{ width: '70%', height: '70%', color: 'var(--ink-900)' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-lavender)', marginBottom: 4 }}>Written by</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontVariationSettings: "'opsz' 48", marginBottom: 6 }}>{post.author}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-700)', lineHeight: '22px' }}>
                {post.author === 'Katy Lee'
                  ? 'Founded the shop in 2016. Tunes most of the harps. Has strong opinions about brass.'
                  : 'Writes occasional history pieces from the back of the shop.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <EditorialHeader eyebrow="More from the journal" title="A few that pair." onSeeMore={() => onNavigate('journal')} seeMoreLabel="All posts" />
          <div className="journal-grid">
            {more.map(p => (
              <article key={p.id} className="jcard" onClick={() => onPost(p)}>
                <div className="jcard-img" style={{ background: tintBgs[p.imageTint] }}>
                  <img src={p.image} alt="" />
                </div>
                <div className="jcard-eyebrow">{p.category}</div>
                <h3 className="jcard-title">{p.title}</h3>
                <p className="jcard-excerpt">{p.excerpt}</p>
                <div className="jcard-meta">
                  <span>{p.author}</span>
                  <span className="sep">·</span>
                  <span>{p.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { JournalPostScreen });
