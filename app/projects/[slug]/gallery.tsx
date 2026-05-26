'use client';
import { useState } from 'react';
import Image from 'next/image';

interface GalleryProps {
  title: string;
  images: string[];
  notes?: string;
}

export function Gallery({ title, images, notes }: GalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="pdp-gallery">
      <div className="pdp-main-img">
        {images.length > 0 ? (
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${title} – image ${active + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={active === 0}
            unoptimized
          />
        ) : (
          <div className="pdp-main-img-placeholder">
            <img src="/illustrations/harp-line.svg" alt="" />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="pdp-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              className={`pdp-thumb${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {notes && (
        <blockquote className="pdp-katy">
          <span className="pdp-quote-mark">"</span>
          {notes}
          <span className="pdp-quote-mark">"</span>
        </blockquote>
      )}
    </div>
  );
}
