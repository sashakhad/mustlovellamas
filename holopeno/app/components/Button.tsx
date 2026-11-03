import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'solid' | 'outline' | 'text';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  active?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    'border border-bone bg-bone px-3 py-1.5 text-char hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-slab',
  outline: 'border border-line px-3 py-1.5 text-ash hover:border-seed hover:text-bone',
  text: 'text-seed underline-offset-[0.2em] hover:underline',
};

export function Button({
  variant = 'outline',
  active = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={active ? true : undefined}
      className={cn(
        'font-mono text-meta transition duration-snap ease-out disabled:cursor-not-allowed disabled:opacity-40',
        variantClasses[active ? 'solid' : variant],
        className
      )}
      {...rest}
    />
  );
}
