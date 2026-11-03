import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { boxShadow, borderRadius, fontSize } from '../design/tokens';

// tailwind-merge must know the custom token names, or it reads `text-meta` as a color and drops it.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: Object.keys(fontSize) }],
      shadow: [{ shadow: Object.keys(boxShadow) }],
      rounded: [{ rounded: Object.keys(borderRadius) }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
