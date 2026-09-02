type LlamaMarkProps = {
  className?: string;
};

export function LlamaMark({ className }: LlamaMarkProps) {
  return (
    <svg
      viewBox='0 0 48 48'
      aria-hidden='true'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='10' y='18' width='22' height='18' rx='4' className='fill-accent-soft stroke-ink' strokeWidth='1.6' />
      <path d='M32 22h6l2 5v9h-8' className='stroke-ink' strokeWidth='1.6' strokeLinejoin='round' />
      <rect x='16' y='8' width='4.5' height='12' rx='2' className='fill-wool stroke-ink' strokeWidth='1.4' />
      <rect x='22.5' y='6' width='4.5' height='14' rx='2' className='fill-wool stroke-ink' strokeWidth='1.4' />
      <circle cx='36.5' cy='25.5' r='1.2' className='fill-ink' />
      <path d='M16 36v5M26 36v5' className='stroke-ink' strokeWidth='1.6' strokeLinecap='round' />
    </svg>
  );
}
