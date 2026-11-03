import { ImageResponse } from 'next/og';
import { Mark } from './components/Mark';
import { loadOgFonts } from '../lib/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon(): ImageResponse {
  return new ImageResponse(<Mark size={size.width} />, { ...size, fonts: loadOgFonts() });
}
