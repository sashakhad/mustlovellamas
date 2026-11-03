import type { Config } from 'tailwindcss';
import { fontSizes, measure, motion, palette, radii } from './lib/tokens';

type TailwindFontSize = [string, { lineHeight: string }];

function tailwindFontSizes(): Record<string, TailwindFontSize> {
  const result: Record<string, TailwindFontSize> = {};
  for (const [name, token] of Object.entries(fontSizes)) {
    result[name] = [token.size, { lineHeight: token.lineHeight }];
  }
  return result;
}

const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx}', './posts/**/*.mdx'],
  theme: {
    extend: {
      colors: palette,
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: tailwindFontSizes(),
      borderRadius: {
        none: radii.none.value,
        nick: radii.nick.value,
      },
      maxWidth: {
        content: measure.content,
        prose: measure.prose,
      },
      transitionDuration: {
        snap: motion.durations.snap.value,
        move: motion.durations.move.value,
      },
      transitionTimingFunction: {
        snap: motion.easings.snap.value,
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
