import { ImageResponse } from 'next/og';
import { OgCard } from './components/OgCard';
import { loadOgFonts } from '../lib/og';
import { site } from '../lib/site';

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(<OgCard kicker='// scoville: high' footer={site.tagline} />, {
    ...size,
    fonts: loadOgFonts(),
  });
}
