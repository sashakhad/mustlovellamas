import { cn } from '../../lib/cn';
import { TildeWave } from './TildeWave';
import { tildeStyle } from './Wordmark';

type MarkProps = {
  className?: string;
  animated?: boolean;
};

// The ñ on its own: favicon, avatar, sign-off. Always bone on char, never boxed in green.
export function Mark({ className, animated = false }: MarkProps) {
  return (
    <span
      role='img'
      aria-label='ñ'
      className={cn(
        'inline-flex aspect-square items-center justify-center bg-char font-mono font-extrabold leading-none text-bone',
        className
      )}
    >
      <span aria-hidden='true' className='relative inline-block'>
        n
        <TildeWave
          animated={animated}
          className='pointer-events-none absolute overflow-visible'
          style={tildeStyle}
        />
      </span>
    </span>
  );
}
