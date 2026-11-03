import type { ReactNode } from 'react';
import type { HeatLevel } from './heat';
import { OgGlyphs } from './ogArt';
import { palette } from './tokens';

export const ogSize = { width: 1200, height: 630 } as const;

type OgFrameProps = {
  eyebrow: string;
  children: ReactNode;
  footer: ReactNode;
};

// Shared 1200x630 frame: char field, faint scanlines, 2px holo rule on the left edge.
export function OgFrame({ eyebrow, children, footer }: OgFrameProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: palette.char,
        backgroundImage: `repeating-linear-gradient(0deg, ${palette.soot} 0px, ${palette.soot} 2px, ${palette.char} 2px, ${palette.char} 6px)`,
        borderLeft: `8px solid ${palette.holo}`,
        padding: '64px 72px',
        fontFamily: 'JetBrains Mono',
        color: palette.bone,
      }}
    >
      <div
        style={{
          display: 'flex',
          color: palette.jalapeno,
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: 3,
        }}
      >
        {`/${eyebrow}`}
      </div>
      {children}
      {footer}
    </div>
  );
}

type OgHeatProps = { level: HeatLevel };

export function OgHeat({ level }: OgHeatProps) {
  const cells: boolean[] = [];
  for (let i = 1; i <= 5; i += 1) {
    cells.push(i <= level);
  }
  const fill = level === 5 ? palette.ripe : palette.jalapeno;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {cells.map((on, index) => (
        <div
          key={index}
          style={{ display: 'flex', width: 12, height: 22, background: on ? fill : palette.line }}
        />
      ))}
    </div>
  );
}

type OgSignatureProps = { fontSize: number };

export function OgSignature({ fontSize }: OgSignatureProps) {
  return <OgGlyphs fontSize={fontSize} text='holopeno' tildeIndex={6} />;
}
