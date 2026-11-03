import fs from 'fs';
import path from 'path';

type OgFont = {
  name: string;
  data: Buffer;
  weight: 800;
  style: 'normal';
};

export const ogFontFamily = 'JetBrains Mono';

export function loadOgFonts(): OgFont[] {
  const data = fs.readFileSync(
    path.join(process.cwd(), 'assets/fonts/JetBrainsMono-ExtraBold.ttf')
  );
  return [{ name: ogFontFamily, data, weight: 800, style: 'normal' }];
}
