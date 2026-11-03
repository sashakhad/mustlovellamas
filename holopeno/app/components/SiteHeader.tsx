import Link from 'next/link';
import { Wordmark } from '@/app/components/Wordmark';
import { site } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className='border-b border-line'>
      <div className='mx-auto flex max-w-3xl flex-wrap items-end justify-between gap-4 px-5 py-8'>
        <Link href='/' className='text-bone hover:text-bone'>
          <Wordmark className='text-4xl sm:text-5xl' />
        </Link>
        <nav className='flex gap-5 font-mono text-sm text-ash'>
          <Link href='/' className='hover:text-seed'>
            posts
          </Link>
          <Link href='/about' className='hover:text-seed'>
            about
          </Link>
          <a href='/rss.xml' className='hover:text-seed'>
            rss
          </a>
        </nav>
        <p className='w-full font-mono text-sm text-ash'>{site.tagline}</p>
      </div>
    </header>
  );
}
