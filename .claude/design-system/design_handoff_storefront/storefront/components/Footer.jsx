// Footer — ink-on-cream. One moment per page.
function Footer() {
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr-grid">
          <div>
            <div className="ftr-tag">Hand-tuned in a small shop in Brooklyn.</div>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--lavender-200)', fontSize: 13 }}>
              <Icon name="pin" size={16} /> 217 N 6th St, Brooklyn NY
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="#">All harps</a></li>
              <li><a href="#">Pouches</a></li>
              <li><a href="#">Gift cards</a></li>
              <li><a href="#">Care kits</a></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><a href="#">Lessons</a></li>
              <li><a href="#">Care &amp; tuning</a></li>
              <li><a href="#">Journal</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Shop letter</h4>
            <p style={{ fontSize: 14, color: 'var(--lavender-200)', margin: '0 0 14px', lineHeight: 1.5 }}>
              One short letter, when there's news. Never more than monthly.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="you@somewhere"
                style={{
                  flex: 1, padding: '12px 14px', borderRadius: 999,
                  border: '1px solid rgba(249,248,251,0.18)',
                  background: 'rgba(249,248,251,0.06)', color: 'var(--color-cream)',
                  fontFamily: 'inherit', fontSize: 14, outline: 'none',
                }}
              />
              <button className="btn" style={{ background: 'var(--color-lavender)', color: 'var(--ink-900)' }}>Sign up</button>
            </form>
          </div>
        </div>
        <div className="ftr-bottom">
          <div>© 2025 Katy Lee's Mouth Harps</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
