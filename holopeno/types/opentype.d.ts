// Only the slice of opentype.js that lib/brandSvg.ts uses. Declared locally (instead of @types/opentype.js)
// so a parent project that type-checks this directory without installing its dependencies still passes.
declare module 'opentype.js' {
  export interface Path {
    toPathData(decimalPlaces?: number): string;
  }

  export interface Glyph {
    getPath(x: number, y: number, fontSize: number): Path;
  }

  export interface Font {
    charToGlyph(char: string): Glyph;
  }

  export function loadSync(path: string): Font;

  const opentype: { loadSync: typeof loadSync };
  export default opentype;
}
