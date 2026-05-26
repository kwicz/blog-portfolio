// Header — sticky cream, gets shadow-1 after 24px scroll. Logo, nav, search, account, bag.
function Header({ onNavigate, onOpenCart, cartCount, current }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { id: 'collections', label: 'Shop' },
    { id: 'collections', label: 'New' },
    { id: 'home',  label: 'Lessons' },
    { id: 'about', label: 'About' },
    { id: 'journal', label: 'Journal' },
  ];

  return (
    <header className={`hdr${scrolled ? ' scrolled' : ''}`}>
      <div className="container hdr-inner">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="../../assets/logo-wordmark.svg" alt="Katy Lee's Mouth Harps" className="hdr-logo" />
        </a>

        <nav className="hdr-nav">
          {nav.map((n, i) => (
            <a key={i} href="#" onClick={(e) => { e.preventDefault(); onNavigate(n.id); }}>{n.label}</a>
          ))}
        </nav>

        <div className="hdr-tools">
          <button className="icon-btn" aria-label="Search"><Icon name="search" size={20} /></button>
          <button className="icon-btn" aria-label="Account"><Icon name="user" size={20} /></button>
          <button className="icon-btn" aria-label="Saved"><Icon name="heart" size={20} /></button>
          <button className="icon-btn" aria-label="Bag" onClick={onOpenCart}>
            <Icon name="cart" size={20} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Header });
