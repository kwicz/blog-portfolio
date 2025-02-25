import '../global.css';
import { Inter, Poppins, Raleway, Open_Sans } from 'next/font/google';
import LocalFont from '@next/font/local';
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
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const calSans = LocalFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-raleway',
});
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-openSans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={[poppins.variable, raleway.variable, openSans.variable].join(
        ' '
      )}
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
