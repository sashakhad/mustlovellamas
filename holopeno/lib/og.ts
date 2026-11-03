import fs from 'fs';
import path from 'path';

export type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 800;
  style: 'normal';
};

const fontDirectory = path.join(process.cwd(), 'assets/fonts');

export function loadOgFonts(): OgFont[] {
  return [
    {
      name: 'JetBrains Mono',
      data: fs.readFileSync(path.join(fontDirectory, 'JetBrainsMono-ExtraBold.ttf')),
      weight: 800,
      style: 'normal',
    },
    {
      name: 'JetBrains Mono',
      data: fs.readFileSync(path.join(fontDirectory, 'JetBrainsMono-Regular.ttf')),
      weight: 400,
      style: 'normal',
    },
  ];
}

export function loadExtraBoldFontPath(): string {
  return path.join(fontDirectory, 'JetBrainsMono-ExtraBold.ttf');
}
