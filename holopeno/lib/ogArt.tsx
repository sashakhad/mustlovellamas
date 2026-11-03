import { monoAdvance, tildePlacement, wordmarkTracking } from './tilde';
import { svgDataUri, tildeSvg } from './tildeSvg';
import { palette } from './tokens';

type OgGlyphsProps = {
  fontSize: number;
  text: string;
  // Index of the n that wears the tilde.
  tildeIndex: number;
  ink?: string;
  tracking?: number;
};

// Mono text with the hologram tilde placed over one n, for next/og (satori) renders.
export function OgGlyphs({
  fontSize,
  text,
  tildeIndex,
  ink = palette.bone,
  tracking = wordmarkTracking,
}: OgGlyphsProps) {
  const step = (monoAdvance + tracking) * fontSize;
  const src = svgDataUri(tildeSvg({ ink, tear: true }));
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        color: ink,
        fontSize,
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: tracking * fontSize,
      }}
    >
      <div style={{ display: 'flex' }}>{text}</div>
      {/* eslint-disable-next-line @next/next/no-img-element -- satori only understands plain img */}
      <img
        src={src}
        alt=''
        width={tildePlacement.width * fontSize}
        height={tildePlacement.height * fontSize}
        style={{
          position: 'absolute',
          left: tildeIndex * step + tildePlacement.left * fontSize,
          top: tildePlacement.top * fontSize,
        }}
      />
    </div>
  );
}

type OgMarkProps = { size: number };

// The standalone ñ, centered on char. Used by the favicon and apple icon.
// The ink spans 0.06em (tilde crest) to 0.86em (baseline), so the box is nudged down to center it optically.
export function OgMark({ size }: OgMarkProps) {
  const fontSize = size * 0.95;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: palette.char,
        fontFamily: 'JetBrains Mono',
        paddingTop: fontSize * 0.093,
      }}
    >
      <OgGlyphs fontSize={fontSize} text='n' tildeIndex={0} tracking={0} />
    </div>
  );
}
