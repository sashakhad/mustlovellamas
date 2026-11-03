import { Kicker } from './Kicker';
import type { GroupedPosts } from '../../lib/posts';
import { cn } from '../../lib/utils';

type ArchiveNavProps = {
  groupedPosts: GroupedPosts;
  activeFilter: string;
  onSelect: (value: string) => void;
};

export function ArchiveNav({ groupedPosts, activeFilter, onSelect }: ArchiveNavProps) {
  const years = Object.keys(groupedPosts).sort(function newestFirst(a, b) {
    return Number(b) - Number(a);
  });

  return (
    <nav aria-label='archive'>
      <Kicker as='h2'>archive</Kicker>
      <div className='mt-4 space-y-5'>
        {years.map(function renderYear(year) {
          const months = groupedPosts[year];
          if (!months) {
            return null;
          }
          return (
            <div key={year}>
              <p className='font-mono text-meta font-extrabold text-bone'>{year}</p>
              <ul className='mt-2 space-y-1 border-l border-line pl-3'>
                {Object.keys(months).map(function renderMonth(month) {
                  const count = months[month]?.length ?? 0;
                  const value = `date:${year}-${month}`;
                  const isActive = activeFilter === value;
                  return (
                    <li key={month}>
                      <button
                        type='button'
                        aria-pressed={isActive}
                        onClick={function selectMonth() {
                          onSelect(isActive ? '' : value);
                        }}
                        className={cn(
                          'font-mono text-meta lowercase transition-colors duration-snap',
                          isActive ? 'text-seed' : 'text-ash hover:text-bone'
                        )}
                      >
                        {month} <span className='text-smoke'>[{count}]</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
