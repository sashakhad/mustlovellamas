import { ImageResponse } from 'next/og';
import { loadMonoFont, ogColors } from '@/lib/og';
import { TildeOverlay } from '@/lib/ogArt';
import { site } from '@/lib/site';

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const glyph = 168;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: ogColors.char,
          padding: 72,
          fontFamily: 'JetBrains Mono',
        }}
      >
        <div style={{ display: 'flex', color: ogColors.pepper, fontSize: 28, letterSpacing: 6 }}>scoville: high</div>
        <div style={{ display: 'flex', position: 'relative', color: ogColors.bone, fontSize: glyph, lineHeight: 1.2 }}>
          <div style={{ display: 'flex' }}>holopeno</div>
          <TildeOverlay fontSize={glyph} index={6} top={glyph * 0.12} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 30, color: ogColors.ash }}>
          <div style={{ display: 'flex' }}>{site.tagline}</div>
          <div style={{ display: 'flex', width: 28, height: 28, background: ogColors.seed }} />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'JetBrains Mono', data: loadMonoFont(), weight: 800, style: 'normal' }] },
  );
}
