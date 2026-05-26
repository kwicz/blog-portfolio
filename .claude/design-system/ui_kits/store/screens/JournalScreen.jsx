// JournalScreen — editorial index. Featured post + category filter + grid + newsletter callout.
function JournalScreen({ onPost, onNavigate }) {
  const [category, setCategory] = React.useState('All');

  const featured = JOURNAL.find(p => p.featured) || JOURNAL[0];
  const rest = JOURNAL.filter(p => p.id !== featured.id);
  const filtered = category === 'All' ? rest : rest.filter(p => p.category === category);

  const tintBgs = {
    lilac:    'var(--color-lilac)',
    sage:     'var(--color-sage)',
    lavender: 'var(--color-lavender)',
    cream:    'var(--surface-2)',
    'lilac-deep': 'var(--lilac-300)',
    'sage-deep':  'var(--sage-300)',
  };

  return (
    <main>
      <section style={{ paddingBlock: '32px 0' }}>
        <div className="container">
          <Breadcrumb
            items={[
              { id: 'home', label: 'Home' },
              { label: 'Journal' },
            ]}
            onNavigate={onNavigate}
          />

          <div className="journal-hero">
            <div>
              <div className="pdp-eyebrow">The Journal</div>
              <h1>Notes from the shop.</h1>
            </div>
            <p>Short pieces about making harps, tuning them, and the people who pick them up. Mostly written on the bench, between orders.</p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="journal-tabs">
            {JOURNAL_CATEGORIES.map(c => (
              <button
                key={c}
                className={`filter-pill${c === category ? ' active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Featured post — only shown on the All tab */}
          {category === 'All' && (
            <div className="journal-featured" onClick={() => onPost(featured)} style={{ cursor: 'pointer' }}>
              <div className="journal-featured-img" style={{ background: tintBgs[featured.imageTint] || 'var(--color-lilac)' }}>
                <img src={featured.image} alt="" />
              </div>
              <div className="journal-featured-body">
                <div className="jcard-eyebrow">Featured · {featured.category}</div>
                <h2>{featured.title}</h2>
                <p className="excerpt">{featured.excerpt}</p>
                <div className="journal-featured-meta">
                  <span>{featured.author}</span>
                  <span className="sep">·</span>
                  <span>{featured.date}</span>
                  <span className="sep">·</span>
                  <span>{featured.readTime}</span>
                </div>
                <div style={{ marginTop: 8 }}>
                  <SeeMore>Read the piece</SeeMore>
                </div>
              </div>
            </div>
          )}

          <div className="journal-grid">
            {filtered.map(p => (
              <article key={p.id} className="jcard" onClick={() => onPost(p)}>
                <div className="jcard-img" style={{ background: tintBgs[p.imageTint] || 'var(--color-lilac)' }}>
                  <img src={p.image} alt="" />
                </div>
                <div className="jcard-eyebrow">{p.category}</div>
                <h3 className="jcard-title">{p.title}</h3>
                <p className="jcard-excerpt">{p.excerpt}</p>
                <div className="jcard-meta">
                  <span>{p.author}</span>
                  <span className="sep">·</span>
                  <span>{p.date}</span>
                  <span className="sep">·</span>
                  <span>{p.readTime}</span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <span className="script">nothing here, yet</span>
              <p>We haven't written about that yet. Try another category, or join the list and we'll write to you.</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="j-news">
            <div>
              <div className="pdp-eyebrow" style={{ color: 'var(--sage-600)' }}>Shop letter</div>
              <h3>One short letter, when there's news.</h3>
              <p>Lessons, restocks, occasional photos of the cat. Never more than monthly. We don't share the list with anyone.</p>
            </div>
            <form className="j-news-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@somewhere" />
              <Button variant="primary">Sign up</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { JournalScreen });
