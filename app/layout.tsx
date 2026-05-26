import '../global.css';
import localFont from 'next/font/local';
import { Fraunces, Caveat } from 'next/font/google';
import { Metadata } from 'next';
import GoogleAnalytics from './components/analytics';
import { StoreShell } from './components/store-shell';

export const metadata: Metadata = {
  title: {
    default: 'Katy Solovewicz',
    template: '%s | k.solovewi.cz',
  },
  description: 'Frontend engineer & designer based in New York.',
  openGraph: {
    title: 'Katy Solovewicz',
    description: 'Frontend engineer & designer based in New York.',
    url: 'https://k.solovewi.cz',
    siteName: 'k.solovewi.cz',
    images: [{ url: '/favicon.png', width: 1920, height: 1080 }],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { shortcut: '/favicon.png' },
};

const inter = localFont({
  src: [
    { path: '../public/fonts/Inter-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Inter-Bold.woff2', weight: '700' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[inter.variable, fraunces.variable, caveat.variable].join(' ')}
    >
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <StoreShell>{children}</StoreShell>
      </body>
    </html>
  );
}
