import { site } from '../../lib/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-line'>
      <div className='mx-auto flex max-w-page flex-col gap-2 px-5 py-8 font-mono text-micro text-ash sm:flex-row sm:items-center sm:justify-between'>
        <p>
          © {year} {site.author} · {site.name}
        </p>
        <p>no hallucinations were knowingly published.</p>
      </div>
    </footer>
  );
}
