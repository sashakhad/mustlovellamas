import { color } from '../../design/tokens';
import { ogFontFamily } from '../../lib/og';
import { OgWordmark } from './OgWordmark';

type OgCardProps = {
  kicker: string;
  title?: string;
  footer: string;
};

// 1200×630 card for next/og. With a title it is a post card; without one the wordmark is the hero.
export function OgCard({ kicker, title, footer }: OgCardProps) {
  const isPost = typeof title === 'string' && title.length > 0;
  const titleSize = isPost && title.length > 48 ? 64 : 80;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: color.char,
        color: color.bone,
        padding: 72,
        fontFamily: ogFontFamily,
        borderLeft: `16px solid ${color.pepper}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 26,
          letterSpacing: 4,
          color: color.ash,
        }}
      >
        {isPost ? <OgWordmark fontSize={48} /> : <div style={{ display: 'flex' }}>{kicker}</div>}
        {isPost ? <div style={{ display: 'flex' }}>{kicker}</div> : null}
      </div>

      {isPost ? (
        <div
          style={{
            display: 'flex',
            fontSize: titleSize,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      ) : (
        <OgWordmark fontSize={176} />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 28,
          color: color.ash,
        }}
      >
        <div style={{ display: 'flex' }}>{footer}</div>
        <div style={{ display: 'flex', width: 28, height: 28, background: color.seed }} />
      </div>
    </div>
  );
}
