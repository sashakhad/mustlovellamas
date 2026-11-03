import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type SectionLabelProps = {
  children: ReactNode;
  as?: 'h2' | 'p';
  className?: string;
};

// The eyebrow: lowercase, tracked, jalapeño, prefixed with a slash like a path.
export function SectionLabel({ children, as = 'h2', className }: SectionLabelProps) {
  const Element = as;
  return (
    <Element
      className={cn(
        'font-mono text-micro font-bold lowercase tracking-[0.15em] text-jalapeno',
        className
      )}
    >
      /{children}
    </Element>
  );
}
