// AboutScreen — story, stats, team, the shop, press. In Katy's voice (first-person).
function AboutScreen({ onNavigate }) {
  const team = [
    { name: 'Katy Lee',    role: 'Founder · Tuner', portrait: '../../assets/illustrations/harp-line.svg', bio: 'Started the shop in 2016. Tunes most of the harps. Has strong opinions about brass.' },
    { name: 'Daniel R.',   role: 'Workbench',        portrait: '../../assets/illustrations/leaf-line.svg', bio: 'Files reeds, writes the history pieces, makes the cold brew that gets us through Mondays.' },
    { name: 'Imani S.',    role: 'Photography · Web', portrait: '../../assets/illustrations/note-music-line.svg', bio: 'Shoots every harp before it leaves. Plays the harp better than the rest of us.' },
    { name: 'Joseph K.',   role: 'Shipping · Frames', portrait: '../../assets/illustrations/pouch-line.svg', bio: 'Cuts the brass blanks. Built the shipping desk by hand. Knows where the cat is at all times.' },
  ];

  const stats = [
    { num: '4',    label: 'People who make the harps. Counting the cat.', bg: 'var(--color-lilac)' },
    { num: '30',   label: 'Harps a month, give or take. Sometimes a tour cuts in.', bg: 'var(--color-sage)' },
    { num: '2016', label: 'Year we opened. Quietly, in February.',           bg: 'var(--color-lavender)' },
  ];

  return (
    <main>
      {/* Hero — Katy's first-person intro */}
      <section style={{ paddingBlock: '32px 24px' }}>
        <div className="container">
          <Breadcrumb
            items={[
              { id: 'home', label: 'Home' },
              { label: 'About' },
            ]}
            onNavigate={onNavigate}
          />

          <div className="about-hero-2">
            <div>
              <div className="pdp-eyebrow">About the shop</div>
              <h1>I started making harps because the one I had broke.</h1>
              <p>That's mostly the truth. I'd had a small brass harp for years — someone gave it to me at a wedding — and one winter it stopped ringing. I took it apart on the kitchen counter and put it back together wrong, and the wrong version sounded better than the original.</p>
              <p>The shop is four of us now, in a one-room space in Brooklyn that used to be a barber. We make about thirty harps a month, sometimes fewer when one of us is on tour. Everything is hand-tuned by ear, which means each harp is a little different from the last. I think that's fine.</p>
              <div className="signoff">— Katy</div>
            </div>
            <div className="about-portrait-2">
              <img src="../../assets/illustrations/cat-2-line.svg" alt="" style={{ color: 'var(--ink-900)' }} />
              <div className="hl-dot" aria-hidden></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="container">
          <div className="about-stat-grid">
            {stats.map((s, i) => (
              <div key={i} className="about-stat" style={{ background: s.bg }}>
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section>
        <div className="container">
          <EditorialHeader eyebrow="The four of us" title="Who works here." />
          <div className="about-team">
            {team.map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-portrait" style={{ background: ['var(--color-lilac)', 'var(--color-sage)', 'var(--color-lavender)', 'var(--surface-2)'][i] }}>
                  <img src={m.portrait} alt="" style={{ color: 'var(--ink-900)' }} />
                </div>
                <div className="team-role">{m.role}</div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop / visit */}
      <section>
        <div className="container">
          <EditorialHeader eyebrow="The shop" title="Where it happens." />
          <div className="shop-visit">
            <div className="shop-image">
              <img src="../../assets/placeholders/hero-warm-envelope.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="shop-info">
              <h3>Come by, if you're in the neighborhood.</h3>
              <p style={{ fontSize: 15, lineHeight: '24px', color: 'var(--ink-700)', margin: 0 }}>We do free first lessons on the bench, no appointment needed. If the door's open, we're in.</p>
              <div className="info-row">
                <div className="ico"><Icon name="pin" size={18} /></div>
                <div>
                  <div className="label">Address</div>
                  <div className="val">217 N 6th St<br />Brooklyn, NY 11211</div>
                </div>
              </div>
              <div className="info-row">
                <div className="ico"><Icon name="truck" size={18} /></div>
                <div>
                  <div className="label">Hours</div>
                  <div className="val">Tue–Sat · 11–6<br />Closed Sundays &amp; Mondays</div>
                </div>
              </div>
              <div className="info-row">
                <div className="ico"><Icon name="note" size={18} /></div>
                <div>
                  <div className="label">Write to us</div>
                  <div className="val">hello@katyleeharps.com</div>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <Button variant="primary" iconRight="arrow-up-right">Open in maps</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section>
        <div className="container">
          <EditorialHeader eyebrow="In the press" title="Kind words from elsewhere." />
          <div className="press-strip">
            {[
              { name: 'The New Yorker', quote: '"A small, serious shop with a sense of humor about it."' },
              { name: 'Apartment Therapy', quote: '"The harp that finally got me to learn."' },
              { name: 'Edible Brooklyn', quote: '"The slowest, warmest small business on N 6th."' },
              { name: 'Pitchfork', quote: '"Improbably, the best mouth harp on the market."' },
            ].map((p, i) => (
              <div key={i} className="press-item">
                <h3 className="press-name">{p.name}</h3>
                <div className="press-quote">{p.quote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="j-news" style={{ background: 'var(--color-lilac)' }}>
            <div>
              <div className="pdp-eyebrow" style={{ color: 'var(--lavender-600)' }}>Stay close</div>
              <h3>Shop letter, monthly.</h3>
              <p>News from the bench, restocks, occasional photos of the cat. We don't share the list.</p>
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

Object.assign(window, { AboutScreen });
