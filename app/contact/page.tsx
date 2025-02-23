'use client';
import { Github, Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '../components/nav';
import { Card } from '../components/card';

const socials = [
  {
    icon: <Linkedin size={20} />,
    href: 'https://www.linkedin.com/in/kwicz/',
    label: 'LinkedIn',
    handle: 'Katy Solovewicz',
  },
  {
    icon: <Mail size={20} />,
    href: 'mailto:katy@solovewicz.com',
    label: 'Email',
    handle: 'katy@solovewicz.com',
  },
  {
    icon: <Github size={20} />,
    href: 'https://github.com/kwicz',
    label: 'Github',
    handle: 'kwicz',
  },
];

export default function Example() {
  return (
    <div className='relative min-h-screen bg-ivory text-slate dark:bg-slate dark:text-ivory transition-colors duration-300'>
      <Navigation />
      <div className='container flex items-center justify-center min-h-screen px-4 mx-auto'>
        <div className='grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16'>
          {socials.map((s) => (
            <Card key={s.href}>
              <Link
                href={s.href}
                target='_blank'
                className='p-4 relative flex flex-col items-center gap-4 duration-300 group md:gap-8 md:py-24 lg:pb-48 md:p-16'
              >
                {/* Icon Circle */}
                <span
                  className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-300 border rounded-full
                  text-ivory bg-rose border-rose group-hover:text-slate group-hover:bg-rose/80
                  dark:text-ivory dark:bg-gold dark:border-gold dark:group-hover:bg-gold dark:group-hover:text-slate'
                >
                  {s.icon}
                </span>

                {/* Social Handle & Label */}
                <div className='z-10 flex flex-col items-center'>
                  <span className='lg:text-xl font-medium duration-150 xl:text-3xl text-slate-700 group-hover:text-slate-900 dark:text-ivory font-display text-center'>
                    {s.handle}
                  </span>
                  <span className='mt-4 text-sm text-center duration-300 text-slate-500 group-hover:text-slate-700 dark:text-ivory/70 dark:group-hover:text-ivory'>
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
