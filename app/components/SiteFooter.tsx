import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className='border-t border-wool'>
      <div className='mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between'>
        <p>
          {site.name} · {site.author}
        </p>
        <p>MDX posts, Next.js, Vercel.</p>
      </div>
    </footer>
  );
}
