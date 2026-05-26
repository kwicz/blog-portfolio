'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './icons';
import { useStore } from './store-context';

export function CartDrawer() {
  const { drawerOpen, closeDrawer } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstFieldRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeDrawer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    setSending(false);
  };

  return (
    <>
      <div
        className={`cart-overlay${drawerOpen ? ' open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${drawerOpen ? ' open' : ''}`}
        aria-label="Get in touch"
        aria-modal="true"
        role="dialog"
      >
        <div className="cart-head">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: 0 }}>
            Say hello.
          </h2>
          <button className="icon-btn" onClick={closeDrawer} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="cart-body">
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--surface-sage)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Icon name="check" size={24} strokeWidth={2.5} style={{ color: 'var(--ink-700)' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 8 }}>
                Message received!
              </p>
              <p style={{ color: 'var(--ink-500)', fontSize: 14, lineHeight: 1.6 }}>
                I'll get back to you within a couple of days.
              </p>
              <button
                className="btn btn-outline-caps"
                style={{ marginTop: 28 }}
                onClick={() => { setSent(false); setName(''); setEmail(''); setMessage(''); closeDrawer(); }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--ink-500)', fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>
                Interested in working together? Have a question? Drop me a note and I'll be in touch.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="field">
                  <label htmlFor="drawer-name">Name</label>
                  <input
                    id="drawer-name"
                    ref={firstFieldRef}
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="drawer-email">Email</label>
                  <input
                    id="drawer-email"
                    type="email"
                    placeholder="you@somewhere.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="drawer-message">Message</label>
                  <textarea
                    id="drawer-message"
                    rows={5}
                    placeholder="Tell me about your project…"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                  style={{ marginTop: 8 }}
                >
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>

              <div className="trust-strip" style={{ marginTop: 32 }}>
                <div className="trust-item">
                  <Icon name="check" size={14} strokeWidth={2.2} />
                  Based in NYC
                </div>
                <div className="trust-item">
                  <Icon name="note" size={14} strokeWidth={2} />
                  Usually replies in 1–2 days
                </div>
                <div className="trust-item">
                  <Icon name="heart" size={14} strokeWidth={2} />
                  Open to freelance
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
