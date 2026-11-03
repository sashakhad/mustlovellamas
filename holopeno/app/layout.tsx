import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { getSiteUrl, site } from '../lib/site';
import { palette } from '../lib/tokens';
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
  title: { default: site.name, template: `%s · ${site.name}` },
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
    creator: site.xHandle,
  },
};

export const viewport: Viewport = {
  themeColor: palette.char,
  colorScheme: 'dark',
};

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className={`${mono.variable} ${sans.variable}`}>
      <body className='flex min-h-screen flex-col bg-char font-sans text-bone antialiased'>
        <a
          href='#main'
          className='sr-only bg-holo px-3 py-2 font-mono text-small text-char focus:not-sr-only focus:absolute focus:left-5 focus:top-5'
        >
          skip to content
        </a>
        <SiteHeader />
        <main id='main' className='flex-1'>
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
