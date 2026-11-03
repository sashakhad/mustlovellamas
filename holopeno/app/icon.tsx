import { ImageResponse } from 'next/og';
import { Mark } from './components/Mark';
import { loadOgFonts } from '../lib/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon(): ImageResponse {
  return new ImageResponse(<Mark size={size.width} />, { ...size, fonts: loadOgFonts() });
}
