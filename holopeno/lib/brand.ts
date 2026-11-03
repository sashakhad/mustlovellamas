export type BrandRule = { rule: string; why: string };

export const voiceRules: BrandRule[] = [
  {
    rule: 'the name is always lowercase: holopeño. ascii fallback: holopeno.',
    why: 'never Holopeño, never HOLOPEÑO, never holo-peño.',
  },
  {
    rule: 'all ui copy, titles and tags are lowercase.',
    why: 'proper nouns in body copy may keep their case when it helps.',
  },
  {
    rule: 'deadpan. short declarative sentences.',
    why: 'the joke lands harder when nobody is winking.',
  },
  { rule: 'one food pun per page, maximum.', why: 'two is a menu.' },
  {
    rule: 'no exclamation marks, no emoji.',
    why: 'heat comes from the take, not the punctuation.',
  },
];

export const wordmarkRules: BrandRule[] = [
  {
    rule: 'jetbrains mono extrabold, tracking -0.04em, leading 1.',
    why: 'heavy, mechanical, unbothered.',
  },
  {
    rule: 'the ñ tilde is always the hologram wave. never the font tilde.',
    why: 'it is the logo. the rest is just type.',
  },
  {
    rule: 'bone on char by default. char on bone only when the background is not ours.',
    why: 'on bone the ghost switches to skin green; holo disappears on light.',
  },
  { rule: 'clear space: one n-width (0.6em) on every side.', why: 'it needs room to glitch.' },
  {
    rule: 'minimum size: 20px for the wordmark, 16px for the mark.',
    why: 'below that the scanlines turn to mud.',
  },
  {
    rule: 'animation runs on a stepped 4.2s clock and stops under reduced motion.',
    why: 'a glitch that eases is a screensaver.',
  },
];

export const wordmarkDonts: string[] = [
  'no gradients, glows or drop shadows',
  'no recoloring the base glyphs green',
  'no outlines, no italics, no stretching',
  'no rounded containers or pill badges around it',
  'no peppers, chili icons, or flames next to it',
];

export const colorRules: BrandRule[] = [
  {
    rule: 'char and bone carry 95% of every screen.',
    why: 'the green only works because it is rare.',
  },
  {
    rule: 'holo is the one loud thing per view: links, focus, the tilde, a primary action.',
    why: 'two loud things is zero loud things.',
  },
  {
    rule: 'skin is decoration only. never set text in it.',
    why: '3.76:1 on char fails body-text contrast.',
  },
  {
    rule: 'ripe is for heat 5, errors and the 404.',
    why: 'red jalapeño means it has been on the plant too long.',
  },
];

export const layoutRules: BrandRule[] = [
  {
    rule: 'square corners. 2px nick only on inline code and tags.',
    why: 'rounded reads friendly.',
  },
  { rule: 'one column, 48rem content, 42rem prose.', why: 'a blog, not a dashboard.' },
  {
    rule: 'spacing on the 4px grid, from the named steps only.',
    why: 'consistency is cheaper than taste.',
  },
  {
    rule: 'hairline dividers in line. no cards, no shadows.',
    why: 'structure comes from rules, not boxes.',
  },
];
