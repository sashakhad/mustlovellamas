// The ñ tilde: one sine wave, drawn twice and offset like a flickering hologram.
export function tildeWavePath(width: number, height: number): string {
  const mid = height / 2;
  const amp = height * 0.32;
  const q = width / 4;
  return `M0 ${mid} C ${q * 0.6} ${mid - amp * 2}, ${q * 1.4} ${mid - amp * 2}, ${q * 2} ${mid} S ${q * 3.4} ${mid + amp * 2}, ${width} ${mid}`;
}
