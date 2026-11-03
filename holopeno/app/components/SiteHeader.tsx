import Link from 'next/link';
import { site } from '../../lib/site';
import { NavLink } from './NavLink';
import { Wordmark } from './Wordmark';

export function SiteHeader() {
  return (
    <header className='border-b border-line'>
      <div className='mx-auto flex max-w-content flex-wrap items-end justify-between gap-x-8 gap-y-5 px-5 pb-8 pt-12'>
        <div className='flex flex-col gap-3'>
          <Link href='/' className='text-bone' aria-label={`${site.name}, home`}>
            <Wordmark className='text-[2.75rem] sm:text-display' />
          </Link>
          <p className='font-mono text-small text-ash'>{site.tagline}</p>
        </div>
        <nav aria-label='primary' className='flex gap-5 font-mono text-small'>
          <NavLink href='/'>posts</NavLink>
          <NavLink href='/about'>about</NavLink>
          <NavLink href='/rss.xml'>rss</NavLink>
        </nav>
      </div>
    </header>
  );
}
