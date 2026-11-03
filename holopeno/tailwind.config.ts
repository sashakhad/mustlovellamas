import type { Config } from 'tailwindcss';
import {
  borderRadius,
  boxShadow,
  color,
  fontFamily,
  fontSize,
  maxWidth,
  motion,
} from './design/tokens';

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './posts/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: color,
      fontFamily: {
        mono: [...fontFamily.mono],
        sans: [...fontFamily.sans],
      },
      fontSize: {
        micro: [fontSize.micro[0], { ...fontSize.micro[1] }],
        meta: [fontSize.meta[0], { ...fontSize.meta[1] }],
        body: [fontSize.body[0], { ...fontSize.body[1] }],
        title: [fontSize.title[0], { ...fontSize.title[1] }],
        display: [fontSize.display[0], { ...fontSize.display[1] }],
        hero: [fontSize.hero[0], { ...fontSize.hero[1] }],
      },
      maxWidth,
      borderRadius,
      boxShadow,
      transitionDuration: {
        snap: motion.duration.snap,
        quick: motion.duration.quick,
      },
      transitionTimingFunction: {
        out: motion.easing.out,
      },
      keyframes: {
        // Units are SVG cells (1px = one tilde pixel). Base offset matches the static ghost in Tilde.tsx.
        'holo-flicker': {
          '0%, 46%, 51%, 100%': { transform: 'translate(0.34px, 0)', opacity: '1' },
          '47%': { transform: 'translate(-0.9px, 0)', opacity: '0.5' },
          '49%': { transform: 'translate(1.1px, 0)', opacity: '1' },
          '83%': { transform: 'translate(0.34px, 0)', opacity: '0.25' },
          '84%': { transform: 'translate(0.34px, 0)', opacity: '1' },
        },
        'holo-tear': {
          '0%, 48%, 52%, 100%': { transform: 'translateX(0)' },
          '49%': { transform: 'translateX(0.6px)' },
          '50%': { transform: 'translateX(-0.4px)' },
        },
      },
      animation: {
        'holo-flicker': `holo-flicker ${motion.duration.flicker} ${motion.easing.glitch} infinite`,
        'holo-tear': `holo-tear ${motion.duration.flicker} ${motion.easing.glitch} infinite`,
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
