import { cn } from '../../lib/cn';

type TagProps = {
  label: string;
  className?: string;
};

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-nick border border-line px-1.5 font-mono text-micro lowercase text-ash',
        className
      )}
    >
      #{label.toLowerCase()}
    </span>
  );
}
