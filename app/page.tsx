import Link from 'next/link';
import React from 'react';
import Particles from './components/particles';
import ToggleButton from './components/toggleButton';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/posts' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden text-slate bg-ivory/90 transition-colors duration-300 dark:text-ivory dark:bg-blue-200/20'>
      <nav className='my-16 animate-fade-in'>
        <div className='absolute top-4 right-4'>
          <ToggleButton />
        </div>
        <ul className='flex items-center justify-center gap-4'>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm duration-500 text-slate hover:text-rose dark:text-ivory dark:hover:text-gold'
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className='hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-slate/0 via-slate/50 to-slate/0 dark:from-ivory/0 dark:via-ivory/50 dark:to-ivory/0' />

      <Particles
        className='particles absolute inset-0 -z-10 animate-fade-in'
        quantity={300}
      />

      <h1 className='py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-slate cursor-default animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text dark:bg-ivory'>
        Katy Solovewicz
      </h1>

      <div className='hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-slate/0 via-slate/50 to-slate/0 dark:from-ivory/0 dark:via-ivory/50 dark:to-ivory/0' />

      <div className='my-16 text-center animate-fade-in'>
        <h2 className='text-sm text-slate dark:text-ivory'>
          Frontend Engineer
        </h2>
        <a
          href='https://www.hackerrank.com/certificates/f2ef8981ecea'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='text-sm duration-500 text-slate text-slate hover:text-rose dark:text-ivory dark:hover:text-gold'>
            Certified Basic Problem Solver
          </h2>
        </a>
      </div>
    </div>
  );
}
