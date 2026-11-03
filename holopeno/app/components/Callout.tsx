import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type CalloutTone = 'note' | 'hot';

type CalloutProps = {
  tone?: CalloutTone;
  label?: string;
  children: ReactNode;
};

const toneClasses: Record<CalloutTone, { rule: string; label: string; fallback: string }> = {
  note: { rule: 'border-holo', label: 'text-holo', fallback: 'note' },
  hot: { rule: 'border-ripe', label: 'text-ripe', fallback: 'hot take' },
};

// For MDX: <Callout tone='hot'>...</Callout>. Use at most one per post.
export function Callout({ tone = 'note', label, children }: CalloutProps) {
  const styles = toneClasses[tone];
  return (
    <aside className={cn('not-prose my-8 border-l-2 bg-soot px-5 py-4', styles.rule)}>
      <p className={cn('font-mono text-micro font-bold lowercase tracking-[0.15em]', styles.label)}>
        {label ?? styles.fallback}
      </p>
      <div className='mt-2 text-small leading-6 text-bone [&>p]:m-0'>{children}</div>
    </aside>
  );
}
