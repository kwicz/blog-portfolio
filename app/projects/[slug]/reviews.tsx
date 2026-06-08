'use client';

import { useState } from 'react';
import { EditorialHeader } from '@/app/components/editorial-header';

const ALL_REVIEWS = [
  {
    rating: 5,
    name: 'LinkedIn Review',
    title: 'A collaborator you keep coming back to',
    body: 'Intuitive, collaborative, and helpful — Katy knows how to solve your problem and has consistently provided numerous sources of knowledge and personal growth. Katy wants everyone around her to excel and goes out of her way to help people find their strengths. I would jump at the opportunity to work with her again.',
  },
  {
    rating: 5,
    name: 'LinkedIn Review',
    title: 'Positivity, wit, and creativity',
    body: "Few people I've worked with in my professional career have brought as much positivity, wit, and creativity to the job. I've found her to be driven, adaptable, passionate, and able to focus on the details while not losing sight of the mission. Her professionalism and empathy make her a true joy to work with.",
  },
  {
    rating: 5,
    name: 'Co-Worker @ The Good',
    title: 'Curiosity and ambition on every project',
    body: '...is an incredible collaborator, always bringing curiosity, ambition, and a can-do attitude to every project.',
  },
  {
    rating: 5,
    name: 'Co-Worker @ The Good',
    title: 'Wearing every hat, and wearing them well',
    body: '...is playing so many roles right now and shaping new projects and creating efficiencies in everything.',
  },
  {
    rating: 5,
    name: 'Co-Worker @ The Good',
    title: 'Always raising the team\'s waterline',
    body: '...is always sharing knowledge and skills to help the team and help others level up.',
  },
  {
    rating: 5,
    name: 'Co-Worker @ The Good',
    title: 'Creative confidence from day one',
    body: '...has been a pleasure to watch as they approach new projects with creative confidence.',
  },
];

const TOTAL = ALL_REVIEWS.length;
const INITIAL = 3;

export function ProjectReviews() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? ALL_REVIEWS : ALL_REVIEWS.slice(0, INITIAL);

  return (
    <section style={{ borderTop: '1px solid var(--surface-line)', padding: '72px 0' }}>
      <div className="container">
        <EditorialHeader eyebrow={`${TOTAL} reviews`} title="What people say." />
        <div className="reviews-summary">
          <div>
            <div className="reviews-avg">5.0</div>
            <div className="pdp-stars">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} style={{ color: 'var(--accent-honey)', fontSize: 18 }}>{s}</span>
              ))}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 6 }}>{TOTAL} written reviews</div>
          </div>
          <div className="reviews-bars">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = ALL_REVIEWS.filter(r => r.rating === stars).length;
              return (
                <div key={stars} className="reviews-bar">
                  <span>{stars}★</span>
                  <div className="reviews-bar-track">
                    <div className="reviews-bar-fill" style={{ width: `${(count / TOTAL) * 100}%` }} />
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {visible.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-meta">
                <div style={{ color: 'var(--accent-honey)', fontSize: 14, marginBottom: 8 }}>
                  {'★'.repeat(r.rating)}
                </div>
                <div className="review-author">{r.name}</div>
              </div>
              <div>
                <div className="review-title">{r.title}</div>
                <p className="review-body">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
        {!showAll && (
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--surface-line)' }}>
            <button className="btn btn-ghost" onClick={() => setShowAll(true)}>
              See all {TOTAL} reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
