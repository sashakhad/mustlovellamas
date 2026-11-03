// Single source of truth for holopeño's design tokens.
// Consumed by tailwind.config.ts (site) and lib/og.ts (next/og renders, which cannot read Tailwind).

export const color = {
  char: '#0B0B0A',
  soot: '#151513',
  line: '#2A2A26',
  smoke: '#6B6860',
  ash: '#A29E93',
  bone: '#F2EFE6',
  pepper: '#3E7A1F',
  seed: '#C6F432',
  heat: '#FF4D1A',
} as const;

export type ColorToken = keyof typeof color;

export const fontFamily = {
  mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
} as const;

// [size, { lineHeight, letterSpacing }] tuples, Tailwind's fontSize format.
export const fontSize = {
  micro: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.16em' }],
  meta: ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
  body: ['1.0625rem', { lineHeight: '1.875rem', letterSpacing: '0' }],
  title: ['1.375rem', { lineHeight: '1.875rem', letterSpacing: '-0.02em' }],
  display: ['2.5rem', { lineHeight: '2.75rem', letterSpacing: '-0.04em' }],
  hero: ['clamp(3rem, 11vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.05em' }],
} as const;

// Maps to Tailwind's stock font-normal / font-bold / font-extrabold; listed here for the OG renders.
export const fontWeight = {
  regular: 400,
  bold: 700,
  heavy: 800,
} as const;

// Layout widths. Spacing itself is Tailwind's default 4px scale, unmodified.
export const maxWidth = {
  measure: '42rem',
  page: '64rem',
} as const;

export const borderRadius = {
  hair: '2px',
} as const;

export const boxShadow = {
  slab: `4px 4px 0 0 ${color.seed}`,
  'slab-sm': `2px 2px 0 0 ${color.seed}`,
} as const;

export const motion = {
  duration: {
    snap: '80ms',
    quick: '160ms',
    flicker: '4200ms',
  },
  easing: {
    out: 'cubic-bezier(0.2, 0, 0, 1)',
    glitch: 'steps(1, end)',
  },
} as const;

// Monospace advance width for JetBrains Mono, in em. Lets OG renders place the tilde exactly.
export const monoAdvance = 0.6;
