import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { site } from '../../lib/site';
import { tildePlacement, wordmarkTracking } from '../../lib/tilde';
import { TildeWave } from './TildeWave';

type WordmarkProps = {
  className?: string;
  animated?: boolean;
};

export const tildeStyle: CSSProperties = {
  left: `${tildePlacement.left}em`,
  top: `${tildePlacement.top}em`,
  width: `${tildePlacement.width}em`,
  height: `${tildePlacement.height}em`,
};

// "holopeño" in JetBrains Mono ExtraBold. The ñ is a plain n wearing the hologram tilde.
export function Wordmark({ className, animated = true }: WordmarkProps) {
  return (
    <span
      role='img'
      aria-label={site.name}
      className={cn('inline-flex items-baseline font-mono font-extrabold leading-none', className)}
      style={{ letterSpacing: `${wordmarkTracking}em` }}
    >
      <span aria-hidden='true'>holope</span>
      <span aria-hidden='true' className='relative inline-block'>
        n
        <TildeWave
          animated={animated}
          className='pointer-events-none absolute overflow-visible'
          style={tildeStyle}
        />
      </span>
      <span aria-hidden='true'>o</span>
    </span>
  );
}
