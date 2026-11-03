import { site, xProfileUrl } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className='border-t border-line'>
      <div className='mx-auto flex max-w-3xl flex-wrap justify-between gap-2 px-5 py-8 font-mono text-xs text-ash'>
        <p>
          {site.name} · by {site.author} · scoville: high
        </p>
        <p className='flex gap-4'>
          <a href={xProfileUrl()} className='hover:text-seed'>
            {site.xHandle}
          </a>
          <a href='/rss.xml' className='hover:text-seed'>
            rss
          </a>
        </p>
      </div>
    </footer>
  );
}
