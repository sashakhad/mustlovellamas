import Link from 'next/link';
import type { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const navLinkClass =
  'text-ash underline decoration-transparent decoration-2 transition-colors duration-snap ease-snap hover:text-holo hover:decoration-holo';

function isDocumentHref(href: string): boolean {
  return href.startsWith('http') || href.endsWith('.xml');
}

export function NavLink({ href, children }: NavLinkProps) {
  if (isDocumentHref(href)) {
    return (
      <a href={href} className={navLinkClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={navLinkClass}>
      {children}
    </Link>
  );
}
