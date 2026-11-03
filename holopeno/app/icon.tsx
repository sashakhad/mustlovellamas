import { ImageResponse } from 'next/og';
import { loadOgFonts } from '../lib/og';
import { OgMark } from '../lib/ogArt';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon(): ImageResponse {
  return new ImageResponse(<OgMark size={size.width} />, { ...size, fonts: loadOgFonts() });
}
