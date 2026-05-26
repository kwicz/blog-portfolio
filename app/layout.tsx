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
  description: 'Full-stack ecommerce developer specializing in CRO, A/B testing, and business automations. Based in Portland, OR.',
  openGraph: {
    title: 'Katy Solovewicz',
    description: 'Full-stack ecommerce developer specializing in CRO, A/B testing, and business automations. Based in Portland, OR.',
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
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

const inter = localFont({
  src: [
    { path: '../public/fonts/Inter-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Inter-Bold.woff2', weight: '700' },
  ],
  variable: '--font-body',
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
  variable: '--font-script',
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
