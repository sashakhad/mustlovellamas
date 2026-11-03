import { site, xProfileUrl } from '../../lib/site';
import { Mark } from './Mark';
import { NavLink } from './NavLink';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className='border-t border-line'>
      <div className='mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-5 py-8 font-mono text-micro text-ash'>
        <p className='flex items-center gap-3'>
          <Mark className='w-6 text-[1.125rem]' />
          <span>
            {site.name} · by {site.author} · {year} · hot, not hallucinated.
          </span>
        </p>
        <p className='flex gap-4'>
          <NavLink href={xProfileUrl()}>{site.xHandle}</NavLink>
          <NavLink href='/rss.xml'>rss</NavLink>
          <NavLink href='/design-system'>design system</NavLink>
        </p>
      </div>
    </footer>
  );
}
