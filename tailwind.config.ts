import type { Config } from 'tailwindcss';

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './posts/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f4efe6',
        ink: '#1f1914',
        muted: '#6b5e52',
        accent: '#b4532a',
        'accent-soft': '#e8c4a8',
        wool: '#d8cbb8',
        code: '#231c16',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
