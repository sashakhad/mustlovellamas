type HeatProps = {
  minutes: number;
};

const levels = 5;
const minutesPerLevel = 3;

// Reading time as a scoville meter. One pip per ~3 minutes, capped at five.
export function Heat({ minutes }: HeatProps) {
  const lit = Math.min(levels, Math.max(1, Math.ceil(minutes / minutesPerLevel)));
  const pips: boolean[] = [];
  for (let index = 0; index < levels; index += 1) {
    pips.push(index < lit);
  }

  return (
    <span className='inline-flex items-center gap-2 font-mono text-meta text-ash'>
      <span aria-hidden='true' className='inline-flex gap-[3px]'>
        {pips.map(function renderPip(isLit, index) {
          return (
            <span key={index} className={isLit ? 'h-2.5 w-1.5 bg-seed' : 'h-2.5 w-1.5 bg-line'} />
          );
        })}
      </span>
      <span>{minutes} min</span>
    </span>
  );
}
