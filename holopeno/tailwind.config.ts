import type { Config } from 'tailwindcss';

const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        char: '#0B0B0A',
        soot: '#151513',
        line: '#2A2A26',
        bone: '#F2EFE6',
        ash: '#9A968C',
        pepper: '#3E7A1F',
        seed: '#C6F432',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
