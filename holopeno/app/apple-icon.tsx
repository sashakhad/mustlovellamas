import { ImageResponse } from 'next/og';
import { loadMonoFont, ogColors } from '@/lib/og';
import { TildeOverlay } from '@/lib/ogArt';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: ogColors.char,
          fontFamily: 'JetBrains Mono',
        }}
      >
        <div style={{ display: 'flex', position: 'relative', color: ogColors.bone, fontSize: 180 * 0.9, lineHeight: 1.2 }}>
          <div style={{ display: 'flex' }}>n</div>
          <TildeOverlay fontSize={180 * 0.9} index={0} top={180 * 0.9 * 0.12} />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'JetBrains Mono', data: loadMonoFont(), weight: 800, style: 'normal' }] },
  );
}
