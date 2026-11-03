import { cn } from '../../lib/utils';

type TagProps = {
  label: string;
  active?: boolean;
  onSelect?: (label: string) => void;
  className?: string;
};

// A hashtag. Interactive when given onSelect, otherwise plain text.
export function Tag({ label, active = false, onSelect, className }: TagProps) {
  const name = label.toLowerCase();

  if (!onSelect) {
    return (
      <span className={cn('font-mono text-meta text-ash', className)}>
        <span className='text-pepper'>#</span>
        {name}
      </span>
    );
  }

  return (
    <button
      type='button'
      aria-pressed={active}
      onClick={function selectTag() {
        onSelect(label);
      }}
      className={cn(
        'border px-2 py-0.5 font-mono text-meta transition duration-snap ease-out',
        active
          ? 'border-seed bg-seed text-char'
          : 'border-line text-ash hover:border-pepper hover:text-seed',
        className
      )}
    >
      #{name}
    </button>
  );
}
