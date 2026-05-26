import Link from 'next/link';
import { Icon } from './icons';

export function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr-grid">
          <div>
            <div className="ftr-tag">Full-stack ecommerce dev.<br />CRO, A/B testing & automations.</div>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--lavender-200)', fontSize: 13 }}>
              <Icon name="pin" size={16} /> Portland, OR
            </div>
          </div>
          <div>
            <h4>Work</h4>
            <ul>
              <li><Link href="/projects">All projects</Link></li>
              <li><Link href="/projects?category=E-Commerce">E-Commerce</Link></li>
              <li><Link href="/projects?category=E-Learning">E-Learning</Link></li>
              <li><Link href="/projects?category=Just+For+Fun">Just For Fun</Link></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/posts">Journal</Link></li>
              <li><a href="https://github.com/katysolovewicz" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/katysolovewicz" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <p style={{ fontSize: 14, color: 'var(--lavender-200)', margin: '0 0 14px', lineHeight: 1.5 }}>
              Open to freelance projects and creative partnerships.
            </p>
            <Link href="/contact" className="btn" style={{ background: 'var(--color-lavender)', color: 'var(--ink-900)', display: 'inline-flex' }}>
              Say hello
            </Link>
          </div>
        </div>
        <div className="ftr-bottom">
          <div>© {new Date().getFullYear()} K. Solovewicz</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/contact">Contact</Link>
            <a href="https://github.com/katysolovewicz" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
