import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type KickerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

// Section label in the terminal-comment voice: "// posts".
export function Kicker({ children, as: Component = 'p', className }: KickerProps) {
  return (
    <Component className={cn('font-mono text-micro text-ash', className)}>
      <span aria-hidden='true' className='text-pepper'>
        {'// '}
      </span>
      {children}
    </Component>
  );
}
