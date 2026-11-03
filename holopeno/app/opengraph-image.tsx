import { ImageResponse } from 'next/og';
import { loadOgFonts } from '../lib/og';
import { OgFrame, OgSignature, ogSize } from '../lib/ogCard';
import { site } from '../lib/site';
import { palette } from '../lib/tokens';

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <OgFrame
        eyebrow='scoville: high'
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 30,
            }}
          >
            <div style={{ display: 'flex', color: palette.ash, fontWeight: 400 }}>
              {site.tagline}
            </div>
            <div style={{ display: 'flex', width: 28, height: 28, background: palette.holo }} />
          </div>
        }
      >
        <OgSignature fontSize={196} />
      </OgFrame>
    ),
    { ...size, fonts: loadOgFonts() }
  );
}
