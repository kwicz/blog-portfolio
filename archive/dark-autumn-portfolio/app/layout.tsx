import '../global.css';
import localFont from 'next/font/local';
import { Metadata } from 'next';
import GoogleAnalytics from './components/analytics';

export const metadata: Metadata = {
  title: {
    default: 'K Wicz',
    template: '%s | k.solovewi.cz',
  },
  description: 'Frontent Engineer and Certified Basic Problem Solver',
  openGraph: {
    title: 'K Wicz',
    description: 'Frontent Engineer and Certified Basic Problem Solver',
    url: 'https://k.solovewi.cz',
    siteName: 'k.solovewi.cz',
    images: [
      {
        url: '/favicon.png',
        width: 1920,
        height: 1080,
      },
    ],
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
    shortcut: '/favicon.png',
  },
};
const inter = localFont({
  src: [
    { path: '../public/fonts/Inter-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Inter-Bold.woff2', weight: '700' },
  ],
  variable: '--font-inter',
  display: 'swap',
});
const calSans = localFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
});
const poppins = localFont({
  src: [
    { path: '../public/fonts/Poppins-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Poppins-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/Poppins-Bold.woff2', weight: '700' },
  ],
  variable: '--font-poppins',
  display: 'swap',
});
const raleway = localFont({
  src: [
    { path: '../public/fonts/Raleway-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Raleway-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/Raleway-Bold.woff2', weight: '700' },
  ],
  variable: '--font-raleway',
  display: 'swap',
});
const openSans = localFont({
  src: [
    { path: '../public/fonts/OpenSans-Regular.woff2', weight: '400' },
    { path: '../public/fonts/OpenSans-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/OpenSans-Bold.woff2', weight: '700' },
  ],
  variable: '--font-openSans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={[
        inter.variable,
        poppins.variable,
        raleway.variable,
        openSans.variable,
      ].join(' ')}
    >
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
