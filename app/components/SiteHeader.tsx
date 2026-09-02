import Link from 'next/link';
import { LlamaMark } from '@/app/components/LlamaMark';

export function SiteHeader() {
  return (
    <header className='border-b border-wool'>
      <div className='mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5'>
        <Link href='/' className='flex items-center gap-3 text-ink hover:text-accent'>
          <LlamaMark className='h-10 w-10 shrink-0' />
          <span className='font-display text-2xl tracking-tight'>
            Must Love <span className='italic'>LLaMas</span>
          </span>
        </Link>
        <nav className='flex items-center gap-5 text-sm text-muted'>
          <Link href='/about' className='hover:text-ink'>
            About
          </Link>
          <Link href='/rss.xml' className='hover:text-ink'>
            RSS
          </Link>
        </nav>
      </div>
    </header>
  );
}
