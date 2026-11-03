// The ñ tilde, drawn as a hologram: one sine wave, a scanlined ghost that sits off-register,
// and a thin "tear" band that slips sideways when the projection glitches.
// Every renderer (web wordmark, og images, icons, /brand svgs) uses this geometry.

export const tildeViewBox = { x: -3, y: -4, width: 31, height: 16 } as const;

export const tildeWave = { width: 24, height: 8, strokeWidth: 4 } as const;

export const ghostOffset = { x: 1.6, y: -1.3 } as const;

export const tearBand = { y: 2.4, height: 2.2, shift: 3 } as const;

// Where the tilde sits over a JetBrains Mono "n" in a 1em line box (leading-none), in em.
// Matches the font's own ñ tilde band (0.065em to 0.22em from the top), drawn slightly wider.
export const tildePlacement = { left: 0.012, top: -0.02, width: 0.576, height: 0.297 } as const;

// Wordmark letter-spacing, in em. Mono advance is 0.6em, so each glyph steps 0.56em.
export const wordmarkTracking = -0.04;
export const monoAdvance = 0.6;

export type Band = { y: number; height: number };

export function tildeViewBoxAttr(): string {
  return `${tildeViewBox.x} ${tildeViewBox.y} ${tildeViewBox.width} ${tildeViewBox.height}`;
}

export function tildeWavePath(
  width: number = tildeWave.width,
  height: number = tildeWave.height
): string {
  const mid = height / 2;
  const amp = height * 0.64;
  const q = width / 4;
  return `M0 ${mid} C ${q * 0.6} ${mid - amp}, ${q * 1.4} ${mid - amp}, ${q * 2} ${mid} S ${q * 3.4} ${mid + amp}, ${width} ${mid}`;
}

// Horizontal scanlines across the whole viewBox. The ghost layer is masked by these.
export function scanlineBands(lineHeight: number = 1.1, gap: number = 0.7): Band[] {
  const bands: Band[] = [];
  const end = tildeViewBox.y + tildeViewBox.height;
  for (let y = tildeViewBox.y; y < end; y += lineHeight + gap) {
    bands.push({ y, height: lineHeight });
  }
  return bands;
}
