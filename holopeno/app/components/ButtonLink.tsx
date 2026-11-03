import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'solid' | 'outline' | 'bare';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: 'bg-holo px-4 py-2 text-char hover:bg-bone',
  outline: 'border border-line px-4 py-2 text-bone hover:border-holo hover:text-holo',
  bare: 'py-2 text-ash hover:text-holo',
};

// Square, mono, lowercase. There is no rounded or pill variant on purpose.
export function ButtonLink({ href, children, variant = 'outline', className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 font-mono text-small font-bold lowercase transition-colors duration-snap ease-snap',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
