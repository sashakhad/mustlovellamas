import type { CSSProperties } from 'react';
import { site } from '../../lib/site';
import { tildePlacement } from '../../lib/tilde';
import { cn } from '../../lib/utils';
import { Tilde } from './Tilde';

type WordmarkProps = {
  className?: string;
  animated?: boolean;
  scanlines?: boolean;
};

const tildeStyle: CSSProperties = {
  left: `${tildePlacement.left}em`,
  top: `${tildePlacement.top}em`,
  width: `${tildePlacement.width}em`,
  height: `${tildePlacement.height}em`,
};

// The ñ is a plain "n" with the pixel tilde laid over it, so the mark scales with font-size alone.
export function Wordmark({ className, animated = true, scanlines = true }: WordmarkProps) {
  return (
    <span
      role='img'
      aria-label={site.name}
      className={cn('inline-flex font-mono font-extrabold leading-none tracking-tight', className)}
    >
      <span aria-hidden='true'>holope</span>
      <span aria-hidden='true' className='relative inline-block'>
        n
        <Tilde
          animated={animated}
          scanlines={scanlines}
          className='pointer-events-none absolute'
          style={tildeStyle}
        />
      </span>
      <span aria-hidden='true'>o</span>
    </span>
  );
}
