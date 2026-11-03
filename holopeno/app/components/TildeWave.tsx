import { useId, type CSSProperties } from 'react';
import { palette } from '../../lib/tokens';
import {
  ghostOffset,
  scanlineBands,
  tearBand,
  tildeViewBox,
  tildeViewBoxAttr,
  tildeWave,
  tildeWavePath,
} from '../../lib/tilde';

type TildeWaveProps = {
  className?: string;
  style?: CSSProperties;
  animated?: boolean;
};

export function TildeWave({ className, style, animated = true }: TildeWaveProps) {
  const id = useId().replace(/:/g, '');
  const scanId = `scan-${id}`;
  const tearId = `tear-${id}`;
  const wave = tildeWavePath();

  return (
    <svg
      viewBox={tildeViewBoxAttr()}
      className={className}
      style={style}
      fill='none'
      aria-hidden='true'
      focusable='false'
      overflow='visible'
    >
      <defs>
        <mask id={scanId} maskUnits='userSpaceOnUse'>
          {scanlineBands().map(band => (
            <rect
              key={band.y}
              x={tildeViewBox.x}
              y={band.y}
              width={tildeViewBox.width}
              height={band.height}
              fill='#fff'
            />
          ))}
        </mask>
        <clipPath id={tearId}>
          <rect
            x={tildeViewBox.x}
            y={tearBand.y}
            width={tildeViewBox.width}
            height={tearBand.height}
          />
        </clipPath>
      </defs>
      <g mask={`url(#${scanId})`}>
        <path
          d={wave}
          className={animated ? 'tilde-ghost' : undefined}
          transform={`translate(${ghostOffset.x} ${ghostOffset.y})`}
          stroke={palette.holo}
          strokeWidth={tildeWave.strokeWidth}
          strokeLinecap='square'
        />
      </g>
      <path
        d={wave}
        stroke='currentColor'
        strokeWidth={tildeWave.strokeWidth}
        strokeLinecap='square'
      />
      {animated ? (
        <g clipPath={`url(#${tearId})`}>
          <path
            d={wave}
            className='tilde-tear'
            stroke={palette.holo}
            strokeWidth={tildeWave.strokeWidth}
            strokeLinecap='square'
          />
        </g>
      ) : null}
    </svg>
  );
}
