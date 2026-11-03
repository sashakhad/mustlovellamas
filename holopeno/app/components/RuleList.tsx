import type { BrandRule } from '../../lib/brand';

type RuleListProps = {
  rules: BrandRule[];
};

export function RuleList({ rules }: RuleListProps) {
  return (
    <ul className='divide-y divide-line border-y border-line'>
      {rules.map(item => (
        <li key={item.rule} className='grid gap-1 py-3 sm:grid-cols-[1fr_1fr] sm:gap-8'>
          <span className='font-mono text-small text-bone'>{item.rule}</span>
          <span className='text-small text-ash'>{item.why}</span>
        </li>
      ))}
    </ul>
  );
}
