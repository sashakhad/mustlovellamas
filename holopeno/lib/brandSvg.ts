import opentype from 'opentype.js';
import { loadExtraBoldFontPath } from './og';
import { monoAdvance, tildePlacement, tildeViewBox, wordmarkTracking } from './tilde';
import { tildeLayers } from './tildeSvg';
import { palette } from './tokens';

export const brandAssets = [
  'wordmark.svg',
  'wordmark-light.svg',
  'mark.svg',
  'mark-light.svg',
] as const;

export type BrandAsset = (typeof brandAssets)[number];

export function isBrandAsset(value: string): value is BrandAsset {
  return brandAssets.some(asset => asset === value);
}

type Scheme = { background: string; ink: string; ghost: string };

const dark: Scheme = { background: palette.char, ink: palette.bone, ghost: palette.holo };
// holo vanishes on bone, so the light scheme projects the ghost in deep jalapeño instead.
const light: Scheme = { background: palette.bone, ink: palette.char, ghost: palette.skin };

const em = 100;
const baseline = 0.86 * em;
const pad = 0.16 * em;

function outline(font: opentype.Font, text: string, tracking: number): string {
  const step = (monoAdvance + tracking) * em;
  const paths: string[] = [];
  for (let i = 0; i < text.length; i += 1) {
    const glyph = font.charToGlyph(text.charAt(i));
    paths.push(glyph.getPath(i * step, baseline, em).toPathData(2));
  }
  return paths.join('');
}

function tildeAt(index: number, tracking: number, scheme: Scheme, idPrefix: string): string {
  const step = (monoAdvance + tracking) * em;
  const x = index * step + tildePlacement.left * em;
  const y = tildePlacement.top * em;
  const { x: vx, y: vy, width: vw, height: vh } = tildeViewBox;
  return `<svg x="${x}" y="${y}" width="${tildePlacement.width * em}" height="${tildePlacement.height * em}" viewBox="${vx} ${vy} ${vw} ${vh}" overflow="visible">${tildeLayers({ ink: scheme.ink, ghost: scheme.ghost, tear: true, idPrefix })}</svg>`;
}

function frame(width: number, height: number, scheme: Scheme, body: string, title: string): string {
  const w = width + pad * 2;
  const h = height + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * 4}" height="${h * 4}" role="img" aria-label="${title}"><title>${title}</title><rect width="${w}" height="${h}" fill="${scheme.background}"/><g transform="translate(${pad} ${pad})">${body}</g></svg>`;
}

export function renderBrandAsset(asset: BrandAsset): string {
  const font = opentype.loadSync(loadExtraBoldFontPath());
  const scheme = asset.endsWith('-light.svg') ? light : dark;

  if (asset.startsWith('mark')) {
    // Center the n plus tilde (0.04em to the 0.86em baseline) in a square.
    const offsetX = ((1 - monoAdvance) / 2) * em;
    const offsetY = 0.05 * em;
    const glyphs = `<g transform="translate(${offsetX} ${offsetY})"><path d="${outline(font, 'n', 0)}" fill="${scheme.ink}"/>${tildeAt(0, 0, scheme, 'mark')}</g>`;
    return frame(em, em, scheme, glyphs, 'ñ');
  }

  const text = 'holopeno';
  const width = ((text.length - 1) * (monoAdvance + wordmarkTracking) + monoAdvance) * em;
  const glyphs = `<path d="${outline(font, text, wordmarkTracking)}" fill="${scheme.ink}"/>${tildeAt(6, wordmarkTracking, scheme, 'wordmark')}`;
  return frame(width, 1.1 * em, scheme, glyphs, 'holopeño');
}
