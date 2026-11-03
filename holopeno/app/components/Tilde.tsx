import type { CSSProperties, ReactElement } from 'react';
import { color } from '../../design/tokens';
import {
  scanlineFill,
  scanlinesPerCell,
  tearRow,
  tildeCells,
  tildeGrid,
  tildePad,
  type TildeCell,
} from '../../lib/tilde';

type TildeProps = {
  mainColor?: string;
  ghostColor?: string;
  animated?: boolean;
  scanlines?: boolean;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
};

const ghostOffset = { x: 0.34, y: 0 };

function renderCells(
  cells: readonly TildeCell[],
  fill: string,
  prefix: string,
  lines: number
): ReactElement[] {
  const bars: ReactElement[] = [];
  const barPitch = 1 / lines;
  const fillRatio = lines > 1 ? scanlineFill : 1;
  for (const cell of cells) {
    for (let line = 0; line < lines; line += 1) {
      bars.push(
        <rect
          key={`${prefix}-${cell.x}-${cell.y}-${line}`}
          x={cell.x}
          y={cell.y + line * barPitch}
          width={1}
          height={barPitch * fillRatio}
          fill={fill}
        />
      );
    }
  }
  return bars;
}

function splitTear(cells: readonly TildeCell[]): { body: TildeCell[]; tear: TildeCell[] } {
  const body: TildeCell[] = [];
  const tear: TildeCell[] = [];
  for (const cell of cells) {
    if (cell.y === tearRow) {
      tear.push(cell);
    } else {
      body.push(cell);
    }
  }
  return { body, tear };
}

// Scanlines only survive at display sizes; pass scanlines={false} below ~48px.
// Works in the DOM and inside next/og (Satori), so it only uses attributes Satori understands.
export function Tilde({
  mainColor = 'currentColor',
  ghostColor = color.seed,
  animated = false,
  scanlines = true,
  className,
  style,
  width,
  height,
}: TildeProps) {
  const { body, tear } = splitTear(tildeCells);
  const lines = scanlines ? scanlinesPerCell : 1;
  const viewBox = `${-tildePad} ${-tildePad} ${tildeGrid.cols + tildePad * 2} ${tildeGrid.rows + tildePad * 2}`;

  return (
    <svg
      viewBox={viewBox}
      aria-hidden='true'
      shapeRendering='crispEdges'
      overflow='visible'
      {...(className ? { className } : {})}
      {...(style ? { style } : {})}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
    >
      <g
        transform={`translate(${ghostOffset.x} ${ghostOffset.y})`}
        {...(animated ? { className: 'holo-ghost' } : {})}
      >
        {renderCells(tildeCells, ghostColor, 'ghost', lines)}
      </g>
      {renderCells(body, mainColor, 'body', lines)}
      <g {...(animated ? { className: 'holo-tear' } : {})}>
        {renderCells(tear, mainColor, 'tear', lines)}
      </g>
    </svg>
  );
}
