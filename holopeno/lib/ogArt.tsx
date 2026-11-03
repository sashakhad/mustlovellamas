import { ogColors } from '@/lib/og';
import { tildeWavePath } from '@/lib/tilde';

// JetBrains Mono advance width is 0.6em, so the n's position is exact.
const ADVANCE = 0.6;

// The doubled, offset tilde wave, placed over character `index` of a mono word set at `fontSize`.
export function TildeOverlay({ fontSize, index, top }: { fontSize: number; index: number; top: number }) {
  const width = fontSize * ADVANCE * 0.9;
  const height = width * 0.5;
  const wave = tildeWavePath(24, 8);
  return (
    <svg
      width={width}
      height={height}
      viewBox='-2 -3 28 14'
      style={{ position: 'absolute', left: fontSize * ADVANCE * (index + 0.05), top }}
    >
      <path d={wave} fill='none' stroke={ogColors.seed} strokeWidth={2.8} transform='translate(1.2,-1.2)' />
      <path d={wave} fill='none' stroke={ogColors.bone} strokeWidth={2.8} />
    </svg>
  );
}
