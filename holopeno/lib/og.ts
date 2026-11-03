import fs from 'fs';
import path from 'path';

export const ogColors = {
  char: '#0B0B0A',
  bone: '#F2EFE6',
  ash: '#9A968C',
  pepper: '#3E7A1F',
  seed: '#C6F432',
} as const;

export function loadMonoFont(): Buffer {
  return fs.readFileSync(path.join(process.cwd(), 'assets/fonts/JetBrainsMono-ExtraBold.ttf'));
}

export { tildeWavePath } from '@/lib/tilde';
