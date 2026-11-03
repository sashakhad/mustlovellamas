import { ImageResponse } from 'next/og';
import { loadOgFonts } from '../lib/og';
import { OgMark } from '../lib/ogArt';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon(): ImageResponse {
  return new ImageResponse(<OgMark size={size.width} />, { ...size, fonts: loadOgFonts() });
}
