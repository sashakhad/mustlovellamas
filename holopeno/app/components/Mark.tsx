import { color } from '../../design/tokens';
import { ogFontFamily } from '../../lib/og';
import { Tilde } from './Tilde';
import { tildePlacement } from '../../lib/tilde';

type MarkProps = {
  size: number;
};

// The square app mark: a lone ñ on char. Used for favicons and touch icons via next/og.
export function Mark({ size }: MarkProps) {
  const glyph = size * 0.92;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: color.char,
        fontFamily: ogFontFamily,
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          fontSize: glyph,
          lineHeight: 1,
          color: color.bone,
          marginTop: size * 0.12,
        }}
      >
        n
        <Tilde
          mainColor={color.bone}
          ghostColor={color.seed}
          scanlines={glyph > 48}
          width={glyph * tildePlacement.width}
          height={glyph * tildePlacement.height}
          style={{
            position: 'absolute',
            left: glyph * tildePlacement.left,
            top: glyph * tildePlacement.top,
          }}
        />
      </div>
    </div>
  );
}
