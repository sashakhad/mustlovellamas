import { palette } from './tokens';
import {
  ghostOffset,
  scanlineBands,
  tearBand,
  tildeViewBox,
  tildeWave,
  tildeWavePath,
} from './tilde';

export type TildeSvgOptions = {
  ink?: string;
  ghost?: string;
  // Freeze the tear mid-glitch. Stills (og, icons) use this so the glitch reads without motion.
  tear?: boolean;
  scanlines?: boolean;
  idPrefix?: string;
};

// The tilde's layers as raw svg markup in tilde viewBox units. Callers wrap or translate it.
export function tildeLayers({
  ink = palette.bone,
  ghost = palette.holo,
  tear = true,
  scanlines = true,
  idPrefix = 'holo',
}: TildeSvgOptions = {}): string {
  const wave = tildeWavePath();
  const stroke = `stroke-width="${tildeWave.strokeWidth}" stroke-linecap="square" fill="none"`;
  const { x, y, width, height } = tildeViewBox;
  const bands: string[] = [];
  for (const band of scanlineBands()) {
    bands.push(
      `<rect x="${x}" y="${band.y}" width="${width}" height="${band.height}" fill="#fff"/>`
    );
  }

  const parts: string[] = [];
  if (scanlines) {
    parts.push(
      `<defs><mask id="${idPrefix}-scan" maskUnits="userSpaceOnUse" x="${x}" y="${y}" width="${width}" height="${height}">${bands.join('')}</mask></defs>`
    );
  }
  parts.push(
    `<path d="${wave}" stroke="${ghost}" ${stroke} transform="translate(${ghostOffset.x} ${ghostOffset.y})"${scanlines ? ` mask="url(#${idPrefix}-scan)"` : ''}/>`
  );
  parts.push(`<path d="${wave}" stroke="${ink}" ${stroke}/>`);
  if (tear) {
    parts.push(
      `<defs><clipPath id="${idPrefix}-tear"><rect x="${x}" y="${tearBand.y}" width="${width}" height="${tearBand.height}"/></clipPath></defs>`
    );
    parts.push(
      `<g clip-path="url(#${idPrefix}-tear)"><path d="${wave}" stroke="${ghost}" ${stroke} transform="translate(${tearBand.shift} 0)"/></g>`
    );
  }
  return parts.join('');
}

export function tildeSvg(options: TildeSvgOptions = {}): string {
  const { x, y, width, height } = tildeViewBox;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${width} ${height}" width="${width * 10}" height="${height * 10}">${tildeLayers(options)}</svg>`;
}

export function svgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
