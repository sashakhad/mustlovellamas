import { color } from '../../design/tokens';
import { Tilde } from './Tilde';
import { tildePlacement } from '../../lib/tilde';

type OgWordmarkProps = {
  fontSize: number;
  textColor?: string;
};

// Satori version of <Wordmark />: same em offsets, expressed in pixels.
export function OgWordmark({ fontSize, textColor = color.bone }: OgWordmarkProps) {
  return (
    <div style={{ display: 'flex', fontSize, lineHeight: 1, color: textColor, letterSpacing: 0 }}>
      <div style={{ display: 'flex' }}>holope</div>
      <div style={{ display: 'flex', position: 'relative' }}>
        n
        <Tilde
          mainColor={textColor}
          ghostColor={color.seed}
          scanlines={fontSize > 48}
          width={fontSize * tildePlacement.width}
          height={fontSize * tildePlacement.height}
          style={{
            position: 'absolute',
            left: fontSize * tildePlacement.left,
            top: fontSize * tildePlacement.top,
          }}
        />
      </div>
      <div style={{ display: 'flex' }}>o</div>
    </div>
  );
}
