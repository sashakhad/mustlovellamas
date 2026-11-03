// The ñ tilde, drawn as a low-res hologram: a 6×2 pixel wave, each pixel split into scanlines.
// Every surface (wordmark, mark, favicon, OG) renders from these cells so the glyph never drifts.

export type TildeCell = {
  x: number;
  y: number;
};

export const tildeGrid = {
  cols: 6,
  rows: 2,
} as const;

// .##..#
// #..##.
const pattern: readonly string[] = ['.##..#', '#..##.'];

function buildCells(rows: readonly string[]): TildeCell[] {
  const cells: TildeCell[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    const row = rows[y] ?? '';
    for (let x = 0; x < row.length; x += 1) {
      if (row[x] === '#') {
        cells.push({ x, y });
      }
    }
  }
  return cells;
}

export const tildeCells: readonly TildeCell[] = buildCells(pattern);

// Each pixel is drawn as this many horizontal bars; the gaps read as hologram scanlines.
export const scanlinesPerCell = 2;
export const scanlineFill = 0.8;

// The row that tears sideways when the hologram glitches.
export const tearRow = 0;

// Padding (in cells) around the grid inside the SVG viewBox, so ghost offsets never clip.
export const tildePad = 1;

// Placement over a JetBrains Mono ExtraBold "n" at line-height 1, in em of the font size.
// The grid is 0.6em wide, exactly one monospace advance.
export const tildePlacement = {
  left: -0.1,
  top: -0.08,
  width: 0.8,
  height: 0.4,
} as const;
