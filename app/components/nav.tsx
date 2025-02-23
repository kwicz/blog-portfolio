'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import ToggleButton from './toggleButton';

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? 'bg-zinc-900/0 border-transparent'
            : 'bg-zinc-900/500  border-zinc-800 '
        }`}
      >
        <div className='flex flex-row-reverse items-center justify-between p-6'>
          <div className='flex justify-between gap-8 items-center'>
            <Link
              href='/projects'
              className='duration-200 text-slate hover:text-rose dark:text-ivory dark:hover:text-gold'
            >
              Projects
            </Link>
            <Link
              href='/posts'
              className='duration-200 text-slate hover:text-rose dark:text-ivory dark:hover:text-gold'
            >
              Blog
            </Link>
            <Link
              href='/contact'
              className='duration-200 text-slate hover:text-rose dark:text-ivory dark:hover:text-gold'
            >
              Contact
            </Link>
            <ToggleButton />
          </div>

          <Link
            href='/'
            className='duration-200 text-slate hover:text-rose dark:text-ivory dark:hover:text-gold'
          >
            <ArrowLeft className='w-6 h-6 ' />
          </Link>
        </div>
      </div>
    </header>
  );
};
