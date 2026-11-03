import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { color } from '../design/tokens';
import { getSiteUrl, site } from '../lib/site';
import './globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-mono',
});

const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author }],
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': [{ url: '/rss.xml', title: site.name }] },
  },
  openGraph: {
    title: site.name,
    description: site.tagline,
    siteName: site.name,
    type: 'website',
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: color.char,
  colorScheme: 'dark',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className={`${mono.variable} ${sans.variable}`}>
      <body className='flex min-h-screen flex-col'>
        <a
          href='#content'
          className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-10 focus:bg-seed focus:px-3 focus:py-2 focus:font-mono focus:text-meta focus:text-char'
        >
          skip to content
        </a>
        <SiteHeader />
        <main id='content' className='flex-1'>
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
