// Single source of truth for holopeño's design tokens.
// Tailwind (tailwind.config.ts), the OG/icon renderers, and the /design-system page all read from here.

export type ColorToken = {
  value: string;
  role: string;
  // WCAG contrast against `char`, the page background.
  contrastOnChar: number;
  textSafe: boolean;
};

export const colors = {
  char: {
    value: '#0B0B0A',
    role: 'page background. the default canvas.',
    contrastOnChar: 1,
    textSafe: false,
  },
  soot: {
    value: '#151513',
    role: 'raised surfaces: code, callouts, inputs.',
    contrastOnChar: 1.08,
    textSafe: false,
  },
  line: {
    value: '#2A2A26',
    role: 'hairlines, dividers, borders.',
    contrastOnChar: 1.37,
    textSafe: false,
  },
  bone: {
    value: '#F2EFE6',
    role: 'primary text. off-white, never pure white.',
    contrastOnChar: 17.13,
    textSafe: true,
  },
  ash: {
    value: '#9A968C',
    role: 'secondary text: dates, meta, captions.',
    contrastOnChar: 6.67,
    textSafe: true,
  },
  skin: {
    value: '#3E7A1F',
    role: 'deep jalapeño. decoration only: underlines, markers, rules.',
    contrastOnChar: 3.76,
    textSafe: false,
  },
  jalapeno: {
    value: '#4F9A28',
    role: 'jalapeño green for small labels and eyebrows.',
    contrastOnChar: 5.61,
    textSafe: true,
  },
  holo: {
    value: '#C6F432',
    role: 'hologram accent: links, focus, the tilde. one per view, used loud.',
    contrastOnChar: 15.37,
    textSafe: true,
  },
  ripe: {
    value: '#FF4A1C',
    role: 'red jalapeño. heat 5, errors, the 404. rare.',
    contrastOnChar: 5.86,
    textSafe: true,
  },
} as const satisfies Record<string, ColorToken>;

export type ColorName = keyof typeof colors;

export const palette: Record<ColorName, string> = {
  char: colors.char.value,
  soot: colors.soot.value,
  line: colors.line.value,
  bone: colors.bone.value,
  ash: colors.ash.value,
  skin: colors.skin.value,
  jalapeno: colors.jalapeno.value,
  holo: colors.holo.value,
  ripe: colors.ripe.value,
};

export type FontSizeToken = { size: string; lineHeight: string; use: string };

// A tight, mostly-mono scale. Body copy is the only thing set in sans.
export const fontSizes = {
  micro: { size: '0.75rem', lineHeight: '1rem', use: 'eyebrows, meta, footer' },
  small: { size: '0.875rem', lineHeight: '1.375rem', use: 'nav, captions, descriptions' },
  body: { size: '1.0625rem', lineHeight: '1.875rem', use: 'post body (sans)' },
  lead: { size: '1.25rem', lineHeight: '1.875rem', use: 'list titles, intros' },
  h3: { size: '1.375rem', lineHeight: '1.875rem', use: 'post h3' },
  h2: { size: '1.75rem', lineHeight: '2.25rem', use: 'post h2' },
  h1: { size: '2.5rem', lineHeight: '2.875rem', use: 'page and post titles' },
  display: { size: '4rem', lineHeight: '1', use: 'wordmark, 404' },
} as const satisfies Record<string, FontSizeToken>;

export type FontSizeName = keyof typeof fontSizes;

export const fonts = {
  mono: {
    family: 'JetBrains Mono',
    weights: [400, 700, 800],
    use: 'wordmark, headings, ui, meta, code',
  },
  sans: { family: 'Inter Tight', weights: [400, 500, 600], use: 'long-form body copy only' },
} as const;

// Spacing stays on Tailwind's 4px grid. These are the only steps layouts should reach for.
export const spacing = {
  hair: { tailwind: '1', px: 4, use: 'icon gaps, tag padding' },
  tight: { tailwind: '2', px: 8, use: 'inline clusters' },
  snug: { tailwind: '3', px: 12, use: 'meta rows' },
  base: { tailwind: '5', px: 20, use: 'page gutter, list row padding' },
  loose: { tailwind: '8', px: 32, use: 'between blocks' },
  section: { tailwind: '14', px: 56, use: 'page top and bottom' },
  chapter: { tailwind: '24', px: 96, use: 'empty states, 404' },
} as const;

export const measure = { content: '48rem', prose: '42rem' } as const;

// Square by default. Rounding reads friendly; this brand is not friendly.
export const radii = {
  none: { value: '0px', use: 'everything by default' },
  nick: { value: '2px', use: 'inline code and tags, so they do not look like bugs' },
} as const;

export const motion = {
  durations: {
    snap: { value: '120ms', use: 'hover color, underline' },
    move: { value: '200ms', use: 'anything that changes position' },
    glitch: { value: '4.2s', use: 'one full tilde flicker cycle' },
  },
  easings: {
    snap: { value: 'cubic-bezier(0.2, 0, 0, 1)', use: 'all ui transitions' },
    glitch: { value: 'steps(1, end)', use: 'hologram flicker. never smooth.' },
  },
} as const;
