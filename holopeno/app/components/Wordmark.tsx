import { tildeWavePath } from '@/lib/tilde';

type WordmarkProps = {
  className?: string;
};

// "holopeño" set in heavy mono. The ñ is an n with an SVG tilde that glitches like a bad hologram.
export function Wordmark({ className }: WordmarkProps) {
  const wave = tildeWavePath(24, 8);
  return (
    <span className={`inline-flex items-baseline font-mono font-extrabold tracking-tight ${className ?? ''}`} aria-label='holopeño'>
      <span aria-hidden='true'>holope</span>
      <span aria-hidden='true' className='relative inline-block'>
        n
        <svg
          viewBox='-2 -3 28 14'
          className='tilde-wave pointer-events-none absolute left-[4%] top-[-0.04em] h-[0.3em] w-[92%] overflow-visible'
          fill='none'
        >
          <path d={wave} className='tilde-ghost' stroke='#C6F432' strokeWidth='2.6' strokeLinecap='square' />
          <path d={wave} stroke='currentColor' strokeWidth='2.6' strokeLinecap='square' />
        </svg>
      </span>
      <span aria-hidden='true'>o</span>
    </span>
  );
}
