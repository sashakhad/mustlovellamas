import { cn } from '../../lib/cn';
import { heatLabels, type HeatLevel } from '../../lib/heat';

type HeatMeterProps = {
  level: HeatLevel;
  showLabel?: boolean;
  className?: string;
};

// Scoville rating for a post: how spicy the take is. Five cells; level 5 goes ripe red.
export function HeatMeter({ level, showLabel = false, className }: HeatMeterProps) {
  const cells: boolean[] = [];
  for (let i = 1; i <= 5; i += 1) {
    cells.push(i <= level);
  }
  const fill = level === 5 ? 'bg-ripe' : 'bg-jalapeno';

  return (
    <span
      className={cn('inline-flex items-center gap-2 font-mono text-micro text-ash', className)}
      title={`heat ${level}/5: ${heatLabels[level]}`}
    >
      <span className='sr-only'>{`heat ${level} of 5`}</span>
      <span aria-hidden='true' className='inline-flex gap-0.5'>
        {cells.map((on, index) => (
          <span key={index} className={cn('h-2.5 w-1.5', on ? fill : 'bg-line')} />
        ))}
      </span>
      {showLabel ? <span aria-hidden='true'>{heatLabels[level]}</span> : null}
    </span>
  );
}
