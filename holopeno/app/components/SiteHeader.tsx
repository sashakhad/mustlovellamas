import Link from 'next/link';
import { Wordmark } from './Wordmark';

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: '/', label: 'posts' },
  { href: '/about', label: 'about' },
  { href: '/rss.xml', label: 'rss' },
];

export function SiteHeader() {
  return (
    <header className='border-b border-line'>
      <div className='mx-auto flex max-w-page items-center justify-between gap-6 px-5 py-6'>
        <Link href='/' className='text-bone transition-colors duration-quick hover:text-seed'>
          <Wordmark className='text-[1.75rem] sm:text-[2rem]' scanlines={false} />
        </Link>
        <nav aria-label='main' className='flex items-center gap-5 font-mono text-meta text-ash'>
          {navItems.map(function renderNavItem(item) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className='transition-colors duration-quick hover:text-seed'
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
